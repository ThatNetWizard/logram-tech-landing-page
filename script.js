"use strict";

// Year auto update
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile Nav Toggle
const btnMobileNav = document.querySelector(".btn-mobile-nav");
const navList = document.querySelector(".nav__list");
const menuIcon = document.querySelector(
  ".icon-mobile-nav[name='menu-outline']",
);
const closeIcon = document.querySelector(
  ".icon-mobile-nav[name = 'close-outline']",
);
if (btnMobileNav && navList) {
  btnMobileNav.addEventListener("click", () => {
    btnMobileNav.classList.toggle("open");
    navList.classList.toggle("open");

    const isOpen = navList.classList.contains("open");

    if (isOpen) {
      menuIcon.style.display = "none";
      closeIcon.style.display = "block";
    } else {
      menuIcon.style.display = "block";
      closeIcon.style.display = "none";
    }
  });

  document.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("open");
      btnMobileNav.classList.remove("active");

      menuIcon.style.display = "block";
      closeIcon.style.display = "none";
    });
  });
}

// Active nav (Scroll spy)
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

function activateLink(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

/**
 * Instead of guessing visibility,
 * we calculate which section is closest to viewport center
 */
function getActiveSection() {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  let closestSection = null;
  let minDistance = Infinity;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    // distance from viewport center
    const sectionCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight * 0.35;

    const distance = rect.top;
    if (Math.abs(distance) < Math.abs(minDistance)) {
      minDistance = distance;
      closestSection = section;
    }
  });

  if (closestSection) {
    activateLink(closestSection.id);
  }
}

// run on scroll (lightweight, no heavy observer conflicts)
window.addEventListener("scroll", () => {
  requestAnimationFrame(getActiveSection);
});

// run once on load
getActiveSection();

// Reveal on scroll
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((el) => revealObserver.observe(el));
