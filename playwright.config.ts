/*
 * Tests de la web con Playwright (DG-46): npm run test:e2e
 * Compila con los datos locales (sin la API) y prueba la versión compilada con «astro preview».
 * Navegador: WebKit (el de Safari). La primera vez: npx playwright install webkit
 */
import { defineConfig, devices } from '@playwright/test';

const PUERTO = 4427;

export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL: `http://localhost:${PUERTO}`, trace: 'retain-on-failure' },
  projects: [{ name: 'webkit', use: { ...devices['Desktop Safari'] } }],
  webServer: {
    command: `npm run build && npx astro preview --ignore-lock --port ${PUERTO}`,
    env: { CONTENIDO_API: 'off' },
    url: `http://localhost:${PUERTO}/`,
    // Siempre la versión recién compilada
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
