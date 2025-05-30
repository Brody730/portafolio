// Animación de barras de progreso
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.transition = 'width 1s ease';
                    progressBar.style.width = progressBar.style.width.replace('0', progressBar.style.width.replace('width:', '').trim());
                }, 100);
            }
        });
    }, {
        threshold: 0.5
    });

    skillItems.forEach(item => {
        const progressBar = item.querySelector('.progress-bar');
        const width = progressBar.style.width;
        progressBar.style.width = '0';
        observer.observe(item);
    });
});

// Animación de hover en íconos
const skillIcons = document.querySelectorAll('.skill-item i');
skillIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
    });
});

// Animación de entrada para las categorías
document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.skills-category');
    categories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
            category.style.transition = 'all 0.5s ease';
        }, 100 * (Array.from(categories).indexOf(category) + 1));
    });
});

// Animación de números en estadísticas
function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-item p');
    numbers.forEach(number => {
        const target = parseInt(number.textContent);
        let current = 0;
        const increment = target / 100;
        
        const updateNumber = () => {
            current += increment;
            number.textContent = Math.ceil(current);
            
            if (current < target) {
                requestAnimationFrame(updateNumber);
            }
        };
        
        updateNumber();
    });
}

// Observar cuando las estadísticas están en pantalla
const stats = document.querySelector('.about-stats');
if (stats) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(stats);
}
