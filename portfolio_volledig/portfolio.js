document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initAccordions();
  initCarousel();
  initProjectCarousels();
  initScrollReveal();
  initActiveNavigation();
});

function initMobileMenu() {
  const button = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (!button || !nav) return;

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    button.setAttribute("aria-expanded", String(isOpen));
    button.textContent = isOpen ? "×" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
      button.textContent = "☰";
    });
  });
}

function initAccordions() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    const header = accordion.querySelector(".accordion-header");

    if (!header) return;

    header.addEventListener("click", () => {
      accordion.classList.toggle("open");
    });
  });
}

function initCarousel() {
  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach((carousel) => {
    const inner = carousel.querySelector(".carousel-inner");
    const items = carousel.querySelectorAll(".carousel-item");
    const prevButton = carousel.querySelector(".prev");
    const nextButton = carousel.querySelector(".next");

    let currentIndex = 0;
    let timer = null;

    if (!inner || items.length === 0) return;

    function showSlide(index) {
      currentIndex = (index + items.length) % items.length;
      inner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function startAutoSlide() {
      if (items.length <= 1) return;

      timer = setInterval(() => {
        showSlide(currentIndex + 1);
      }, 6000);
    }

    function resetAutoSlide() {
      if (!timer) return;

      clearInterval(timer);
      startAutoSlide();
    }

    prevButton?.addEventListener("click", () => {
      showSlide(currentIndex - 1);
      resetAutoSlide();
    });

    nextButton?.addEventListener("click", () => {
      showSlide(currentIndex + 1);
      resetAutoSlide();
    });

    startAutoSlide();
  });
}

function initProjectCarousels() {
  document.querySelectorAll(".project-carousel").forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".carousel-track img");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");

    if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

    let index = 0;

    function updateCarousel() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  });
}

function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

function initActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".main-nav a[href^='#']");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px",
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}
