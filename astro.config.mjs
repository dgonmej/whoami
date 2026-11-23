import { defineConfig } from 'astro/config';

// Las fotos de las aficiones vienen de dgonmej-api (src/lib/api.ts): Astro las descarga y optimiza al compilar
const api = new URL(process.env.CONTENIDO_API && process.env.CONTENIDO_API !== 'off' ? process.env.CONTENIDO_API : 'https://dgonmej.com');

// Publicado en https://whoami.dgonmej.com (servidor propio, en la raiz del dominio)
export default defineConfig({
  site: 'https://whoami.dgonmej.com',
  image: { remotePatterns: [{ protocol: api.protocol.replace(':', ''), hostname: api.hostname, ...(api.port ? { port: api.port } : {}), pathname: '/media/**' }] },
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
