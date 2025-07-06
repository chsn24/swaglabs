// APLICAÇÃO: SauceDemo SwagLabs  
// ALUNO : Ryan Vitor
// REQUISITO US-003-3 : Deve ser possível remover um produto ao carrinho através da tela de produtos e visualização de produto.



import { test, expect } from '@playwright/test';
// ======================================================= Caminho Feliz =======================================================
test('Remove produto da lista de produtos', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  await addToCartButton.click();

  const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
  await removeButton.click();

  await expect(addToCartButton).toBeVisible();
});

// ============================================ Caminho simulando erro do usuário ================================================

test('Tenta remover produto não adicionado - Simulação de Erro', async ({ page }) => {
  // 1. Acessa e faz login
  await page.goto('https://www.saucedemo.com');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');

  // 2. Verifica o estado inicial dos botões
  const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
  
  // 3. Validações principais
  await expect(addButton).toBeVisible(); // Botão de adicionar deve estar visível
  await expect(removeButton).toHaveCount(0); // Botão de remover não deve existir no DOM

  // 4. Tentativa de remoção (opcional - para simular ação do usuário)
  try {
    await removeButton.click({ timeout: 1000 });
    throw new Error('Botão de remover estava presente sem o produto ter sido adicionado');
  } catch (error) {
    // Verifica se o erro foi porque o elemento não foi encontrado
    expect(error.message).toContain('locator.click: Timeout');
    console.log('Comportamento correto: Não foi possível clicar no botão de remover');
  }
});