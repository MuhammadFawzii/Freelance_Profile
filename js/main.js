// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIcon = '<i class="fas fa-sun"></i>';
    
    // Check for saved theme preference or use default light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    // Update button icon based on current theme
    darkModeToggle.innerHTML = savedTheme === 'dark' ? sunIcon : moonIcon;
    
    // Add event listener to toggle button
    darkModeToggle.addEventListener('click', function() {
        // Check current theme
        const currentTheme = htmlElement.getAttribute('data-theme');
        // Toggle theme
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Update HTML attribute
        htmlElement.setAttribute('data-theme', newTheme);
        
        // Save preference to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update button icon
        darkModeToggle.innerHTML = newTheme === 'dark' ? sunIcon : moonIcon;
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    function toggleNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-dark', 'shadow');
        } else {
            navbar.classList.remove('bg-dark', 'shadow');
        }
    }
    
    // Initialize immediately and listen for scroll
    toggleNavbarBackground();
    window.addEventListener('scroll', toggleNavbarBackground);
    
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
            if (navLink.getAttribute('href') === `#${current}`) {
                navLink.classList.add('active');
            }
        });
    });
    
    // Handle form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission (in a real scenario, you would send to a server)
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            button.disabled = true;
            button.textContent = 'Sending...';
            
            // Simulate API call
            setTimeout(() => {
                alert(`Thanks for your message, ${name}! I'll get back to you soon.`);
                this.reset();
                button.disabled = false;
                button.textContent = originalText;
            }, 1500);
        });
    }
    
    // Animate progress bars on scroll
    const progressBars = document.querySelectorAll('.progress-bar');
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('aria-valuenow') + '%';
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        bar.style.width = '0%';
        animateOnScroll.observe(bar);
    });

    // Initialize Portfolio Filters
    const portfolioContainer = document.querySelector('.portfolio-container');
    const portfolioFilters = document.querySelectorAll('#portfolio-filters .nav-link');

    if (portfolioContainer) {
        // Initialize Isotope
        const iso = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        // Filter items on click
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all filters
                portfolioFilters.forEach(f => f.classList.remove('active'));
                // Add active class to current filter
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter items
                if (filterValue === '*') {
                    iso.arrange({ filter: '*' });
                } else {
                    iso.arrange({ filter: filterValue });
                }
            });
        });
    }

    // Initialize Certificate Filters
    const certificatesContainer = document.querySelector('.certificates-container');
    const certificateFilters = document.querySelectorAll('#certificates-filters .nav-link');

    if (certificatesContainer) {
        // Initialize Isotope for certificates
        const isoCertificates = new Isotope(certificatesContainer, {
            itemSelector: '.certificate-item',
            layoutMode: 'fitRows'
        });

        // Filter certificates on click
        certificateFilters.forEach(filter => {
            filter.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all filters
                certificateFilters.forEach(f => f.classList.remove('active'));
                // Add active class to current filter
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter items
                if (filterValue === '*') {
                    isoCertificates.arrange({ filter: '*' });
                } else {
                    isoCertificates.arrange({ filter: filterValue });
                }
            });
        });
    }

    // Initialize GLightbox for portfolio images
    if (document.querySelector('.portfolio-lightbox')) {
        const portfolioLightbox = GLightbox({
            selector: '.portfolio-lightbox',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true
        });
    }
    
    // Initialize GLightbox for certificate images
    if (document.querySelector('.certificate-lightbox')) {
        const certificateLightbox = GLightbox({
            selector: '.certificate-lightbox',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true
        });
    }
});