// Configuración global
const CONFIG = {
    scrollOffset: 80,
    animationDuration: 800,
    mobileBreakpoint: 768
};

// Verificar si jQuery está cargado
if (typeof jQuery === 'undefined') {
    console.error('jQuery no está cargado correctamente');
} else {
    console.log('jQuery está cargado correctamente');
}

// Navegación suave mejorada (moved to global scope)
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - CONFIG.scrollOffset,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                const menuToggle = document.querySelector('.menu-toggle');
                if (menuToggle && menuToggle.classList.contains('active')) {
                    toggleMobileMenu();
                }
                
                // Actualizar URL sin recargar la página
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Función para inicializar componentes
function initComponents() {
    const $ = jQuery; // Asegurar que $ esté definido
    
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Inicializar tooltips
    if (typeof $.fn.tooltip === 'function') {
        $('[data-toggle="tooltip"]').tooltip();
    }
    
    // Inicializar carruseles
    initSliders();
    
    // Inicializar galería (manejada por before-after-slider.js)
    // No es necesario inicializar aquí si ya se maneja en su propio archivo
    
    // Inicializar testimonios (manejado por Slick en initSliders)
    
    // Inicializar carga perezosa de imágenes
    initLazyLoading();
    
    // Inicializar animaciones al hacer scroll
    initScrollAnimations();
}

// Inicialización cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const $ = jQuery; // Asegurar que $ esté definido
    
    // Inicializar AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: CONFIG.animationDuration,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }

    // Inicializar componentes
    initComponents();
    
    // Cambiar header al hacer scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Mostrar/ocultar botón de volver arriba
            const backToTop = document.querySelector('.back-to-top');
            if (backToTop) {
                backToTop.classList.toggle('active', window.scrollY > 300);
            }
        });
    }
    
    // Verificar si Slick está cargado antes de inicializar
    if (typeof $.fn.slick === 'function') {
        console.log('Slick está cargado correctamente');
        
        // Inicializar galería primero (si existe)
        if (document.querySelector('.gallery-slider')) {
            initGallery();
            initSliders();
        }
        
        // Inicializar testimonios (si existen)
        if (document.querySelector('.testimonials-slider')) {
            initTestimonials();
        }
    } else {
        console.error('Slick no está cargado correctamente');
    }
});

/**
 * Alternar menú móvil
 */
function toggleMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        const isOpening = !menuToggle.classList.contains('active');
        
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Bloquear scroll cuando el menú está abierto
        if (isOpening) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        
        // Agregar clase al body cuando el menú está abierto
        if (isOpening) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }
}

// Función para inicializar los sliders
function initSliders() {
    // Inicializar slider de galería
    const $gallerySlider = $('.gallery-slider');
    if ($gallerySlider.length > 0 && !$gallerySlider.hasClass('slick-initialized')) {
        $gallerySlider.slick({
            dots: true,
            infinite: true,
            speed: 600, // Aumentado para transición más suave
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000, // Aumentado para dar más tiempo de ver cada imagen
            pauseOnHover: true, // Pausar al pasar el mouse
            pauseOnFocus: true, // Pausar al hacer foco
            pauseOnDotsHover: true, // Pausar al pasar el mouse sobre los puntos
            cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)', // Transición más suave
            swipeToSlide: true, // Deslizar para avanzar
            touchThreshold: 10, // Más sensible al tactil
            touchMove: true, // Permitir arrastrar
            waitForAnimate: false, // Mejor rendimiento
            arrows: true, // Mostrar flechas de navegación
            prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        dots: true
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    // Inicializar slider de testimonios si existe
    const $testimonialsSlider = $('.testimonials-slider');
    if ($testimonialsSlider.length > 0 && !$testimonialsSlider.hasClass('slick-initialized')) {
        $testimonialsSlider.slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
}

// Función para inicializar la galería
function initGallery() {
    // Usando las imágenes disponibles
    const galleryImages = [
        { 
            before: 'images/descarga.jpg', 
            after: 'images/descarga (1).jpg', 
            title: 'Depilación profesional' 
        },
        { 
            before: 'images/CEJA1.jpg', 
            after: 'images/images.jpg', 
            title: 'Perfilado de cejas' 
        },
        { 
            before: 'images/lifting-pestanas-quito-ecuador-alaska-1024x1024.webp', 
            after: 'images/images (1).jpg', 
            title: 'Lifting de pestañas' 
        },
        { 
            before: 'images/gr1.jpeg', 
            after: 'images/istockphoto-1460105832-612x612.jpg', 
            title: 'Belleza y cuidado' 
        }
    ];
    
    const gallerySlider = document.querySelector('.gallery-slider');
    
    if (gallerySlider) {
        // Limpiar el contenedor
        gallerySlider.innerHTML = '';
        
        // Agregar imágenes al slider
        galleryImages.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            slide.innerHTML = `
                <div class="gallery-item">
                    <div class="gallery-image-container">
                        <div class="gallery-before">
                            <img src="${image.before}" alt="Antes - ${image.title}">
                            <span class="gallery-label">Antes</span>
                        </div>
                        <div class="gallery-after">
                            <img src="${image.after}" alt="Después - ${image.title}">
                            <span class="gallery-label">Después</span>
                        </div>
                    </div>
                    <h4>${image.title}</h4>
                </div>
            `;
            gallerySlider.appendChild(slide);
        });
    }
}

// Función para inicializar los testimonios
function initTestimonials() {
    // Datos de ejemplo para los testimonios (sin imágenes para evitar errores 404)
    const testimonials = [
        {
            name: 'María G.',
            role: 'Cliente frecuente',
            content: 'Excelente servicio de depilación. Muy profesional y el lugar es muy limpio. ¡Altamente recomendado!',
            image: '' // Sin imagen para evitar error 404
        },
        {
            name: 'Carlos M.',
            role: 'Nuevo cliente',
            content: 'Quedé impresionado con los resultados. La atención es personalizada y los precios son justos.',
            image: '' // Sin imagen para evitar error 404
        },
        {
            name: 'Ana L.',
            role: 'Cliente desde 2020',
            content: 'El mejor lugar para depilación que he probado. No vuelvo a ir a otro sitio. ¡Increíble!',
            image: '' // Sin imagen para evitar error 404
        },
        {
            name: 'Roberto S.',
            role: 'Cliente frecuente',
            content: 'Profesionales altamente capacitados. Siempre salgo satisfecho con los resultados.',
            image: '' // Sin imagen para evitar error 404
        }
    ];
    
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialsSlider) {
        // Limpiar el contenedor
        testimonialsSlider.innerHTML = '';
        
        // Agregar testimonios al slider
        testimonials.forEach((testimonial, index) => {
            const stars = '★'.repeat(5) + '☆'.repeat(0);
            
            const testimonialElement = document.createElement('div');
            testimonialElement.className = 'testimonial-slide';
            testimonialElement.innerHTML = `
                <div class="testimonial-card">
                    <div class="testimonial-rating">${stars}</div>
                    <p class="testimonial-content">"${testimonial.content}"</p>
                    <div class="testimonial-author">
                        ${testimonial.image ? `
                    <div class="testimonial-image">
                        <img src="${testimonial.image}" alt="${testimonial.name}">
                    </div>` : ''}
                        <div class="testimonial-info">
                            <h4>${testimonial.name}</h4>
                            <span>${testimonial.role}</span>
                        </div>
                    </div>
                </div>
            `;
            testimonialsSlider.appendChild(testimonialElement);
        });
    }
}

/**
 * Inicializar carga perezosa de imágenes
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                    
                    // Agregar clase cuando la imagen se carga
                    img.onload = () => {
                        img.classList.add('loaded');
                    };
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Inicializar animaciones al hacer scroll
 */
function initScrollAnimations() {
    // Efecto de aparición suave para las secciones
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Manejo del formulario de contacto
 */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Aquí podrías agregar la lógica para enviar el formulario
        const formData = new FormData(contactForm);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Simular envío del formulario (en un caso real, aquí harías una petición AJAX)
        console.log('Datos del formulario:', formObject);
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });
}

// Manejar cambios en el tamaño de la ventana
let resizeTimer;
window.addEventListener('resize', function() {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initComponents();
    
    // Agregar clase al body cuando se carga la página
    document.body.classList.add('page-loaded');
    
    // Eliminar preloader si existe
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 500);
    }
});

// Inicializar tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

// Inicializar popovers
$(function () {
    $('[data-toggle="popover"]').popover();
});

/**
 * Validar email
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Manejo del formulario de newsletter
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (email && validateEmail(email)) {
            // Aquí podrías agregar la lógica para suscribir al usuario
            console.log('Email suscrito:', email);
            alert('¡Gracias por suscribirte a nuestro boletín!');
            emailInput.value = '';
        } else {
            alert('Por favor, ingresa un correo electrónico válido.');
        }
    });
}
