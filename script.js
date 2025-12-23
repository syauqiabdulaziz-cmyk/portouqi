// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initScrollSpy();
    initSkillAnimation();
    initSmoothScroll();
    initContactForm();
    initAnimations();
    initHamburgerMenu();
    initPortfolioFilter();
    initVideoModal();
});

// Navbar Fixed on Scroll
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Scroll Spy for Active Nav Link
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// Animate Skill Bars on Scroll
function initSkillAnimation() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(skillBar => {
            const rect = skillBar.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.9) && (rect.bottom >= 0);
            
            if (isVisible && !skillBar.classList.contains('animated')) {
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = `${width}%`;
                skillBar.classList.add('animated');
            }
        });
    }
    
    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Initial call
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim. Saya akan membalas melalui email ${email} segera.`);
            
            // Reset form
            contactForm.reset();
        });
    }
}

// Initialize Animations on Scroll
function initAnimations() {
    // Create Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .portfolio-item, .activity-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}












// Hamburger Menu Toggle
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Portfolio Filter Functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Video Modal Functionality
function initVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const videoModalBtns = document.querySelectorAll('.video-modal-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalVideo = document.getElementById('modalVideo');
    
    // Open modal when video button is clicked
    videoModalBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.getAttribute('data-video-id');
            modalVideo.src = `https://drive.google.com/file/d/1MVcWDqZ0THDd45LHVKqK4WikQUFgIqt8/preview`;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close modal when X is clicked
    closeModalBtn.addEventListener('click', function() {
        videoModal.classList.remove('active');
        modalVideo.src = '';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside the video
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.classList.remove('active');
            modalVideo.src = '';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            videoModal.classList.remove('active');
            modalVideo.src = '';
            document.body.style.overflow = 'auto';
        }
    });
}

// Add CSS for fade-in animations
const style = document.createElement('style');
style.textContent = `
    .timeline-item,
    .portfolio-item,
    .activity-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .timeline-item.animate-in,
    .portfolio-item.animate-in,
    .activity-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-progress {
        transition: width 1.5s cubic-bezier(0.22, 0.61, 0.36, 1);
    }
    
    /* Portfolio filter transition */
    .portfolio-item {
        transition: opacity 0.3s ease, transform 0.3s ease, display 0.3s ease;
    }
`;
document.head.appendChild(style);