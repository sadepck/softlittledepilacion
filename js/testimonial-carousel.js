document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando carrusel de testimonios...');
    
    const d = document;
    const $q = d.querySelectorAll.bind(d);
    const $g = d.querySelector.bind(d);
    const $carousel = $g(".testimonial-carousel");
    
    // Check if carousel exists
    if (!$carousel) {
        console.warn('No se encontró el carrusel de testimonios');
        return;
    }
    
    const $prev = $g(".testimonial-carousel-prev");
    const $next = $g(".testimonial-carousel-next");
    const $list = $g(".testimonial-carousel .carousel__list");
    const $slides = $q(".testimonial-carousel .carousel__item");
    
    // Check if required elements exist
    if (!$prev || !$next || !$list || $slides.length === 0) {
        console.warn('No se encontraron los elementos necesarios para el carrusel', {
            prev: !!$prev,
            next: !!$next,
            list: !!$list,
            slides: $slides.length
        });
        return;
    }
    
    let auto;
    let pauser;

    // Initialize carousel
    function initCarousel() {
        // Set the first slide as active if none is active
        if (!$g(".testimonial-carousel [data-active]")) {
            const $firstItem = $q(".testimonial-carousel .carousel__item")[0];
            if ($firstItem) {
                $firstItem.setAttribute('data-active', 'true');
            }
        }
        
        // Add event listeners
        if ($prev) $prev.addEventListener("click", handlePrevClick);
        if ($next) $next.addEventListener("click", handleNextClick);
        if ($list) {
            $list.addEventListener("click", handleSlideClick);
            $list.addEventListener("focusin", handleSlideClick);
            $list.addEventListener("keyup", handleSlideKey);
        }
        
        // Start auto-rotation
        startAuto();
    }

    const getActiveIndex = () => {
        const $active = $g(".testimonial-carousel [data-active]");
        return getSlideIndex($active);
    }

    const getSlideIndex = ($slide) => {
        if (!$slide) return -1;
        return [...$q(".testimonial-carousel .carousel__item")].indexOf($slide);
    }

    const prevSlide = () => {
        const $slides = $q(".testimonial-carousel .carousel__item");
        if ($slides.length === 0) return;
        
        const $last = $slides[$slides.length-1];
        $last.remove();
        $list.prepend($last);
        
        // Get the new active slide (which is now at the previous position)
        const newActiveIndex = Math.min(1, $slides.length - 1);
        const $newActive = $q(".testimonial-carousel .carousel__item")[newActiveIndex];
        activateSlide($newActive);
    }

    const nextSlide = () => {
        const $slides = $q(".testimonial-carousel .carousel__item");
        if ($slides.length === 0) return;
        
        const $first = $slides[0];
        $first.remove();
        $list.appendChild($first);
        
        // Get the new active slide (which is now at the next position)
        const newActiveIndex = Math.min(1, $slides.length - 1);
        const $newActive = $q(".testimonial-carousel .carousel__item")[newActiveIndex];
        activateSlide($newActive);
    }

    const chooseSlide = (e) => {
        const $slide = e.target.closest(".carousel__item");
        if (!$slide) return;
        
        const index = getSlideIndex($slide);
        const $slides = $q(".testimonial-carousel .carousel__item");
        const activeIndex = getActiveIndex();
        
        if (index < activeIndex) {
            prevSlide();
        } else if (index > activeIndex) {
            nextSlide();
        }
        
        activateSlide($slide);
    }

    const activateSlide = ($slide) => {
        if (!$slide) return;
        
        // Remove active state from all slides
        const $allSlides = $q(".testimonial-carousel .carousel__item");
        $allSlides.forEach(el => el.removeAttribute('data-active'));
        
        // Set the new active slide
        $slide.setAttribute('data-active', 'true');
        $slide.focus();
    }

    const autoSlide = () => {
        nextSlide();
    }

    const pauseAuto = () => {
        clearInterval(auto);
        clearTimeout(pauser);
    }

    const handleNextClick = (e) => {
        e.preventDefault();
        pauseAuto();
        nextSlide();
        // Restart auto-rotation after a delay
        pauser = setTimeout(startAuto, 5000);
    }

    const handlePrevClick = (e) => {
        e.preventDefault();
        pauseAuto();
        prevSlide();
        // Restart auto-rotation after a delay
        pauser = setTimeout(startAuto, 5000);
    }

    const handleSlideClick = (e) => {
        if (e.target.closest('button')) return; // Don't interfere with button clicks
        pauseAuto();
        chooseSlide(e);
        // Restart auto-rotation after a delay
        pauser = setTimeout(startAuto, 5000);
    }

    const handleSlideKey = (e) => {
        switch(e.key) {
            case 'ArrowLeft':
            case 'a':
            case 'A':
                handlePrevClick(e);
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                handleNextClick(e);
                break;
            case 'Enter':
            case ' ':
                handleSlideClick(e);
                break;
        }
    }

    const startAuto = () => {
        // Clear any existing interval
        if (auto) clearInterval(auto);
        // Start new interval (rotate every 5 seconds)
        auto = setInterval(autoSlide, 5000);
    }

    // Initialize the carousel when the DOM is fully loaded
    initCarousel();

    // Pause auto-rotation when user hovers over the carousel
    if ($carousel) {
        $carousel.addEventListener('mouseenter', pauseAuto);
        $carousel.addEventListener('mouseleave', startAuto);
        $carousel.addEventListener('focusin', pauseAuto);
        $carousel.addEventListener('focusout', startAuto);
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Recalculate positions on resize
            const $active = $g(".testimonial-carousel [data-active]");
            if ($active) {
                activateSlide($active);
            }
        }, 250);
    });
});
