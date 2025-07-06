import { test, expect } from '@playwright/test';

// Login automático antes de cada teste
// beforeEach: "Antes de cada teste, execute o login automático com o usuário standard_user e senha secret_sauce."
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

  // Teste: Adicionar item ao carrinho
test('Adicionar item ao carrinho', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

// Teste: Remover item do carrinho
test('Remover item do carrinho', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="remove-sauce-labs-backpack"]');
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});

// Teste: Iniciar checkout e cancelar
test('Iniciar checkout e cancelar', async ({ page }) => {
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');
  await page.click('[data-test="cancel"]');
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
});

// Teste: Voltar para página de produtos
test('Voltar para produtos após entrar no carrinho', async ({ page }) => {
  await page.click('.shopping_cart_link');
  await page.click('[data-test="continue-shopping"]');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});