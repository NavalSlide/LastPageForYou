// Estado de la aplicación
const pageState = {
    animationsEnabled: true,
    reducedMotion: false,
    currentViewport: 'mobile',
    galaxyAnimationId: null,
    audio: null,
    messageTimeouts: []
};

// Mensajes sincronizados ajustados a 110 segu
const synchronizedMessages = [
    { text: "Gracias Dome", duration: 3000 },
    { text: "Por enseñarme que el amor sí existe", duration: 5000 },
    { text: "Antes me parecía algo absurdo y decía que solo eran hormonas, estaba bien equivocado", duration: 7000 },
    { text: "Eres una persona única", duration: 4000 },
    { text: "Extraordinaria y sumamente hermosa", duration: 5000 },
    { text: "No dejes que tu percepción de ti cambie, porque lo que yo digo es la verdad", duration: 7000 },
    { text: "Eres una persona de corazón sensible, pero siempre te pones de pie", duration: 6000 },
    { text: "Siempre con una sonrisa en la cara por más fea que la vida te trate", duration: 7000 },
    { text: "Eres una buena persona, te preocupas por tu familia y tus amigas", duration: 6000 },
    { text: "Eres algo rara, algo loca, pero graciosa e interesante", duration: 6000 },
    { text: "Todo eso te hace ser Domenica Portilla, y espero que el próximo chico entienda eso", duration: 7000 },
    { text: "A veces me gusta cerrar los ojos y pensar en tu futuro", duration: 5000 },
    { text: "Domenica Portilla, una doctora que salvó muchas vidas del cáncer", duration: 6000 },
    { text: "Pero sobre todo no dejó su sueño de lado", duration: 5000 },
    { text: "Y ahí estás tú en el escenario, dando el baile más hermoso e increíble del mundo", duration: 7000 },
    { text: "La gente te aplaude y te admira porque tú tienes talento", duration: 6000 },
    { text: "Graciass por todo Dome", duration: 4000 },
    { text: "Al final solo somos humanos en constante aprendizaje de la vida", duration: 6000 },
    { text: "Chauuu", duration: 3000 }
];

// Inicializar audio
function initializeAudio() {
    try {
        pageState.audio = new Audio('music.mp3');
        pageState.audio.preload = 'auto';
        pageState.audio.loop = false;
        pageState.audio.volume = 0.15;

        console.log('🎵 Audio inicializado correctamente');
    } catch (error) {
        console.warn('⚠️ Error al cargar el audio:', error);
    }
}

// Reproducir audio y iniciar mensajes sincronizados
function playAudio() {
    if (pageState.audio) {
        try {
            pageState.audio.currentTime = 0; // Empezar desde el inicio
            const playPromise = pageState.audio.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log('🎵 Audio reproduciéndose');
                        // Iniciar mensajes sincronizados cuando empiece el audio
                        startSynchronizedMessages();
                    })
                    .catch(error => {
                        console.warn('⚠️ Error al reproducir audio:', error);
                        // Iniciar mensajes aunque falle el audio
                        startSynchronizedMessages();
                    });
            }
        } catch (error) {
            console.warn('⚠️ Error al reproducir audio:', error);
            // Iniciar mensajes aunque falle el audio
            startSynchronizedMessages();
        }
    } else {
        // Iniciar mensajes aunque no haya audio
        startSynchronizedMessages();
    }
}

// Mostrar un mensaje específico
function showMessage(text) {
    const messageContainer = document.getElementById('messageContainer');
    const messageText = document.getElementById('messageText');

    if (messageContainer && messageText) {
        // Ocultar mensaje anterior
        messageContainer.classList.remove('visible');

        setTimeout(() => {
            // Cambiar texto y mostrar nuevo mensaje
            messageText.textContent = text;
            messageContainer.classList.add('visible');
            console.log('💬 Mostrando:', text);
        }, 200);
    }
}

// Ocultar mensaje
function hideMessage() {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
        messageContainer.classList.remove('visible');
    }
}

// Iniciar secuencia de mensajes sincronizados
function startSynchronizedMessages() {
    console.log('📝 Iniciando mensajes sincronizados...');

    // Limpiar timeouts anteriores si existen
    pageState.messageTimeouts.forEach(timeout => clearTimeout(timeout));
    pageState.messageTimeouts = [];

    let currentTime = 0;

    synchronizedMessages.forEach((message, index) => {
        // Mostrar mensaje
        const showTimeout = setTimeout(() => {
            showMessage(message.text);
        }, currentTime);

        pageState.messageTimeouts.push(showTimeout);

        // Ocultar mensaje
        if (index < synchronizedMessages.length - 1) {
            // Para todos los mensajes excepto el último
            const hideTimeout = setTimeout(() => {
                hideMessage();
            }, currentTime + message.duration - 500); // Ocultar 500ms antes del siguiente

            pageState.messageTimeouts.push(hideTimeout);
        } else {
            // Para el último mensaje ("Chauuu"), ocultarlo después de 3 segundos
            const finalHideTimeout = setTimeout(() => {
                hideMessage();
                console.log('👋 "Chauuu" se desvanece... Solo queda el espacio infinito');
            }, currentTime + message.duration);

            pageState.messageTimeouts.push(finalHideTimeout);
        }

        currentTime += message.duration;
    });

    console.log(`📝 ${synchronizedMessages.length} mensajes programados durante ${currentTime / 1000}s`);
    console.log(`🌌 Después de ${currentTime / 1000}s, solo quedará el espacio vacío`);
}

// Detección de viewport y orientación
function detectViewport() {
    const width = window.innerWidth;
    if (width >= 1024) {
        pageState.currentViewport = 'desktop';
    } else if (width >= 768) {
        pageState.currentViewport = 'tablet';
    } else if (width >= 480) {
        pageState.currentViewport = 'mobile-large';
    } else {
        pageState.currentViewport = 'mobile';
    }
}

// Control de animaciones basado en rendimiento
function optimizeAnimations() {
    const isLowPowerMode = navigator.deviceMemory && navigator.deviceMemory < 4;
    const isSlowConnection = navigator.connection && navigator.connection.effectiveType === 'slow-2g';

    if (isLowPowerMode || isSlowConnection) {
        document.documentElement.style.setProperty('--animation-orbit', '40s');
        document.documentElement.style.setProperty('--animation-slow', '5s');
    }
}

// Efecto ripple para el botón
function createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    // Añadir clase para activar animación CSS
    button.classList.add('ripple-effect');

    setTimeout(() => {
        ripple.remove();
        button.classList.remove('ripple-effect');
    }, 600);
}

// Función para iniciar el viaje espacial
function startSpaceJourney() {
    const heroSection = document.querySelector('.hero-section');
    const galaxyBackground = document.querySelector('.galaxy-background');

    if (heroSection && galaxyBackground) {
        // 1. Título y botón salen hacia arriba y desaparecen para siempre
        heroSection.classList.add('exit-animation');

        // 2. Fondo se mueve hacia abajo por 2 segundos
        galaxyBackground.classList.add('button-pressed');

        console.log('🚀 Título y botón salen hacia arriba, fondo baja...');

        // 3. Después de 1.5s (cuando termina la salida), transición a blanco
        setTimeout(() => {
            galaxyBackground.classList.add('white-transition');
            console.log('⚪ Transición a pantalla blanca activada');
        }, 1500);

        // 4. Después de 2 segundos, fondo vuelve hacia la derecha
        setTimeout(() => {
            galaxyBackground.classList.remove('button-pressed');
            console.log('✨ Fondo vuelve hacia la derecha');
        }, 2000);

        // 5. Después de 4 segundos, quitar pantalla blanca y reproducir audio
        setTimeout(() => {
            galaxyBackground.classList.remove('white-transition');
            console.log('🌌 Pantalla blanca completada, movimiento normal');

            // Reproducir audio después de la pantalla blanca
            playAudio();
        }, 4000);
    }
}

// Detección y manejo de preferencias de accesibilidad
function handleAccessibilityPreferences() {
    // Detectar prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function updateMotionPreference(mediaQuery) {
        pageState.reducedMotion = mediaQuery.matches;

        if (pageState.reducedMotion) {
            console.log('Modo de movimiento reducido activado');
            document.body.classList.add('reduced-motion');

            // Desactivar animaciones complejas
            const galaxyBg = document.querySelector('.galaxy-background');
            if (galaxyBg) {
                galaxyBg.style.setProperty('--animation-orbit', '0s');
                galaxyBg.style.setProperty('--animation-slow', '0s');
            }
        } else {
            document.body.classList.remove('reduced-motion');
            console.log('Animaciones completas habilitadas');
        }
    }

    // Aplicar preferencia inicial
    updateMotionPreference(prefersReducedMotion);

    // Escuchar cambios en la preferencia
    if (prefersReducedMotion.addEventListener) {
        prefersReducedMotion.addEventListener('change', updateMotionPreference);
    } else {
        // Fallback para navegadores más antiguos
        prefersReducedMotion.addListener(updateMotionPreference);
    }
}

// Event listeners
function initializeEventListeners() {
    const ctaButton = document.querySelector('.cta-button');

    if (ctaButton) {
        // Click/touch events
        ctaButton.addEventListener('click', createRippleEffect);
        ctaButton.addEventListener('click', () => {
            console.log('Botón Empezar clickeado');
            startSpaceJourney();
        });

        // Prevenir doble tap zoom en móviles
        ctaButton.addEventListener('touchend', (e) => {
            e.preventDefault();
            ctaButton.click();
        });
    }

    // Resize listener para viewport detection
    window.addEventListener('resize', detectViewport);

    // Orientation change listener
    window.addEventListener('orientationchange', () => {
        setTimeout(detectViewport, 100);
    });
}

// Inicialización principal
document.addEventListener('DOMContentLoaded', () => {
    console.log('Mi último mensaje - Página cargada');

    detectViewport();
    optimizeAnimations();
    handleAccessibilityPreferences();
    initializeAudio();
    initializeEventListeners();

    console.log('Viewport actual:', pageState.currentViewport);
    console.log('Movimiento reducido:', pageState.reducedMotion);

    // Log final de estado
    console.log('🚀 Página "Mi último mensaje" completamente inicializada', {
        viewport: pageState.currentViewport,
        reducedMotion: pageState.reducedMotion,
        animationsEnabled: pageState.animationsEnabled,
        timestamp: new Date().toISOString()
    });
});