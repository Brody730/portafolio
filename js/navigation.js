/**
 * navigation.js — Transiciones animadas entre páginas
 *
 * Crea un efecto de 3 barras horizontales que deslizan al navegar:
 *   1. Click en nav-link → barras entran desde la derecha (clase "entering")
 *   2. Cuando las barras cubren la pantalla → navega a la nueva URL
 *   3. Al cargar la nueva página → barras salen por la izquierda (clase "leaving")
 *
 * Los estilos de las barras están en css/page-transitions.css
 * Para cambiar la velocidad: ajusta ENTER_MS y LEAVE_MS
 */

// ── Configuración ──────────────────────────────────────
const ENTER_MS = 500;   // tiempo total de entrada (barras + delays)
const LEAVE_MS = 550;   // tiempo total de salida
const NUM_BARS = 3;     // cantidad de barras en la animación
// ───────────────────────────────────────────────────────

/**
 * Crea el elemento overlay con las barras dentro
 * Retorna el div.page-transition listo para insertar en el DOM
 */
function createTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';

    for (let i = 0; i < NUM_BARS; i++) {
        const bar = document.createElement('div');
        bar.className = 'bar';
        overlay.appendChild(bar);
    }

    return overlay;
}

/**
 * Ejecuta la animación de ENTRADA (barras cubren la pantalla)
 * y luego navega a la URL destino
 */
function navigateWithTransition(targetUrl) {
    // No animar si es la misma página
    if (targetUrl === window.location.pathname || targetUrl === window.location.href) return;

    const overlay = createTransitionOverlay();
    document.body.appendChild(overlay);

    // Forzar reflow para que el browser registre el estado inicial
    overlay.offsetHeight;

    // Iniciar animación de entrada
    overlay.classList.add('entering');

    // Cuando las barras cubren todo, navegar
    setTimeout(() => {
        window.location.href = targetUrl;
    }, ENTER_MS);
}

/**
 * Al cargar una nueva página, ejecuta la animación de SALIDA
 * (barras salen por la izquierda revelando el contenido)
 */
function playLeaveAnimation() {
    const overlay = createTransitionOverlay();
    document.body.appendChild(overlay);

    // Posicionar las barras cubriendo la pantalla (estado inicial de salida)
    overlay.offsetHeight;
    overlay.classList.add('leaving');

    // Remover overlay después de que las barras salgan
    setTimeout(() => {
        overlay.remove();
    }, LEAVE_MS);
}

// ── Inicialización ──────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    // Animación de salida al cargar la página (barras se van)
    playLeaveAnimation();

    // Interceptar clicks en links de navegación
    // Solo links internos del navbar (no links externos, anclas, etc.)
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a, .logo');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Ignorar links externos, anclas (#) y javascript:
            if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) return;

            e.preventDefault();
            navigateWithTransition(href);
        });
    });

    // Animar secciones al hacer scroll (IntersectionObserver)
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => sectionObserver.observe(section));
});
