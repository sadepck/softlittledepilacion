document.addEventListener('DOMContentLoaded', function() {
    const contactSlider = document.getElementById('contactSlider');
    const showFormBtn = document.getElementById('showFormBtn');
    const backToInfoBtn = document.getElementById('backToInfo');
    const slideDots = document.querySelectorAll('.slide-dot');
    
    // Show form when clicking the button
    if (showFormBtn) {
        showFormBtn.addEventListener('click', function(e) {
            e.preventDefault();
            contactSlider.classList.add('show-form');
            updateSlideDots(1);
        });
    }
    
    // Go back to info when clicking the back button
    if (backToInfoBtn) {
        backToInfoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            contactSlider.classList.remove('show-form');
            updateSlideDots(0);
        });
    }
    
    // Handle slide dots click
    slideDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            if (slideIndex === 1) {
                contactSlider.classList.add('show-form');
            } else {
                contactSlider.classList.remove('show-form');
            }
            updateSlideDots(slideIndex);
        });
    });
    
    // Update slide dots active state
    function updateSlideDots(activeIndex) {
        slideDots.forEach((dot, index) => {
            if (index === activeIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Add touch events for swiping
    let touchStartX = 0;
    let touchEndX = 0;
    
    contactSlider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    contactSlider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to consider it a swipe
        const isFormVisible = contactSlider.classList.contains('show-form');
        
        // Swipe left (show form)
        if (touchEndX < touchStartX - swipeThreshold && !isFormVisible) {
            contactSlider.classList.add('show-form');
            updateSlideDots(1);
        }
        
        // Swipe right (show info)
        if (touchEndX > touchStartX + swipeThreshold && isFormVisible) {
            contactSlider.classList.remove('show-form');
            updateSlideDots(0);
        }
    }
});
