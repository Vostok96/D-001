# 💎 Guía de Plantilla y Flujo Operativo: RyM Dedicatorias

Este documento sirve como **contexto técnico, plantilla y procedimiento operativo estandarizado (SOP)** para la creación de futuras dedicatorias web asociadas a pedidos de **Joyería RyM** (`D-002`, `D-003`, etc.).

---

## 📌 1. Modelo de Negocio y Flujo de Experiencia

1. **Venta en Joyería:** El cliente adquiere una joya en [joyeria.rymgroup.org](https://joyeria.rymgroup.org/) y añade el servicio de **Dedicatoria Web Personalizada**.
2. **QR en el Estuche:** Dentro del estuche o en una tarjeta de lujo se imprime el **Código QR** oficial con el SKU correspondiente (`https://d-XXX.rymgroup.org/`).
3. **Experiencia de Unboxing Digital:**
   * La persona agasajada escanea el QR con su smartphone.
   * Visualiza un sobre 3D con sello de lacre dorado con las iniciales **RyM**.
   * Al tocar el sello, el sobre se abre, suena automáticamente la canción elegida, caen pétalos y partículas doradas, y se revela la carta manuscrita junto con su galería de recuerdos.

---

## 🏗️ 2. Estructura del Proyecto

```text
RyM Dedicatorias/
├── assets/
│   ├── audio/
│   │   ├── es-por-ti.mp3          # Audio de la canción elegida (.mp3)
│   │   └── es-por-ti.webm         # Audio comprimido Opus (.webm) para máxima velocidad
│   ├── images/
│   │   ├── photo-01.jpg           # Foto destacada 1 (Polaroid)
│   │   ├── ...                    # Hasta photo-10 (Polaroids destacadas)
│   │   └── photo-30.jpg           # Fotos complementarias en cuadrícula
│   ├── favicon.svg                # Favicon vectorial con gema y corazón dorado
│   └── qr-d001-maria-elena.png    # QR de alta resolución con corrección ECC H (30%)
├── .gitignore                     # Ignora archivos temporales y de sistema
├── index.html                     # Maquetación Mobile-First, Tailwind CDN y supresión HUD
├── netlify.toml                   # Cache inmutable de assets y bloqueo de barra Netlify
├── README.md                      # Ficha del pedido actual
├── script.js                      # Lógica del unboxing, audio, partículas, lightbox y swipe
├── styles.css                     # Variables de marca RyM, solapas 3D y lightbox
└── GUIA_PLANTILLA_DEDICATORIAS.md # Este documento de referencia
```

---

## 🚀 3. Paso a Paso para un Nuevo Cliente (Ejemplo: `D-002`)

### Paso 1: Recopilar datos del cliente
* **SKU:** `D-002` (siguiente número correlativo).
* **Cliente:** Nombre completo del comprador.
* **Destinatario/a:** Nombre de la persona agasajada.
* **Temática:** *(Amor, Pedida de noviazgo, Pedida de matrimonio, Cumpleaños, Aniversario, etc.)*
* **Canción elegida:** Nombre del tema y artista.
* **Dedicatoria:** Texto exacto que desea transmitir.
* **Fotografías:** Subidas a Google Drive en `G:\Mi unidad\DEDICATORIAS RyM\[Nombre Cliente]`.

### Paso 2: Crear el nuevo repositorio
1. Crear el repositorio vacío en GitHub: `https://github.com/Vostok96/D-002.git`.
2. Clonar o duplicar esta plantilla en una nueva carpeta local (ej: `D-002 Dedicatoria`).
3. Cambiar el origen remoto de Git:
   ```bash
   git remote set-url origin https://github.com/Vostok96/D-002.git
   ```

### Paso 3: Reemplazar recursos (`assets/`)
1. **Fotografías:**
   * Guardar las fotos del cliente como `photo-01.jpg`, `photo-02.jpg`, etc., dentro de `assets/images/`.
   * Las primeras **10** serán las Polaroids destacadas; el resto formará la cuadrícula general.
2. **Audio:**
   * Obtener el archivo de audio de la canción elegida.
   * Colocarlo en `assets/audio/` tanto en `.mp3` como en `.webm` (para garantizar soporte en el 100% de dispositivos iOS Safari y Android).
   * Actualizar la ruta en la etiqueta `<audio>` de `index.html`.

### Paso 4: Actualizar textos y títulos
1. En `index.html`:
   * `<title>` y meta tags OpenGraph (nombre del destinatario y cliente).
   * Texto de apertura del sobre.
   * Título principal y subtítulo de la carta.
   * Párrafo de la dedicatoria textual.
   * Firma del cliente.
   * Frase musical intercalada (letra de la canción elegida).
   * Código de SKU en el pie de página.
2. En `script.js`:
   * Actualizar el array `photosData` con los títulos o descripciones para cada foto en el Lightbox.
   * Si la canción cambia de título, actualizar el texto en el reproductor flotante.

### Paso 5: Generar el Código QR Oficial
El código QR debe generarse siempre con **Nivel de Corrección de Errores H (30%)** para que el logotipo o corazón central no afecte la lectura del código.
* URL destino: `https://d-XXX.rymgroup.org/`
* Tamaño: 1200 × 1200 px (300 DPI para imprenta).
* Guardar el resultado en `assets/` y en la carpeta de Google Drive del cliente.

### Paso 6: Subir a GitHub
```bash
git add .
git commit -m "feat(d-XXX): Dedicatoria interactiva para [Nombre Destinatario]"
git push -u origin main
```

### Paso 7: Despliegue en Netlify y Cloudflare
1. **Netlify:**
   * "Add new site" > "Import an existing project" > Seleccionar `Vostok96/D-XXX`.
   * En "Domain management", añadir el subdominio: `d-XXX.rymgroup.org`.
2. **Cloudflare:**
   * Ir a la zona `rymgroup.org` > **DNS** > **Add record**.
   * Tipo: `CNAME`
   * Name: `d-XXX`
   * Target: `[nombre-del-sitio].netlify.app`
   * Proxy status: **DNS only** (nube gris para emisión limpia de SSL).

---

## 🎨 4. Paleta de Colores de Joyería RyM

| Variable | Hexadecimal | Uso sugerido |
| :--- | :--- | :--- |
| `--paper` | `#fff1f5` | Fondos suaves y descansados |
| `--white` | `#ffffff` | Tarjetas, sobres y polaroids |
| `--rose` | `#e67696` | Detalles florales y acentos |
| `--rose-deep` | `#bd4b6d` | Botones de amor y textos destacados |
| `--berry` | `#77394c` | Títulos principales de alta jerarquía |
| `--gold` | `#b98a3b` | Detalles de orfebrería, bordes y lacre |
| `--gold-light` | `#f5d485` | Reflejos y biseles |
| `--ink` | `#2c2c2c` | Texto de lectura (cuerpo) |

---

## 🛠️ 5. Consideraciones Técnicas Importantes
* **Mobile-First Estricto:** Más del 95% de los accesos provienen del escaneo de QR en smartphones. Mantener márgenes táctiles mínimos de 48px y evitar desbordamientos horizontales.
* **Autoplay de Audio en Móviles:** Los navegadores móviles bloquean el audio automático sin interacción previa. Por eso, el sobre inicial actúa como el disparador (`trigger`) indispensable para habilitar el audio de forma natural e inmersiva.
* **Supresión del Badge de Netlify:** Ya se encuentra configurado en `styles.css`, `index.html` y `netlify.toml` para que ninguna marca de agua de terceros aparezca sobre la web.
