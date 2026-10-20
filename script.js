// LISTA DE RECUERDOS (30 FOTOGRAFÍAS CON SUS TÍTULOS ROMÁNTICOS)
const photosData = [
  { src: "assets/images/photo-01.jpg", caption: "Tu sonrisa que ilumina mis días" },
  { src: "assets/images/photo-02.jpg", caption: "Caminando juntos siempre" },
  { src: "assets/images/photo-03.jpg", caption: "Mi lugar favorito eres tú" },
  { src: "assets/images/photo-04.jpg", caption: "Complicidad y amor puro" },
  { src: "assets/images/photo-05.jpg", caption: "Miradas que lo dicen todo" },
  { src: "assets/images/photo-06.jpg", caption: "Aventuras compartidas" },
  { src: "assets/images/photo-07.jpg", caption: "Siempre en mis pensamientos" },
  { src: "assets/images/photo-08.jpg", caption: "La dulzura de tu compañía" },
  { src: "assets/images/photo-09.jpg", caption: "Construyendo nuestro camino" },
  { src: "assets/images/photo-10.jpg", caption: "Hasta que Dios me lo permita" },
  { src: "assets/images/photo-11.jpg", caption: "Instantes que guardo en el corazón" },
  { src: "assets/images/photo-12.jpg", caption: "Tu risa es mi canción favorita" },
  { src: "assets/images/photo-13.jpg", caption: "Abrazos que curan todo" },
  { src: "assets/images/photo-14.jpg", caption: "La luz de mi destino" },
  { src: "assets/images/photo-15.jpg", caption: "Momentos mágicos e inolvidables" },
  { src: "assets/images/photo-16.jpg", caption: "Juntos todo es mejor" },
  { src: "assets/images/photo-17.jpg", caption: "Mi paz y mi refugio" },
  { src: "assets/images/photo-18.jpg", caption: "Un amor que crece día a día" },
  { src: "assets/images/photo-19.jpg", caption: "Tú y yo frente al mundo" },
  { src: "assets/images/photo-20.jpg", caption: "Eternamente agradecido por tenerte" },
  { src: "assets/images/photo-21.jpg", caption: "La alegría de compartir la vida" },
  { src: "assets/images/photo-22.jpg", caption: "Tus ojos, mi mapa favorito" },
  { src: "assets/images/photo-23.jpg", caption: "Pequeños instantes, inmenso amor" },
  { src: "assets/images/photo-24.jpg", caption: "Mi complice de sueños" },
  { src: "assets/images/photo-25.jpg", caption: "Amándote en cada paso" },
  { src: "assets/images/photo-26.jpg", caption: "La reina de mi vida" },
  { src: "assets/images/photo-27.jpg", caption: "Por un sinfín de amaneceres juntos" },
  { src: "assets/images/photo-28.jpg", caption: "Tu amor es mi mayor bendición" },
  { src: "assets/images/photo-29.jpg", caption: "Un viaje hermoso que apenas comienza" },
  { src: "assets/images/photo-30.jpg", caption: "Por siempre María Elena & Erwin" }
];

let currentPhotoIndex = 0;

// ELEMENTOS DEL DOM
const envelopeScreen = document.getElementById("envelope-screen");
const envelopeTrigger = document.getElementById("envelope-trigger");
const waxSealBtn = document.getElementById("wax-seal-btn");
const audio = document.getElementById("romantic-audio");
const vinylDisc = document.getElementById("vinyl-disc");
const toggleAudioBtn = document.getElementById("toggle-audio-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const lightboxModal = document.getElementById("lightbox-modal");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxIndex = document.getElementById("lightbox-index");
const sendLoveBtn = document.getElementById("send-love-btn");
const heartsCountEl = document.getElementById("hearts-count");

// APERTURA DEL SOBRE INTERACTIVO
function openEnvelope() {
  if (envelopeTrigger.classList.contains("opening")) return;
  envelopeTrigger.classList.add("opening");

  // Iniciar reproducción de audio
  playAudio();

  // Transición suave hacia la web
  setTimeout(() => {
    envelopeScreen.classList.add("opened");
    initParticles();
  }, 900);
}

envelopeTrigger.addEventListener("click", openEnvelope);
waxSealBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openEnvelope();
});

// CONTROL DE AUDIO
function playAudio() {
  if (!audio) return;
  audio.play().then(() => {
    vinylDisc.classList.add("playing");
    playIcon.classList.add("hidden");
    pauseIcon.classList.remove("hidden");
  }).catch((err) => {
    console.log("Audio waiting for user gesture:", err);
  });
}

function pauseAudio() {
  if (!audio) return;
  audio.pause();
  vinylDisc.classList.remove("playing");
  playIcon.classList.remove("hidden");
  pauseIcon.classList.add("hidden");
}

toggleAudioBtn.addEventListener("click", () => {
  if (audio.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
});

// LIGHTBOX MODAL
function openLightbox(index) {
  currentPhotoIndex = index;
  updateLightboxContent();
  lightboxModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightboxModal.classList.remove("active");
  document.body.style.overflow = "";
}

function updateLightboxContent() {
  const photo = photosData[currentPhotoIndex];
  if (!photo) return;
  lightboxImg.src = photo.src;
  lightboxCaption.textContent = photo.caption;
  lightboxIndex.textContent = `Recuerdo ${currentPhotoIndex + 1} de ${photosData.length}`;
}

function nextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % photosData.length;
  updateLightboxContent();
}

function prevPhoto() {
  currentPhotoIndex = (currentPhotoIndex - 1 + photosData.length) % photosData.length;
  updateLightboxContent();
}

// Eventos de teclado para Lightbox
window.addEventListener("keydown", (e) => {
  if (!lightboxModal.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextPhoto();
  if (e.key === "ArrowLeft") prevPhoto();
});

// Soporte táctil Swipe para móviles en Lightbox
let touchStartX = 0;
let touchEndX = 0;

lightboxModal.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightboxModal.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 50;
  if (touchEndX < touchStartX - swipeThreshold) {
    nextPhoto();
  }
  if (touchEndX > touchStartX + swipeThreshold) {
    prevPhoto();
  }
}

// Clic fuera de la foto para cerrar
lightboxModal.addEventListener("click", (e) => {
  if (e.target === lightboxModal) closeLightbox();
});

// DETALLE INTERACTIVO: LATIDOS DE AMOR CON CORAZONES FLOTANTES
let loveCount = parseInt(localStorage.getItem("rym_d001_hearts") || "0", 10);
heartsCountEl.textContent = loveCount;

sendLoveBtn.addEventListener("click", (e) => {
  loveCount++;
  heartsCountEl.textContent = loveCount;
  localStorage.setItem("rym_d001_hearts", loveCount.toString());

  // Generar corazones flotantes
  const rect = sendLoveBtn.getBoundingClientRect();
  for (let i = 0; i < 6; i++) {
    createFloatingHeart(rect.left + rect.width / 2 + (Math.random() * 60 - 30), rect.top);
  }
});

function createFloatingHeart(x, y) {
  const heart = document.createElement("div");
  heart.innerHTML = `<svg class="w-6 h-6 text-rose-deep fill-current drop-shadow-md" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
  heart.style.position = "fixed";
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "1000";
  heart.style.transition = "transform 1.8s ease-out, opacity 1.8s ease-out";
  heart.style.transform = `scale(${0.6 + Math.random() * 0.8}) rotate(${Math.random() * 40 - 20}deg)`;

  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.transform = `translate(${(Math.random() - 0.5) * 120}px, -${140 + Math.random() * 100}px) scale(1.3) rotate(${Math.random() * 60 - 30}deg)`;
    heart.style.opacity = "0";
  });

  setTimeout(() => {
    heart.remove();
  }, 1900);
}

// LIENZO DE PARTÍCULAS: PÉTALOS DE ROSA Y DESTELLOS DORADOS
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const totalPetals = window.innerWidth < 768 ? 16 : 28;

  for (let i = 0; i < totalPetals; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 6,
      speedX: (Math.random() - 0.5) * 1.2,
      speedY: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      oscillation: Math.random() * 0.02 + 0.01,
      color: Math.random() > 0.4 ? "rgba(230, 118, 150, 0.55)" : "rgba(245, 212, 133, 0.65)", // Pétalo rosa u oro
      type: Math.random() > 0.3 ? "petal" : "sparkle"
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.y += p.speedY;
      p.x += Math.sin(p.y * p.oscillation) * 0.8 + p.speedX;
      p.rotation += p.rotationSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;

      if (p.type === "petal") {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 1.5, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Destello dorado de 4 puntas
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
