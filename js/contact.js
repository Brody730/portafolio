/**
 * contact.js — Manejo del formulario de contacto
 *
 * Usa Formspree para enviar emails sin necesitar un backend propio.
 * Formspree es gratuito y compatible con GitHub Pages (100% estático).
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  PASOS PARA ACTIVAR EL FORMULARIO (solo hay que hacerlo 1 vez): │
 * │                                                                 │
 * │  1. Ve a https://formspree.io y crea una cuenta gratis          │
 * │  2. Crea un nuevo formulario ("New Form")                       │
 * │  3. Copia tu endpoint, se ve así:                               │
 * │        https://formspree.io/f/xabcdefg                          │
 * │  4. Pégalo en la variable FORMSPREE_ENDPOINT de abajo           │
 * │  5. Listo — los mensajes llegan directo a tu email              │
 * └─────────────────────────────────────────────────────────────────┘
 */

// ⬇ CAMBIA ESTO por tu endpoint real de Formspree
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzdojkzl';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    // Si no hay formulario en esta página, no hacer nada
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitBtn = form.querySelector('.form-submit');

        // Feedback visual mientras se envía
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando…';

        // Recopilar datos del formulario como objeto JSON
        const formData = {
            name:    form.querySelector('#name')?.value    || '',
            email:   form.querySelector('#email')?.value   || '',
            message: form.querySelector('#message')?.value || ''
        };

        try {
            // Si el endpoint aún no está configurado, usar mailto como respaldo
            if (FORMSPREE_ENDPOINT.includes('TU_ENDPOINT_AQUI')) {
                usarMailtoFallback(formData);
                return;
            }

            // Enviar a Formspree vía fetch (sin recargar la página)
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body:    JSON.stringify(formData)
            });

            if (response.ok) {
                mostrarEstado('success', submitBtn, form);
            } else {
                throw new Error('Respuesta no OK');
            }
        } catch (error) {
            mostrarEstado('error', submitBtn, form);
        }
    });
});

/**
 * Muestra el resultado del envío:
 *  - success: limpia el form y muestra mensaje de éxito
 *  - error:   muestra mensaje de error y rehabilita el botón
 */
function mostrarEstado(tipo, btn, form) {
    if (tipo === 'success') {
        btn.innerHTML = '<i class="fas fa-check"></i> ¡Mensaje enviado!';
        btn.style.background = '#16a34a';   // verde

        // Limpiar campos después de 2 segundos
        setTimeout(() => {
            form.reset();
            btn.disabled = false;
            btn.style.background = '';
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
        }, 2500);

    } else {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Error al enviar';
        btn.style.background = '#dc2626';   // rojo

        // Restaurar botón después de 3 segundos
        setTimeout(() => {
            btn.style.background = '';
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
        }, 3000);
    }
}

/**
 * Respaldo: abre el cliente de email del usuario si Formspree no está configurado.
 * Se usa automáticamente hasta que configures tu endpoint.
 */
function usarMailtoFallback(data) {
    const body = `Nombre: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;
    const url  = `mailto:imbestseth@gmail.com?subject=Mensaje desde portafolio&body=${encodeURIComponent(body)}`;
    window.location.href = url;
}
