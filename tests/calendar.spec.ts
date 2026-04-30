import { test, expect } from '@playwright/test';

test.beforeEach(async({page})=>{
  await page.goto('/calendario');
});

test('Navegación Semana', async ({page}) =>{
  page.pause();
  const btnEnVivo = page.getByRole('button', {name:'Hoy'});
  await btnEnVivo.click()
  page.pause();
});

// test('Navegación EN VIVO', async ({page}) =>{
//   setTimeout(()=>1000);
//   const btnEnVivo = page.getByRole('button', {name:'EN VIVO'});
//   await btnEnVivo.click()
//   await expect(page).toHaveURL(/.*live/)
// });

//LCMCAALL20: 20% de descuento adicional en cualquier plataforma de testing.
// 📌 Este mercado consiste en apostar qué equipo o participante avanzará a la siguiente ronda o será el clasificado, sin importar cómo termine el tiempo reglamentario.
// 📌 Reu 22/04/26:
// Reu con Trigal 
// Junior agregado el PIN, Chat
//Diseño de la Agenda, Modal vista semanal
//Sofía probar las mejoras en el terminal ver si estan o no, hacer un testeo a los terminales.
//Probar: SS-32  |  

//Keyisi: Pruebas estadísticas de la Ruta del Ajuste, PO tiene un estadístico
//Erika: Casos de Prueba Ludopatía
//Brigitte: Whatsapp Log, pruebas upsert y registros de nuevos clientes, menciono databricks, caja chica

//21-04
//LuisM : Gamificación API MiniGame Pruebas de Performance con Marcos | GanaAT | W