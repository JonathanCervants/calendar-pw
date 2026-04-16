import { test, expect } from '@playwright/test';

test.use({
userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'});


test.describe('Automatización Personal - Búsqueda de Empleo', () => {

  test('Extraer ofertas de QA Automation en LinkedIn', async ({ page }) => {
    // 2. Parámetros de búsqueda
    const role = encodeURIComponent('QA Automation');
    const location = encodeURIComponent('Remoto');
    const searchUrl = `https://www.linkedin.com/jobs/search?keywords=${role}&location=${location}`;

    console.log(`\n🔍 Navegando a la bolsa de trabajo...`);
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded' });

    console.log('⏳ Esperando a que carguen las ofertas...');
    // Esperamos a que la lista de resultados exista en el DOM
    await page.waitForSelector('ul.jobs-search__results-list', { timeout: 15000 });

    // 3. Extracción de datos (Evaluación en el contexto del navegador)
    const jobs = await page.$$eval('ul.jobs-search__results-list > li', (cards) => {
      return cards.map(card => {
        const titleEl = card.querySelector('h3.base-search-card__title');
        const companyEl = card.querySelector('h4.base-search-card__subtitle');
        const locationEl = card.querySelector('span.job-search-card__location');
        // TypeScript requiere que hagamos un cast para saber que es un enlace y tiene .href
        const linkEl = card.querySelector('a.base-card__full-link') as HTMLAnchorElement;

        return {
          Título: titleEl?.textContent?.trim() || 'Sin título',
          Empresa: companyEl?.textContent?.trim() || 'Sin empresa',
          Ubicación: locationEl?.textContent?.trim() || 'Sin ubicación',
          // Limpiamos los parámetros de rastreo de la URL (todo lo que va después del '?')
          URL: linkEl ? linkEl.href.split('?')[0] : 'Sin enlace' 
        };
      }).slice(0, 15); // Limitamos a los 15 primeros para no saturar la consola
    });

    // 4. Imprimir resultados en la terminal
    console.log(`✅ ¡Se extrajeron ${jobs.length} ofertas de trabajo!\n`);
    console.table(jobs);

    // 5. Aserción de Calidad (Hacer que el test pase o falle con sentido)
    // El test fallará si LinkedIn cambia su DOM o nos bloquea, alertándote.
    expect(jobs.length).toBeGreaterThan(0);
  });
});
