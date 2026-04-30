import {test, expect} from '@playwright/test';
test('iNvoke', async({page})=>{
  //tráfico
  page.on('response', async (response) =>{
    if (response.url().includes('/api/v1/sports') && response.status() === 200){
       const data = response.json();
       console.log('Datos extraidos de la API', data);
    }
  });

  await page.goto('https://calimaco.apuestatotal.dev');
  await page.waitForLoadState('networkidle');
})


