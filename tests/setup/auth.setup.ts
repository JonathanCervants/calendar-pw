import {test as setup ,expect} from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('qwert', async({page})=>{
    console.log('🔐 Iniciando sesión por única vez...');
    await page.goto('https://calimaco.apuestatotal.dev/calendario');
    const button =  page.locator("text=Inicia sesión")
    await button.click()

    await page.locator('#email').fill('test.first011@apuestatotal.net');
    await page.locator('#password').fill('Password123!');
    await page.locator("text=CONTINUAR").click({timeout:3000});
    await page.locator('text="9999"');
    await expect(page.locator("text=Recargar").first()).toBeVisible({timeout: 5000});

    //save storages
    await page.context().storageState({path: authFile})
    console.log('✅ Sesión guardada con éxito.');
})