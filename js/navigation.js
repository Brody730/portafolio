document.addEventListener('DOMContentLoaded', function() {
    // Agregar clase de animación a los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el href del enlace
            const href = this.getAttribute('href');
            
            // Crear overlay de difuminación
            const overlay = document.createElement('div');
            overlay.className = 'page-transition-overlay';
            document.body.appendChild(overlay);
            
            // Agregar animación de difuminación
            overlay.style.opacity = '1';
            
            // Esperar a que la animación termine
            setTimeout(() => {
                // Redirigir a la página
                window.location.href = href;
            }, 1000); // Duración de la animación
        });
    });

    // Agregar animación de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Crear overlay de difuminación
                const overlay = document.createElement('div');
                overlay.className = 'page-transition-overlay';
                document.body.appendChild(overlay);
                
                // Agregar animación de difuminación
                overlay.style.opacity = '1';
                
                // Esperar a que la animación termine
                setTimeout(() => {
                    // Realizar scroll suave
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Eliminar overlay después de un breve retraso
                    setTimeout(() => {
                        overlay.style.opacity = '0';
                        setTimeout(() => {
                            overlay.remove();
                        }, 500);
                    }, 500);
                }, 1000);
            }
        });
    });

    // Agregar animación de entrada para cada sección
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        observer.observe(section);
    });
});
