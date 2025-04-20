import "../styles/main.sass";
import "../styles/navbar.sass";
import "../styles/hero.sass"; 
import "../styles/description.sass";
import "../styles/features.sass";
import "../styles/cards.sass";
import "../styles/timeline.sass";
import "../styles/footer.sass";
import * as bootstrap from "bootstrap";

import { handleNavbarScroll } from "./navbar.js";

// Funzione per caricare componenti HTML
async function loadComponent(id, path) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// Carica la navbar e inizializza il comportamento
loadComponent("navbar", "/src/components/navbar.html").then(() => {
  handleNavbarScroll();

  const burger = document.getElementById("burger");
  const mobileNav = document.getElementById("mobileNav");
  const closeMain = document.querySelector(".btn-close-main");
  const closeSubmenu = document.querySelector(".btn-close-submenu");
  const submenuToggle = document.querySelector(".submenu-toggle");
  const submenu = document.querySelector(".mobile-submenu");
  const backBtn = document.querySelector(".btn-back");

  if (!burger || !mobileNav || !submenu) return;

  // Toggle menu mobile
  burger.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    burger.classList.toggle("is-active", open); // attiva hamburger animato
    document.body.classList.toggle("overflow-hidden", open);
  });

  // Chiudi menu principale
  closeMain?.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    burger.classList.remove("is-active");
    document.body.classList.remove("overflow-hidden");
  });

  // Apri sottomenu Parrots
  submenuToggle?.addEventListener("click", () => {
    submenu.classList.remove("d-none");   
    submenu.offsetHeight;               
    submenu.classList.add("show");        
  });

  // Torna indietro dal sottomenu
  backBtn?.addEventListener("click", () => {
    submenu.classList.remove("show");
    setTimeout(() => {
      submenu.classList.add("d-none");
    }, 300); 
  });

  // Chiudi completamente il sottomenu e il menu
  closeSubmenu?.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    submenu.classList.remove("show");
    setTimeout(() => {
      submenu.classList.add("d-none");
    }, 300);
    burger.classList.remove("is-active");
    document.body.classList.remove("overflow-hidden");
  });
});

// Carica gli altri componenti della pagina
loadComponent("hero", "/src/components/hero.html");
loadComponent("description", "/src/components/description.html");
loadComponent("features", "/src/components/features.html");
loadComponent("cards", "/src/components/cards.html");
loadComponent("timeline", "/src/components/timeline.html");
loadComponent("footer", "/src/components/footer.html");
