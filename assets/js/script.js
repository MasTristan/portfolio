// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initNavigation();
    initLanguageSwitcher();
    initPortfolioFilters();
    initContactForm();
    initTypingEffect();
    initScrollAnimations();
    initThemeToggle();
    
    // Navigation functionality
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Update active nav link on scroll
        window.addEventListener('scroll', updateActiveNavLink);
    }
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Language switcher functionality
    function initLanguageSwitcher() {
        const langLinks = document.querySelectorAll('.lang-link');
        
        langLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all language links
                langLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // In a real application, this would trigger language change
                console.log('Language switched to:', this.textContent.trim());
            });
        });
    }
    
    // Portfolio filters functionality
    function initPortfolioFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active filter button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.classList.add('fade-in');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('fade-in');
                    }
                });
            });
        });
    }
    
    // Contact form functionality
    function initContactForm() {
        const form = document.getElementById('contactForm');
        const formStatus = document.getElementById('form-status');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const name = formData.get('name').trim();
                const email = formData.get('email').trim();
                const subject = formData.get('subject').trim();
                const message = formData.get('message').trim();
                
                // Validate form
                const errors = validateForm(name, email, subject, message);
                
                if (errors.length > 0) {
                    showFormStatus('error', errors.join('<br>'));
                    return;
                }
                
                // Show loading state
                showFormStatus('loading', 'Loading...');
                
                // Simulate form submission
                setTimeout(() => {
                    showFormStatus('success', 'Your message has been sent. Thank you!');
                    form.reset();
                }, 2000);
            });
        }
    }
    
    function validateForm(name, email, subject, message) {
        const errors = [];
        
        if (!name) {
            errors.push('Name is required');
        }
        
        if (!email) {
            errors.push('Email is required');
        } else if (!isValidEmail(email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!subject) {
            errors.push('Subject is required');
        }
        
        if (!message) {
            errors.push('Message is required');
        }
        
        return errors;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormStatus(type, message) {
        const formStatus = document.getElementById('form-status');
        
        if (formStatus) {
            formStatus.className = `form-status ${type}`;
            formStatus.innerHTML = message;
            
            if (type === 'success' || type === 'error') {
                setTimeout(() => {
                    formStatus.className = 'form-status';
                    formStatus.innerHTML = '';
                }, 5000);
            }
        }
    }
    
    // Typing effect for hero section
    function initTypingEffect() {
        const typingText = document.querySelector('.typing-text');
        const cursor = document.querySelector('.cursor');
        
        if (typingText && cursor) {
            const texts = ['Data Engineer', 'Developer', 'Analyst'];
            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            
            function typeEffect() {
                const currentText = texts[textIndex];
                
                if (isDeleting) {
                    typingText.textContent = currentText.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typingText.textContent = currentText.substring(0, charIndex + 1);
                    charIndex++;
                }
                
                let typeSpeed = isDeleting ? 100 : 150;
                
                if (!isDeleting && charIndex === currentText.length) {
                    typeSpeed = 2000; // Pause at end
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    typeSpeed = 500; // Pause before next word
                }
                
                setTimeout(typeEffect, typeSpeed);
            }
            
            // Start typing effect after a short delay
            setTimeout(typeEffect, 1000);
        }
    }
    
    // Scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.about-item, .skill-category, .portfolio-item, .testimonial-item, .resume-item');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Dark mode toggle
    function initThemeToggle() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
        setTheme(savedTheme);

        toggleBtn.addEventListener('click', () => {
            const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });

        function setTheme(theme) {
            document.body.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
    
    // Smooth scroll to top functionality
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Add scroll to top button (optional)
    function addScrollToTopButton() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--accent-color);
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        document.body.appendChild(scrollBtn);
        
        scrollBtn.addEventListener('click', scrollToTop);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });
    }
    
    // Initialize scroll to top button
    addScrollToTopButton();
    
    // Handle image loading errors
    function handleImageErrors() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('error', function() {
                // Create a placeholder div if image fails to load
                const placeholder = document.createElement('div');
                placeholder.style.cssText = `
                    width: ${this.width || 100}px;
                    height: ${this.height || 100}px;
                    background: #f0f0f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #666;
                    font-size: 12px;
                    border-radius: 4px;
                `;
                placeholder.textContent = 'Image not found';
                
                if (this.parentNode) {
                    this.parentNode.replaceChild(placeholder, this);
                }
            });
        });
    }
    
    // Initialize image error handling
    handleImageErrors();
    
    // Mobile menu toggle (if needed in future)
    function initMobileMenu() {
        // This can be expanded for mobile hamburger menu functionality
        const header = document.querySelector('.header');
        let lastScrollY = window.pageYOffset;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.pageYOffset;
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Console log for debugging
    console.log('Portfolio website initialized successfully!');
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});
