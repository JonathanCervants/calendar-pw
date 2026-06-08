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

    await page.locator('#email').fill('test.first009@apuestatotal.net');
    await page.locator('#password').fill('Password123!');
    await page.locator("text=CONTINUAR").click({timeout:5000});
    
    const btnRecargar= page.getByRole('button', { name: 'Recargar' });
    await expect(btnRecargar).toBeVisible({timeout: 10000})

    await page.context().storageState({path: authFile})
    console.log('✅ Sesión guardada con éxito.');
})