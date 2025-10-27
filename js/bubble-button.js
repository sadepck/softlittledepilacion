/**
 * Bubble Button Animation
 * Controla la animación de burbujas en el botón de contacto
 */
document.addEventListener('DOMContentLoaded', function() {
    const bubbleButton = document.querySelector('.bubble-button');
    const bubbleContainer = document.querySelector('.bubble-container');
    
    if (!bubbleButton || !bubbleContainer) return;

    // Configuración de las burbujas
    const config = {
        bubbleCount: 12,           // Número total de burbujas
        minSize: 6,               // Tamaño mínimo de burbuja (px)
        maxSize: 16,              // Tamaño máximo de burbuja (px)
        animationDuration: {       // Duración de la animación (ms)
            min: 2000,
            max: 4000
        },
        delay: {                  // Retraso entre burbujas (ms)
            min: 100,
            max: 300
        },
        opacity: {                // Opacidad de las burbujas
            min: 0.5,
            max: 0.9
        },
        colors: [                 // Colores de las burbujas
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 230, 240, 0.8)',
            'rgba(255, 210, 230, 0.7)',
            'rgba(255, 190, 220, 0.6)'
        ]
    };

    // Variables de estado
    let isHovering = false;
    let animationFrame;
    let bubbles = [];

    // Crear burbujas
    function createBubbles() {
        // Limpiar contenedor
        bubbleContainer.innerHTML = '';
        bubbles = [];

        for (let i = 0; i < config.bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            // Tamaño aleatorio
            const size = getRandomInt(config.minSize, config.maxSize);
            
            // Posición horizontal aleatoria
            const posX = getRandomInt(10, 90);
            
            // Color aleatorio
            const color = config.colors[Math.floor(Math.random() * config.colors.length)];
            
            // Establecer estilos iniciales
            Object.assign(bubble.style, {
                width: `${size}px`,
                height: `${size}px`,
                left: `${posX}%`,
                bottom: '0',
                background: color,
                opacity: '0',
                transform: 'translateY(0) scale(0.8)',
                willChange: 'transform, opacity'
            });

            bubbleContainer.appendChild(bubble);
            bubbles.push({
                element: bubble,
                size: size,
                speed: getRandomInt(config.animationDuration.min, config.animationDuration.max),
                delay: getRandomInt(0, config.delay.max * config.bubbleCount),
                x: posX,
                y: 0,
                scale: 0.8 + Math.random() * 0.5,
                rotation: (Math.random() - 0.5) * 30,
                opacity: config.opacity.min + Math.random() * (config.opacity.max - config.opacity.min)
            });
        }
    }

    // Animar burbujas
    function animateBubbles(timestamp) {
        if (!isHovering) {
            animationFrame = requestAnimationFrame(animateBubbles);
            return;
        }

        bubbles.forEach(bubble => {
            // Solo animar si ha pasado el retraso inicial
            if (timestamp < bubble.delay) return;
            
            const elapsed = (timestamp - bubble.delay) % bubble.speed;
            const progress = elapsed / bubble.speed;
            
            // Calcular posición Y (easeOutCubic)
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const y = -100 * easeOutCubic;
            
            // Calcular opacidad (aparece rápido, desaparece suave)
            let opacity = 0;
            if (progress < 0.1) {
                // Aparecer rápido
                opacity = (progress / 0.1) * bubble.opacity;
            } else if (progress > 0.7) {
                // Desvanecer al final
                opacity = (1 - (progress - 0.7) / 0.3) * bubble.opacity;
            } else {
                // Mantener opacidad
                opacity = bubble.opacity;
            }
            
            // Calcular escala (crece mientras sube)
            const scale = 0.8 + (bubble.scale * progress);
            
            // Aplicar transformaciones
            bubble.element.style.opacity = opacity;
            bubble.element.style.transform = `
                translateY(${y}px) 
                scale(${scale}) 
                rotate(${bubble.rotation * progress}deg)
            `;
            
            // Si la animación terminó, reiniciar
            if (progress >= 1) {
                bubble.delay = timestamp + getRandomInt(0, config.delay.max * 2);
            }
        });

        animationFrame = requestAnimationFrame(animateBubbles);
    }

    // Iniciar animación al hacer hover
    function startAnimation() {
        if (isHovering) return;
        isHovering = true;
        
        // Iniciar animación si no está en curso
        if (!animationFrame) {
            animationFrame = requestAnimationFrame(animateBubbles);
        }
    }

    // Detener animación al salir del botón
    function stopAnimation() {
        isHovering = false;
        
        // Limpiar animación si no hay hover después de un tiempo
        setTimeout(() => {
            if (!isHovering && animationFrame) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }
        }, 1000);
    }

    // Event listeners
    bubbleButton.addEventListener('mouseenter', startAnimation);
    bubbleButton.addEventListener('mouseleave', stopAnimation);
    
    // Para dispositivos táctiles
    bubbleButton.addEventListener('touchstart', startAnimation);
    bubbleButton.addEventListener('touchend', stopAnimation);
    
    // Inicializar burbujas
    createBubbles();
    
    // Función auxiliar para obtener un número entero aleatorio
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});
