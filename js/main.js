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

// Función para inicializar el cursor personalizado
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
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

// Función para inicializar ScrollReveal
function initScrollReveal() {
    if (typeof ScrollReveal !== 'undefined') {
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
    } else {
        // Cargar ScrollReveal dinámicamente si no está disponible
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/scrollreveal';
        script.onload = initScrollReveal;
        document.head.appendChild(script);
    }
}

// Función para inicializar Typed.js si es necesario
function initTypedJS() {
    const typedElements = document.querySelectorAll('[data-typed]');
    
    if (typedElements.length > 0 && typeof Typed === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/typed.js@2.0.12';
        script.onload = () => {
            typedElements.forEach(el => {
                const options = JSON.parse(el.getAttribute('data-typed-options') || {};
                new Typed(el, options);
            });
        };
        document.head.appendChild(script);
    } else if (typeof Typed !== 'undefined') {
        typedElements.forEach(el => {
            const options = JSON.parse(el.getAttribute('data-typed-options') || {};
            new Typed(el, options);
        });
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initCustomCursor();
    initNavbarScroll();
    initSmoothScrolling();
    initScrollReveal();
    initTypedJS();
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