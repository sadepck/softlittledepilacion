document.addEventListener('DOMContentLoaded', function() {
    // Configuración del Intersection Observer
    const observerOptions = {
        threshold: 0.2, // Aumentado para que la animación comience cuando la sección esté más visible
        rootMargin: '0px 0px -100px 0px' // Mayor margen para activar la animación antes
    };

    // Callback para el Intersection Observer
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir clase 'visible' cuando la tarjeta está en el viewport
                entry.target.classList.add('visible');
                // Opcional: Dejar de observar después de la primera intersección
                observer.unobserve(entry.target);
            }
        });
    };

    // Crear el Intersection Observer
    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observar todas las tarjetas de testimonios
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        // Aplicar un retraso escalonado de 150ms entre cada tarjeta
        card.style.animationDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Manejar el evento de redimensionamiento para asegurar que las animaciones se mantengan correctas
    let resizeTimer;
    window.addEventListener('resize', () => {
        document.body.classList.add('resize-animation-stopper');
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.body.classList.remove('resize-animation-stopper');
        }, 600); // Aumentado a 600ms para dar más tiempo durante el redimensionamiento
    });
    
    // Forzar repintado para activar las transiciones después de cargar
    setTimeout(() => {
        document.body.classList.add('page-loaded');
    }, 100);
});
