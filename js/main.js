// Initialize page with romantic theme
window.addEventListener('DOMContentLoaded', () => {
    // Add floating hearts to the background
    function createFloatingHearts() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.1;
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '-1';
        heart.style.animation = `float-up ${Math.random() * 5 + 10}s linear`;
        document.body.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 15000);
    }
    
    // Add floating hearts periodically
    setInterval(createFloatingHearts, 1000);
    
    // Preloader with romantic fade
    const preloader = document.querySelector('.preloader');
    preloader.style.transition = 'opacity 1s ease';
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
        // Add class to body to enable animations after preloader
        document.body.classList.add('page-loaded');
    }, 1000);

    // Enhanced smooth scrolling navigation with active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600', 'font-semibold');
            if (link.getAttribute('href') === current) {
                link.classList.add('text-pink-500', 'font-semibold');
            }
        });
    }
    
    // Initial call
    updateActiveNavLink();
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced parallax effect with smoother movement
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.gradient-bg');
        if (hero) {
            hero.style.backgroundPositionY = `${scrolled * 0.2}px`;
        }
    }
    
    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call
    updateParallax();

    // Enhanced particle effect on click with hearts
    function createHeartParticle(x, y) {
        const particle = document.createElement('div');
        particle.innerHTML = '❤️';
        particle.style.position = 'fixed';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.fontSize = `${Math.random() * 20 + 10}px`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.transform = 'translate(-50%, -50%) scale(0)';
        particle.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(particle);
        
        // Animate the heart
        setTimeout(() => {
            particle.style.transform = `translate(-50%, -50%) scale(${Math.random() * 0.5 + 0.5})`;
            particle.style.opacity = '0.9';
        }, 10);
        
        // Random movement
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const targetX = x + Math.cos(angle) * distance;
        const targetY = y + Math.sin(angle) * distance - 100;
        
        // Animate to random position
        setTimeout(() => {
            particle.style.left = `${targetX}px`;
            particle.style.top = `${targetY}px`;
            particle.style.opacity = '0';
            
            // Remove after animation
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }, 100);
    }
    
    // Add click effect
    window.addEventListener('click', (e) => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createHeartParticle(e.clientX, e.clientY);
            }, i * 100);
        }
    });

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Add random size and color variations
        particle.style.width = `${Math.random() * 8 + 6}px`;
        particle.style.height = `${Math.random() * 8 + 6}px`;
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        
        document.body.appendChild(particle);
        
        // Animate the particle
        particle.style.transform = 'scale(0)';
        particle.style.opacity = '1';
        
        setTimeout(() => {
            particle.style.transform = 'scale(1)';
        }, 10);
        
        setTimeout(() => {
            particle.remove();
        }, 1500);
    }

    // Animate elements on scroll with Intersection Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const animatedSections = document.querySelectorAll('section');
    
    // Combined observer for both elements and sections
    const scrollObserver = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For animate-on-scroll elements
                if (entry.target.classList.contains('animate-on-scroll')) {
                    // Debug: log when an animate-on-scroll element is triggered
                    console.log('Animating:', entry.target, entry.target.getAttribute('data-animate'));
                    // Add a small delay based on data-delay attribute
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        // Debug: log after class is added
                        console.log('Visible class added:', entry.target);
                    }, parseInt(delay));
                }
                // For section animations
                if (entry.target.tagName === 'SECTION') {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.visibility = 'visible';
                }
                
                // Unobserve after animation starts to improve performance
                observer.unobserve(entry.target);
            }
        });
    };

    // Create a single observer instance with options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'  // Slight adjustment for better timing
    };
    
    const observer = new IntersectionObserver(scrollObserver, observerOptions);

    // Set initial styles and observe elements
    animatedSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        section.style.transitionDelay = `${index * 0.1}s`;
        section.style.visibility = 'hidden';
        observer.observe(section);
    });
    
    // Observe all animated elements
    animatedElements.forEach(element => observer.observe(element));
    
    // Special animation for the first section
    const firstSection = document.querySelector('section:first-of-type');
    if (firstSection) {
        firstSection.style.opacity = '1';
        firstSection.style.transform = 'translateY(0)';
        firstSection.style.visibility = 'visible';
    }

    // Staggered animations for cards and items
    const animatedItems = document.querySelectorAll('.interest-card, .favorite-item, .memory-item, .goal-item');
    
    // Set initial styles for animated items
    animatedItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.1}s`;
    });
    
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    });
    
    // Observe all animated items
    animatedItems.forEach(item => itemObserver.observe(item));
    
    // Add loading animation to avatar
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.style.opacity = '0';
        avatar.style.transform = 'scale(0.8)';
        
        // If image is already loaded
        if (avatar.complete) {
            setTimeout(() => {
                avatar.style.transition = 'all 0.8s ease-out';
                avatar.style.opacity = '1';
                avatar.style.transform = 'scale(1)';
            }, 100);
        } else {
            // Wait for image to load
            avatar.addEventListener('load', () => {
                setTimeout(() => {
                    avatar.style.transition = 'all 0.8s ease-out';
                    avatar.style.opacity = '1';
                    avatar.style.transform = 'scale(1)';
                }, 100);
            });
        }
    }

    // Add hover effect to section titles
    const sectionTitles = document.querySelectorAll('h2, h3, .section-title');
    sectionTitles.forEach(title => {
        title.style.transition = 'all 0.3s ease';
        title.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'scale(1.02)';
            e.target.style.color = e.target.style.color || '';
        });
        title.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.color = '';
        });
    });

    // Add parallax effect to background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.hero');
        if (header) {
            header.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });

    // Initialize any other animations or event listeners here
    console.log('All animations and event listeners initialized');
});

// Add particle effect on click
let particles = [];

window.addEventListener('click', (e) => {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = e.clientX + 'px';
  particle.style.top = e.clientY + 'px';
  document.body.appendChild(particle);
  
  particles.push(particle);
  
  setTimeout(() => {
    particle.remove();
    particles = particles.filter(p => p !== particle);
  }, 2000);
});
