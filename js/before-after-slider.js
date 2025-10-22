document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando slider Antes/Después...');
    
    // Get all necessary elements
    const slider = document.querySelector('.before-after-container');
    const slides = document.querySelectorAll('.before-after-slide');
    const prevBtn = document.querySelector('.before-after-prev');
    const nextBtn = document.querySelector('.before-after-next');
    const indicators = document.querySelectorAll('.before-after-indicator');
    
    // Check if required elements exist
    if (!slider || slides.length === 0) {
        console.warn('No se encontró el slider o no hay slides');
        return;
    }
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isAnimating = false;
    let autoPlayInterval;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Initialize slider
    function initSlider() {
        // Set initial active slide
        updateSlider();
        
        // Add event listeners for navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', showPreviousSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', showNextSlide);
        }
        
        // Add event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
        
        // Add touch events for swipe
        slider.addEventListener('touchstart', handleTouchStart, { passive: true });
        slider.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Start auto play
        startAutoPlay();
        
        // Pause on hover
        slider.addEventListener('mouseenter', pauseAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);
        
        // Keyboard navigation
        document.addEventListener('keydown', handleKeyDown);
    }
    
    // Touch event handlers
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to consider it a swipe
        
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left - go to next slide
            showNextSlide();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right - go to previous slide
            showPreviousSlide();
        }
    }
    
    // Navigation functions
    function showNextSlide() {
        goToSlide((currentSlide + 1) % totalSlides);
    }
    
    function showPreviousSlide() {
        goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    }
    
    function goToSlide(index) {
        if (isAnimating || index === currentSlide) return;
        
        isAnimating = true;
        
        // Update current slide
        currentSlide = (index + totalSlides) % totalSlides;
        updateSlider();
        
        // Reset animation flag
        setTimeout(() => {
            isAnimating = false;
        }, 500); // Match this with your CSS transition duration
    }
    
    // Update slider position with smooth transition
    function updateSlider() {
        // Hide all slides first
        slides.forEach((slide, index) => {
            const isActive = index === currentSlide;
            slide.style.opacity = isActive ? '1' : '0';
            slide.style.transform = isActive ? 'scale(1)' : 'scale(0.9)';
            slide.style.pointerEvents = isActive ? 'auto' : 'none';
            slide.classList.toggle('active', isActive);
        });
        
        // Update indicators if they exist
        if (indicators.length > 0) {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }
    }
    
    // Auto play functions
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(showNextSlide, 5000);
    }
    
    function pauseAutoPlay() {
        stopAutoPlay();
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }
    
    // Keyboard navigation
    function handleKeyDown(e) {
        if (e.key === 'ArrowRight') {
            showNextSlide();
            pauseAutoPlay();
        } else if (e.key === 'ArrowLeft') {
            showPreviousSlide();
            pauseAutoPlay();
        }
    }
    
    // Initialize the slider
    initSlider();
    
    // Start auto-rotation
    let autoRotateInterval = setInterval(() => {
        showNextSlide();
    }, 5000);
    
    // Pause auto-rotation when user interacts with the slider
    slider.addEventListener('mouseenter', function() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
    });
    
    // Resume auto-rotation when user leaves the slider
    slider.addEventListener('mouseleave', function() {
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
        }
        autoRotateInterval = setInterval(() => {
            showNextSlide();
        }, 5000);
    });
});
