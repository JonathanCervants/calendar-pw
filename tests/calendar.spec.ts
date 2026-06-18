import { test, expect } from '@playwright/test';
test.beforeEach(async({browser})=>{
  const context = await browser.newContext({
  });

  const page = await context.newPage(); 
  const pagetwo = await context.newPage();

 await page.goto('/apuestas-deportivas');
 //await pagetwo.goto('/apuestas-en-vivo');
 

});

test('Navegación', async ({page}) =>{
  page.pause();
  await page.locator('.sc-fICZUB').click();
  await page.getByRole('link', { name: 'Calendario AT Nuevo' }).click();
  const btnEnVivo = page.locator('#atv2-calendario').contentFrame().getByRole('button', {name:'Hoy'});
  await btnEnVivo.click()
});
