"use strict";

/* Reglas de fecha sin horas: Date.UTC permite contar días civiles incluso
 * cuando cambia el horario de verano. La fecha del dispositivo sigue siendo local. */
const Calendario = (() => {
  function leerFechaSimulada(valor) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(valor || "")) return null;
    const [anio, mes, dia] = valor.split("-").map(Number);
    if (anio < 1900 || anio > 9999) return null;
    const fecha = new Date(anio, mes - 1, dia, 12);
    return fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia ? fecha : null;
  }
  function fechaActual() {
    const simulada = MODO_PRUEBA ? leerFechaSimulada(new URLSearchParams(location.search).get("fecha")) : null;
    return simulada || new Date();
  }
  function diaCivil(fecha) {
    return Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()) / 86400000;
  }
  function estado(dia, fecha, anio = CONFIG.anio) {
    const objetivo = new Date(anio, 11, dia, 12);
    const faltan = Math.max(0, diaCivil(objetivo) - diaCivil(fecha));
    return { disponible: faltan === 0, faltan, hoy: diaCivil(objetivo) === diaCivil(fecha) };
  }
  function personalizar(texto = "") {
    return String(texto).replace(/\{nombre\}/g, () => CONFIG.nombre).replace(/\{firma\}/g, () => CONFIG.firma);
  }
  function leerAbiertos(valor) {
    try {
      const datos = JSON.parse(valor);
      return new Set(Array.isArray(datos) ? datos.filter(d => Number.isInteger(d) && d >= 1 && d <= 31) : []);
    } catch { return new Set(); }
  }
  return Object.freeze({ leerFechaSimulada, fechaActual, diaCivil, estado, personalizar, leerAbiertos });
})();

// Inicio de la interfaz. Los contenidos permanecen en JS hasta abrir una puerta.
(() => {
  const $ = selector => document.querySelector(selector);
  const grid = $("#puertas");
  const modal = $("#modal");
  const cuerpo = $("#modal-cuerpo");
  const reducirMovimiento = matchMedia("(prefers-reduced-motion: reduce)");
  const clave = `adviento:${CONFIG.anio}:${CONFIG.nombre}`;
  const almacenamiento = {
    leer(sufijo) { try { return localStorage.getItem(`${clave}:${sufijo}`); } catch { return null; } },
    guardar(sufijo, valor) { try { localStorage.setItem(`${clave}:${sufijo}`, valor); } catch { /* Sigue funcionando sin persistencia. */ } }
  };
  let abiertos = Calendario.leerAbiertos(almacenamiento.leer("abiertos"));
  let abriendo = false;
  let ultimoFoco = null;
  let pararConfeti = () => {};
  let ultimoDia = "";
  const botones = new Map();
  const iconos = ["tree", "gift", "ginger", "star", "candy", "bell", "bauble"];
  const especiales = { 24: "Nochebuena", 25: "Feliz Navidad", 31: "Por todo lo que viene" };

  function crear(tag, clase, texto) {
    const nodo = document.createElement(tag);
    if (clase) nodo.className = clase;
    if (texto !== undefined) nodo.textContent = texto;
    return nodo;
  }
  function icono(nombre, clase = "") {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("aria-hidden", "true");
    if (clase) svg.setAttribute("class", clase);
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", `#i-${nombre}`);
    svg.append(use);
    return svg;
  }
  function mostrarModal({ titulo, descripcion, etiqueta, simbolo = "heart", accion }) {
    ultimoFoco = document.activeElement;
    pararConfeti();
    cuerpo.replaceChildren();
    cuerpo.append(icono(simbolo, "modal-symbol"));
    if (etiqueta) cuerpo.append(crear("p", "modal-eyebrow", etiqueta));
    const h = crear("h2", "", titulo);
    h.id = "modal-titulo";
    const p = crear("p", "modal-message", descripcion);
    p.id = "modal-descripcion";
    cuerpo.append(h, p);
    if (accion) {
      const boton = crear("button", "primary-button", accion);
      boton.type = "button";
      boton.addEventListener("click", () => modal.close());
      cuerpo.append(boton);
    }
    if (!modal.open) modal.showModal();
    document.body.classList.add("modal-open");
    $("#cerrar-modal").focus();
  }
  $("#cerrar-modal").addEventListener("click", () => modal.close());
  modal.addEventListener("click", evento => {
    if (evento.target !== modal) return;
    const r = modal.getBoundingClientRect();
    if (evento.clientX < r.left || evento.clientX > r.right || evento.clientY < r.top || evento.clientY > r.bottom) modal.close();
  });
  modal.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
    pararConfeti();
    cuerpo.replaceChildren(); // Tampoco queda la sorpresa anterior oculta en el DOM.
    if (ultimoFoco?.isConnected) ultimoFoco.focus({ preventScroll: true });
  });

  function actualizar() {
    const fecha = Calendario.fechaActual();
    ultimoDia = String(Calendario.diaCivil(fecha));
    let total = 0;
    for (let dia = 1; dia <= 31; dia++) {
      const boton = botones.get(dia);
      const estado = Calendario.estado(dia, fecha);
      const abierto = estado.disponible && abiertos.has(dia);
      if (abierto) total++;
      boton.classList.toggle("available", estado.disponible && !abierto);
      boton.classList.toggle("opened", abierto);
      boton.classList.toggle("today", estado.hoy);
      boton.toggleAttribute("aria-current", estado.hoy);
      if (estado.hoy) boton.setAttribute("aria-current", "date");
      const etiqueta = abierto ? "Abierta" : estado.disponible ? "Para ti" : "Un secreto";
      const status = boton.querySelector(".door-state");
      status.replaceChildren(icono(abierto ? "check" : estado.disponible ? "heart" : "lock"), document.createTextNode(etiqueta));
      boton.setAttribute("aria-label", `${dia} de diciembre${especiales[dia] ? `, ${especiales[dia]}` : ""}. ${estado.hoy ? "Hoy. " : ""}${abierto ? "Ya abierta, volver a ver sorpresa" : estado.disponible ? "Disponible, abrir sorpresa" : "Bloqueada, consultar cuándo se abre"}`);
    }
    $("#fecha-actual").textContent = new Intl.DateTimeFormat("es-CL", { day: "numeric", month: "long", year: "numeric" }).format(fecha);
    const inicio = Calendario.estado(1, fecha);
    $("#estado-fecha").textContent = !inicio.disponible
      ? inicio.faltan === 1 ? "Los regalitos empiezan mañana" : `Los regalitos empiezan en ${inicio.faltan} dias`
      : fecha.getFullYear() === CONFIG.anio && fecha.getMonth() === 11
        ? "Abre las puertas que ya te están esperando. Las demás guardan su secreto."
        : "Diciembre vive aquí. Puedes volver a todas tus sorpresas cuando quieras.";
    $("#progreso").textContent = `${total} de 31 sorpresas abiertas`;
    $("#barra-progreso").style.width = `${total / 31 * 100}%`;
    $(".progress-track").setAttribute("aria-valuenow", total);
  }

  function agregarFoto(contenido) {
    const figure = crear("figure");
    const imagen = crear("img");
    imagen.alt = contenido.alt || "Un recuerdo de nosotros";
    imagen.decoding = "async";
    imagen.addEventListener("error", () => {
      const fallback = crear("div", "image-fallback");
      fallback.append(icono("heart"), crear("p", "", "Este recuerdo está por llegar. Falta agregar la foto a nuestro rinconcito."));
      imagen.replaceWith(fallback);
    }, { once: true });
    imagen.src = contenido.imagen || "img/recuerdo-ejemplo.svg";
    figure.append(imagen);
    if (contenido.pie) figure.append(crear("figcaption", "", Calendario.personalizar(contenido.pie)));
    cuerpo.append(figure);
  }

  function mostrarSorpresa(dia) {
    const contenido = CONTENIDO.find(item => item.dia === dia);
    if (!contenido) {
      mostrarModal({ titulo: "Un poquito de paciencia", descripcion: "Estoy preparando algo bonito para este día. Vuelve a intentarlo pronto.", accion: "Volver al calendario" });
      return;
    }
    const tipos = { mensaje: "Una cartita para ti", foto: "Un recuerdo nuestro", cupon: "Un plan para los dos", combinado: "Un pedacito de nosotros" };
    mostrarModal({ titulo: Calendario.personalizar(contenido.titulo), descripcion: tipos[contenido.tipo] || "Una sorpresa para ti", etiqueta: `${dia} de diciembre · ${especiales[dia] || "Con mucho cariño"}`, simbolo: especiales[dia] ? "star" : "heart" });
    if (contenido.ejemplo) cuerpo.append(crear("span", "example-label", "Contenido de ejemplo · para personalizar"));
    if (contenido.tipo === "foto" || contenido.tipo === "combinado") agregarFoto(contenido);
    if (contenido.tipo === "cupon") {
      const ticket = crear("div", "ticket");
      ticket.append(crear("p", "ticket-label", "CUPÓN DE AMOR"), icono("gift", "modal-symbol"), crear("p", "", Calendario.personalizar(contenido.detalle)), crear("p", "ticket-condition", Calendario.personalizar(contenido.condiciones)), crear("div", "ticket-code", `♥ ${String(dia).padStart(2, "0")} / ${CONFIG.anio} ♥`));
      cuerpo.append(ticket);
    }
    if (contenido.mensaje) cuerpo.append(crear("p", "modal-message", Calendario.personalizar(contenido.mensaje)));
    cuerpo.append(crear("p", "modal-signature", `Con amor, ${CONFIG.firma}`));
    const volver = crear("button", "primary-button", "Guardar este momento ♡");
    volver.type = "button";
    volver.addEventListener("click", () => modal.close());
    cuerpo.append(volver);
    abiertos.add(dia);
    almacenamiento.guardar("abiertos", JSON.stringify([...abiertos]));
    actualizar();
    if (especiales[dia]) pararConfeti = celebrar();
  }

  function tocarPuerta(dia, boton) {
    if (abriendo) return;
    const estado = Calendario.estado(dia, Calendario.fechaActual());
    if (!estado.disponible) {
      boton.classList.remove("shake");
      void boton.offsetWidth;
      boton.classList.add("shake");
      mostrarModal({ titulo: "Todavía no corazón", etiqueta: "Las cosas bonitas también se esperan", simbolo: "lock", descripcion: `Esta puertita se desbloquea el ${dia} de diciembre${Calendario.fechaActual().getFullYear() !== CONFIG.anio ? ` de ${CONFIG.anio}` : ""}.\n${estado.faltan === 1 ? "Se abre mañana. ¡Ya casi!" : `Faltan ${estado.faltan} días. Mientras tanto, te guardo un abrazo. 🎄`}`, accion: "La espero con cariño" });
      return;
    }
    abriendo = true;
    boton.classList.add("is-opening");
    setTimeout(() => {
      // Verificar de nuevo: el reloj del dispositivo pudo cambiar durante la animación.
      if (Calendario.estado(dia, Calendario.fechaActual()).disponible) mostrarSorpresa(dia);
      boton.classList.remove("is-opening");
      abriendo = false;
    }, reducirMovimiento.matches ? 0 : 550);
  }

  for (let dia = 1; dia <= 31; dia++) {
    const boton = crear("button", `door${especiales[dia] ? " special" : ""}${dia === 31 ? " finale" : ""}`);
    boton.type = "button";
    boton.dataset.dia = dia;
    boton.setAttribute("aria-haspopup", "dialog");
    const face = crear("span", "door-face");
    if (especiales[dia]) face.append(crear("span", "special-label", especiales[dia]));
    face.append(icono(dia === 31 ? "star" : dia === 24 ? "tree" : dia === 25 ? "gift" : iconos[(dia - 1) % iconos.length], "door-art"), crear("span", "door-number", String(dia).padStart(2, "0")), crear("span", "door-state"));
    boton.append(face);
    boton.addEventListener("click", () => tocarPuerta(dia, boton));
    botones.set(dia, boton);
    grid.append(boton);
  }

  document.title = CONFIG.titulo.replace(/\{nombre\}/g, () => CONFIG.nombre);
  $("#nombre-titulo").textContent = CONFIG.nombre;
  $("#nombre-titulo").classList.toggle("long-name", CONFIG.nombre.length > 18);
  $("#dedicatoria").textContent = CONFIG.dedicatoria;
  $("#firma-pie").textContent = `Con amor, ${CONFIG.firma}`;
  $("#anio-pie").textContent = CONFIG.anio;
  if (MODO_PRUEBA) {
    $("#aviso-prueba").hidden = false;
    $("#aviso-prueba").textContent = "Modo de prueba activado. Usa ?fecha=AAAA-MM-DD. Recuerda desactivarlo antes de compartir el regalo.";
  }
  actualizar();
  function comprobarDia() {
    if (String(Calendario.diaCivil(Calendario.fechaActual())) !== ultimoDia) actualizar();
  }
  setInterval(() => { if (!document.hidden) comprobarDia(); }, 15000);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) comprobarDia(); });
  window.addEventListener("focus", comprobarDia);
  window.addEventListener("storage", evento => {
    if (evento.key === `${clave}:abiertos` || evento.key === null) {
      abiertos = Calendario.leerAbiertos(almacenamiento.leer("abiertos"));
      actualizar();
    }
  });
  if (!almacenamiento.leer("bienvenida")) {
    mostrarModal({ titulo: `Feliz Navidad, ${CONFIG.nombre}`, etiqueta: "Este rinconcito es tuyo", descripcion: Calendario.personalizar(CONFIG.bienvenida), simbolo: "gift", accion: "Descubrir mi calendario" });
    almacenamiento.guardar("bienvenida", "1");
  }

  /* Nieve a 30 fps como máximo. Pocos objetos, DPR limitado y pausa en segundo plano. */
  const canvas = $("#nieve");
  const ctx = canvas.getContext("2d");
  let nieveFrame = 0;
  let anterior = 0;
  let width = 0;
  let height = 0;
  let particulas = [];
  const adornos = ["🎄", "⭐", "🍬", "🎁", "🔔", "🟡"];
  // Jengibre y bastón se dibujan en canvas para no depender del soporte de emojis.
  function ajustarNieve() {
    width = innerWidth; height = innerHeight;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    particulas = Array.from({ length: width < 600 ? 32 : 60 }, (_, i) => ({ x: Math.random() * width, y: Math.random() * height, size: 1 + Math.random() * 2, v: 7 + Math.random() * 15, fase: Math.random() * 6.28, alpha: .15 + Math.random() * .42, adorno: i < (width < 600 ? 8 : 10) ? i : -1 }));
  }
  function jengibre(x, y, size) {
    ctx.save(); ctx.translate(x, y); ctx.scale(size / 20, size / 20);
    ctx.strokeStyle = "#bc9162"; ctx.lineWidth = 5; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(0, -2); ctx.lineTo(0, 6); ctx.moveTo(-7, 0); ctx.lineTo(7, 0); ctx.moveTo(0, 5); ctx.lineTo(-5, 12); ctx.moveTo(0, 5); ctx.lineTo(5, 12); ctx.stroke();
    ctx.fillStyle = "#bc9162"; ctx.beginPath(); ctx.arc(0, -7, 4, 0, 6.3); ctx.fill(); ctx.fillStyle = "#fff0cf"; ctx.fillRect(-2, -8, 1, 1); ctx.fillRect(1, -8, 1, 1); ctx.fillRect(0, 1, 1, 1); ctx.restore();
  }
  function baston(x, y) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(.35); ctx.lineWidth = 3; ctx.lineCap = "round"; ctx.strokeStyle = "#f5e6cb";
    ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(0, -5); ctx.arc(4, -5, 4, Math.PI, 2 * Math.PI); ctx.stroke();
    ctx.strokeStyle = "#bf5d52"; for (let y2 = -2; y2 < 10; y2 += 5) { ctx.beginPath(); ctx.moveTo(-1, y2); ctx.lineTo(1, y2 - 1); ctx.stroke(); } ctx.restore();
  }
  function nevada(tiempo) {
    nieveFrame = requestAnimationFrame(nevada);
    if (tiempo - anterior < 33) return;
    const dt = Math.min((tiempo - anterior) / 1000 || .033, .08);
    anterior = tiempo;
    ctx.clearRect(0, 0, width, height);
    for (const p of particulas) {
      p.y += p.v * dt; p.x += Math.sin(tiempo / 2300 + p.fase) * dt * 5;
      if (p.y > height + 20) { p.y = -20; p.x = Math.random() * width; }
      ctx.globalAlpha = p.alpha;
      if (p.adorno === 0) jengibre(p.x, p.y, 14);
      else if (p.adorno === 1) baston(p.x, p.y);
      else if (p.adorno > 1) { ctx.font = "13px serif"; ctx.fillText(adornos[(p.adorno - 2) % adornos.length], p.x, p.y); }
      else { ctx.fillStyle = "#f3efdc"; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.globalAlpha = 1;
  }
  function iniciarNieve() {
    cancelAnimationFrame(nieveFrame);
    document.documentElement.classList.toggle("tab-hidden", document.hidden);
    if (!ctx) return;
    if (document.hidden || reducirMovimiento.matches) { ctx.clearRect(0, 0, width, height); return; }
    anterior = performance.now();
    nieveFrame = requestAnimationFrame(nevada);
  }
  ajustarNieve(); iniciarNieve();
  window.addEventListener("resize", ajustarNieve, { passive: true });
  document.addEventListener("visibilitychange", iniciarNieve);
  reducirMovimiento.addEventListener("change", iniciarNieve);

  function celebrar() {
    if (reducirMovimiento.matches || document.hidden) return () => {};
    const lienzo = crear("canvas");
    lienzo.id = "confeti"; lienzo.setAttribute("aria-hidden", "true");
    modal.append(lienzo); // Dentro del diálogo para que se vea en la capa superior.
    const context = lienzo.getContext("2d");
    if (!context) { lienzo.remove(); return () => {}; }
    lienzo.width = innerWidth; lienzo.height = innerHeight;
    const colores = ["#d9b675", "#f4e8c9", "#b96851", "#799d78"];
    const piezas = Array.from({ length: innerWidth < 600 ? 55 : 95 }, () => ({ x: Math.random() * lienzo.width, y: -Math.random() * lienzo.height, v: 50 + Math.random() * 80, r: Math.random() * 6.28, c: colores[Math.floor(Math.random() * 4)] }));
    let frame = 0, inicio = performance.now(), previo = inicio;
    function parar() {
      cancelAnimationFrame(frame); lienzo.remove();
      document.removeEventListener("visibilitychange", pararSiOculto);
      reducirMovimiento.removeEventListener("change", pararSiReducido);
    }
    function pararSiOculto() { if (document.hidden) parar(); }
    function pararSiReducido() { if (reducirMovimiento.matches) parar(); }
    function pintar(t) {
      if (t - inicio > 4300 || !modal.open) { parar(); return; }
      const dt = Math.min((t - previo) / 1000, .07); previo = t;
      context.clearRect(0, 0, lienzo.width, lienzo.height);
      context.globalAlpha = Math.min(1, (4300 - t + inicio) / 1200);
      piezas.forEach(p => {
        p.y += p.v * dt; p.x += Math.sin(t / 500 + p.r) * 20 * dt; p.r += dt;
        context.save(); context.translate(p.x, p.y); context.rotate(p.r); context.fillStyle = p.c; context.fillRect(-3, -5, 6, 10); context.restore();
      });
      frame = requestAnimationFrame(pintar);
    }
    document.addEventListener("visibilitychange", pararSiOculto);
    reducirMovimiento.addEventListener("change", pararSiReducido);
    frame = requestAnimationFrame(pintar);
    return parar;
  }
})();
