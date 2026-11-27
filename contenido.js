/* TODO ES CONTENIDO DE EJEMPLO. Reemplaza estos 31 objetos con tus recuerdos.
 * Tipos: mensaje, foto, cupon, combinado, enlace. Mantén dia: 1 a 31, sin repetir.
 * {nombre} y {firma} se reemplazan con los valores de config.js.
 * Cambia ejemplo a false cuando hayas personalizado ese día.
 * Las rutas son relativas: img/mi-foto.jpg (sin / al principio).
 * El texto se trata como texto, no como HTML; puedes usar \n para párrafos.
 * En cualquier tipo puedes añadir un botón con estos campos opcionales:
 * enlace: "https://open.spotify.com/...",
 * textoEnlace: "Escucha esta canción ♡"
 * Agrega una coma al campo anterior. Sin enlace, no se muestra ningún botón.
 */
const CONTENIDO = [
  {
    dia: 1,
    tipo: "mensaje",
    ejemplo: false,
    titulo: "Diciembre solo empieza",
    mensaje: "El primer evento de este calendario es agradecerte mi vida por estar en otro diciembre junto a mi, te amo demasiado, muchas gracias de verdad mi vida.\nAún nos faltan muchos diciembres para disfrutar juntos pero esto recién empieza."
  },

  {
    dia: 2,
    tipo: "foto",
    ejemplo: false,
    titulo: "Una de mis fotos favoritas",
    imagen: "img/FotoFav.jpeg",
    alt: "El dia anterior a halloween.",
    pie: "Una de mis fotos favoritas de nosotros. Te amo.🤎"
  },

  {
    dia: 3,
    tipo: "cupon",
    ejemplo: false,
    titulo: "Una tarde de cine",
    detalle: "Tú eliges la película. Yo me encargo de las entradas.",
    condiciones: "Válido para una entrada de cine. Sin fecha de vencimiento."
  },

  {
    dia: 4,
    tipo: "combinado",
    ejemplo: false,
    titulo: "Nuestra ultima aventura vivida",
    imagen: "img/Nosotros2.jpeg",
    alt: "Foto día concierto",
    pie: "Un recuerdo que siempre tendré",
    mensaje: "Si pudiera volver a ese día, lo elegiría igual. Sobre todo porque estabas tú."
  },

  {
  dia: 5,
  tipo: "mensaje",
  ejemplo: false,
  titulo: "Una canción para ti",
  mensaje: "Esta canción me recuerda a ti siempre que la escuchomi vida hermosa. 🤎",
  enlace: "https://www.youtube.com/watch?v=_3GKsIFtEoE",
  textoEnlace: "Escucha esta canción ♡"
  },

  {
  dia: 6,
  tipo: "enlace",
  ejemplo: false,
  titulo: "Por si estás aburrida",
  mensaje: "No es necesario que la veas, pero si estás aburrida si",
  enlace: "https://www.youtube.com/watch?v=G6ID6U4Xd7k",
  textoEnlace: "Ver pelicula 👀"
  },

  {
    dia: 7,
    tipo: "foto",
    ejemplo: false,
    titulo: "Nuestras ultimas vacaciones juntos",
    imagen: "img/Nosotros.jpeg",
    alt: "Imágen de nuestras vacaciones",
    pie: "Nuestras vacaiones en pichidangui. Que son un recuerdo muy bonito. Te amo🤎"
  },

  {
    dia: 8,
    tipo: "mensaje",
    ejemplo: false,
    titulo: "Por si hoy lo necesitas",
    mensaje: "{nombre}, estoy orgulloso de ti. De lo que haces y también de cómo sigues adelante cuando cuesta. Hoy solo es un recordatorio de que te amo y que estoy muy orgulloso de ti.🤎"
  },

  {
    dia: 9,
    tipo: "mensaje",
    ejemplo: false,
    titulo: "Hoy el mensaje es mio casi para mi",
    mensaje: "Hoy es mi último día de clases en la u de este semestre, me gustó tener este proceso junto a ti, auque aveces yo me comportara de manera irritable, Lo siento. Te amo mi vida hermosa.🤎(probalemente esté nervioso y estresado por la nota, peldon)"
  },

  {
    dia: 10,
    tipo: "cupon",
    ejemplo: false,
    titulo: "Un pastelito riquito",
    detalle: "Tú eliges el postre. Tu y yo de comerlo jeje.",
    condiciones: "Válido para un postre en nuestra tienda favorita de pastelitos. Sin fecha de vencimiento."
  },

  {
    dia: 11,
    tipo: "mensaje",
    ejemplo: false,
    titulo: "Gracias por estar",
    mensaje: "Gracias por escucharme, por acompañarme y por hacerme un espacio en tus días. Tenerte cerca es uno de mis regalos favoritos."
  },

  {
    dia: 12,
    tipo: "mensaje",
    ejemplo: false,
    titulo: "Una canción para ti",
    mensaje: "Esta cancion me recuerda a cuando estabamos recien empezando y me estabas encantando. 🤎",
    enlace: "https://open.spotify.com/intl-es/track/0pfpeTGQOWlGp6YUUbBD42?si=d7a2eaeca09a4537",
    textoEnlace: "Escucha esta canción ♡"
  },

  {
    dia: 13,
    tipo: "cupon",
    ejemplo: false,
    titulo: "Masajito y descanso",
    detalle: "Un masaje suave, la música que te gusta y un ratito para bajar el estrés.",
    condiciones: "Cuando tú tengas ganas. La comodidad va primero."
  },

  {
    dia: 14,
    tipo: "combinado",
    ejemplo: false,
    titulo: "Nuestra canción",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Imagen de ejemplo para un recuerdo relacionado con nuestra canción.",
    pie: "Pon aquí el nombre de esa canción tan nuestra.",
    mensaje: "Hay canciones que son una forma de volver a ti, incluso cuando estamos lejos."
  },

  {
    dia: 15,
    tipo: "mensaje",
    ejemplo: false,
    titulo: "La mitad del camino",
    mensaje: "Ya vamos a la mitad de este diciembre, {nombre}. Y todavía me quedan muchas formas de decirte lo feliz que me hace compartir la vida contigo."
  },

  {
    dia: 16,
    tipo: "foto",
    ejemplo: false,
    titulo: "Ese abrazo",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Imagen de ejemplo para una fotografía de un abrazo.",
    pie: "Reemplaza por una foto de ese abrazo que se sintió como hogar."
  },

  {
    dia: 17,
    tipo: "cupon",
    ejemplo: false,
    titulo: "Algo rico, juntos",
    detalle: "Cocinemos una receta nueva. Incluye prueba de sabor y permiso para dejar la cocina un poquito desordenada.",
    condiciones: "La receta se decide entre los dos."
  },

  {
    dia: 18,
    tipo: "mensaje",
    ejemplo: false,
    titulo: "Una promesa chiquitita",
    mensaje: "Prometo seguir buscando momentos para nosotros. Una caminata, una once rica, una conversación sin mirar el reloj."
  },

  {
    dia: 19,
    tipo: "combinado",
    ejemplo: false,
    titulo: "Nuestra aventura pendiente",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para el lugar de nuestra próxima aventura.",
    pie: "Aquí puede ir una foto de ese destino que soñamos.",
    mensaje: "Todavía hay muchos lugares que quiero conocer. Y en mis planes favoritos siempre apareces tú."
  },

  {
    dia: 20,
    tipo: "foto",
    ejemplo: false,
    titulo: "Así de simple",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para una foto espontánea de los dos.",
    pie: "Un momento sin pose, de esos que vale la pena guardar."
  },

  {
    dia: 21,
    tipo: "cupon",
    ejemplo: false,
    titulo: "Atardecer para dos",
    detalle: "Un paseo para ver caer el sol, algo rico para compartir y tiempo para conversar.",
    condiciones: "Elegimos un día bonito y un lugar que nos guste."
  },

  {
    dia: 22,
    tipo: "mensaje",
    ejemplo: false,
    titulo: "Mi parte favorita",
    mensaje: "Mi parte favorita de muchos días es contarte lo que me pasó y escuchar lo tuyo. Me gusta ser parte de tu mundo, {nombre}."
  },

  {
    dia: 23,
    tipo: "combinado",
    ejemplo: false,
    titulo: "Casi es Navidad",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para un recuerdo navideño juntos.",
    pie: "Nuestra pequeña tradición navideña.",
    mensaje: "Las luces están lindas, pero ninguna le gana a la emoción de compartir esta Navidad contigo."
  },

  {
    dia: 24,
    tipo: "combinado",
    ejemplo: false,
    titulo: "Mi deseo de Nochebuena",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para nuestra foto especial de Nochebuena.",
    pie: "Una noche para estar cerquita.",
    mensaje: "Esta noche mi deseo es sencillo: que te sientas querida, acompañada y feliz. Gracias por ser parte de mi Navidad, {nombre}."
  },

  {
    dia: 25,
    tipo: "cupon",
    ejemplo: false,
    titulo: "Un regalo para los dos",
    detalle: "Un día entero dedicado a nosotros: desayuno, paseo y una sorpresa que prepararé especialmente para ti.",
    condiciones: "Feliz Navidad, {nombre}. Pongámosle fecha juntos."
  },

  {
    dia: 26,
    tipo: "foto",
    ejemplo: false,
    titulo: "Lo que queda de la fiesta",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para una foto de nuestra celebración.",
    pie: "Aquí irá una foto de esta Navidad. Un recuerdo recién estrenado."
  },

  {
    dia: 27,
    tipo: "mensaje",
    ejemplo: false,
    titulo: "Sin ninguna ocasión",
    mensaje: "Hoy no hace falta una fecha especial. Solo quería recordarte que te quiero y que me encanta tenerte en mi vida."
  },

  {
    dia: 28,
    tipo: "cupon",
    ejemplo: false,
    titulo: "Una once sin apuro",
    detalle: "Tu pancito favorito, algo calentito y una tarde para ponernos al día con calma.",
    condiciones: "Incluye repetición de abrazos, si tú quieres."
  },

  {
    dia: 29,
    tipo: "foto",
    ejemplo: false,
    titulo: "El recuerdo que eliges tú",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para el recuerdo favorito del año.",
    pie: "Reemplaza esta imagen por tu foto favorita de nosotros este año."
  },

  {
    dia: 30,
    tipo: "combinado",
    ejemplo: false,
    titulo: "Todo lo que viene",
    imagen: "img/recuerdo-ejemplo.svg",
    alt: "Ilustración de ejemplo para una foto que represente nuestros próximos sueños.",
    pie: "Nuestros planes siguen creciendo.",
    mensaje: "No sé qué traerá el próximo año, pero me emociona pensar en las cosas que todavía podemos vivir juntos."
  },

  {
    dia: 31,
    tipo: "mensaje",
    ejemplo: false,
    titulo: "Contigo, un año más",
    mensaje: "{nombre}, gracias por cada recuerdo de este año. Por las risas, los abrazos y los días sencillos que hiciste especiales.\nSe terminan las puertitas, pero las ganas de sorprenderte siguen. Que el próximo año nos encuentre construyendo más momentos bonitos.\nTe quiero, hoy y en todo lo que viene."
  },
];
