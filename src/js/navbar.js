/**
 * Gestisce l'effetto di scroll sulla navbar.
 * Aggiunge o rimuove la classe `.navbar-scrolled` in base alla posizione dello scroll
 */
export function handleNavbarScroll() {
  // Recupera l'elemento della navbar tramite ID
  const navbar = document.getElementById("mainNavbar");

  // Se non esiste (es. su una pagina senza navbar), esci subito
  if (!navbar) return;

  /**
   *  Funzione che viene chiamata ogni volta che l'utente scrolla
   * Se la pagina è scrollata oltre 50px, aggiunge una classe per modificare lo stile
   */
  const scrollHandler = () => {
    if (window.scrollY > 50) {
      // Aggiunge classe se scroll > 50px
      navbar.classList.add("navbar-scrolled");
    } else {
      // Rimuove la classe se torniamo in alto
      navbar.classList.remove("navbar-scrolled");
    }
  };

  // Chiamiamo subito la funzione per settare lo stato iniziale
  scrollHandler();

  // Aggiungiamo l'event listener per reagire agli scroll futuri
  window.addEventListener("scroll", scrollHandler);
}

