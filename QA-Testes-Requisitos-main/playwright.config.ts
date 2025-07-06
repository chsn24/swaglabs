import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Executa os testes em paralelo
  fullyParallel: true,

  // Impede testes com .only em ambientes CI
  forbidOnly: !!process.env.CI,

  // Reexecuta testes falhos em ambiente CI
  retries: process.env.CI ? 2 : 0,

  // Usa apenas 1 worker no CI
  workers: process.env.CI ? 1 : undefined,

  // Gera relatório HTML
  reporter: 'html',

  use: {
    // Executa o navegador com interface (ajuda a evitar vídeos e screenshots em branco)
    headless: false,

    // Grava vídeo de todos os testes
    video: 'on',

    // Captura screenshots apenas quando o teste falha
    screenshot: 'only-on-failure',

    // Coleta trace apenas na primeira reexecução de falhas
    trace: 'on-first-retry',
  },

  // Projetos configurados para os três principais navegadores
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Se você tiver um servidor local (como React/Vite/etc), habilite isso:
  /*
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  },
  */
});