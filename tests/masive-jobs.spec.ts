import { test, expect, Page } from '@playwright/test';

// 1. Estandarizamos el formato de salida
interface JobOffer {
  origen: string;
  titulo: string;
  empresa: string;
  url: string;
}

// 2. Definimos la "Estrategia" que cada sitio web debe cumplir
interface JobBoard {
  nombre: string;
  urlBusqueda: string;
  // Cada sitio tendrá su propia lógica de extracción del DOM
  extraerDatos: (page: Page) => Promise<JobOffer[]>; 
}

// 3. Parámetros globales
const ROL = 'QA Automation';
const ROL_URL = encodeURIComponent(ROL);

// 4. Configuración de los 4 Sitios Web
const sitiosWeb: JobBoard[] = [
  {
    nombre: 'LinkedIn',
    urlBusqueda: `https://www.linkedin.com/jobs/search?keywords=${ROL_URL}&location=Remote`,
    extraerDatos: async (page) => {
      await page.waitForSelector('ul.jobs-search__results-list', { timeout: 15000 });
      return page.$$eval('ul.jobs-search__results-list > li', (cards) => 
        cards.map(card => {
          const title = card.querySelector('h3.base-search-card__title')?.textContent?.trim() || '';
          const company = card.querySelector('h4.base-search-card__subtitle')?.textContent?.trim() || '';
          const link = (card.querySelector('a.base-card__full-link') as HTMLAnchorElement)?.href.split('?')[0] || '';
          return { origen: 'LinkedIn', titulo: title, empresa: company, url: link };
        }).slice(0, 5) // Tomamos los 5 mejores
      );
    }
  },
  {
    nombre: 'WeWorkRemotely',
    urlBusqueda: `https://weworkremotely.com/remote-jobs/search?term=${ROL_URL}`,
    extraerDatos: async (page) => {
      await page.waitForSelector('article ul li', { timeout: 10000 });
      return page.$$eval('article ul li:not(.view-all)', (cards) => 
        cards.map(card => {
          const title = card.querySelector('.title')?.textContent?.trim() || '';
          const company = card.querySelector('.company')?.textContent?.trim() || '';
          const linkPath = (card.querySelectorAll('a')[1] as HTMLAnchorElement)?.getAttribute('href') || '';
          return { origen: 'WWR', titulo: title, empresa: company, url: `https://weworkremotely.com${linkPath}` };
        }).slice(0, 5)
      );
    }
  },
  {
    nombre: 'GetOnBoard',
    // URL amigable para búsquedas en este sitio
    urlBusqueda: `https://www.getonbrd.com/empleos-${ROL.replace(' ', '-').toLowerCase()}`,
    extraerDatos: async (page) => {
      // Si el sitio no tiene resultados o la URL cambia, manejamos el error elegantemente
      try {
        await page.waitForSelector('.job-list .gb-results-list', { timeout: 10000 });
        return page.$$eval('.job-list > a', (cards) => 
          cards.map(card => {
            const title = card.querySelector('h4')?.textContent?.trim() || '';
            const company = card.querySelector('.color-hierarchy3')?.textContent?.trim() || '';
            const link = (card as HTMLAnchorElement).href;
            return { origen: 'GetOnBoard', titulo: title, empresa: company, url: link };
          }).slice(0, 5)
        );
      } catch {
        return []; // Si no hay ofertas o falla, devolvemos array vacío
      }
    }
  },
  {
    nombre: 'RemoteOK',
    urlBusqueda: `https://remoteok.com/remote-${ROL.replace(' ', '-')}-jobs`,
    extraerDatos: async (page) => {
      try {
        await page.waitForSelector('table#jobsboard', { timeout: 10000 });
        return page.$$eval('tr.job', (cards) => 
          cards.map(card => {
            const title = card.querySelector('h2[itemprop="title"]')?.textContent?.trim() || '';
            const company = card.querySelector('h3[itemprop="name"]')?.textContent?.trim() || '';
            const linkPath = (card.querySelector('a.preventLink') as HTMLAnchorElement)?.getAttribute('href') || '';
            return { origen: 'RemoteOK', titulo: title, empresa: company, url: `https://remoteok.com${linkPath}` };
          }).slice(0, 5)
        );
      } catch {
        return []; 
      }
    }
  }
];

test.describe('Búsqueda Masiva de Empleo (Paralela)', () => {

  // Usamos 'context' en lugar de 'page' para poder abrir múltiples pestañas a la vez
  test('Debe extraer y unificar ofertas de 4 portales distintos', async ({ context }) => {
    console.log(`\n🚀 Iniciando búsqueda masiva para: ${ROL}...\n`);

    // Array para almacenar todas las promesas de scraping
    const promesasScraping = sitiosWeb.map(async (sitio) => {
      const nuevaPestana = await context.newPage(); // Cada sitio en su propia pestaña
      
      try {
        await nuevaPestana.goto(sitio.urlBusqueda, { waitUntil: 'domcontentloaded' });
        const ofertas = await sitio.extraerDatos(nuevaPestana);
        console.log(`✅ ${sitio.nombre}: ${ofertas.length} ofertas encontradas.`);
        return ofertas;
      } catch (error) {
        console.log(`❌ ${sitio.nombre}: Error al extraer datos ({error.message.split('\n')[0]})`);
        return []; // Si un sitio falla, no rompemos toda la ejecución
      } finally {
        await nuevaPestana.close(); // Liberamos memoria cerrando la pestaña
      }
    });

    // Promise.all espera a que TODAS las pestañas terminen su trabajo en paralelo
    const resultadosPorSitio = await Promise.all(promesasScraping);

    // Unimos todos los arrays de resultados en una sola lista plana
    const todasLasOfertas = resultadosPorSitio.flat();

    console.log('\n📊 --- RESUMEN FINAL DE OFERTAS --- 📊');
    console.table(todasLasOfertas, ['origen', 'empresa', 'titulo', 'url']);

    // Validamos que al menos uno de los sitios haya traído resultados
    expect(todasLasOfertas.length).toBeGreaterThan(0);
  });

});