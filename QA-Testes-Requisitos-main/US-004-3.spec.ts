// APLICAÇÃO: SauceDemo SwagLabs  
// REQUISITO US-004-3 : A transação pode ser cancelada através do botão Cancel.
// ALUNO: Jefferson Ribeiro dos Santos - FICR ADS  

import { test, expect } from '@playwright/test';

// ======================================================= Caminho Feliz =========================================================


test('A transação pode ser cancelada através do botão Cancel.', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Preenche credenciais e realiza o login
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Valida redirecionamento para a página de inventário e clica em um dos produtos para exemplo.
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await page.waitForSelector('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  
  await page.waitForSelector('[data-test="shopping-cart-link"]');
  await page.click('[data-test="shopping-cart-link"]');

  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  await page.click('[data-test="checkout"]');
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  await page.fill('[data-test="firstName"]', 'standarduser');
  await page.fill('[data-test="lastName"]', 'swaglabs');
  await page.fill('[data-test="postalCode"]', '54545590');
  await page.click('[data-test="continue"]');
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  await page.click('[data-test="cancel"]');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  await page.pause();
});
