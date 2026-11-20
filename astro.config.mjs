import { defineConfig } from 'astro/config';

// Publicado en https://whoami.dgonmej.com (servidor propio, en la raiz del dominio)
export default defineConfig({
  site: 'https://whoami.dgonmej.com',
  // Sin la barra de herramientas de desarrollo de Astro en local
  devToolbar: { enabled: false },
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      // Español en / e inglés en /en/
      prefixDefaultLocale: false,
    },
  },
});
