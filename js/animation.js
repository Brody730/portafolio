document.addEventListener('DOMContentLoaded', function() {
    // Efecto de escritura automática
    const typedName = new Typed('#typed-name', {
        strings: ['[Tu Nombre]', 'Desarrollador', 'Diseñador', 'Profesional'],
        typeSpeed: 80,
        backSpeed: 50,
        loop: true
    });

    const typedText = new Typed('#typed-text', {
        strings: ['Desarrollador Full Stack con pasión por crear soluciones innovadoras.', 
                 'Especializado en JavaScript, React y Node.js.', 
                 'Buscando oportunidades para crecer profesionalmente.'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true,
        startDelay: 1000
    });

    // Cursor personalizado
    const cursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Efecto hover en enlaces y botones
    const hoverElements = document.querySelectorAll('a, button, .hover-effect');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Scroll reveal animations
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });

    sr.reveal('.animate-text', { delay: 300 });
    sr.reveal('.animate-item', { interval: 200 });
    sr.reveal('.animate-fade', { opacity: 0, interval: 200 });
});