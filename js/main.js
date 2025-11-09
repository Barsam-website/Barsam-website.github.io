/**
 * Main JavaScript - Barsam Memorial Website
 * Handles smooth scrolling, mobile menu, and general interactions
 */

(function() {
    'use strict';

    // ==========================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ==========================================
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerOffset = 80; // Account for sticky nav
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without page jump
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    // ==========================================
    // SCROLL TO TOP FUNCTIONALITY
    // ==========================================
    function createScrollToTop() {
        // Create button element
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'scroll-to-top';
        button.setAttribute('aria-label', 'Scroll to top');
        button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--color-primary);
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
        `;

        document.body.appendChild(button);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });

        // Scroll to top on click
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effect
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 6px 20px rgba(30, 58, 138, 0.4)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(30, 58, 138, 0.3)';
        });
    }

    // ==========================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ==========================================
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

        function updateActiveLink() {
            let currentSection = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.pageYOffset >= sectionTop - 100) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); // Run on load
    }

    // ==========================================
    // FADE-IN ANIMATION ON SCROLL
    // ==========================================
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

        // Add fade-in class styles
        const style = document.createElement('style');
        style.textContent = `
            .fade-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ==========================================
    // PDF DOWNLOAD TRACKING (Optional Analytics)
    // ==========================================
    function trackPDFDownloads() {
        const pdfLinks = document.querySelectorAll('a[href$=".pdf"]');

        pdfLinks.forEach(link => {
            link.addEventListener('click', function() {
                const pdfName = this.getAttribute('href').split('/').pop();
                console.log('PDF Downloaded:', pdfName);

                // Here you can add analytics tracking if needed
                // Example: gtag('event', 'download', { 'file_name': pdfName });
            });
        });
    }

    // ==========================================
    // EXTERNAL LINK HANDLING
    // ==========================================
    function handleExternalLinks() {
        const externalLinks = document.querySelectorAll('a[target="_blank"]');

        externalLinks.forEach(link => {
            // Add security attributes if not present
            if (!link.hasAttribute('rel')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }

            // Add visual indicator for external links
            link.style.position = 'relative';
        });
    }

    // ==========================================
    // MOBILE MENU TOGGLE (FOR RESPONSIVE)
    // ==========================================
    function initMobileMenu() {
        // Check if we're on mobile
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('.main-nav');
            const navList = document.querySelector('.nav-list');

            if (nav && navList) {
                // Create hamburger button
                const hamburger = document.createElement('button');
                hamburger.innerHTML = '☰';
                hamburger.className = 'mobile-menu-toggle';
                hamburger.setAttribute('aria-label', 'Toggle menu');
                hamburger.style.cssText = `
                    display: none;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--color-primary);
                `;

                // Show hamburger on mobile
                const mediaQuery = window.matchMedia('(max-width: 768px)');
                if (mediaQuery.matches) {
                    hamburger.style.display = 'block';
                    nav.querySelector('.container').insertBefore(hamburger, navList);
                    navList.style.display = 'none';
                }

                // Toggle menu
                hamburger.addEventListener('click', function() {
                    if (navList.style.display === 'none') {
                        navList.style.display = 'flex';
                        hamburger.innerHTML = '✕';
                    } else {
                        navList.style.display = 'none';
                        hamburger.innerHTML = '☰';
                    }
                });

                // Close menu when clicking a link
                const navLinks = navList.querySelectorAll('a');
                navLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        if (mediaQuery.matches) {
                            navList.style.display = 'none';
                            hamburger.innerHTML = '☰';
                        }
                    });
                });
            }
        }
    }

    // ==========================================
    // ACCESSIBILITY ENHANCEMENTS
    // ==========================================
    function enhanceAccessibility() {
        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#book';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--color-primary);
            color: white;
            padding: 0.5rem 1rem;
            text-decoration: none;
            z-index: 9999;
        `;
        skipLink.addEventListener('focus', function() {
            this.style.top = '0';
        });
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // ==========================================
    // INITIALIZE ALL FEATURES
    // ==========================================
    function init() {
        initSmoothScrolling();
        createScrollToTop();
        highlightActiveSection();
        initScrollAnimations();
        trackPDFDownloads();
        handleExternalLinks();
        initMobileMenu();
        enhanceAccessibility();

        console.log('✨ Barsam Memorial Website Initialized');
    }

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle window resize for mobile menu
    window.addEventListener('resize', function() {
        const navList = document.querySelector('.nav-list');
        if (window.innerWidth > 768 && navList) {
            navList.style.display = 'flex';
        }
    });

})();