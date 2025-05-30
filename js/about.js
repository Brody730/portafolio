// Animación de estadísticas
const stats = document.querySelectorAll('.stat-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
        }
    });
}, {
    threshold: 0.1
});

stats.forEach(stat => {
    stat.style.transform = 'translateY(20px)';
    stat.style.opacity = '0';
    observer.observe(stat);
});

// Animación de intereses
const interests = document.querySelectorAll('.interest-item');
interests.forEach(interest => {
    interest.addEventListener('mouseenter', () => {
        interest.style.transform = 'translateY(-10px)';
    });
    
    interest.addEventListener('mouseleave', () => {
        interest.style.transform = 'translateY(0)';
    });
});

// Animación de la imagen de perfil
document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.querySelector('.profile-img');
    const circleAnimation = document.querySelector('.circle-animation');
    
    // Añadir animación de entrada
    profileImg.style.opacity = '0';
    profileImg.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        profileImg.style.opacity = '1';
        profileImg.style.transform = 'scale(1)';
        profileImg.style.transition = 'all 0.5s ease';
    }, 100);
    
    // Añadir animación al circulo
    circleAnimation.style.opacity = '0';
    
    setTimeout(() => {
        circleAnimation.style.opacity = '1';
        circleAnimation.style.transition = 'all 0.5s ease';
    }, 200);
});
