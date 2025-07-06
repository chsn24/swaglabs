// REQUISITO US001-1 : A página com os itens a venda é apresentada após o login 
// ALUNO: Caio Henrique 


import { test, expect } from '@playwright/test';


//CAMINHO FELIZ

// Usuário e senha válidos direciona para a visualização dos produtos
test('Login com credenciais válidas leva à página de produtos', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Valida redirecionamento
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});


// CAMINHO DOS ERROS

// Usuário e senha inválidos
test('Login com usuário ou senha inválidos deve exibir mensagem de erro', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.fill('[data-test="username"]', 'usuario_invalido');
  await page.fill('[data-test="password"]', 'senha_invalida');
  await page.click('[data-test="login-button"]');

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );
});

// Usuário e senha não preenchidos (em branco)
test('Login com usuário e senha em branco deve exibir mensagem de erro', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.fill('[data-test="username"]', '');
  await page.fill('[data-test="password"]', '');
  await page.click('[data-test="login-button"]');

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Username is required'
  );
});

// Usuário não preenchido (em branco)
test('Login com usuário em branco deve exibir mensagem de erro', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.fill('[data-test="username"]', '');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Username is required'
  );
});

// Senha não preenchida (em branco)
test('Login com senha em branco deve exibir mensagem de erro', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', '');
  await page.click('[data-test="login-button"]');

  await expect(page.locator('[data-test="error"]')).toHaveText(
    'Epic sadface: Password is required'
  );
});
