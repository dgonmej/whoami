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

Perfil, redes, trayectoria y aficiones: El contenido sale de dgonmej-api (panel de dgonmej.com → Contenidos) y se lee al compilar (`src/lib/api.ts`); lo de `src/i18n/content.ts` es el respaldo si la API no responde. `CONTENIDO_API=off npm run build` compila solo con los datos locales y `CONTENIDO_API=http://localhost:3001` con la API en local. Los textos de la interfaz (menú, títulos, pie) y las tecnologías se cambian en `src/i18n/content.ts`, en los dos idiomas.

## Despliegue

Se publica en el servidor propio, servido por nginx desde `/srv/apps/whoami`, detrás de Cloudflare.

Se despliega sola con GitHub Actions (`.github/workflows/deploy.yml`): con cada push a `main`, cuando cambia su contenido en el panel de dgonmej.com (la API avisa al repo) o a mano desde la pestaña Actions. Sube `dist/` con `rsync` al usuario `autodeployer` del servidor, que solo puede escribir en `/srv/apps/whoami`.

A mano, si hace falta:

```bash
npm run build
rsync -rl --delete dist/ sandbox:/srv/apps/whoami/   # sin -a: no toca los permisos del grupo webs
```

## Créditos

Iconos de [Lucide](https://lucide.dev) (ISC) y logos de [Simple Icons](https://simpleicons.org) (CC0).

## Al clonar el repositorio

Activar el hook que comprueba, antes de cada push que cambie `package-lock.json`, que instala bien en Linux (necesita Docker):

```bash
git config core.hooksPath .githooks
```

También se puede lanzar a mano con `npm run comprobar-lock`.
