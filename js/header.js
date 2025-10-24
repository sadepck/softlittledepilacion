document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links-container');
    const header = document.querySelector('.header');
    
    // Crear overlay si no existe
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
        
        // Cerrar menú al hacer clic en el overlay
        overlay.addEventListener('click', function() {
            if (isMobile()) {
                closeMenu();
            }
        });
    }
    
    // Verificar que los elementos existen
    if (!menuToggle || !navLinksContainer || !header) return;
    
    // Función para verificar si es móvil (menos de 768px)
    function isMobile() {
        return window.innerWidth < 768;
    }
    
    // Función para verificar si es tablet (entre 768px y 992px)
    function isTablet() {
        return window.innerWidth >= 768 && window.innerWidth <= 992;
    }
    
    // Función para abrir el menú
    function openMenu() {
        if (!isTablet()) { // Solo aplicar en móvil
            menuToggle.classList.add('active');
            navLinksContainer.classList.add('active');
            overlay.classList.add('active');
            header.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            navLinksContainer.style.display = 'flex';
            
            // Forzar repintado para activar la transición
            void navLinksContainer.offsetWidth;
            
            navLinksContainer.style.right = '0';
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
        }
    }
    
    // Función para cerrar el menú
    function closeMenu() {
        if (!isTablet()) { // Solo aplicar en móvil
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
            overlay.classList.remove('active');
            header.classList.remove('menu-open');
            
            // Iniciar animación de cierre
            navLinksContainer.style.right = '-100%';
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            
            // Restaurar scroll después de la animación
            setTimeout(() => {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            }, 300);
        }
    }
    
    // Inicialización
    function initMenu() {
        if (isMobile()) {
            // En móvil, el menú empieza cerrado
            closeMenu();
        } else if (isTablet()) {
            // En tablet, el menú siempre visible
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.opacity = '1';
            navLinksContainer.style.visibility = 'visible';
            menuToggle.style.display = 'none';
        } else {
            // En desktop, menú siempre visible
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.opacity = '1';
            navLinksContainer.style.visibility = 'visible';
            menuToggle.style.display = 'none';
        }
    }
    
    // Manejar cambios de tamaño de pantalla
    function handleResize() {
        if (isTablet() || window.innerWidth > 992) {
            // En tablet o desktop
            menuToggle.style.display = 'none';
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.opacity = '1';
            navLinksContainer.style.visibility = 'visible';
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        } else {
            // En móvil
            menuToggle.style.display = 'flex';
            if (!menuToggle.classList.contains('active')) {
                navLinksContainer.style.display = 'none';
                navLinksContainer.style.opacity = '0';
                navLinksContainer.style.visibility = 'hidden';
            }
        }
    }
    
    // Toggle del menú al hacer clic en el botón
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isMobile()) { // Solo funciona en móvil
            if (this.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        }
    });
    
    // Manejar clics en los enlaces del menú
    document.querySelectorAll('.nav-links a, .contact-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (isMobile()) {
                // Agregar una pequeña animación al hacer clic
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
                
                // Cerrar el menú después de un pequeño retraso para la animación
                setTimeout(() => {
                    closeMenu();
                }, 150);
            }
        });
        
        // Mejorar la retroalimentación táctil
        link.addEventListener('touchstart', function() {
            if (isMobile()) {
                this.style.opacity = '0.8';
            }
        });
        
        link.addEventListener('touchend', function() {
            if (isMobile()) {
                this.style.opacity = '1';
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera de él (solo en móvil)
    document.addEventListener('click', function(e) {
        if (isMobile() && 
            !e.target.closest('.nav-links-container') && 
            !e.target.closest('.menu-toggle') &&
            navLinksContainer.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Cerrar menú al hacer scroll en móviles
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 992) {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (Math.abs(st - lastScrollTop) > 50 && navLinksContainer.classList.contains('active')) {
                closeMenu();
            }
            lastScrollTop = st <= 0 ? 0 : st;
        }
    });
    
    // Inicializar menú
    initMenu();
    
    // Manejar cambios de tamaño de pantalla
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            handleResize();
        }, 250);
    });
    
    // Efecto de scroll en el header
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scrolled-down')) {
            // Scroll down
            header.classList.add('scrolled-down');
            header.style.transform = 'translateY(-100%)';
        } else if (currentScroll < lastScroll && header.classList.contains('scrolled-down')) {
            // Scroll up
            header.classList.remove('scrolled-down');
            header.style.transform = 'translateY(0)';
        }
        
        header.classList.add('scrolled');
        lastScroll = currentScroll;
    });
});
