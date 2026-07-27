import { test, expect } from '@playwright/test';
import { BrowserContext } from '@playwright/test';


test.use({ baseURL: 'https://bancaporinternet.interbank.pe/login' });

test.beforeEach(async ({ page }) => {
});

//empate rojo empate rojo azul 
// no usa el request_app_ready dos events app-right 
//test('Apuestas depor', async ({page})=>{
//   await page.goto('/apuestas-deportivas');
//     page.pause();
// });


test('Navegación Semana', async ({ page }) => {

  await page.goto('/');
  page.pause();

  await page.locator('.sc-fICZUB').click();
  await page.getByRole('link', { name: 'Calendario AT Nuevo' }).click();
  const btnEnVivo = page.locator('#atv2-calendario').contentFrame().getByRole('button', { name: 'Hoy' });
  await btnEnVivo.click()

});

