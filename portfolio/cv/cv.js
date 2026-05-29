document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("dropdown-toggle");
  const navLinks = document.getElementById("navbar-links");
  const links = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section[id]");

  if (!menuButton || !navLinks) return;

  function setMenuState(isOpen) {
    navLinks.classList.toggle("show", isOpen);
    menuButton.classList.toggle("open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "×" : "☰";
  }

  function closeMenu() {
    setMenuState(false);
  }

  menuButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = navLinks.classList.contains("show");
    setMenuState(!isOpen);
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    const clickedOutside =
      !navLinks.contains(event.target) &&
      !menuButton.contains(event.target);

    if (clickedOutside) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        links.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    },
    {
      rootMargin: "-45% 0px -45% 0px",
      threshold: 0
    }
  );

  sections.forEach((section) => observer.observe(section));
});