/*
 * Contenido de dgonmej-api, leído al compilar (GET /api/publico/whoami): perfil, redes, trayectoria y
 * aficiones, en español e inglés. src/i18n/content.ts lo mezcla con sus textos; lo de ese archivo es
 * el respaldo si la API no responde.
 * - CONTENIDO_API: dónde está la API (por defecto https://dgonmej.com); «off» para usar solo los datos locales.
 * - CONTENIDO_OBLIGATORIO=1 (en GitHub Actions): si la API no responde, la compilación falla en vez de
 *   publicar los datos locales, que pueden estar desfasados.
 */
export const API = (process.env.CONTENIDO_API ?? 'https://dgonmej.com').replace(/\/$/, '');

// Los tipos de lo que devuelve la API salen de su contrato (src/contrato, copia de dgonmej-api)
import type { ContenidoWhoami, ImagenPublica } from '../contrato/tipos.ts';

export type ImagenApi = ImagenPublica;
export type ContenidoApi = ContenidoWhoami;

export async function leerContenido(): Promise<ContenidoApi | null> {
  if (API === 'off') return null;
  try {
    const res = await fetch(`${API}/api/publico/whoami`, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) throw new Error(`la API respondió ${res.status}`);
    return (await res.json()) as ContenidoApi;
  } catch (err) {
    if (process.env.CONTENIDO_OBLIGATORIO === '1') throw new Error(`No se ha podido leer el contenido de ${API}: ${(err as Error).message}`);
    console.warn(`[contenido] ${API} no responde (${(err as Error).message}): uso los datos locales de src/i18n/content.ts`);
    return null;
  }
}
