import { test, expect } from '@playwright/test';
import { BrowserContext } from '@playwright/test';
test.beforeEach(async({page})=>{
  test.use({baseURL: 'https://www.utest.com/'});
});

// test('Apuestas depor', async ({page})=>{
//   await page.goto('/apuestas-deportivas');
//     page.pause();
// });
test.describe(title:string, ()=> {})


test('Navegación Semana', async ({page}) =>{
 
  await page.goto('/');
  page.pause();
  
  await page.locator('.sc-fICZUB').click();
  await page.getByRole('link', { name: 'Calendario AT Nuevo' }).click();
  const btnEnVivo = page.locator('#atv2-calendario').contentFrame().getByRole('button', {name:'Hoy'});
  await btnEnVivo.click()

});

