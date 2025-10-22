// Asegurarse de que jQuery esté listo
if (typeof jQuery == 'undefined') {
    console.error('jQuery no está cargado correctamente');
} else {
    console.log('jQuery está cargado correctamente');
}

// Inicialización cuando el DOM esté completamente cargado
jQuery(document).ready(function($) {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si está abierto
                if (document.querySelector('.menu-toggle').classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
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
                if (window.scrollY > 300) {
                    backToTop.classList.add('active');
                } else {
                    backToTop.classList.remove('active');
                }
            }
        });
    }
    
    // Inicializar sliders
    initSliders();
    
    // Inicializar galería
    initGallery();
    
    // Inicializar testimonios
    initTestimonials();

    // Forzar la actualización de Slick después de que todo esté cargado
    if (typeof $.fn.slick === 'function') {
        console.log('Slick está cargado correctamente');
        // Destruir el carrusel si ya existe
        if ($('.gallery-slider').hasClass('slick-initialized')) {
            $('.gallery-slider').slick('unslick');
        }
        // Inicializar el carrusel
        initSliders();
    } else {
        console.error('Slick no está cargado correctamente');
    }
});

// Función para alternar el menú móvil
function toggleMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Agregar o quitar clase al body para evitar el scroll cuando el menú está abierto
    document.body.classList.toggle('menu-open');
}

// Función para inicializar los sliders
function initSliders() {
    // Verificar que el elemento exista
    if ($('.gallery-slider').length === 0) {
        console.error('No se encontró el elemento .gallery-slider');
        return;
    }

    // Slider de galería
    $('.gallery-slider').slick({
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
    
    // Slider de testimonios
    $('.testimonials-slider').slick({
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

// Función para inicializar la galería
function initGallery() {
    // Aquí podrías cargar dinámicamente las imágenes de la galería
    const galleryImages = [
        { before: 'images/before-1.jpg', after: 'images/after-1.jpg', title: 'Depilación de piernas' },
        { before: 'images/before-2.jpg', after: 'images/after-2.jpg', title: 'Perfilado de cejas' },
        { before: 'images/before-3.jpg', after: 'images/after-3.jpg', title: 'Lifting de pestañas' },
        { before: 'images/before-4.jpg', after: 'images/after-4.jpg', title: 'Brow Lamination' },
        { before: 'images/before-5.jpg', after: 'images/after-5.jpg', title: 'Limpieza facial' },
        { before: 'images/before-6.jpg', after: 'images/after-6.jpg', title: 'Depilación de axilas' }
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
    // Aquí podrías cargar dinámicamente los testimonios
    const testimonials = [
        {
            name: 'María González',
            role: 'Cliente frecuente',
            content: 'Excelente servicio de depilación. Muy profesional y con excelentes resultados. ¡Mi piel nunca se había sentido tan suave!',
            rating: 5,
            image: 'images/testimonial-1.jpg'
        },
        {
            name: 'Carolina Martínez',
            role: 'Nueva cliente',
            content: 'El perfilado de cejas quedó perfecto. Me encantó la atención y los resultados. ¡Volveré pronto!',
            rating: 5,
            image: 'images/testimonial-2.jpg'
        },
        {
            name: 'Andrea Rojas',
            role: 'Cliente desde 2023',
            content: 'El lifting de pestañas es increíble. Me ahorro mucho tiempo en el maquillaje y se ven naturales.',
            rating: 5,
            image: 'images/testimonial-3.jpg'
        },
        {
            name: 'Daniela Sánchez',
            role: 'Cliente',
            content: 'La mejor experiencia en depilación que he tenido. Muy profesional y con excelentes resultados.',
            rating: 4,
            image: 'images/testimonial-4.jpg'
        }
    ];
    
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    
    if (testimonialsSlider) {
        // Limpiar el contenedor
        testimonialsSlider.innerHTML = '';
        
        // Agregar testimonios al slider
        testimonials.forEach((testimonial, index) => {
            const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
            
            const testimonialElement = document.createElement('div');
            testimonialElement.className = 'testimonial-slide';
            testimonialElement.innerHTML = `
                <div class="testimonial-card">
                    <div class="testimonial-rating">${stars}</div>
                    <p class="testimonial-content">"${testimonial.content}"</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">
                            <img src="${testimonial.image}" alt="${testimonial.name}">
                        </div>
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

// Manejo del formulario de contacto
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

// Función para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Inicializar tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

// Inicializar popovers
$(function () {
    $('[data-toggle="popover"]').popover();
});
