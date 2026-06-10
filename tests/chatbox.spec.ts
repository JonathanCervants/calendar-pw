import { test, expect } from '@playwright/test';

test.use({baseURL: 'https://web-at-stg.kurax.dev'});

test.beforeEach(async({page})=>{
  await page.goto('/');
   const button =  page.locator("text=Inicia sesión")
  await button.click()
  await page.locator('#email').fill('test.first009@apuestatotal.net');
  await page.locator('#password').fill('Password123!');
  await page.locator("text=CONTINUAR").click({timeout:5000});
  
});

// test('Apuestas depor', async ({page})=>{
//   await page.goto('/apuestas-deportivas');
//     page.pause();
// });

test('Navegación Semana', async ({page}) =>{
  page.pause();
  await page.locator('.sc-fICZUB').click();
  await page.getByRole('link', { name: 'Calendario AT Nuevo' }).click();
  const btnEnVivo = page.locator('#atv2-calendario').contentFrame().getByRole('button', {name:'Hoy'});
  await btnEnVivo.click()

});

