/*
 * Cada página carga sin errores en la consola y sin desbordar a lo ancho, en móvil, tableta y escritorio,
 * en claro y en oscuro; y los archivos que genera la web responden (DG-46).
 */
import { expect, test, type Page } from '@playwright/test';

const PAGINAS = ["/", "/en/"];
const ANCHOS = [320, 375, 768, 1280];
const TEMAS = ['light', 'dark'] as const;

/** Lo que sobresale a lo ancho (0 si nada) y el elemento responsable, para el mensaje de error */
async function desborde(page: Page) {
  return page.evaluate(() => {
    const ancho = document.documentElement.clientWidth;
    const exceso = document.documentElement.scrollWidth - ancho;
    if (exceso <= 0) return { exceso: 0, culpable: '' };
    const culpable = [...document.querySelectorAll('body *')].find((el) => el.getBoundingClientRect().right > ancho + 1);
    const describir = (el: Element) => `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ''}${el.classList.length ? `.${[...el.classList].join('.')}` : ''}`;
    return { exceso, culpable: culpable ? describir(culpable) : '' };
  });
}

for (const tema of TEMAS)
  for (const ancho of ANCHOS)
    test(`las páginas a ${ancho} px en ${tema === 'light' ? 'claro' : 'oscuro'}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: tema });
      await page.setViewportSize({ width: ancho, height: 800 });
      const errores: string[] = [];
      page.on('console', (m) => m.type() === 'error' && errores.push(`${page.url()}: ${m.text()}`));
      page.on('pageerror', (e) => errores.push(`${page.url()}: ${e.message}`));
      for (const ruta of PAGINAS) {
        const res = await page.goto(ruta);
        expect(res?.status(), ruta).toBe(200);
        await expect(page.locator('main')).toBeVisible();
        const { exceso, culpable } = await desborde(page);
        expect(exceso, `${ruta} desborda ${exceso} px por ${culpable}`).toBe(0);
      }
      expect(errores).toEqual([]);
    });

test('la comprobación de desbordes detecta uno puesto a propósito', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto(PAGINAS[0]);
  await page.evaluate(() => {
    const ancho = document.createElement('div');
    ancho.id = 'demasiado-ancho';
    ancho.style.width = '600px';
    ancho.style.height = '1px';
    document.querySelector('main')!.append(ancho);
  });
  const { exceso, culpable } = await desborde(page);
  expect(exceso).toBeGreaterThan(0);
  expect(culpable).toContain('demasiado-ancho');
});
