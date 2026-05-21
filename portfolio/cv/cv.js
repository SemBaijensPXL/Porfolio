document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("dropdown-toggle");
    const navLinks = document.getElementById("navbar-links");
    const links = document.querySelectorAll(".nav-links a");

    if (!menuButton || !navLinks) return;

    const closeMenu = () => {
        navLinks.classList.remove("show");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
    };

    const openMenu = () => {
        navLinks.classList.add("show");
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.textContent = "×";
    };

    menuButton.addEventListener("click", (event) => {
        event.stopPropagation();

        const isOpen = navLinks.classList.contains("show");
        isOpen ? closeMenu() : openMenu();
    });

    links.forEach((link) => {
        link.addEventListener("click", () => {
            links.forEach((item) => item.classList.remove("active"));
            link.classList.add("active");
            closeMenu();
        });
    });

    document.addEventListener("click", (event) => {
        if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) {
            closeMenu();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 140;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        links.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });
});