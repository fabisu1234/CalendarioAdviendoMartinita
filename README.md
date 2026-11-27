# Calendario de Adviento de Martinita

Calendario de adviento romántico, estático y sin compilación. Abre `index.html` en tu navegador o sirve esta carpeta con `python -m http.server 8000` y visita `http://localhost:8000`.

## 1. Pon sus nombres

Edita `config.js`:

```js
nombre: "Martinita",
firma: "Fabi",
anio: 2026,
```

También puedes cambiar `titulo`, `bienvenida` y `dedicatoria`. `{nombre}` y `{firma}` en los mensajes se reemplazan automáticamente. Para cambiar la introducción y la nota final, edita esos textos en `index.html`.

El año queda fijo en **2026**, el año actual de esta entrega. Antes del 1 de diciembre de 2026 todo está bloqueado; durante diciembre cada fecha abre su puerta y las anteriores; desde enero de 2027 quedan todas disponibles para revivir el regalo. Mantener el año fijo evita que se vuelva a bloquear en enero. Para una edición nueva, cambia `anio`: tendrá su propio progreso.

## 2. Reemplaza las 31 sorpresas

Todo está en `contenido.js`: un objeto por día, numerados del 1 al 31. Todos vienen marcados con `ejemplo: true`; al personalizarlos, pon `ejemplo: false` para quitar la etiqueta visible. Mantén los números sin repetir y guarda el archivo como UTF-8.

Formatos de ejemplo:

```js
{ dia: 1, tipo: "mensaje", ejemplo: false,
  titulo: "Una carta para ti", mensaje: "Hola, {nombre}.\nTe quiero. {firma}." },

{ dia: 2, tipo: "foto", ejemplo: false,
  titulo: "Nuestro paseo", imagen: "img/paseo.jpg",
  alt: "Los dos caminando junto al mar", pie: "Ese día tan bonito." },

{ dia: 3, tipo: "cupon", ejemplo: false,
  titulo: "Una cita de cine", detalle: "Tú eliges la película; yo llevo las cabritas.",
  condiciones: "Válido cuando coordinemos un día juntos." },

{ dia: 4, tipo: "combinado", ejemplo: false,
  titulo: "Mi recuerdo favorito", imagen: "img/abrazo.jpg",
  alt: "Nuestro abrazo frente al árbol de Navidad", pie: "Diciembre juntos.",
  mensaje: "Siempre quiero volver a este momento." },
```

Escribe texto normal, sin HTML. Usa `\n` para separar párrafos. Si necesitas comillas dentro del texto, escápalas: `\"te quiero\"`. Los días 24, 25 y 31 reciben automáticamente puertas más grandes y confeti, cualquiera sea su tipo.

### Agrega un enlace a cualquier día

Puedes usar `tipo: "enlace"` para un día dedicado a un link. También puedes añadir `enlace` y `textoEnlace` a los otros tipos. Por ejemplo:

```js
{
  dia: 5,
  tipo: "enlace",
  ejemplo: false,
  titulo: "Una canción para ti",
  mensaje: "Esta canción me recuerda a ti, Martinita.",
  enlace: "https://open.spotify.com/track/PEGA-AQUI-EL-ID",
  textoEnlace: "Escucha esta canción ♡"
},
```

Reemplaza la dirección de ejemplo por el enlace completo que quieras compartir, empezando con `https://` o `http://`. El botón abre una pestaña nueva. En un día de tipo `enlace`, `mensaje` es opcional. Si omites `textoEnlace`, dice «Abrir tu sorpresa ♡». Si no incluyes `enlace` o la dirección no es válida, no aparece el botón. Los links se muestran únicamente al abrir un día desbloqueado.

Guarda los cambios y sube `contenido.js` a GitHub. La primera vez que incorpores esta función, sube también `script.js` y `style.css` actualizados.

## 3. Agrega tus fotos

1. Copia las fotos a `img/`. Usa JPG, PNG, WebP o SVG; convierte las fotos HEIC antes de subirlas.
2. Usa nombres simples, por ejemplo `viaje-sur.jpg`. Respeta mayúsculas y minúsculas.
3. En cada objeto cambia `imagen` por `"img/viaje-sur.jpg"` y escribe un `alt` que describa la foto.
4. Las rutas deben ir **sin `/` inicial**, para funcionar dentro de un repositorio de GitHub Pages.
5. Idealmente reduce las fotos a unos 1600 píxeles de lado largo para que carguen rápido desde el celular.

Hay una ilustración local de ejemplo; ninguna foto real se necesita para probar. Las fotos mantienen sus proporciones. Si una falta, aparece un aviso cariñoso sin romper el modal.

## 4. Pruébalo antes de regalarlo

1. En `config.js`, cambia temporalmente `const MODO_PRUEBA = false;` a `true`.
2. Abre `index.html?fecha=2026-12-15`, o, con el servidor local, `http://localhost:8000/?fecha=2026-12-15`.
3. Prueba estas fechas:

| Parámetro | Resultado esperado |
| --- | --- |
| `?fecha=2026-11-30` | Todo bloqueado; la puerta 1 dice «mañana». |
| `?fecha=2026-12-01` | Solo el día 1 disponible y marcado como HOY. |
| `?fecha=2026-12-15` | Días 1–15 disponibles; 16–31 bloqueados. |
| `?fecha=2026-12-24` | Nochebuena disponible con confeti. |
| `?fecha=2026-12-25` | Navidad disponible con confeti. |
| `?fecha=2026-12-31` | Todo disponible; día 31 con confeti. |
| `?fecha=2027-01-01` | Todo disponible para volver a verlo. |

4. Abre una puerta y recarga: conserva el estado. El modo de prueba usa el mismo progreso del navegador; para una revisión limpia usa otro perfil, una sesión privada o elimina **solo los datos de este sitio** desde la configuración del navegador.
5. Vuelve a poner **`MODO_PRUEBA = false`** antes de compartir. Con `false`, `?fecha=...` se ignora. Un parámetro inválido también se ignora.

El calendario usa la fecha y la zona horaria local del dispositivo; no consulta un servidor. Se actualiza al volver a la pestaña y, mientras esté visible, comprueba el cambio de día cada 15 segundos. El progreso y la bienvenida se recuerdan en ese navegador, no se sincronizan entre dispositivos. Si no hay acceso a localStorage, funciona durante la sesión sin guardar los cambios.

## 5. Súbelo a GitHub Pages

1. Crea un repositorio en GitHub y sube los archivos y carpetas de esta web. `index.html` debe estar en la raíz del repositorio, junto a `style.css`, `config.js`, `contenido.js`, `script.js` e `img/`.
2. Incluye `.nojekyll` (archivo vacío). `README.md` es opcional; `pruebas/` no son necesarios para publicar.
3. Ve a **Settings → Pages**. En **Build and deployment → Source**, selecciona **Deploy from a branch**. En **Branch**, elige `main` y **/(root)**. Pulsa **Save**.
4. Espera a que GitHub termine de publicar; Pages mostrará la dirección de tu web, normalmente `https://TU-USUARIO.github.io/TU-REPOSITORIO/`.
5. Ábrela en el celular. Revisa las fotos, los nombres, los días especiales y que el modo de prueba esté apagado. Luego comparte el enlace con ella.

Estos pasos siguen la [documentación oficial de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). No hay instalación ni proceso de compilación.

## Colores y textos principales

Las variables al principio de `style.css` controlan la paleta:

| Variable | Qué cambia |
| --- | --- |
| `--night`, `--night-deep` | Fondo de noche y degradado. |
| `--pine`, `--pine-light` | Verde principal y botones. |
| `--red`, `--red-light` | Puertas rojas y puerta de fin de año. |
| `--gold` | Dorado, títulos, luces y detalles. |
| `--cream` | Texto claro y fondo de los modales. |
| `--muted` | Texto secundario. |
| `--ink` | Texto de los modales. |
| `--font-title`, `--font-body` | Tipografías; hay alternativas locales si Google Fonts no carga. |

Los colores alternos de las puertas están en `.door:nth-child(...)`, y los especiales en `.door.special` y `.door.finale`. Los colores de la ilustración pueden editarse en `img/pueblo.svg`.

| Texto | Archivo |
| --- | --- |
| Nombre, firma, bienvenida, dedicatoria y año | `config.js` |
| Las 31 sorpresas | `contenido.js` |
| Introducción, leyenda y despedida | `index.html` |
| Avisos de espera, fechas y botones del modal | `script.js` |

## Estructura

```text
Adviento/
├── index.html
├── style.css
├── config.js
├── contenido.js
├── script.js
├── .nojekyll
├── README.md
├── img/
│   ├── pueblo.svg
│   ├── recuerdo-ejemplo.svg
│   └── estrella.svg
└── pruebas/
    └── calendario.test.cjs
```

Para ejecutar las pruebas de lógica con Node instalado: `node --test pruebas/calendario.test.cjs`. Node solo se usa para las pruebas; la web publicada funciona con HTML, CSS y JavaScript vanilla.

El bloqueo es parte de la experiencia del regalo, no un mecanismo de privacidad: aunque el contenido bloqueado nunca se inserta en el DOM, los archivos JavaScript son descargables y el reloj del dispositivo puede cambiarse. Un sitio estático público permite acceder a sus fotos y textos a quien conozca sus rutas. Evita incluir contenido que necesite protección real.
