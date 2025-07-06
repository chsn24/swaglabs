// APLICAÇÃO: SauceDemo SwagLabs  
//ALUNO : Wenderson Artur
//REQUISITO US-003-2 : No carrinho é apresentado um contador com a quantidade de produtos adicionados.


import { test, expect } from '@playwright/test';

//=========================================Caminho Feliz===================================================
test('Verificar se ao selecionar um item , o contador será incremetado (+1)', async ({page}) => {

  await page.goto('https://www.saucedemo.com');
  
  test.step('login', async () => {
    // Preenche os campos de login usando page.fill
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
     })

await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

//Cria uma variável para receber o objeto e logo após verifica se está visível e acrescentou +1
const contador = page.locator('.shopping_cart_badge');
await expect(contador).toBeVisible();
await expect(contador).toHaveText('1');

//Pausar durante a execução do programa
await page.pause();
});


//================================================Teste simulando erro===========================================================

test('Deve exibir corretamente a quantidade de produtos no carrinho', async ({ page}) => {
  // Acessa a página da loja
  await page.goto('https://www.saucedemo.com');

  test.step('login', async () => {
    // Preenche os campos de login usando page.fill
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
     })

  // Clica duas vezes no botão "Adicionar ao carrinho"
  const botaoAdicionar = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await botaoAdicionar.first().click();
  const botaoAdicionar2 = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  await botaoAdicionar2.first().click();

  // Localiza o contador do carrinho
  const contadorCarrinho = page.locator('.shopping_cart_badge');

  // Simula erro: espera 3 produtos, mas foram adicionados apenas 2
  await expect(contadorCarrinho).toHaveText('3');
});




