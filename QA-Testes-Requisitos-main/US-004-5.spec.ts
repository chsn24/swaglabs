import { test, expect } from '@playwright/test';

test.describe('Validação de Checkout no SauceDemo', () => {
  const loginUrl = 'https://www.saucedemo.com';

  /**
   * Função auxiliar para gerar strings de tamanho específico
   * @param tamanho - Quantidade de caracteres da string a ser gerada
   * @returns String preenchida com o caractere 'A' repetido pelo tamanho especificado
   */
  const gerarString = (tamanho: number) => 'A'.repeat(tamanho);

  test.beforeEach(async ({ page }) => {
    // 1. Navega para página de login
    await page.goto(loginUrl);
    
    // 2. Preenche credenciais e faz login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // 3. Verifica se foi redirecionado para a página de produtos
    await expect(page).toHaveURL(/inventory/);
    
    // 4. Adiciona produto ao carrinho e navega para checkout
    await page.click('text=Add to cart');       // Clica no primeiro botão "Add to cart"
    await page.click('.shopping_cart_link');   // Abre o carrinho
    await page.click('text=Checkout');         // Inicia o checkout
    
    // 5. Verifica se chegou na primeira etapa do checkout
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  
  //Teste do caminho feliz de preenchimento válido
  test('Deve permitir preenchimento válido', async ({ page }) => {
    // Preenche formulário com dados válidos
    await page.fill('#first-name', 'João');
    await page.fill('#last-name', 'Silva');
    await page.fill('#postal-code', '12345678');
    
    // Submete o formulário
    await page.click('#continue');
    
    // Verifica se avançou para etapa 2 do checkout
    await expect(page).toHaveURL(/checkout-step-two/);
  });


  //Teste simulando erro do primeiro nome muito longo (151 caracteres)
  test('Deve exibir erro para primeiro nome excedendo limite (151)', async ({ page }) => {
    // Preenche formulário com primeiro nome inválido (151 caracteres)
    await page.fill('#first-name', gerarString(151));
    await page.fill('#last-name', 'Silva');
    await page.fill('#postal-code', '12345678');
    
    // Submete o formulário
    await page.click('#continue');
    
    // Localiza e valida mensagem de erro
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible(); // Verifica se erro está visível
    await expect(error).toContainText('First Name'); // Verifica se mensagem menciona o campo
  });


  //Teste simulando erro do último nome muito longo (251 caracteres)
  test('Deve exibir erro para último nome excedendo limite (251)', async ({ page }) => {
    await page.fill('#first-name', 'João');
    await page.fill('#last-name', gerarString(251)); // Último nome inválido
    await page.fill('#postal-code', '12345678');
    await page.click('#continue');
    
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Last Name'); // Mensagem específica para último nome
  });

  
   // Teste simulando erro do CEP incompleto (7 caracteres)
  test('Deve exibir erro para CEP com menos de 8 caracteres', async ({ page }) => {
    await page.fill('#first-name', 'João');
    await page.fill('#last-name', 'Silva');
    await page.fill('#postal-code', '1234567'); // CEP com apenas 7 caracteres
    await page.click('#continue');
    
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Postal Code'); // Mensagem específica para CEP
  });

  
  // Teste simulando erro do CEP com caracteres especiais
  test('Deve exibir erro para CEP com caracteres especiais', async ({ page }) => {
    await page.fill('#first-name', 'João');
    await page.fill('#last-name', 'Silva');
    await page.fill('#postal-code', '12@#5678'); // CEP com caracteres inválidos
    await page.click('#continue');
    
    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText('Postal Code');
  });
});