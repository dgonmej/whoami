import { defineConfig } from 'astro/config';

// Publicado en GitHub Pages: https://dgonmej.github.io/whoami/
export default defineConfig({
  site: 'https://dgonmej.github.io',
  // Sin la barra de herramientas de desarrollo de Astro en local
  devToolbar: { enabled: false },
  vite: {
    server: {
      // Solo en desarrollo: permitir abrir el servidor local a traves de un tunel de Cloudflare
      allowedHosts: ['.trycloudflare.com'],
    },
  },
  base: '/whoami',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      // Español en /whoami/ e inglés en /whoami/en/
      prefixDefaultLocale: false,
    },
  },
});
