// Importa la libreria Swiper
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

// Breakpoint di riferimento: sotto i 768px Swiper sarà attivo
const BP = 768;

// Selettore del contenitore Swiper nel DOM
const SWIPER_SEL = '.events-swiper';

// Variabile globale che conterrà l'istanza dello Swiper
let swiper = null;

/**
 * Funzione di utilità per verificare se un elemento è visibile a schermo.
 * Evita di inizializzare Swiper se l'elemento è ancora nascosto
 */
function isVisible(el) {
  return !!el && el.offsetWidth && el.offsetHeight;
}

/**
 * Crea una nuova istanza Swiper con configurazione per mobile
 */
function createSwiper() {
  swiper = new Swiper(SWIPER_SEL, {
    slidesPerView: 1.15, // numero di slide visibili parzialmente
    spaceBetween: 16,    // spaziatura tra le slide

    // Abilita i bottoni di navigazione
    navigation: {
      nextEl: '.events-swiper .swiper-button-next',
      prevEl: '.events-swiper .swiper-button-prev'
    },

    // Queste due opzioni fanno sì che lo Swiper si aggiorni se cambia il DOM
    observer: true,
    observeParents: true
  });

  // Richiesta di aggiornamento appena disponibile nel frame successivo
  requestAnimationFrame(() => swiper.update());
}

/**
 * Distrugge l’istanza esistente di Swiper e pulisce tutto
 */
function destroySwiper() {
  swiper?.destroy(true, true); // distrugge Swiper e rimuove anche gli event listeners
  swiper = null;
}

/**
 * Logica che decide se attivare o disattivare Swiper in base al breakpoint e visibilità
 */
function toggleSwiper() {
  const mobile = window.innerWidth < BP; // verifica se siamo sotto il breakpoint
  const container = document.querySelector(SWIPER_SEL);

  if (mobile) {
    if (!swiper) {
      // Se Swiper non esiste e il contenitore è visibile, lo inizializziamo
      if (isVisible(container)) {
        createSwiper();
      } else {
        // Altrimenti riproviamo dopo 50ms
        setTimeout(toggleSwiper, 50);
      }
    } else {
      // Se esiste già, assicuriamoci che sia aggiornato
      swiper.update();
    }
  } else {
    // Se non siamo su mobile ma Swiper è attivo, lo distruggiamo
    if (swiper) destroySwiper();
  }
}

// Esegui la funzione quando il DOM è pronto
window.addEventListener('DOMContentLoaded', toggleSwiper);

// Ricalcola lo stato Swiper ogni volta che viene ridimensionata la finestra
window.addEventListener('resize', toggleSwiper);

// Dopo il caricamento completo della pagina forza un update
window.addEventListener('load', () => swiper?.update());
