document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initAccordions();
    initCarousel();
    initScrollReveal();
    initActiveNavigation();
});

function initMobileMenu() {
    const button = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');

    if (!button || !nav) return;

    button.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');

        button.setAttribute('aria-expanded', String(isOpen));
        button.textContent = isOpen ? '×' : '☰';
    });
}

function initAccordions() {
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(accordion => {
        const header = accordion.querySelector('.accordion-header');

        if (!header) return;

        header.addEventListener('click', () => {
            accordion.classList.toggle('open');
        });
    });
}

function initCarousel() {
    const carousel = document.querySelector('.carousel');

    if (!carousel) return;

    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');

    let currentIndex = 0;

    if (!inner || items.length === 0) return;

    function showSlide(index) {
        currentIndex = (index + items.length) % items.length;

        inner.style.transform =
            `translateX(-${currentIndex * 100}%)`;
    }

    prevButton?.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    nextButton?.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });

    setInterval(() => {
        showSlide(currentIndex + 1);
    }, 6000);
}

function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            navLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${entry.target.id}`
                );
            });
        });
    }, {
        rootMargin: '-45% 0px -45% 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}