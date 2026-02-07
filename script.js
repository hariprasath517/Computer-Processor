// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const menuBtn = document.querySelector('.nav-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}

// Start Learning button
const startBtn = document.getElementById('start-learning');
if (startBtn) {
    startBtn.addEventListener('click', () => {
        document.getElementById('what-is-cpu').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Fade-in on scroll observer
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.fade-in').forEach(element => {
    fadeInObserver.observe(element);
});

// FAQ Accordion
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other open items
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Cores visualization
const coresDisplay = document.getElementById('cores-display');
const coreBtns = document.querySelectorAll('.core-btn');

function generateCores(numCores) {
    coresDisplay.innerHTML = '';
    
    for (let i = 1; i <= numCores; i++) {
        const core = document.createElement('div');
        core.className = 'core';
        core.style.opacity = '0';
        core.style.transform = 'scale(0.8)';
        core.innerHTML = `
            <div class="core-label">Core ${i}</div>
            <div class="core-status">Processing...</div>
        `;
        coresDisplay.appendChild(core);
        
        // Animate appearance
        setTimeout(() => {
            core.style.transition = 'all 0.4s ease';
            core.style.opacity = '1';
            core.style.transform = 'scale(1)';
        }, i * 80);
    }
}

// Initialize with 1 core
generateCores(1);

coreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active state
        coreBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Generate cores
        const numCores = parseInt(btn.dataset.cores);
        generateCores(numCores);
    });
});

// Parallax effect for color blobs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const blobs = document.querySelectorAll('.color-blob');
    
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.15;
        blob.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
    });
});

// Animate speed bars on scroll
const speedItems = document.querySelectorAll('.speed-item');
const speedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const barFill = entry.target.querySelector('.bar-fill');
            const currentWidth = barFill.style.width;
            barFill.style.width = '0%';
            
            setTimeout(() => {
                barFill.style.width = currentWidth;
            }, 200);
        }
    });
}, {
    threshold: 0.5
});

speedItems.forEach(item => {
    speedObserver.observe(item);
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        ripple.animate([
            { transform: 'scale(0)', opacity: 1 },
            { transform: 'scale(2)', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Animate component cards on hover
document.querySelectorAll('.component-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.component-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.component-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Animate stats on scroll
const statCards = document.querySelectorAll('.stat-card');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.stat-number');
            if (number && !number.dataset.animated) {
                const text = number.textContent;
                const hasPlus = text.includes('+');
                const value = parseInt(text.replace(/\D/g, ''));
                
                if (!isNaN(value)) {
                    animateNumber(number, 0, value, 1500, hasPlus);
                    number.dataset.animated = 'true';
                }
            }
        }
    });
}, {
    threshold: 0.5
});

statCards.forEach(card => {
    statsObserver.observe(card);
});

function animateNumber(element, start, end, duration, hasPlus) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        const suffix = element.textContent.includes('nm') ? 'nm' : 
                      element.textContent.includes('B') ? 'B' : '';
        
        element.textContent = Math.floor(current) + suffix + (hasPlus ? '+' : '');
    }, 16);
}

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.position = 'fixed';
scrollProgress.style.top = '0';
scrollProgress.style.left = '0';
scrollProgress.style.height = '3px';
scrollProgress.style.background = 'linear-gradient(90deg, #667eea, #f093fb, #4facfe)';
scrollProgress.style.zIndex = '9999';
scrollProgress.style.transition = 'width 0.2s ease';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Performance optimization: Throttle scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Intersection observer for pipeline steps
const pipelineSteps = document.querySelectorAll('.pipeline-step');
const pipelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 150);
        }
    });
}, {
    threshold: 0.3
});

pipelineSteps.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-30px)';
    step.style.transition = 'all 0.6s ease';
    pipelineObserver.observe(step);
});

// Reduced motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// Console message
console.log('%c⚡ CPU Explorer', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cLearn how computer processors work!', 'color: #666; font-size: 14px;');

// Add easter egg
let clickCount = 0;
const logo = document.querySelector('.logo-chip');

if (logo) {
    logo.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 5) {
            logo.style.animation = 'spin 1s ease';
            setTimeout(() => {
                logo.style.animation = 'pulse 2s ease-in-out infinite';
            }, 1000);
            console.log('🎉 You found the easter egg!');
            clickCount = 0;
        }
    });
}

// Add CSS for spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Smooth section transitions
document.querySelectorAll('section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 0.8s ease';
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, {
        threshold: 0.1
    });
    
    sectionObserver.observe(section);
});

// Make the first section visible immediately
document.querySelector('.hero').style.opacity = '1';