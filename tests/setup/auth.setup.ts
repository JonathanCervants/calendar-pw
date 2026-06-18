import {test as setup ,expect} from '@playwright/test';
import fs from 'fs';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('qwert', async({page})=>{
    const authDir = path.dirname(authFile);
    if(!fs.existsSync(authDir)){
        fs.mkdirSync(authDir, {recursive: true})
    }
    console.log('Iniciando sesión por única vez...');
    await page.goto('/');
    const button =  page.locator("text=Inicia sesión")
    await button.click()

    await page.locator('#login-email').fill('jesus.cervantes@kurax.dev');
    await page.locator('#login-password').fill('Password321!');
    await page.locator("text=INGRESAR").click({timeout:10000});
    const btnRecargar= page.getByRole('button', { name: 'Recargar' });
    await expect(btnRecargar).toBeVisible({timeout: 10000})
    await page.context().storageState({path: authFile})
    console.log('✅ Sesión guardada con éxito.');
})