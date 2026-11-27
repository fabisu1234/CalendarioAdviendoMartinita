// Regresión: cambiar la altura del navegador móvil no debe reubicar las figuras.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const script = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
const bloque = script.slice(script.indexOf('  /* Nieve a 30 fps'), script.indexOf('  function celebrar()'));

function preparar() {
  const rect = { width: 390, height: 844 };
  const movimiento = { matches: false, addEventListener() {} };
  const doc = { hidden: false, documentElement: { classList: { toggle() {} } }, addEventListener() {} };
  const ctx = new Proxy({}, { get: (_, key) => () => {} });
  let ajustes = 0;
  const canvas = {
    getBoundingClientRect: () => rect,
    getContext: () => ctx,
    set width(valor) { ajustes++; },
    set height(valor) { ajustes++; }
  };
  const animacion = vm.runInNewContext(bloque + '\n({ ajustarNieve, nevada, iniciarNieve, particulas: () => particulas, dimensiones: () => ({width, height}) });', {
    $: () => canvas,
    document: doc,
    reducirMovimiento: movimiento,
    devicePixelRatio: 2,
    window: { addEventListener() {} },
    performance: { now: () => 0 },
    requestAnimationFrame: () => 1,
    cancelAnimationFrame() {}
  });
  return { animacion, rect, movimiento, ajustes: () => ajustes };
}

test('ocultar y mostrar barras del celular conserva posiciones, velocidades y figuras', () => {
  const { animacion, rect } = preparar();
  const originales = [...animacion.particulas()];
  const posiciones = originales.map(p => ({ x: p.x, y: p.y, v: p.v }));
  for (let i = 0; i < 120; i++) {
    rect.height = 744 + i % 100;
    animacion.ajustarNieve();
  }
  animacion.particulas().forEach((p, i) => {
    assert.equal(p, originales[i]);
    assert.deepEqual({ x: p.x, y: p.y, v: p.v }, posiciones[i]);
  });
});

test('eventos resize con el mismo tamaño no reinician el lienzo', () => {
  const { animacion, ajustes } = preparar();
  const antes = ajustes();
  for (let i = 0; i < 100; i++) animacion.ajustarNieve();
  assert.equal(ajustes(), antes);
});

test('la caída conserva su velocidad durante cambios de altura', () => {
  const { animacion, rect } = preparar();
  const p = animacion.particulas()[0];
  p.y = 100;
  animacion.nevada(34);
  assert.ok(Math.abs(p.y - (100 + p.v * .034)) < 1e-9);
  for (let i = 0; i < 100; i++) {
    rect.height = 700 + i;
    animacion.ajustarNieve();
  }
  animacion.nevada(68);
  assert.ok(Math.abs(p.y - (100 + p.v * .068)) < 1e-9);
});

test('girar o ampliar la pantalla conserva las figuras existentes', () => {
  const { animacion, rect } = preparar();
  const p = animacion.particulas()[0];
  const x = p.x;
  const y = p.y;
  rect.width = 844;
  rect.height = 390;
  animacion.ajustarNieve();
  assert.equal(animacion.particulas()[0], p);
  assert.equal(p.y, y);
  assert.ok(Math.abs(p.x - x * 844 / 390) < 1e-9);
  assert.equal(animacion.particulas().length, 60);
});

test('activar animaciones después de movimiento reducido mide el tamaño visible', () => {
  const { animacion, rect, movimiento } = preparar();
  rect.width = 0;
  rect.height = 0;
  movimiento.matches = true;
  animacion.ajustarNieve();
  animacion.iniciarNieve();
  rect.width = 400;
  rect.height = 900;
  movimiento.matches = false;
  animacion.iniciarNieve();
  assert.deepEqual({ ...animacion.dimensiones() }, { width: 400, height: 900 });
});
