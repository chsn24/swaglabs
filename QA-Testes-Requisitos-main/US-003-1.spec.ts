// APLICAÇÃO: SauceDemo SwagLabs  
// ALUNO : Ryan Vitor
// REQUISITO US-003-1 : Deve ser possível adicionar um produto ao carrinho através da tela de produtos e visualização de produto.

import { test, expect } from '@playwright/test'; // Importa funções principais do Playwright para executar e validar testes

// ======================================================= Caminho Feliz =========================================================
test('Adiciona produto à lista de produtos', async ({ page }) => {
  // Abre o site da aplicação
  await page.goto('https://www.saucedemo.com');

  // Preenche o campo de nome de usuário com o login padrão
  await page.fill('[data-test="username"]', 'standard_user');

  // Preenche o campo de senha com a senha padrão
  await page.fill('[data-test="password"]', 'secret_sauce');

  // Clica no botão de login
  await page.click('[data-test="login-button"]');

  // Localiza o botão de adicionar o produto "Backpack" ao carrinho
  const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');

  // Clica no botão para adicionar o produto ao carrinho
  await addToCartButton.click();

  // Localiza o botão de remover o produto do carrinho (ele só aparece se o produto foi adicionado com sucesso)
  const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');

  // Verifica se o botão de remover está visível na página, confirmando que o produto foi adicionado
  await expect(removeButton).toBeVisible();
});

// ============================================ Caminho simulando erro ================================================
test('Adiciona produto ao carrinho - Simulação de Erro por Carrinho Cheio, onde o limite é 4 itens', async ({ page }) => {
  // Acessa a página inicial da aplicação
  await page.goto('https://www.saucedemo.com');

  // Realiza login com o usuário padrão
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Adiciona 3 produtos diferentes ao carrinho
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

  // Tenta adicionar um quarto produto ao carrinho
  const targetProductButton = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
  await targetProductButton.click(); 

  // Verifica se o botão de remover o quarto produto aparece, o que indica que ele foi adicionado com sucesso
  const removeTargetProductButton = page.locator('[data-test="remove-sauce-labs-fleece-jacket"]');
  await expect(removeTargetProductButton).toBeVisible(); 
});

