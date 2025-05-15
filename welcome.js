// Simple Touch-Friendly Gallery
document.addEventListener('DOMContentLoaded', function() {
    const simpleGallery = document.querySelector('.simple-gallery-container');
    const dots = document.querySelectorAll('.simple-gallery-dot');
    const prevBtn = document.querySelector('.simple-gallery-arrow.prev');
    const nextBtn = document.querySelector('.simple-gallery-arrow.next');
    const itemCount = document.querySelectorAll('.simple-gallery-item').length;
    let currentIndex = 0;
    
    // Function to update slider position
    function updateSlider() {
        simpleGallery.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Event listeners for arrows
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemCount - 1;
        updateSlider();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });
    
    // Event listeners for dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.dataset.index);
            updateSlider();
        });
    });
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    simpleGallery.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    simpleGallery.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to trigger swipe
        const difference = touchEndX - touchStartX;
        
        if (Math.abs(difference) < swipeThreshold) {
            return; // Ignore small movements
        }
        
        if (difference < 0) {
            // Swipe left
            currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
        } else {
            // Swipe right
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemCount - 1;
        }
        updateSlider();
    }
    
    // Optional: Auto slide functionality with pause on hover
    let autoSlideInterval;
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
            updateSlider();
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Start auto-sliding but pause when user interacts
    startAutoSlide();
    
    simpleGallery.addEventListener('mouseenter', stopAutoSlide);
    simpleGallery.addEventListener('touchstart', stopAutoSlide);
    
    simpleGallery.addEventListener('mouseleave', startAutoSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemCount - 1;
            updateSlider();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
            updateSlider();
        }
    });
});