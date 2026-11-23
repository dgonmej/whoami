/*
 * Prepara el avatar para que los ojos sigan al ratón y parpadeen (src/components/Hero.astro). Cada versión
 * (clara y oscura) tiene los ojos unos píxeles desplazados, así que se trata por separado:
 * - src/assets/avatar-{light,dark}-sin-pupilas.png: el avatar con el blanco de los ojos sin las pupilas;
 * - src/assets/ojos-mascara-{light,dark}.png: la forma de cada ojo (opaco = dentro, con el borde suave
 *   del propio dibujo), para recortar pupilas y párpados;
 * - src/lib/ojos.json: centro, tamaño y posición de reposo de la pupila de cada ojo, por versión (en
 *   píxeles del avatar de 480 × 600).
 * Se vuelve a ejecutar solo si cambia el avatar: node scripts/ojos.mjs
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const ASSETS = new URL('../src/assets/', import.meta.url).pathname;
// Un punto dentro del blanco y otro dentro de la pupila de cada ojo, en la versión clara
const SEMILLAS = [
  { blanco: [220, 243], pupila: [196, 243] },
  { blanco: [312, 252], pupila: [283, 250] },
];
const OSCURO = 25; // por debajo, contorno negro

const leer = async (f) => sharp(`${ASSETS}${f}`).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const claro = await leer('avatar-light.png');
const { width: W, height: H } = claro.info;

function procesar(img) {
  const lum = (x, y) => {
    const i = (y * W + x) * 4;
    return (img.data[i] + img.data[i + 1] + img.data[i + 2]) / 3;
  };
  /** Relleno desde un punto por los píxeles que no son contorno */
  function rellenar([sx, sy], dentro) {
    const pila = [[sx, sy]];
    while (pila.length) {
      const [x, y] = pila.pop();
      if (x < 0 || y < 0 || x >= W || y >= H) continue;
      const k = y * W + x;
      if (dentro[k] || lum(x, y) < OSCURO) continue;
      dentro[k] = 1;
      pila.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
  }
  /** Píxel de ojo: blanco o lavanda (claro y frío) o el gris de la pupila; no la piel ni el contorno */
  const esOjo = (x, y) => {
    const i = (y * W + x) * 4, l = lum(x, y), rb = img.data[i] - img.data[i + 2];
    return (l >= 170 && rb < 12) || (l >= 30 && l <= 60 && Math.abs(rb) < 6);
  };
  /** La semilla, o el píxel de ojo más cercano a ella (en la versión oscura los ojos están algo movidos) */
  const cerca = ([sx, sy], gris) => {
    for (let r = 0; r < 12; r++)
      for (let dy = -r; dy <= r; dy++)
        for (let dx = -r; dx <= r; dx++) {
          const x = sx + dx, y = sy + dy, l = lum(x, y);
          if (esOjo(x, y) && (gris ? l <= 60 : l >= 170)) return [x, y];
        }
    return [sx, sy];
  };

  const mascara = new Uint8Array(W * H);
  const datos = [];
  for (const semilla of SEMILLAS) {
    // El ojo: relleno desde el blanco y desde la pupila, y cada fila rellena de extremo a extremo para
    // incluir la raya oscura que separa la pupila del blanco
    const dentro = new Uint8Array(W * H);
    rellenar(cerca(semilla.blanco, false), dentro);
    rellenar(cerca(semilla.pupila, true), dentro);
    // La caja del relleno, con margen: dentro de ella cuenta todo píxel de ojo, también las islas de
    // blanco que quedan entre la pupila y el contorno (el relleno no llega a ellas)
    let cx0 = W, cx1 = 0, cy0 = H, cy1 = 0;
    for (let k = 0; k < W * H; k++)
      if (dentro[k]) (cx0 = Math.min(cx0, k % W)), (cx1 = Math.max(cx1, k % W)), (cy0 = Math.min(cy0, (k / W) | 0)), (cy1 = Math.max(cy1, (k / W) | 0));
    let x0 = W, x1 = 0, y0 = H, y1 = 0, px = 0, py = 0, n = 0;
    for (let y = cy0 - 2; y <= cy1 + 2; y++) {
      let a = -1, b = -1;
      for (let x = cx0 - 3; x <= cx1 + 3; x++) if (esOjo(x, y)) (a < 0 && (a = x), (b = x));
      if (a < 0) continue;
      for (let x = a; x <= b; x++) {
        mascara[y * W + x] = 1;
        const l = lum(x, y);
        if (l >= 30 && l <= 60) (px += x), (py += y), n++;
      }
      x0 = Math.min(x0, a), x1 = Math.max(x1, b), y0 = Math.min(y0, y), y1 = Math.max(y1, y);
    }
    datos.push({ centro: [(x0 + x1) / 2, (y0 + y1) / 2], ancho: x1 - x0 + 1, alto: y1 - y0 + 1, reposo: [Math.round(px / n), Math.round(py / n)] });
  }

  /** Cerca del contorno (a 2 px del borde de la máscara): ahí se respeta el suavizado del dibujo */
  const borde = (x, y) => {
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) if (!mascara[(y + dy) * W + x + dx]) return true;
    return false;
  };

  // Sin pupilas: el blanco tiene dos tonos (lavanda arriba, blanco abajo) separados en diagonal; se ajusta
  // esa línea con el blanco que se ve y el hueco de la pupila se pinta del tono de su lado
  const sin = Buffer.from(img.data);
  for (const ojo of datos) {
    const [cx, cy] = ojo.centro;
    const x0 = Math.floor(cx - ojo.ancho / 2) - 1, x1 = Math.ceil(cx + ojo.ancho / 2) + 1;
    const y0 = Math.floor(cy - ojo.alto / 2) - 1, y1 = Math.ceil(cy + ojo.alto / 2) + 1;
    const puntos = [];
    const tonos = { lavanda: [0, 0, 0, 0], blanco: [0, 0, 0, 0] };
    for (let x = x0; x <= x1; x++) {
      let antes = null;
      for (let y = y0; y <= y1; y++) {
        if (!mascara[y * W + x] || borde(x, y)) continue;
        const l = lum(x, y);
        if (l < 185) continue;
        const tono = l < 225 ? 'lavanda' : 'blanco';
        const i = (y * W + x) * 4, t = tonos[tono];
        (t[0] += img.data[i]), (t[1] += img.data[i + 1]), (t[2] += img.data[i + 2]), t[3]++;
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
        const l = lum(x, y);
        // La pupila y, lejos del contorno, la raya que la separaba del blanco
        if (!(l <= 60 || (l < 185 && !borde(x, y)))) continue;
        if (l < OSCURO && borde(x, y)) continue;
        const c = y < m * x + b ? lav : bla;
        const i = (y * W + x) * 4;
        (sin[i] = c[0]), (sin[i + 1] = c[1]), (sin[i + 2] = c[2]);
      }
  }

  // Máscara con borde suave: dentro, opaca; cerca del contorno, tan transparente como oscuro sea el dibujo.
  // Se amplía 2 px hacia el contorno para cubrir también los píxeles de transición del blanco a la línea
  // negra (claros): la línea, oscura, queda transparente y se sigue viendo
  const suave = (l) => Math.max(0, Math.min(1, (l - 40) / (190 - 40)));
  const ampliada = (x, y) => {
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) if (mascara[(y + dy) * W + x + dx]) return true;
    return false;
  };
  const mas = Buffer.alloc(W * H * 4);
  for (let y = 2; y < H - 2; y++)
    for (let x = 2; x < W - 2; x++) {
      const k = y * W + x;
      mas[k * 4] = mas[k * 4 + 1] = mas[k * 4 + 2] = 255;
      if (mascara[k] && !borde(x, y)) mas[k * 4 + 3] = 255;
      // Con el tono de la versión sin pupilas: lo que era pupila junto al contorno ya es blanco
      else if (ampliada(x, y)) mas[k * 4 + 3] = Math.round(suave((sin[k * 4] + sin[k * 4 + 1] + sin[k * 4 + 2]) / 3) * 255);
    }
  return { sin, mas, datos };
}

const salida = { ancho: W, alto: H };
for (const tema of ['light', 'dark']) {
  const img = tema === 'light' ? claro : await leer('avatar-dark.png');
  const { sin, mas, datos } = procesar(img);
  const raw = { raw: { width: W, height: H, channels: 4 } };
  await sharp(sin, raw).png().toFile(`${ASSETS}avatar-${tema}-sin-pupilas.png`);
  await sharp(mas, raw).png({ compressionLevel: 9 }).toFile(`${ASSETS}ojos-mascara-${tema}.png`);
  salida[tema] = datos;
}
writeFileSync(new URL('../src/lib/ojos.json', import.meta.url), JSON.stringify(salida, null, 2) + '\n');
console.log(JSON.stringify({ light: salida.light, dark: salida.dark }));
