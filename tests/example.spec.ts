import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
// 📌 Este mercado consiste en apostar qué equipo o participante avanzará a la siguiente ronda o será el clasificado, sin importar cómo termine el tiempo reglamentario.

// 👉 Es importante tener en cuenta que:

// Incluye prórroga y/o penales, si el formato del evento lo contempla.
// No importa si el equipo gana en los 90 minutos, tiempo extra o penales; lo relevante es quién clasifica.

// 📌 Ejemplo:
// Si eliges a un equipo en “Clasificará” y este avanza tras penales, tu apuesta se considera ganada.