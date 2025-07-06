// APLICAÇÃO: SauceDemo SwagLabs  
// REQUISITO US001-3 : Ao clicar no produto, uma tela com as informações do produto deve ser apresentada  
// ALUNO: Jefferson Ribeiro dos Santos - FICR ADS  

import { test, expect } from '@playwright/test';

// ======================================================= Caminho Feliz =========================================================
// Teste validando o fluxo correto: ao clicar no produto, uma tela com as informações deve ser apresentada.

test('Ao clicar no produto, uma tela com as informações do produto deve ser apresentada.', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Preenche credenciais e realiza o login
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Valida redirecionamento para a página de inventário
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Clique no produto
  await page.getByText('Sauce Labs Bike Light').click();

  // Valida se foi redirecionado corretamente para a página do item
  await expect(page).toHaveURL(/inventory-item.html\?id=\d+/);

  // Valida se o nome do produto está correto na página
  await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Bike Light');
});

// ======================================================= Caminho Triste =========================================================
// Teste validando um erro inesperado: ao clicar no produto, a descrição contém informações incorretas.

test('Ao clicar em um item (como o Sauce Labs Backpack), a tela de descrição apresentou informações incorretas.', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Preenche credenciais e realiza o login
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // Valida redirecionamento para a página de inventário
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  // Clique no produto
  await page.getByText('Sauce Labs Backpack').click();

  // Valida se foi redirecionado corretamente para a página do item
  await expect(page).toHaveURL(/inventory-item.html\?id=\d+/);

  // Valida se o nome do produto está correto na página
  await expect(page.locator('.inventory_details_name')).toHaveText('Sauce Labs Backpack');

  // Verifica se o texto "carry.allTheThings()" está visível na descrição do produto
  await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText('carry.allTheThings()');
});
