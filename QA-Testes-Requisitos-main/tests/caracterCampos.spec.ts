import { test, expect } from '@playwright/test';

//CAMINHO FELIZ
test('Informações do checkout devem ter um limite de caracteres', async ({ page }) => {
  // Acessa o site e faz login
  await page.goto('https://www.saucedemo.com');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.waitForSelector('[data-test="login-button"]');
  await page.click('[data-test="login-button"]');

  // Adiciona item ao carrinho
  await page.waitForSelector('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // Vai para o carrinho e inicia checkout
  await page.waitForSelector('.shopping_cart_link');
  await page.click('.shopping_cart_link');
  await page.waitForSelector('[data-test="checkout"]');
  await page.click('[data-test="checkout"]');

  // Preenche dados válidos
  //Limite de 150 caracteres para firstname
  //Limite de 250 caracteres para lastname
  const nome150 = 'Caio'.repeat(150).slice(0,150);
  const sobrenome250 = 'Henrique'.repeat(250).slice(0,250);
  const CEP = '53210348';

  await page.fill('[data-test="firstName"]', nome150);
  await page.fill('[data-test="lastName"]', sobrenome250);
  await page.fill('[data-test="postalCode"]', CEP);

  await page.click('[data-test="continue"]');

  // Verifica redirecionamento
  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
});

// CAMINHO DE ERRO
test('Campos do checkout não devem aceitar mais do que o limite de caracteres', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.waitForSelector('[data-test="login-button"]');
  await page.click('[data-test="login-button"]');

  await page.waitForSelector('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.waitForSelector('.shopping_cart_link');
  await page.click('.shopping_cart_link');
  await page.waitForSelector('[data-test="checkout"]');
  await page.click('[data-test="checkout"]');

  //Gerando textos que ultrapassem o limite
  const nomeAcimaLimite = 'Caio'.repeat(151); // 'Caio' 4 * 151 = 604 letras
  const sobrenomeAcimaLimite = 'Henrique'.repeat(251); 
  const cepAcimaLimite = '12345678910111213';

  //Em seguida é criada 3 variáveis que apontam para firstname, lastname e postalcode
  const firstNameInput = page.locator('[data-test="firstName"]');
  const lastNameInput = page.locator('[data-test="lastName"]');
  const postalCodeInput = page.locator('[data-test="postalCode"]');

  //Os dados acima do limite digitados anteriormente, são coletados e preenchem os campos do site real.
  await firstNameInput.fill(nomeAcimaLimite);
  await lastNameInput.fill(sobrenomeAcimaLimite);
  await postalCodeInput.fill(cepAcimaLimite);

  // O método inputValue() define o dado real digitado no campo, após o preenchimento
  // Dessa forma, o usuário consegue saber quantos caracteres foram aceitos
  const valorNome = await firstNameInput.inputValue();
  const valorSobrenome = await lastNameInput.inputValue();
  const valorCEP = await postalCodeInput.inputValue();

  // Verifica que os campos aceitam valores acima dos limites
  expect(valorNome.length).toBeGreaterThan(150);
  expect(valorSobrenome.length).toBeGreaterThan(250);
  expect(valorCEP.length).toBeGreaterThan(8);
});

