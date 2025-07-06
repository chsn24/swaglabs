import { test, expect } from '@playwright/test';

test.describe('Validação de obrigatoriedade no Checkout - SauceDemo', () => {
  const loginUrl = 'https://www.saucedemo.com';

  /**
   * Função auxiliar que realiza o fluxo completo até a tela de checkout:
   * 1. Faz login no sistema
   * 2. Adiciona um produto ao carrinho
   * 3. Navega até a página de checkout
   * @param page - Instância da página do Playwright
   */
  const irParaCheckout = async (page) => {
    // Navega para página inicial
    await page.goto(loginUrl);

    // Preenche credenciais e realiza login
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    // Valida se foi redirecionado para a página de produtos
    await expect(page).toHaveURL(/inventory/);

    // Adiciona produto ao carrinho e inicia checkout
    await page.click('text=Add to cart');       // Clica no primeiro produto disponível
    await page.click('.shopping_cart_link');   // Abre o carrinho
    await page.click('text=Checkout');         // Inicia o processo de checkout
    
    // Valida se chegou na tela de informações do checkout
    await expect(page).toHaveURL(/checkout-step-one/);
  };


   //Teste do caminho feliz com todos os campos preenchidos corretamente
  test('Deve permitir continuar com todos os campos preenchidos', async ({ page }) => {
    // Navega até a tela de checkout
    await irParaCheckout(page);

    // Preenche todos os campos do formulário
    await page.fill('#first-name', 'João');      // Nome válido
    await page.fill('#last-name', 'Silva');      // Sobrenome válido
    await page.fill('#postal-code', '12345678'); // CEP válido

    // Submete o formulário
    await page.click('#continue');

    // Verifica se avançou para a próxima etapa do checkout
    await expect(page).toHaveURL(/checkout-step-two/);
  });

  
   //Teste simulando erro do campo primeiro nome vazio
  test('Deve exibir erro se o primeiro nome estiver vazio', async ({ page }) => {
    await irParaCheckout(page);

    // Preenche formulário deixando primeiro nome vazio
    await page.fill('#first-name', '');          // Campo vazio - inválido
    await page.fill('#last-name', 'Silva');      // Sobrenome válido
    await page.fill('#postal-code', '12345678'); // CEP válido

    await page.click('#continue');

    // Verifica se exibiu mensagem de erro específica para primeiro nome
    await expect(page.locator('[data-test="error"]'))
      .toContainText('First Name is required');
  });

  
   //Teste simulando erro do campo último nome vazio
  test('Deve exibir erro se o último nome estiver vazio', async ({ page }) => {
    await irParaCheckout(page);

    // Preenche formulário deixando último nome vazio
    await page.fill('#first-name', 'João');      // Nome válido
    await page.fill('#last-name', '');           // Campo vazio - inválido
    await page.fill('#postal-code', '12345678');  // CEP válido

    await page.click('#continue');

    // Verifica se exibiu mensagem de erro específica para último nome
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Last Name is required');
  });


   //Teste simulando erro do campo CEP vazio
  test('Deve exibir erro se o CEP estiver vazio', async ({ page }) => {
    await irParaCheckout(page);

    // Preenche formulário deixando CEP vazio
    await page.fill('#first-name', 'João');  // Nome válido
    await page.fill('#last-name', 'Silva');  // Sobrenome válido
    await page.fill('#postal-code', '');     // Campo vazio - inválido

    await page.click('#continue');

    // Verifica se exibiu mensagem de erro específica para CEP
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Postal Code is required');
  });
});