import { test, expect } from '@playwright/test';

test.beforeEach(async({page})=>{
  await page.goto('/calendario');
});

test('Navegación EN VIVO', async ({page}) =>{
  setTimeout(()=>1000);
  const btnEnVivo = page.getByRole('button', {name:'EN VIVO'});
  await btnEnVivo.click()
  await expect(page).toHaveURL(/.*live/)
});

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();
//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

// See the browser window: add --headed.
// Run one file: npx playwright test tests/example.spec.ts.

//Keyisi: Pruebas estadísticas de la Ruta del Ajuste, PO tiene un estadístico
//Erika: Casos de Prueba Ludopatía
//Brigitte: Whatsapp Log, pruebas upsert y registros de nuevos clientes, menciono databricks, caja chica