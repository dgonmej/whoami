/*
 * Prepara el avatar para que los ojos sigan al ratón (componente src/components/Mirada.astro):
 * - src/assets/avatar-{light,dark}-sin-pupilas.png: el avatar con el blanco de los ojos sin las pupilas
 *   (cada píxel de pupila toma el color del blanco de su misma fila, para conservar la sombra);
 * - public/ojos-mascara.png: la forma de cada ojo (blanco = dentro), para recortar las pupilas;
 * - src/lib/ojos.json: centro, tamaño y posición de reposo de la pupila de cada ojo (en píxeles del avatar).
 * Se vuelve a ejecutar solo si cambia el avatar: node scripts/ojos.mjs
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const ASSETS = new URL('../src/assets/', import.meta.url).pathname;
// Un punto dentro del blanco y otro dentro de la pupila de cada ojo (en el avatar de 480 × 600)
const OJOS = [
  { blanco: [220, 243], pupila: [196, 243] },
  { blanco: [312, 252], pupila: [283, 250] },
];
const OSCURO = 25; // por debajo, contorno negro
const PUPILA = 120; // por debajo (y dentro del ojo), pupila

const leer = async (f) => sharp(`${ASSETS}${f}`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const claro = await leer('avatar-light.png');
const { width: W, height: H } = claro.info;
const lum = (img, x, y) => {
  const i = (y * W + x) * 4;
  return (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3;
};

/** Relleno desde un punto por los píxeles que no son contorno */
function rellenar(img, [sx, sy], dentro) {
  const pila = [[sx, sy]];
  while (pila.length) {
    const [x, y] = pila.pop();
    if (x < 0 || y < 0 || x >= W || y >= H) continue;
    const k = y * W + x;
    if (dentro[k] || lum(img, x, y) < OSCURO) continue;
    dentro[k] = 1;
    pila.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }
}

// Forma de cada ojo (con el avatar claro): blanco + pupila, y cada fila rellena de extremo a extremo
// para incluir la raya oscura que separa la pupila del blanco
const mascara = new Uint8Array(W * H);
const datos = [];
for (const ojo of OJOS) {
  const dentro = new Uint8Array(W * H);
  rellenar(claro, ojo.blanco, dentro);
  rellenar(claro, ojo.pupila, dentro);
  let x0 = W, x1 = 0, y0 = H, y1 = 0, px = 0, py = 0, n = 0;
  for (let y = 0; y < H; y++) {
    let a = -1, b = -1;
    for (let x = 0; x < W; x++) if (dentro[y * W + x]) (a < 0 && (a = x), (b = x));
    if (a < 0) continue;
    for (let x = a; x <= b; x++) {
      mascara[y * W + x] = 1;
      if (lum(claro, x, y) < PUPILA) (px += x), (py += y), n++;
    }
    x0 = Math.min(x0, a), x1 = Math.max(x1, b), y0 = Math.min(y0, y), y1 = Math.max(y1, y);
  }
  datos.push({
    centro: [(x0 + x1) / 2, (y0 + y1) / 2],
    ancho: x1 - x0 + 1,
    alto: y1 - y0 + 1,
    reposo: [Math.round(px / n), Math.round(py / n)],
  });
}

/** Cerca del contorno (a 2 px del borde de la máscara): ahí se respeta el suavizado del dibujo */
const borde = (x, y) => {
  for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) if (!mascara[(y + dy) * W + x + dx]) return true;
  return false;
};

/**
 * El avatar con el hueco de las pupilas pintado del blanco del ojo. El blanco tiene dos tonos (lavanda
 * arriba y blanco abajo) separados en diagonal: se ajusta esa línea con el blanco que se ve y el hueco se
 * pinta de un tono u otro según el lado.
 */
async function sinPupilas(entrada, salida) {
  const img = entrada === 'avatar-light.png' ? claro : await leer(entrada);
  const out = Buffer.from(img.data);
  for (const ojo of datos) {
    const [cx, cy] = ojo.centro;
    const x0 = Math.floor(cx - ojo.ancho / 2), x1 = Math.ceil(cx + ojo.ancho / 2);
    const y0 = Math.floor(cy - ojo.alto / 2), y1 = Math.ceil(cy + ojo.alto / 2);
    // Frontera lavanda → blanco de cada columna visible, y su recta por mínimos cuadrados
    const puntos = [];
    const tonos = { lavanda: [0, 0, 0, 0], blanco: [0, 0, 0, 0] };
    for (let x = x0; x <= x1; x++) {
      let antes = null;
      for (let y = y0; y <= y1; y++) {
        if (!mascara[y * W + x] || borde(x, y)) continue;
        const l = lum(img, x, y);
        if (l < 185) continue;
        const tono = l < 225 ? 'lavanda' : 'blanco';
        const i = (y * W + x) * 4, t = tonos[tono];
        t[0] += img.data[i], t[1] += img.data[i + 1], t[2] += img.data[i + 2], t[3]++;
        if (antes === 'lavanda' && tono === 'blanco') puntos.push([x, y]);
        antes = tono;
      }
    }
    const n = puntos.length, sx = puntos.reduce((a, p) => a + p[0], 0), sy = puntos.reduce((a, p) => a + p[1], 0);
    const sxx = puntos.reduce((a, p) => a + p[0] * p[0], 0), sxy = puntos.reduce((a, p) => a + p[0] * p[1], 0);
    const m = (n * sxy - sx * sy) / (n * sxx - sx * sx || 1), b = (sy - m * sx) / n;
    const media = (t) => t.slice(0, 3).map((v) => Math.round(v / t[3]));
    const [lav, bla] = [media(tonos.lavanda), media(tonos.blanco)];
    for (let y = y0; y <= y1; y++)
      for (let x = x0; x <= x1; x++) {
        if (!mascara[y * W + x]) continue;
        const l = lum(img, x, y);
        // La pupila, y dentro del ojo también la raya que la separaba del blanco
        if (!(l < PUPILA || (l < 185 && !borde(x, y)))) continue;
        const c = y < m * x + b ? lav : bla;
        const i = (y * W + x) * 4;
        (out[i] = c[0]), (out[i + 1] = c[1]), (out[i + 2] = c[2]);
      }
  }
  await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png().toFile(`${ASSETS}${salida}`);
}

await sinPupilas('avatar-light.png', 'avatar-light-sin-pupilas.png');
await sinPupilas('avatar-dark.png', 'avatar-dark-sin-pupilas.png');
const m = Buffer.alloc(W * H * 4);
for (let k = 0; k < W * H; k++) (m[k * 4] = m[k * 4 + 1] = m[k * 4 + 2] = 255), (m[k * 4 + 3] = mascara[k] ? 255 : 0);
await sharp(m, { raw: { width: W, height: H, channels: 4 } }).png({ compressionLevel: 9 }).toFile(new URL('../public/ojos-mascara.png', import.meta.url).pathname);
writeFileSync(new URL('../src/lib/ojos.json', import.meta.url), JSON.stringify({ ancho: W, alto: H, ojos: datos }, null, 2) + '\n');
console.log(JSON.stringify(datos));
