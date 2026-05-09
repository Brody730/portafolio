// Función para inicializar el menú móvil
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Función para animar elementos al hacer scroll
function initAnimateOnScroll() {
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observar elementos animables
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        animateOnScroll.observe(element);
    });
}

// Función para inicializar el cursor personalizado
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Efecto hover
    const hoverElements = document.querySelectorAll('a, button, .hover-effect, input[type="submit"], .btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });
}

// Función para el efecto de navbar al hacer scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Función para scroll suave
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Función para inicializar las animaciones de carga
function initLoadAnimations() {
    // Asegurar que todas las secciones sean visibles desde el inicio
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    });

    // Activar las animaciones después de un breve delay
    setTimeout(() => {
        document.querySelectorAll('.animate-on-load').forEach(element => {
            element.classList.add('visible');
        });
    }, 100);
}

/**
 * initTypingAnimation — Escribe y borra frases en el elemento #typed-text
 *
 * Cómo funciona:
 *  1. Escribe letra por letra la frase actual (velocidad: SPEED_WRITE ms)
 *  2. Pausa al terminar (PAUSE_MS ms)
 *  3. Borra letra por letra (velocidad: SPEED_DELETE ms)
 *  4. Pasa a la siguiente frase y repite
 *
 * Para cambiar las frases, edita el array PHRASES.
 * El cursor parpadeante (|) es un <span class="typing-cursor"> en el HTML,
 * animado solo con CSS en contact-form.css → no necesita JS.
 */
function initTypingAnimation() {
    const el = document.getElementById('typed-text');
    if (!el) return;   // solo corre en páginas que tengan #typed-text

    // ── Configura aquí tus frases ──────────────────────────────────
    const PHRASES = [
        'Desarrollador Web Full Stack',
        'Front-end Developer',
        'Back-end Developer',
        'Amante del buen código'
    ];
    const SPEED_WRITE  = 80;    // ms entre cada letra al escribir
    const SPEED_DELETE = 45;    // ms entre cada letra al borrar
    const PAUSE_MS     = 1800;  // ms de pausa al terminar una frase
    // ──────────────────────────────────────────────────────────────

    let phraseIndex = 0;
    let charIndex   = 0;
    let isDeleting  = false;

    function tick() {
        const current = PHRASES[phraseIndex];

        if (isDeleting) {
            // Borrar un carácter
            charIndex--;
            el.textContent = current.substring(0, charIndex);
        } else {
            // Escribir un carácter
            charIndex++;
            el.textContent = current.substring(0, charIndex);
        }

        // ¿Terminó de escribir?
        if (!isDeleting && charIndex === current.length) {
            setTimeout(() => { isDeleting = true; tick(); }, PAUSE_MS);
            return;
        }

        // ¿Terminó de borrar?
        if (isDeleting && charIndex === 0) {
            isDeleting   = false;
            phraseIndex  = (phraseIndex + 1) % PHRASES.length;
        }

        setTimeout(tick, isDeleting ? SPEED_DELETE : SPEED_WRITE);
    }

    // Pequeño delay inicial para que la página cargue primero
    setTimeout(tick, 500);
}

/**
 * initDynamicYear — Pone el año actual en #footer-year
 * Así el copyright nunca queda desactualizado.
 */
function initDynamicYear() {
    const yearEl = document.getElementById('footer-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// Inicializar todas las funciones cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initCustomCursor();
    initNavbarScroll();
    initSmoothScrolling();
    initAnimateOnScroll();
    initLoadAnimations();
    initTypingAnimation();   // ← animación de texto en el hero
    initDynamicYear();       // ← año en el footer
});

// Inicialización cuando todo esté cargado
window.addEventListener('load', function() {
    // Añadir estilos para notificaciones si no existen
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: var(--primary-color);
                color: white;
                padding: 12px 24px;
                border-radius: 50px;
                box-shadow: 0 5px 15px rgba(108, 99, 255, 0.3);
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .notification.show {
                opacity: 1;
            }
            .notification.success {
                background-color: #4CAF50;
            }
            .notification.error {
                background-color: #F44336;
            }
            .notification.warning {
                background-color: #FF9800;
            }
        `;
        document.head.appendChild(style);
    }
});