// REQUISITO US004-1 : Após adicionar pelo menos um item no carrinho, deve ser possível concluir a compra, inserindo os dados do comprador (Primeiro nome, último nome e CEP)
// ALUNO: Caio Henrique 

import { test, expect } from '@playwright/test';

// CAMINHO FELIZ
test('Informações do comprador para efetuar pagamento', async ({ page }) => {
  // Acessa o site e faz login
  await page.goto('https://www.saucedemo.com');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Adiciona item ao carrinho
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // Vai para o carrinho e inicia checkout
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');

  // Preenche dados válidos
  const nome = 'Caio';
  const sobrenome = 'Henrique';
  const CEP = '5321034';

  await page.fill('[data-test="firstName"]', nome);
  await page.fill('[data-test="lastName"]', sobrenome);
  await page.fill('[data-test="postalCode"]', CEP);

  await page.click('[data-test="continue"]');

  // Verifica redirecionamento
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
});

// CAMINHO DE ERRO
test('Se as informações forem preenchidas erradas, deve exibir mensagem de erro', async ({ page }) => {
  // Acessa o site e faz login
  await page.goto('https://www.saucedemo.com');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Adiciona item ao carrinho
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // Vai para o carrinho e inicia checkout
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');

  // Preenche dados vazios
  await page.fill('[data-test="firstName"]', '');
  await page.fill('[data-test="lastName"]', '');
  await page.fill('[data-test="postalCode"]', '');

  await page.click('[data-test="continue"]');

  // Verifica mensagem de erro
  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Error: First Name is required'
  );
});


