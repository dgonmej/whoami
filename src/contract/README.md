# Contrato de la API

Lo que comparten dgonmej-api y las webs que leen sus contenidos (portfolio, whoami y links):

- `catalogs.ts`: listas cerradas (webs, redes, iconos de enlace, tipos de etapa) y el catálogo de redes. Sin dependencias.
- `schemas.ts`: validación de cada contenido de las webs (zod).
- `types.ts`: tipos de lo que devuelven `/api/publico/portfolio`, `/whoami` y `/links`, sacados de los esquemas. La API los cumple (`routes/public.ts`).

La **fuente** está en `dgonmej-api/api/src/contract/`. Cada web tiene una **copia** en `src/contract/`: no se edita a mano, se actualiza con

    cd dgonmej-api && npm run contrato

y después `npm run check` en cada web avisa de lo que haya que cambiar.
