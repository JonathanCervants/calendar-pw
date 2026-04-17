import {test as setup ,expect} from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('qwert', async({page})=>{
    console.log('🔐 Iniciando sesión por única vez...');
    await page.goto('https://calimaco.apuestatotal.dev/calendario');
    const button =  page.locator("text=Inicia sesión")
    await button.click()

    await page.locator('#email').fill('test.first010@apuestatotal.net');
    await page.locator('#password').fill('Password123!');
    await page.locator("text=CONTINUAR").click({timeout:3000});
    //await page.getByRole("button", {name: 'Recargar'}).click({timeout: 3000});
    //save storages
    setTimeout(()=> 3000);
    await page.context().storageState({path: authFile})
    console.log('✅ Sesión guardada con éxito.');
})