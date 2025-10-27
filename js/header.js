document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Verificar si los elementos existen
    if (!menuToggle || !navContainer) return;
    
    // Variables de estado
    let isMenuOpen = false;
    
    // Funciones auxiliares
    const isMobile = () => window.innerWidth <= 992;
    
    const openMenu = () => {
        if (!isMenuOpen) {
            isMenuOpen = true;
            menuToggle.classList.add('active');
            navContainer.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Forzar repintado para activar la transición
            void navContainer.offsetWidth;
            
            // Asegurar que el menú esté visible antes de la animación
            navContainer.style.display = 'flex';
            setTimeout(() => {
                navContainer.style.transform = 'translateX(0)';
            }, 10);
        }
    };
    
    const closeMenu = () => {
        if (isMenuOpen) {
            isMenuOpen = false;
            menuToggle.classList.remove('active');
            navContainer.classList.remove('active');
            overlay.classList.remove('active');
            
            // Esperar a que termine la animación para ocultar el menú
            setTimeout(() => {
                if (!isMenuOpen) {
                    navContainer.style.display = 'none';
                }
                document.body.style.overflow = '';
            }, 300);
        }
    };
    
    const toggleMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isMobile()) {
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }
    };
    
    const handleResize = () => {
        if (!isMobile()) {
            // Resetear estilos en desktop
            navContainer.style.display = 'flex';
            navContainer.style.transform = '';
            document.body.style.overflow = '';
            overlay.classList.remove('active');
            isMenuOpen = false;
            menuToggle.classList.remove('active');
        } else if (!isMenuOpen) {
            // En móvil, asegurarse de que el menú esté oculto
            navContainer.style.display = 'none';
        }
    };
    
    // Event Listeners
    menuToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link, .contact-button').forEach(link => {
        link.addEventListener('click', (e) => {
            if (isMobile()) {
                // Agregar feedback táctil
                link.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 100);
                
                // Cerrar menú después de un pequeño retraso
                setTimeout(() => {
                    closeMenu();
                }, 150);
            }
        });
    });
    
    // Manejar cambios de tamaño de ventana
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 250);
    });
    
    // Efecto de scroll en el header
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            // En la parte superior de la página
            header.classList.remove('scroll-down');
            header.classList.add('scroll-top');
            return;
        }
        
        header.classList.remove('scroll-top');
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Desplazamiento hacia abajo
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Desplazamiento hacia arriba
            header.classList.remove('scroll-down');
        }
        
        lastScroll = currentScroll;
    });
    
    // Inicialización
    if (!isMobile()) {
        navContainer.style.display = 'flex';
    } else {
        navContainer.style.display = 'none';
    }
});
