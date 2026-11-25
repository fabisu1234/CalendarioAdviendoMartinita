/* TODO ES CONTENIDO DE EJEMPLO. Reemplaza estos 31 objetos con tus recuerdos.
 * Tipos: mensaje, foto, cupon, combinado. Mantén dia: 1 a 31, sin repetir.
 * {nombre} y {firma} se reemplazan con los valores de config.js.
 * Cambia ejemplo a false cuando hayas personalizado ese día.
 * Las rutas son relativas: img/mi-foto.jpg (sin / al principio).
 * El texto se trata como texto, no como HTML; puedes usar \n para párrafos.
 */
const CONTENIDO = [
  {
    dia: 1,
    tipo: "mensaje",
    ejemplo: true,
    titulo: "Diciembre empieza contigo",
    mensaje: "{nombre}, hoy empieza un mes de pequeñas sorpresas. Las preparé pensando en tu sonrisa, esa que hace que cualquier día se sienta como casa."
  },

  {
    dia: 2,
    tipo: "foto",
    ejemplo: true,
    titulo: "Mi lugar favorito",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo: dos tazas junto a una ventana de invierno.",
    pie: "Aquí irá nuestra foto de ese lugar al que siempre queremos volver."
  },

  {
    dia: 3,
    tipo: "cupon",
    ejemplo: true,
    titulo: "Una tarde de cine",
    detalle: "Tú eliges la película. Yo me encargo de las cabritas, la mantita y los abrazos.",
    condiciones: "Válido para una tarde juntos. Sin fecha de vencimiento."
  },

  {
    dia: 4,
    tipo: "combinado",
    ejemplo: true,
    titulo: "Ese primer paseo",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para reemplazar por la foto de nuestro paseo.",
    pie: "Un recuerdo que todavía me hace sonreír.",
    mensaje: "Si pudiera volver a ese día, lo elegiría igual. Sobre todo porque estabas tú."
  },

  {
    dia: 5,
    tipo: "mensaje",
    ejemplo: true,
    titulo: "Una cosa que me encanta",
    mensaje: "Me encanta la forma en que te emocionas con las cosas pequeñas. Gracias por enseñarme a mirarlas un poquito mejor."
  },

  {
    dia: 6,
    tipo: "cupon",
    ejemplo: true,
    titulo: "Desayuno con cariño",
    detalle: "Un desayuno preparado por mí, con tus cosas favoritas y cero apuro.",
    condiciones: "Canjeable un fin de semana que elijamos juntos."
  },

  {
    dia: 7,
    tipo: "foto",
    ejemplo: true,
    titulo: "Nuestra risa favorita",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Imagen de ejemplo para una foto de los dos riéndonos.",
    pie: "Reemplaza esta ilustración por esa foto que siempre nos hace reír."
  },

  {
    dia: 8,
    tipo: "mensaje",
    ejemplo: true,
    titulo: "Por si hoy lo necesitas",
    mensaje: "{nombre}, estoy orgulloso de ti. De lo que haces y también de cómo sigues adelante cuando cuesta. Hoy te mando un abrazo de esos que duran un ratito más."
  },

  {
    dia: 9,
    tipo: "combinado",
    ejemplo: true,
    titulo: "Un día cualquiera",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo de un momento tranquilo para compartir.",
    pie: "La magia de lo cotidiano.",
    mensaje: "No necesitamos un plan enorme para pasarla bonito. A veces basta caminar contigo y conversar de cualquier cosa."
  },

  {
    dia: 10,
    tipo: "cupon",
    ejemplo: true,
    titulo: "La cita la eliges tú",
    detalle: "Elige el lugar, el antojo y el panorama. Yo reservo el día para nosotros.",
    condiciones: "Un panorama acordado entre los dos, con mucho cariño."
  },

  {
    dia: 11,
    tipo: "mensaje",
    ejemplo: true,
    titulo: "Gracias por estar",
    mensaje: "Gracias por escucharme, por acompañarme y por hacerme un espacio en tus días. Tenerte cerca es uno de mis regalos favoritos."
  },

  {
    dia: 12,
    tipo: "foto",
    ejemplo: true,
    titulo: "Un pequeño viaje",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para reemplazar por una fotografía de nuestro viaje.",
    pie: "Aquí irá esa foto del viaje que queremos repetir."
  },

  {
    dia: 13,
    tipo: "cupon",
    ejemplo: true,
    titulo: "Masajito y descanso",
    detalle: "Un masaje suave, tu música favorita y un ratito para bajar las revoluciones.",
    condiciones: "Cuando tú tengas ganas. La comodidad va primero."
  },

  {
    dia: 14,
    tipo: "combinado",
    ejemplo: true,
    titulo: "Nuestra canción",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Imagen de ejemplo para un recuerdo relacionado con nuestra canción.",
    pie: "Pon aquí el nombre de esa canción tan nuestra.",
    mensaje: "Hay canciones que son una forma de volver a ti, incluso cuando estamos lejos."
  },

  {
    dia: 15,
    tipo: "mensaje",
    ejemplo: true,
    titulo: "La mitad del camino",
    mensaje: "Ya vamos a la mitad de este diciembre, {nombre}. Y todavía me quedan muchas formas de decirte lo feliz que me hace compartir la vida contigo."
  },

  {
    dia: 16,
    tipo: "foto",
    ejemplo: true,
    titulo: "Ese abrazo",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Imagen de ejemplo para una fotografía de un abrazo.",
    pie: "Reemplaza por una foto de ese abrazo que se sintió como hogar."
  },

  {
    dia: 17,
    tipo: "cupon",
    ejemplo: true,
    titulo: "Algo rico, juntos",
    detalle: "Cocinemos una receta nueva. Incluye prueba de sabor y permiso para dejar la cocina un poquito desordenada.",
    condiciones: "La receta se decide entre los dos."
  },

  {
    dia: 18,
    tipo: "mensaje",
    ejemplo: true,
    titulo: "Una promesa chiquitita",
    mensaje: "Prometo seguir buscando momentos para nosotros. Una caminata, una once rica, una conversación sin mirar el reloj."
  },

  {
    dia: 19,
    tipo: "combinado",
    ejemplo: true,
    titulo: "Nuestra aventura pendiente",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para el lugar de nuestra próxima aventura.",
    pie: "Aquí puede ir una foto de ese destino que soñamos.",
    mensaje: "Todavía hay muchos lugares que quiero conocer. Y en mis planes favoritos siempre apareces tú."
  },

  {
    dia: 20,
    tipo: "foto",
    ejemplo: true,
    titulo: "Así de simple",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para una foto espontánea de los dos.",
    pie: "Un momento sin pose, de esos que vale la pena guardar."
  },

  {
    dia: 21,
    tipo: "cupon",
    ejemplo: true,
    titulo: "Atardecer para dos",
    detalle: "Un paseo para ver caer el sol, algo rico para compartir y tiempo para conversar.",
    condiciones: "Elegimos un día bonito y un lugar que nos guste."
  },

  {
    dia: 22,
    tipo: "mensaje",
    ejemplo: true,
    titulo: "Mi parte favorita",
    mensaje: "Mi parte favorita de muchos días es contarte lo que me pasó y escuchar lo tuyo. Me gusta ser parte de tu mundo, {nombre}."
  },

  {
    dia: 23,
    tipo: "combinado",
    ejemplo: true,
    titulo: "Casi es Navidad",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para un recuerdo navideño juntos.",
    pie: "Nuestra pequeña tradición navideña.",
    mensaje: "Las luces están lindas, pero ninguna le gana a la emoción de compartir esta Navidad contigo."
  },

  {
    dia: 24,
    tipo: "combinado",
    ejemplo: true,
    titulo: "Mi deseo de Nochebuena",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para nuestra foto especial de Nochebuena.",
    pie: "Una noche para estar cerquita.",
    mensaje: "Esta noche mi deseo es sencillo: que te sientas querida, acompañada y feliz. Gracias por ser parte de mi Navidad, {nombre}."
  },

  {
    dia: 25,
    tipo: "cupon",
    ejemplo: true,
    titulo: "Un regalo para los dos",
    detalle: "Un día entero dedicado a nosotros: desayuno, paseo y una sorpresa que prepararé especialmente para ti.",
    condiciones: "Feliz Navidad, {nombre}. Pongámosle fecha juntos."
  },

  {
    dia: 26,
    tipo: "foto",
    ejemplo: true,
    titulo: "Lo que queda de la fiesta",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para una foto de nuestra celebración.",
    pie: "Aquí irá una foto de esta Navidad. Un recuerdo recién estrenado."
  },

  {
    dia: 27,
    tipo: "mensaje",
    ejemplo: true,
    titulo: "Sin ninguna ocasión",
    mensaje: "Hoy no hace falta una fecha especial. Solo quería recordarte que te quiero y que me encanta tenerte en mi vida."
  },

  {
    dia: 28,
    tipo: "cupon",
    ejemplo: true,
    titulo: "Una once sin apuro",
    detalle: "Tu pancito favorito, algo calentito y una tarde para ponernos al día con calma.",
    condiciones: "Incluye repetición de abrazos, si tú quieres."
  },

  {
    dia: 29,
    tipo: "foto",
    ejemplo: true,
    titulo: "El recuerdo que eliges tú",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para el recuerdo favorito del año.",
    pie: "Reemplaza esta imagen por tu foto favorita de nosotros este año."
  },

  {
    dia: 30,
    tipo: "combinado",
    ejemplo: true,
    titulo: "Todo lo que viene",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para una foto que represente nuestros próximos sueños.",
    pie: "Nuestros planes siguen creciendo.",
    mensaje: "No sé qué traerá el próximo año, pero me emociona pensar en las cosas que todavía podemos vivir juntos."
  },

  {
    dia: 31,
    tipo: "mensaje",
    ejemplo: true,
    titulo: "Contigo, un año más",
    mensaje: "{nombre}, gracias por cada recuerdo de este año. Por las risas, los abrazos y los días sencillos que hiciste especiales.\nSe terminan las puertitas, pero las ganas de sorprenderte siguen. Que el próximo año nos encuentre construyendo más momentos bonitos.\nTe quiero, hoy y en todo lo que viene."
  },
];
