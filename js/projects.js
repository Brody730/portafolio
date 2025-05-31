document.addEventListener('DOMContentLoaded', function() {
    // Sistema de lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    document.body.appendChild(lightbox);

    // Filtrado de proyectos con animaciones
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Actualizar botones activos
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Animar el cambio de filtros
            projectCards.forEach(card => {
                // Ocultar con animación
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // Efecto hover en tarjetas de proyecto
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        const image = card.querySelector('.project-image img');
        
        card.addEventListener('mouseenter', function() {
            overlay.style.opacity = '1';
            image.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            overlay.style.opacity = '0';
            image.style.transform = 'scale(1)';
        });
    });

    // Sistema de lightbox para vista previa de proyectos
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const icon = this.querySelector('i');
            const projectCard = this.closest('.project-card');
            const projectImage = projectCard.querySelector('img');
            const projectTitle = projectCard.querySelector('h3').textContent;
            const projectDescription = projectCard.querySelector('p').textContent;
            
            if (icon.classList.contains('fa-search')) {
                // Mostrar lightbox
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="close-lightbox">&times;</span>
                        <div class="lightbox-image">
                            <img src="${projectImage.src}" alt="${projectTitle}">
                        </div>
                        <div class="lightbox-info">
                            <h2>${projectTitle}</h2>
                            <p>${projectDescription}</p>
                        </div>
                    </div>
                `;
                
                lightbox.style.display = 'flex';
                
                // Cerrar lightbox
                const closeButton = lightbox.querySelector('.close-lightbox');
                closeButton.addEventListener('click', () => {
                    lightbox.style.display = 'none';
                });
                
                // Cerrar al hacer clic fuera
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) {
                        lightbox.style.display = 'none';
                    }
                });
            } else if (icon.classList.contains('fa-link')) {
                const projectUrl = projectCard.getAttribute('data-url');
                if (projectUrl) {
                    window.open(projectUrl, '_blank');
                } else {
                    alert('Este proyecto no está disponible online actualmente');
                }
            }
        });
    });

    // Animación de entrada para las tarjetas
    const animateProjects = () => {
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    };

    // Iniciar animación cuando el contenido esté visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProjects();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(document.querySelector('.projects-section'));
});