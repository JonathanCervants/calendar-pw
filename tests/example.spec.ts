import { test, expect } from '@playwright/test';

test('find mercado', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.pe');
  await page.locator('id=download-app-bottom-banner-close').click();
  const search = page.locator('id=cb1-edit')
  await search.fill('iphone');
  await search.press('Enter');

  //locator principal
  const listaResultados = page.locator('ol.ui-search-layout');
  // Para ejecutar una acción:
  await expect(listaResultados).toBeVisible();

  //page.pause();

  const titles = await listaResultados.locator('li h3').allInnerTexts();
  for(const title of titles){
    console.log(title)
  }
});

