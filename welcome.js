// Enhanced Touch-Friendly Gallery with Improved Features
document.addEventListener('DOMContentLoaded', function() {
    const simpleGallery = document.querySelector('.simple-gallery-container');
    const dots = document.querySelectorAll('.simple-gallery-dot');
    const prevBtn = document.querySelector('.simple-gallery-arrow.prev');
    const nextBtn = document.querySelector('.simple-gallery-arrow.next');
    const itemCount = document.querySelectorAll('.simple-gallery-item').length;
    let currentIndex = 0;
    let autoSlideInterval;
    let isAutoSliding = true;
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    // Function to update slider position with smooth animation
    function updateSlider() {
        simpleGallery.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot with animation
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Add a subtle bounce effect to the current slide
        const currentSlide = document.querySelectorAll('.simple-gallery-item')[currentIndex];
        currentSlide.style.animation = 'slideIn 0.6s ease-out';
        setTimeout(() => {
            currentSlide.style.animation = '';
        }, 600);
    }
    
    // Enhanced navigation functions
    function goToNext() {
        currentIndex = (currentIndex < itemCount - 1) ? currentIndex + 1 : 0;
        updateSlider();
    }
    
    function goToPrev() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemCount - 1;
        updateSlider();
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    // Event listeners for arrows with improved UX
    prevBtn.addEventListener('click', () => {
        goToPrev();
        pauseAutoSlide();
    });
    
    nextBtn.addEventListener('click', () => {
        goToNext();
        pauseAutoSlide();
    });
    
    // Event listeners for dots with haptic feedback
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            pauseAutoSlide();
        });
        
        // Add hover effect for dots
        dot.addEventListener('mouseenter', () => {
            if (index !== currentIndex) {
                dot.style.transform = 'scale(1.2)';
                dot.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
            }
        });
        
        dot.addEventListener('mouseleave', () => {
            if (index !== currentIndex) {
                dot.style.transform = '';
                dot.style.backgroundColor = '';
            }
        });
    });
    
    // Enhanced touch events for mobile with better gesture recognition
    simpleGallery.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        pauseAutoSlide();
    }, { passive: true });
    
    simpleGallery.addEventListener('touchmove', (e) => {
        // Prevent default scrolling during horizontal swipes
        const touchMoveX = e.changedTouches[0].screenX;
        const touchMoveY = e.changedTouches[0].screenY;
        const diffX = Math.abs(touchMoveX - touchStartX);
        const diffY = Math.abs(touchMoveY - touchStartY);
        
        if (diffX > diffY) {
            e.preventDefault();
        }
    }, { passive: false });
    
    simpleGallery.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const verticalThreshold = 100;
        const horizontalDiff = touchEndX - touchStartX;
        const verticalDiff = touchEndY - touchStartY;
        
        // Only process horizontal swipes
        if (Math.abs(horizontalDiff) < swipeThreshold) {
            resumeAutoSlide();
            return;
        }
        
        // Ignore if vertical movement is too large (likely scrolling)
        if (Math.abs(verticalDiff) > verticalThreshold) {
            resumeAutoSlide();
            return;
        }
        
        if (horizontalDiff < 0) {
            // Swipe left - go to next
            goToNext();
        } else {
            // Swipe right - go to previous
            goToPrev();
        }
        
        // Resume auto-slide after a delay
        setTimeout(resumeAutoSlide, 3000);
    }
    
    // Auto-slide functionality with smart pause/resume
    function startAutoSlide() {
        if (itemCount <= 1) return; // Don't auto-slide if only one item
        
        autoSlideInterval = setInterval(() => {
            if (isAutoSliding) {
                goToNext();
            }
        }, 5000);
    }
    
    function pauseAutoSlide() {
        isAutoSliding = false;
        clearInterval(autoSlideInterval);
    }
    
    function resumeAutoSlide() {
        isAutoSliding = true;
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Mouse interaction handlers
    const galleryContainer = document.querySelector('.simple-gallery');
    
    galleryContainer.addEventListener('mouseenter', pauseAutoSlide);
    galleryContainer.addEventListener('mouseleave', () => {
        setTimeout(resumeAutoSlide, 1000); // Resume after 1 second
    });
    
    // Keyboard navigation with accessibility
    document.addEventListener('keydown', (e) => {
        // Only handle keyboard events when gallery is in focus or visible
        const galleryRect = galleryContainer.getBoundingClientRect();
        const isGalleryVisible = galleryRect.top < window.innerHeight && galleryRect.bottom > 0;
        
        if (!isGalleryVisible) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                goToPrev();
                pauseAutoSlide();
                setTimeout(resumeAutoSlide, 3000);
                break;
            case 'ArrowRight':
                e.preventDefault();
                goToNext();
                pauseAutoSlide();
                setTimeout(resumeAutoSlide, 3000);
                break;
            case ' ': // Spacebar
                e.preventDefault();
                if (isAutoSliding) {
                    pauseAutoSlide();
                } else {
                    resumeAutoSlide();
                }
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                pauseAutoSlide();
                setTimeout(resumeAutoSlide, 3000);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(itemCount - 1);
                pauseAutoSlide();
                setTimeout(resumeAutoSlide, 3000);
                break;
        }
    });
    
    // Add progress indicator
    function createProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'gallery-progress';
        progressBar.innerHTML = '<div class="gallery-progress-fill"></div>';
        galleryContainer.appendChild(progressBar);
        
        const progressFill = progressBar.querySelector('.gallery-progress-fill');
        
        function updateProgress() {
            const progress = ((currentIndex + 1) / itemCount) * 100;
            progressFill.style.width = progress + '%';
        }
        
        // Update progress whenever slide changes
        const originalUpdateSlider = updateSlider;
        updateSlider = function() {
            originalUpdateSlider();
            updateProgress();
        };
        
        updateProgress(); // Initial progress
    }
    
    // Enhanced news banner interactions
    function initializeNewsBanner() {
        const newsBanner = document.querySelector('.news-banner');
        if (!newsBanner) return;
        
        // Add WhatsApp button functionality
        const whatsappBtn = document.createElement('button');
        whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> WhatsApp for More Info';
        whatsappBtn.className = 'news-whatsapp-btn';
        whatsappBtn.setAttribute('aria-label', 'Contact via WhatsApp');
        
        // Add close functionality
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.className = 'news-close';
        closeBtn.setAttribute('aria-label', 'Close announcement');
        
        newsBanner.appendChild(whatsappBtn);
        newsBanner.appendChild(closeBtn);
        
        // WhatsApp click handler
        whatsappBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const phoneNumber = '60122726166';
            const message = encodeURIComponent('Hi Clement, I\'m interested in the USRSA International Certification Training. Could you provide more information?');
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
        
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            newsBanner.style.animation = 'slideUp 0.5s ease-out forwards';
            setTimeout(() => {
                newsBanner.style.display = 'none';
            }, 500);
        });
        
        // Add click-to-expand functionality (excluding buttons)
        newsBanner.addEventListener('click', (e) => {
            if (e.target === closeBtn || e.target === whatsappBtn || e.target.closest('.news-whatsapp-btn')) return;
            
            newsBanner.classList.toggle('expanded');
        });
    }
    
    // Intersection Observer for animations
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe sections for scroll animations
        document.querySelectorAll('.priority-card, .stat-item, .highlight-item').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Initialize all features
    function initialize() {
        if (itemCount > 0) {
            updateSlider(); // Initial setup
            startAutoSlide();
            createProgressIndicator();
        }
        
        initializeNewsBanner();
        initializeScrollAnimations();
        
        // Add loading state management
        const images = document.querySelectorAll('.simple-gallery-item img');
        let loadedImages = 0;
        
        images.forEach(img => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === images.length) {
                        galleryContainer.classList.add('loaded');
                    }
                });
            }
        });
        
        if (loadedImages === images.length) {
            galleryContainer.classList.add('loaded');
        }
    }
    
    // Performance optimization: Lazy load images
    function initializeLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('fade-in');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
    
    // Add CSS animations dynamically
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(20px); opacity: 0.8; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideUp {
                to { transform: translateY(-100%); opacity: 0; }
            }
            
            .gallery-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: rgba(255, 255, 255, 0.2);
                z-index: 10;
            }
            
            .gallery-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--gradient-start), var(--gradient-end));
                transition: width 0.4s ease;
                border-radius: 3px;
            }
            
            .news-whatsapp-btn {
                background: #25D366;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 0.9rem;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
                position: absolute;
                bottom: 15px;
                right: 60px;
                transition: all 0.3s ease;
                z-index: 10;
            }
            
            .news-whatsapp-btn:hover {
                background: #128C7E;
                transform: scale(1.05);
            }
            
            .news-whatsapp-btn i {
                font-size: 1.1rem;
            }
            
            .news-close {
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--primary-color);
                font-weight: bold;
                z-index: 10;
            }
            
            .animate-in {
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .fade-in {
                animation: fadeIn 0.5s ease-in-out;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize everything
    addDynamicStyles();
    initialize();
    initializeLazyLoading();
    
    // Handle visibility change (pause when tab is not active)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            pauseAutoSlide();
        } else {
            resumeAutoSlide();
        }
    });
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateSlider(); // Recalculate positions after resize
        }, 250);
    });
});