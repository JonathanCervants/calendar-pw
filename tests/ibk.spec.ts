import { test, expect } from '@playwright/test';
import { BrowserContext } from '@playwright/test';


// test.use({
//   baseURL: 'https://bancaporinternet.interbank.pe/'
// });

test.beforeEach(async ({ page }) => {
  await page.goto("https://bancaporinternet.interbank.pe")
});


test('Login', async ({ page }) => {

  console.log("Ingresa al Login");
  await page.waitForURL('**/bpi/inicio**', {
    timeout: 200000
  });

  //extract cash
  const saldo = await page.locator('[id="43"]').innerText();
  console.log(saldo);


});

