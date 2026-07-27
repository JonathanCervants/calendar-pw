import { test, expect } from '@playwright/test';

test.beforeEach(async({page})=>{
  await page.goto('/copa-2026');
});

test('Navegación Semana', async ({page}) =>{
  page.pause();
  await page.locator('.sc-fICZUB').click();
  await page.getByRole('link', { name: 'Calendario AT Nuevo' }).click();
  const btnEnVivo = page.locator('#atv2-calendario').contentFrame().getByRole('button', {name:'Hoy'});
  await btnEnVivo.click()
 
});

