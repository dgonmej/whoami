# whoami

Mi web personal: quién soy, con qué tecnologías trabajo, mis aficiones y mi trayectoria.

Publicada en **https://whoami.dgonmej.com** (español) y **/en/** (inglés).

## Tecnología

- [Astro](https://astro.build): sitio estático, imágenes optimizadas (WebP) y rutas por idioma.
- [dgonmej-ui](https://github.com/dgonmej/dgonmej-ui): mi librería de componentes web
  (barra de navegación, botones, tarjetas, timeline, selector de tema...).
- Español e inglés, con selector de idioma.
- Tema claro y oscuro (según el sistema o elegido), recordado entre visitas.

## Desarrollo

`dgonmej-ui` se instala desde [npm](https://www.npmjs.com/package/dgonmej-ui) con el resto de dependencias:

```bash
npm install
npm run dev        # http://localhost:4321/
npm run build      # genera dist/
npm run preview
```

## Estructura

```
src/
  i18n/content.ts     todos los textos en español e inglés (misma estructura en los dos)
  components/         secciones de la pagina (Hero, About, Hobbies, Journey, Contact...)
  layouts/Layout.astro
  pages/index.astro   español (/)
  pages/en/           inglés (/en/)
  assets/             fotos e ilustraciones (Astro las optimiza al compilar)
  styles/global.css   acento verde azulado sobre los tokens de dgonmej-ui
public/               favicons y logos de tecnologias
```

Para cambiar un texto, editarlo en `src/i18n/content.ts` en los dos idiomas.

## Despliegue

Se publica en el servidor propio (alias SSH `sandbox`), servido por nginx desde
`/srv/apps/whoami`, detrás de Cloudflare:

```bash
npm run build
rsync -a --delete dist/ sandbox:/srv/apps/whoami/
```

## Créditos

Iconos de [Lucide](https://lucide.dev) (ISC) y logos de [Simple Icons](https://simpleicons.org) (CC0).
