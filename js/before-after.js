document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando slider Antes/Después...');
    
    // Get all necessary elements
    const slider = document.querySelector('.before-after-container');
    if (!slider) {
        console.warn('No se encontró el contenedor del slider');
        return;
    }
    
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    // Check if required elements exist
    if (slides.length === 0) {
        console.warn('No hay slides en el slider');
        return;
    }
    
    // Configuración
    let currentSlide = 0;
    let isAnimating = false;
    let slideInterval;
    const slideDuration = 5000; // 5 segundos
    
    // Mostrar un slide específico
    function showSlide(index, direction = 'next') {
        if (isAnimating || !slides.length) return;
        isAnimating = true;
        
        const oldIndex = currentSlide;
        
        // Actualizar el índice actual
        currentSlide = (index + slides.length) % slides.length;
        
        // Actualizar indicadores
        updateIndicators();
        
        // Ocultar el slide actual y mostrar el nuevo
        slides[oldIndex].classList.remove('active');
        slides[currentSlide].classList.add('active');
        
        // Resetear la animación
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    // Actualizar indicadores
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Navegación
    function nextSlide() {
        if (isAnimating) return;
        showSlide(currentSlide + 1, 'next');
    }
    
    function prevSlide() {
        if (isAnimating) return;
        showSlide(currentSlide - 1, 'prev');
    }
    
    // Autoplay
    function startAutoPlay() {
        stopAutoPlay();
        slideInterval = setInterval(() => {
            if (document.hidden) return; // No avanzar si la pestaña no está activa
            nextSlide();
        }, slideDuration);
    }
    
    function stopAutoPlay() {
        clearInterval(slideInterval);
    }
    
    // Configurar event listeners
    function setupEventListeners() {
        // Botones de navegación
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoPlay();
                startAutoPlay();
            });
        }
        
        // Indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (index !== currentSlide && !isAnimating) {
                    currentSlide = index;
                    updateIndicators();
                    
                    // Ocultar todos los slides
                    slides.forEach(slide => slide.classList.remove('active'));
                    // Mostrar el slide seleccionado
                    slides[currentSlide].classList.add('active');
                    
                    stopAutoPlay();
                    startAutoPlay();
                }
            });
        });
        
        // Pausar al pasar el ratón
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);
        
        // Navegación por teclado
        document.addEventListener('keydown', handleKeyDown);
        
        // Soporte táctil
        let touchStartX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            stopAutoPlay();
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) { // Umbral de deslizamiento mínimo
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            startAutoPlay();
        }, { passive: true });
    }
    
    function handleKeyDown(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    }
    
    // Inicialización
    function initSlider() {
        // Mostrar el primer slide
        if (slides.length > 0) {
            slides[0].classList.add('active');
            if (indicators.length > 0) indicators[0].classList.add('active');
        }
        
        // Iniciar autoplay después de un breve retraso
        setTimeout(() => {
            startAutoPlay();
        }, 3000);
        
        // Configurar event listeners
        setupEventListeners();
    }
            if (isAnimating || !slides.length) return;
            isAnimating = true;
            
            const oldIndex = currentSlide;
            
            // Actualizar el índice actual
            currentSlide = (index + slides.length) % slides.length;
            
            // Actualizar indicadores
            updateIndicators();
            
            // Ocultar el slide actual y mostrar el nuevo
            slides[oldIndex].classList.remove('active');
            slides[currentSlide].classList.add('active');
            
            // Resetear la animación
            isAnimating = false;
        }
        
        // Actualizar indicadores
        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Navegación
        function nextSlide() {
            if (isAnimating) return;
            showSlide(currentSlide + 1, 'next');
        }
        
        function prevSlide() {
            if (isAnimating) return;
            showSlide(currentSlide - 1, 'prev');
        }
        
        // Autoplay
        function startAutoPlay() {
            stopAutoPlay();
            slideInterval = setInterval(() => {
                if (document.hidden) return; // No avanzar si la pestaña no está activa
                nextSlide();
            }, slideDuration);
        }
        
        function stopAutoPlay() {
            clearInterval(slideInterval);
        }
        
        // Event Listeners
        function setupEventListeners() {
            // Botones de navegación
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    nextSlide();
                    stopAutoPlay();
                    startAutoPlay();
                });
            }
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    prevSlide();
                    stopAutoPlay();
                    startAutoPlay();
                });
            }
            
            // Indicadores
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    if (index !== currentSlide && !isAnimating) {
                        currentSlide = index;
                        updateIndicators();
                        
                        // Ocultar todos los slides
                        slides.forEach(slide => slide.classList.remove('active'));
                        // Mostrar el slide seleccionado
                        slides[currentSlide].classList.add('active');
                        
                        stopAutoPlay();
                        startAutoPlay();
                    }
                });
            });
            
            // Pausar al pasar el ratón
            slider.addEventListener('mouseenter', stopAutoPlay);
            slider.addEventListener('mouseleave', startAutoPlay);
            
            // Navegación por teclado
            document.addEventListener('keydown', handleKeyDown);
            
            // Soporte táctil
            let touchStartX = 0;
            
            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                stopAutoPlay();
            }, { passive: true });
            
            slider.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > 50) { // Umbral de deslizamiento mínimo
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
                
                startAutoPlay();
            }, { passive: true });
        }
        
        function handleKeyDown(e) {
            if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
            
            startAutoPlay();
        }, { passive: true });
    }
    
    function handleKeyDown(e) {
        if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    }
    
    // Inicializar el slider
    initSlider();
    
    // Hacer el slider accesible
    slider.setAttribute('role', 'region');
    slider.setAttribute('aria-label', 'Galería de imágenes antes y después');
    
    // Añadir ARIA labels a los controles
    if (prevBtn) prevBtn.setAttribute('aria-label', 'Imagen anterior');
    if (nextBtn) nextBtn.setAttribute('aria-label', 'Siguiente imagen');
    
    // Asegurar que las imágenes tengan alt text
    document.querySelectorAll('.slide img').forEach((img, index) => {
        if (!img.alt) {
            img.alt = `Imagen ${index + 1} de antes y después`;
        }
    });
    
    // Hacer el slider accesible
    slider.setAttribute('role', 'region');
    slider.setAttribute('aria-label', 'Galería de imágenes antes y después');
    
    // Añadir ARIA labels a los controles
    if (prevBtn) prevBtn.setAttribute('aria-label', 'Imagen anterior');
    if (nextBtn) nextBtn.setAttribute('aria-label', 'Siguiente imagen');
    setupEventListeners();
        // Añadir ARIA labels a los controles
        if (prevBtn) prevBtn.setAttribute('aria-label', 'Imagen anterior');
        if (nextBtn) nextBtn.setAttribute('aria-label', 'Siguiente imagen');
    });
});
