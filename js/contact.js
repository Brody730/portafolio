document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    if (!form) {
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = (form.querySelector('#name') || {}).value || '';
        const email = (form.querySelector('#email') || {}).value || '';
        const subject = (form.querySelector('#subject') || {}).value || 'Nuevo mensaje';
        const message = (form.querySelector('#message') || {}).value || '';

        const body = [
            `Nombre: ${name}`,
            `Email: ${email}`,
            '',
            message
        ].join('\n');

        const mailto = `mailto:cjcr170504@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
    });
});
