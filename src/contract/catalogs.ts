// Copia de dgonmej-api/api/src/contract: no se edita aquí, se actualiza con «npm run contrato» en dgonmej-api.
/*
 * Listas cerradas y catálogo de redes que comparten la API, el panel y las webs (portfolio, whoami, links).
 * Sin dependencias, para poder usarse en cualquier sitio. Parte del contrato (ver README.md).
 */

/** Webs que leen los contenidos al compilar; cada una es un repo con su workflow de despliegue */
export const webs = ['portfolio', 'whoami', 'links'] as const;
export type Web = (typeof webs)[number];

/** Redes que se saben pintar (las mismas que el catálogo de links: src/lib/social.ts) */
export const tiposRed = [
  'github', 'linkedin', 'x', 'instagram', 'youtube', 'tiktok', 'twitch', 'bluesky', 'mastodon', 'threads', 'facebook',
  'discord', 'telegram', 'whatsapp', 'spotify', 'medium', 'devto', 'stackoverflow', 'dribbble', 'behance', 'email', 'web',
] as const;
export type TipoRed = (typeof tiposRed)[number];

/** Iconos de Lucide que entienden links (src/components/Icon.astro) y el panel (admin/src/link-icons.ts) */
export const iconosEnlace = ['link', 'globe', 'code', 'braces', 'mail', 'map-pin', 'radio', 'star', 'rocket', 'music', 'briefcase', 'user', 'heart'] as const;

export const tiposTrayectoria = ['formacion', 'trabajo', 'viaje'] as const;

/*
 * Cómo se forma la dirección y el nombre de cada red, a partir del usuario. links además pone el color y
 * el icono de cada una. Las que no tienen plantilla (null) necesitan la dirección completa.
 */
export const catalogoRedes: Record<TipoRed, { nombre: string; url: string | null }> = {
  github: { nombre: 'GitHub', url: 'https://github.com/{usuario}' },
  linkedin: { nombre: 'LinkedIn', url: 'https://www.linkedin.com/in/{usuario}' },
  x: { nombre: 'X', url: 'https://x.com/{usuario}' },
  instagram: { nombre: 'Instagram', url: 'https://www.instagram.com/{usuario}' },
  youtube: { nombre: 'YouTube', url: 'https://www.youtube.com/@{usuario}' },
  tiktok: { nombre: 'TikTok', url: 'https://www.tiktok.com/@{usuario}' },
  twitch: { nombre: 'Twitch', url: 'https://www.twitch.tv/{usuario}' },
  bluesky: { nombre: 'Bluesky', url: 'https://bsky.app/profile/{usuario}' },
  mastodon: { nombre: 'Mastodon', url: null },
  threads: { nombre: 'Threads', url: 'https://www.threads.net/@{usuario}' },
  facebook: { nombre: 'Facebook', url: 'https://www.facebook.com/{usuario}' },
  discord: { nombre: 'Discord', url: null },
  telegram: { nombre: 'Telegram', url: 'https://t.me/{usuario}' },
  whatsapp: { nombre: 'WhatsApp', url: 'https://wa.me/{usuario}' },
  spotify: { nombre: 'Spotify', url: null },
  medium: { nombre: 'Medium', url: 'https://medium.com/@{usuario}' },
  devto: { nombre: 'DEV', url: 'https://dev.to/{usuario}' },
  stackoverflow: { nombre: 'Stack Overflow', url: null },
  dribbble: { nombre: 'Dribbble', url: 'https://dribbble.com/{usuario}' },
  behance: { nombre: 'Behance', url: 'https://www.behance.net/{usuario}' },
  email: { nombre: 'Correo', url: 'mailto:{usuario}' },
  web: { nombre: 'Web', url: null },
};

/** Dirección de una red: la escrita o la de la plantilla con el usuario (sin la @ inicial) */
export function urlDeRed(red: TipoRed, usuario: string, url: string) {
  if (url) return url;
  const plantilla = catalogoRedes[red].url;
  if (!plantilla || !usuario) return '';
  return plantilla.replace('{usuario}', encodeURIComponent(usuario.replace(/^@/, '')).replace(/%40/g, '@'));
}
