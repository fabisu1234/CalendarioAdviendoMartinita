// Ejecutar con: node --test pruebas/calendario.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const raiz = path.resolve(__dirname, '..');
const config = fs.readFileSync(path.join(raiz, 'config.js'), 'utf8');
const codigo = fs.readFileSync(path.join(raiz, 'script.js'), 'utf8').split('// Inicio de la interfaz.')[0];
function cargar(prueba = false, search = '') {
  return vm.runInNewContext(config.replace('const MODO_PRUEBA = false;', `const MODO_PRUEBA = ${prueba};`) + codigo + '\n({Calendario, CONFIG, MODO_PRUEBA});', { Date, URLSearchParams, location: { search } });
}
const { Calendario: c } = cargar();
const fecha = (y, m, d) => new Date(y, m - 1, d, 12);
test('antes de diciembre no hay ninguna puerta disponible', () => {
  for (let d = 1; d <= 31; d++) assert.equal(c.estado(d, fecha(2026, 11, 30)).disponible, false);
});
test('cada día de diciembre solo desbloquea hasta su propia fecha', () => {
  for (let hoy = 1; hoy <= 31; hoy++) {
    for (let d = 1; d <= 31; d++) {
      const estado = c.estado(d, fecha(2026, 12, hoy));
      assert.equal(estado.disponible, d <= hoy);
      assert.equal(estado.hoy, d === hoy);
      assert.equal(estado.faltan, Math.max(0, d - hoy));
    }
  }
});
test('después de diciembre todas se pueden revivir, incluso en otro año', () => {
  for (const f of [fecha(2027, 1, 1), fecha(2027, 11, 16), fecha(2030, 12, 1)]) {
    for (let d = 1; d <= 31; d++) {
      assert.equal(c.estado(d, f).disponible, true);
      assert.equal(c.estado(d, f).hoy, false);
    }
  }
});
test('mañana y cuenta de días civiles no dependen de horas ni DST', () => {
  assert.equal(c.estado(1, fecha(2026, 11, 30)).faltan, 1);
  assert.equal(c.estado(1, fecha(2026, 11, 16)).faltan, 15);
  assert.equal(c.diaCivil(fecha(2026, 9, 7)) - c.diaCivil(fecha(2026, 9, 5)), 2);
  assert.equal(c.estado(2, new Date(2026, 11, 1, 23, 59, 59)).faltan, 1);
  assert.equal(c.estado(2, new Date(2026, 11, 2, 0, 0, 0)).disponible, true);
});
test('el modo de prueba ignora parámetros cuando está apagado', () => {
  const normal = cargar(false, '?fecha=2099-12-31');
  assert.equal(normal.MODO_PRUEBA, false);
  assert.equal(normal.Calendario.fechaActual().getFullYear(), new Date().getFullYear());
  const simulado = cargar(true, '?fecha=2026-12-15');
  assert.equal(simulado.Calendario.fechaActual().getMonth(), 11);
  assert.equal(simulado.Calendario.fechaActual().getDate(), 15);
  assert.equal(simulado.Calendario.estado(16, simulado.Calendario.fechaActual()).disponible, false);
});
test('fechas inválidas no se normalizan silenciosamente', () => {
  for (const f of ['2026-02-29', '2026-12-32', '2026-13-01', '2026-00-01', '2026-1-1', 'hola', null]) assert.equal(c.leerFechaSimulada(f), null);
  assert.ok(c.leerFechaSimulada('2028-02-29'));
});
test('el progreso descarta datos corruptos, duplicados o fuera de rango', () => {
  for (const valor of [null, 'oops', '{}', 'null', '"texto"']) assert.equal(c.leerAbiertos(valor).size, 0);
  assert.deepEqual([...c.leerAbiertos('[1,1,2,31,32,0,-1,1.2,"3",null]')], [1, 2, 31]);
});
test('hay 31 ejemplos, todos los tipos y recursos locales existentes', () => {
  const contenido = vm.runInNewContext(fs.readFileSync(path.join(raiz, 'contenido.js'), 'utf8') + '\nCONTENIDO;');
  assert.equal(contenido.length, 31);
  assert.equal(new Set(contenido.map(x => x.dia)).size, 31);
  assert.deepEqual([...new Set(contenido.map(x => x.tipo))].sort(), ['combinado', 'cupon', 'foto', 'mensaje']);
  for (let d = 1; d <= 31; d++) {
    const item = contenido.find(x => x.dia === d);
    assert.ok(item && item.ejemplo && item.titulo);
    if (item.imagen) assert.ok(fs.existsSync(path.join(raiz, item.imagen)));
    if (item.imagen) assert.ok(item.alt);
  }
});
test('los marcadores se reemplazan literalmente, incluso con signos especiales', () => {
  assert.equal(c.personalizar('Hola, {nombre}. Con amor, {firma}.'), 'Hola, Martinita. Con amor, Fabi.');
  assert.equal(c.personalizar(undefined), '');
});
