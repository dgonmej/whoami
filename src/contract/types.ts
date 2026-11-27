// Copia de dgonmej-api/api/src/contract: no se edita aquí, se actualiza con «npm run contrato» en dgonmej-api.
/*
 * Tipos de lo que devuelven las rutas públicas (/api/publico/portfolio, /whoami y /links), sacados de los
 * esquemas (schemas.ts). La API los cumple (routes/public.ts) y las webs los usan con su copia del
 * contrato: si cambia un campo, la API o la web dejan de compilar donde se usa. Parte del contrato (ver README.md).
 */
import type { z } from 'zod';
import type { esquemas } from './schemas.ts';
import type { TipoRed } from './catalogs.ts';

type Contenido = keyof typeof esquemas;
type Guardado<C extends Contenido> = z.output<(typeof esquemas)[C]>;
/** Lo que no sale en las webs: el orden ya viene aplicado y solo llega lo publicado */
type Interno = 'id' | 'orden' | 'publicado';

/** Imagen subida, con la dirección completa de cada ancho (/media/{id}-{ancho}.webp) y la del mayor */
export type ImagenPublica = {
  id: string;
  alt: string;
  ancho: number;
  alto: number;
  anchos: number[];
  url: string;
  srcset: { ancho: number; url: string }[];
};

/** Quién soy: lo comparten las tres webs (los campos «En», en inglés, los usa whoami) */
export type Perfil = Omit<Guardado<'perfil'>, 'id'> & { id: string };

/** Una red social, con su nombre visible y su dirección ya formada */
export type RedPublica = { id: string; red: TipoRed; nombre: string; usuario: string; url: string };

/** Proyecto de dgonmej.com, con las capturas en claro y oscuro */
export type Proyecto = Omit<Guardado<'proyectos'>, Interno | 'capturaClara' | 'capturaOscura'> & {
  id: string;
  capturaClara: ImagenPublica | null;
  capturaOscura: ImagenPublica | null;
};

/** Enlace destacado de links */
export type Enlace = Omit<Guardado<'enlaces'>, Interno> & { id: string };

/** Etapa de la trayectoria de whoami */
export type Etapa = Omit<Guardado<'trayectoria'>, Interno> & { id: number };

/** Afición de whoami, con su foto */
export type Aficion = Omit<Guardado<'aficiones'>, Interno | 'imagen'> & { id: number; imagen: ImagenPublica | null };

/** GET /api/publico/portfolio */
export type ContenidoPortfolio = { perfil: Perfil | null; redes: RedPublica[]; proyectos: Proyecto[] };
/** GET /api/publico/whoami */
export type ContenidoWhoami = { perfil: Perfil | null; redes: RedPublica[]; trayectoria: Etapa[]; aficiones: Aficion[] };
/** GET /api/publico/links */
export type ContenidoLinks = { perfil: Perfil | null; redes: RedPublica[]; enlaces: Enlace[] };
