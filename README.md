# whoami

Mi web personal: quién soy, con qué tecnologías trabajo, mis aficiones y mi trayectoria.

Publicada en **https://dgonmej.github.io/whoami/** (español) y **/whoami/en/** (inglés).

## Tecnología

- [Astro](https://astro.build): sitio estático, imágenes optimizadas (WebP) y rutas por idioma.
- [dgonmej-ui](https://github.com/dgonmej/dgonmej-ui): mi librería de componentes web
  (barra de navegación, botones, tarjetas, timeline, selector de tema...).
- Español e inglés, con selector de idioma.
- Tema claro y oscuro (según el sistema o elegido), recordado entre visitas.

## Desarrollo

Necesita el repositorio `dgonmej-ui` en la carpeta de al lado (`../dgonmej-ui`), compilado:

```bash
cd ../dgonmej-ui && npm install && npm run build
cd ../whoami && npm install
npm run dev        # http://localhost:4321/whoami/
npm run build      # genera dist/
npm run preview
```

## Estructura

```
src/
  i18n/content.ts     todos los textos en español e inglés (misma estructura en los dos)
  components/         secciones de la pagina (Hero, About, Hobbies, Journey, Contact...)
  layouts/Layout.astro
  pages/index.astro   español (/whoami/)
  pages/en/           inglés (/whoami/en/)
  assets/             fotos e ilustraciones (Astro las optimiza al compilar)
  styles/global.css   acento verde azulado sobre los tokens de dgonmej-ui
public/               favicons y logos de tecnologias
```

Para cambiar un texto, editarlo en `src/i18n/content.ts` en los dos idiomas.

## Despliegue

`.github/workflows/deploy.yml` compila dgonmej-ui y el sitio y lo publica en GitHub Pages
en cada push a `master`. En GitHub, *Settings > Pages > Source* debe estar en
**GitHub Actions**. Si `dgonmej-ui` es privado, el workflow necesita un token con acceso a
ese repositorio en el paso que lo descarga.

## Créditos

Iconos de [Lucide](https://lucide.dev) (ISC) y logos de [Simple Icons](https://simpleicons.org) (CC0).
