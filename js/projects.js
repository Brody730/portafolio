document.addEventListener('DOMContentLoaded', function() {
    // Filtrado de proyectos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar proyectos
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.classList.add('animate-item');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Efecto hover en tarjetas de proyecto
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.project-overlay').style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.project-overlay').style.opacity = '0';
        });
    });
    
    // Inicializar lightbox para vista previa de proyectos
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.querySelector('.fa-search')) {
                // Aquí podrías implementar un lightbox para ver el proyecto en grande
                alert('Vista previa del proyecto (implementar lightbox)');
            } else if (this.querySelector('.fa-link')) {
                // Abrir enlace al proyecto (si lo tienes online)
                const projectUrl = '#'; // Reemplaza con tu URL
                if (projectUrl !== '#') {
                    window.open(projectUrl, '_blank');
                } else {
                    alert('Este proyecto no está disponible online actualmente');
                }
            }
        });
    });
});