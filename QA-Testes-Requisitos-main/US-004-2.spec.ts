// APLICAÇÃO: SauceDemo SwagLabs  
// REQUISITO US-004-2 : Uma tela com os dados para confirmação deve ser apresentada ao concluir o preenchimento dos dados corretamente e confirmar.
// ALUNO: Jefferson Ribeiro dos Santos - FICR ADS  
import { test, expect } from '@playwright/test';
// ======================================================= Caminho Feliz =========================================================
test(' Uma tela com os dados para confirmação deve ser apresentada ao concluir o preenchimento dos dados corretamente e confirmar.', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Preenche credenciais e realiza o login
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Valida redirecionamento para a página de inventário e clica em um dos produtos para exemplo.
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await page.waitForSelector('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
  //Clica no icone do carrinho de compra
  await page.waitForSelector('[data-test="shopping-cart-link"]');
  await page.click('[data-test="shopping-cart-link"]');

  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  //Clica no botão do checkout
  await page.click('[data-test="checkout"]');
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  //Preenche dados e finaliza o checkout
  await page.fill('[data-test="firstName"]', 'standarduser');
  await page.fill('[data-test="lastName"]', 'swaglabs');
  await page.fill('[data-test="postalCode"]', '54545590');
  await page.click('[data-test="continue"]');
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  await page.click('[data-test="finish"]');
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
  await page.pause();
});
