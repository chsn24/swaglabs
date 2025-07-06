// APLICAÇÃO: SauceDemo SwagLabs  
//ALUNO : Wenderson Artur da Silva
//REQUISITO US-003-4 : Ao remover um produto do carrinho,o contador deve ser atualizado.


import { test, expect } from '@playwright/test';

//================================================Caminho Feliz===========================================================

test('Ao adicionar dois produtos e remover um dos mesmos, deve apresentar (1) no contador', async ({ page}) => {
    // Acessa a página da loja
    await page.goto('https://www.saucedemo.com');

     // Preenche os campos de login usando page.fill
    test.step('login', async () => {
      await page.fill('[data-test="username"]', 'standard_user');
      await page.fill('[data-test="password"]', 'secret_sauce');
      await page.click('[data-test="login-button"]');
       })
  
    // Adiciona dois produtos e logo após remove um dos 
    test.step('Add produtos', async () => {
    const botaoAdicionar = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await botaoAdicionar.first().click();
    const botaoAdicionar2 = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await botaoAdicionar2.first().click();
    })
    // Remove um produto do carrinho
    const botaoRemover = page.locator('[data-test="remove-sauce-labs-bike-light"]')
    await botaoRemover.first().click();

  
    // Localiza o contador do carrinho
    const contadorCarrinho = page.locator('.shopping_cart_badge');
  
    //espera que o contador tenha o valor 1 ,após ter removido um produto.
    await expect(contadorCarrinho).toHaveText('1');
  });
  
  
//================================================Caminho Simulando Erro===========================================================

test('Contador não é atualizado corretamente após remoção', async ({ page}) => {
  // Acessa a página da loja
  await page.goto('https://www.saucedemo.com');
 
  // Preenche os campos de login usando page.fill
  test.step('login', async () => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
     })

  // Adiciona dois produtos  e logo após remove um dos mesmos
  test.step('Add produtos', async () => {
  const botaoAdicionar = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
  await botaoAdicionar.first().click();
  const botaoAdicionar2 = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  await botaoAdicionar2.first().click();
  })
  // Remove um produto do carrinho
  const botaoRemover = page.locator('[data-test="remove-sauce-labs-bike-light"]')
  await botaoRemover.first().click();


  // Localiza o contador do carrinho
  const contadorCarrinho = page.locator('.shopping_cart_badge');

  // Simula erro: espera "2" no contador  mesmo após remoção (deveria ser "1")
  await expect(contadorCarrinho).toHaveText('2');  // Vai falhar
});

