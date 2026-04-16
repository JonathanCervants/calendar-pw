import { test, expect } from '@playwright/test';

test.beforeEach(async({page})=>{
  await page.goto('/calendario');
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Apuestas/);
});
  
test('Navegación EN VIVO', async ({page}) =>{
  const btnEnVivo = page.locator('text=EN VIVO');
  await btnEnVivo.click()
  await expect(page).toHaveURL(/.*live/)
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
  
// See the browser window: add --headed.
// Run a single project/browser: --project=chromium.
// Run one file: npx playwright test tests/example.spec.ts.
// Open testing UI: --ui
//Entrego las obsv. del requeriment retest y se revisa y esta ok, web at 1 solo caso, en Keycloack MVT.