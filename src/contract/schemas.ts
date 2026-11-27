// Copia de dgonmej-api/api/src/contract: no se edita aquí, se actualiza con «npm run contrato» en dgonmej-api.
/*
 * Cómo se valida lo que llega del panel para cada contenido de las webs (zod). Lo usa la API
 * (resources.ts) y de aquí salen los tipos de lo que reciben las webs (types.ts). Parte del contrato (ver README.md).
 */
import { z } from 'zod';
import { catalogoRedes, iconosEnlace, tiposRed, tiposTrayectoria, webs } from './catalogs.ts';

const texto = (max: number) => z.string().trim().min(1, 'Este campo es obligatorio').max(max, `Máximo ${max} caracteres`);
const slug = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Solo minúsculas, números y guiones')
  .max(80);
const opcional = (max: number) => z.string().trim().max(max, `Máximo ${max} caracteres`).default('');
const textoLargo = (max: number) => z.string().trim().max(max, `Máximo ${max} caracteres`).default('');
const url = z.url('Dirección web no válida').max(255);
const urlOpcional = z.union([z.literal(''), url]).default('');
const lista = (max: number, largo = 60) => z.array(z.string().trim().min(1).max(largo, `Máximo ${largo} caracteres`)).max(max, `Máximo ${max}`).default([]);
/** Imagen ya subida (POST /api/admin/imagenes) y su texto alternativo */
const imagen = z.object({ id: z.string().length(24), alt: z.string().trim().max(300, 'Máximo 300 caracteres') }).nullable().default(null);
const publicable = { orden: z.number().int().default(0), publicado: z.boolean().default(true) };

/** Un esquema por contenido, con el nombre que lleva en la URL (/api/admin/{nombre}) */
export const esquemas = {
  perfil: z.object({
    id: slug.optional(),
    nombre: texto(60),
    usuario: opcional(40),
    email: z.union([z.literal(''), z.email('Correo no válido').max(191)]).default(''),
    titular: opcional(80),
    titularEn: opcional(80),
    ubicacion: opcional(60),
    ubicacionEn: opcional(60),
    bio: opcional(240),
    bioEn: opcional(240),
    resumen: opcional(400),
    sobreMi: textoLargo(2000),
    sobreMiEn: textoLargo(2000),
    sobreMiEtiquetas: lista(6, 30),
    sobreMiEtiquetasEn: lista(6, 30),
    contacto: opcional(240),
    contactoEn: opcional(240),
  }),
  redes: z
    .object({
      id: slug.optional(),
      red: z.enum(tiposRed, 'Elige una red de la lista'),
      usuario: opcional(120),
      url: urlOpcional,
      etiqueta: opcional(40),
      webs: z.array(z.enum(webs)).min(1, 'Elige al menos una web').default([...webs]),
      ...publicable,
    })
    .superRefine((d, ctx) => {
      if (!d.url && !catalogoRedes[d.red].url) ctx.addIssue({ code: 'custom', path: ['url'], message: `${catalogoRedes[d.red].nombre} necesita la dirección completa` });
      else if (!d.url && !d.usuario) ctx.addIssue({ code: 'custom', path: ['usuario'], message: 'Escribe el usuario o la dirección completa' });
    }),
  proyectos: z.object({
    id: slug.optional(),
    nombre: texto(80),
    tipo: opcional(40),
    descripcion: opcional(400),
    url,
    repo: urlOpcional,
    npm: urlOpcional,
    capturaClara: imagen,
    capturaOscura: imagen,
    tecnologias: lista(10, 30),
    ...publicable,
  }),
  enlaces: z.object({
    id: slug.optional(),
    titulo: texto(60),
    descripcion: opcional(120),
    url,
    icono: z.enum(iconosEnlace).default('link'),
    ...publicable,
  }),
  trayectoria: z.object({
    tipo: z.enum(tiposTrayectoria, 'Elige el tipo'),
    periodo: texto(40),
    actual: z.boolean().default(false),
    titulo: texto(120),
    tituloEn: opcional(120),
    descripcion: textoLargo(1200),
    descripcionEn: textoLargo(1200),
    puntos: lista(10),
    puntosEn: lista(10),
    enlaces: z.array(url).max(6, 'Máximo 6').default([]),
    ...publicable,
  }),
  aficiones: z.object({
    lugar: texto(60),
    imagen,
    altEn: opcional(300),
    texto: texto(400),
    textoEn: opcional(400),
    etiquetas: lista(6, 30),
    etiquetasEn: lista(6, 30),
    ...publicable,
  }),
};
