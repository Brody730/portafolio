document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                showNotification('Por favor completa todos los campos requeridos', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Por favor ingresa un email válido', 'error');
                return;
            }
            
            // Simular envío (en un caso real, harías una petición AJAX)
            showNotification('Enviando mensaje...', 'warning');
            
            setTimeout(() => {
                showNotification('Mensaje enviado correctamente. ¡Gracias!', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
    
    // Validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Efectos para los campos del formulario
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        
        input.addEventListener('focus', function() {
            group.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                group.classList.remove('focused');
            }
        });
        
        // Verificar si hay valor al cargar (para estilos persistentes)
        if (input.value) {
            group.classList.add('focused');
        }
    });
});