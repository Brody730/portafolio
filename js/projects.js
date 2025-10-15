document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length === 0 || projectCards.length === 0) {
        return;
    }

    const revealCard = (card) => {
        card.classList.add('visible');
    };

    const filterProjects = (category) => {
        projectCards.forEach(card => {
            const cardCategory = card.dataset.category || '';
            const isVisible = category === 'all' || cardCategory.split(',').includes(category);

            if (isVisible) {
                card.style.display = '';
                requestAnimationFrame(() => revealCard(card));
            } else {
                card.style.display = 'none';
                card.classList.remove('visible');
            }
        });
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.filter || 'all';

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            filterProjects(category);
        });
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealCard(entry.target);
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -80px 0px'
    });

    projectCards.forEach(card => {
        observer.observe(card);
    });
});
