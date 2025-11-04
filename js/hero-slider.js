// Hero Slider Initialization
document.addEventListener('DOMContentLoaded', function() {
    $('.hero-slider').slick({
        dots: true,
        arrows: true,
        infinite: true,
        speed: 1000,
        fade: true,
        cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: false,
        pauseOnFocus: false,
        prevArrow: '<button type="button" class="slick-prev" aria-label="Anterior"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next" aria-label="Siguiente"><i class="fas fa-chevron-right"></i></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    arrows: false
                }
            },
            {
                breakpoint: 576,
                settings: {
                    dots: false,
                    arrows: false
                }
            }
        ]
    });

    // Add animation classes when slide changes
    $('.hero-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        // Reset animations for all slides
        $('.hero-slide').removeClass('slick-active');
        $('.hero-pretitle, .hero-title, .hero-description, .cta-buttons').css({
            'opacity': '0',
            'transform': 'translateY(20px)'
        });
    });

    $('.hero-slider').on('afterChange', function(event, slick, currentSlide) {
        // Add active class to current slide
        $('.hero-slide').eq(currentSlide).addClass('slick-active');
        
        // Animate elements with different delays
        setTimeout(function() {
            $('.hero-slide.slick-active .hero-pretitle').css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, 300);
        
        setTimeout(function() {
            $('.hero-slide.slick-active .hero-title').css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, 500);
        
        setTimeout(function() {
            $('.hero-slide.slick-active .hero-description').css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, 700);
        
        setTimeout(function() {
            $('.hero-slide.slick-active .cta-buttons').css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, 900);
    });

    // Initialize first slide
    $('.hero-slide').first().addClass('slick-active');
    $('.hero-slide.slick-active .hero-pretitle, .hero-slide.slick-active .hero-title, .hero-slide.slick-active .hero-description, .hero-slide.slick-active .cta-buttons').css({
        'opacity': '1',
        'transform': 'translateY(0)'
    });
});

// Pause video when changing slides
$('.hero-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    var $currentSlide = $(slick.$slides[currentSlide]);
    var $video = $currentSlide.find('video');
    
    if ($video.length) {
        $video[0].pause();
    }
});

$('.hero-slider').on('afterChange', function(event, slick, currentSlide) {
    var $currentSlide = $(slick.$slides[currentSlide]);
    var $video = $currentSlide.find('video');
    
    if ($video.length) {
        $video[0].play().catch(function(e) {
            // Autoplay was prevented, handle it here
            console.log('Autoplay prevented:', e);
        });
    }
});
