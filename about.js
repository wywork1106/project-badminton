// About page functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Map functionality for locations
    function openMap(location) {
        let address = '';
        switch(location) {
            case 'kl':
                address = '9th Floor, Boustead Parking Building, Lorong Ceylon, Bukit Ceylon, 50200 Kuala Lumpur, Malaysia';
                break;
            default:
                showNotification('Address not available yet', 'warning');
                return;
        }
        
        // Create Google Maps URL
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(mapsUrl, '_blank');
        showNotification('Opening Google Maps...', 'success');
    }
    
    // Make openMap function globally accessible
    window.openMap = openMap;
    
    // Animation on scroll for cards
    function animateOnScroll() {
        const cards = document.querySelectorAll('.org-card, .location-card, .timeline-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
    
    // Enhanced hover effects for organization cards
    const orgCards = document.querySelectorAll('.org-card');
    orgCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Enhanced hover effects for location cards
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('headquarters')) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            } else {
                this.style.transform = 'translateY(-10px) scale(1.03)';
                this.style.boxShadow = '0 12px 24px rgba(59, 95, 172, 0.3)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Timeline animation
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                        
                        // Animate the timeline marker
                        const marker = entry.target.querySelector('.timeline-marker');
                        if (marker) {
                            marker.style.animation = 'pulse 1s ease-in-out';
                        }
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.3
        });
        
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }
    
    // Add pulse animation for timeline markers
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.5); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
    
    // Contact method interactions
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Handle specific contact methods
            if (this.href.includes('tel:')) {
                // Phone number click
                showNotification('Opening phone dialer...', 'success');
            } else if (this.href.includes('mailto:')) {
                // Email click
                showNotification('Opening email client...', 'success');
            } else if (this.querySelector('.fa-whatsapp')) {
                // WhatsApp click
                e.preventDefault();
                showNotification('WhatsApp contact feature coming soon!', 'info');
            }
        });
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Styling
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        // Type-specific colors
        const colors = {
            success: '#28a745',
            info: '#17a2b8',
            warning: '#ffc107',
            error: '#dc3545'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
    
    // Vision card special effects
    const visionCard = document.querySelector('.vision-card');
    if (visionCard) {
        visionCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        visionCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
    
    // Initialize animations
    animateOnScroll();
    animateTimeline();
    
    // Add smooth scrolling for any internal navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add loading animation for the page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Logo hover effect
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            this.style.transform = 'rotate(360deg) scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 600);
        });
    }

// Map functionality for locations
    function openMap(location) {
        let address = '';
        switch(location) {
            case 'kl':
                address = 'Boustead Parking Building, 9th Floor, Lorong Ceylon, Bukit Ceylon, Kuala Lumpur 50200, Malaysia';
                break;
            case 'penang':
                address = '73-2,Jalan Tasek Gelugor Utama 1, Taman Tasek Gelugor Utama, 13300 Tasek Gelugor, Pulau Pinang, Malaysia';
                break;
            case 'johor':
                address = '9, Jalan Sulam, Taman Sentosa, 80150 Johor Bahru, Malaysia';
                break;
            default:
                showNotification('Address not available yet', 'warning');
                return;
        }
        
        // Create Google Maps URL
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(mapsUrl, '_blank');
        showNotification('Opening Google Maps...', 'success');
    }

});