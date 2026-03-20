/* 
  ========================================
  PROFESSIONAL PORTFOLIO SCRIPTS
  ========================================
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
        spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : 'none';
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            // Reset hamburger
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(s => s.style.transform = 'none');
            spans[1].style.opacity = '1';
        });
    });

    // 2. Smooth Scrolling for Navigation Links (exclude verify buttons)
    document.querySelectorAll('a[href^="#"]:not(.verify-link)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }

        // Active Link Highlighting
        highlightNavLink();
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    function highlightNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    }

    // 6. Simple Reveal Animation on Scroll
    const revealElements = document.querySelectorAll('.hero, .skill-category, .timeline-item, .card');
    
    const revealOnScroll = () => {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].style.opacity = '1';
                revealElements[i].style.transform = 'translateY(0)';
            }
        }
    };

    // Initial styles for reveal animation
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 7. Certificate modal handling
    const certModal = document.getElementById('certModal');
    const certModalImage = document.getElementById('certModalImage');
    const certModalMessage = document.getElementById('certModalMessage');
    const certModalTitle = certModal.querySelector('.modal-title');
    const closeModal = () => {
        certModal.classList.remove('open');
        certModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        certModalImage.src = '';
        certModalMessage.textContent = 'Loading certificate...';
    };

    const openModal = (title, src) => {
        certModalTitle.textContent = title || 'Certificate';

        if (src) {
            certModalImage.src = src;
            certModalImage.alt = `${title} certificate preview`;
            certModalImage.style.display = 'block';
            certModalMessage.style.display = 'none';
        } else {
            certModalImage.style.display = 'none';
            certModalMessage.style.display = 'block';
            certModalMessage.textContent = 'Certificate preview not available.';
        }

        certModal.classList.add('open');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    certModal.addEventListener('click', (e) => {
        if (e.target.matches('[data-close]') || e.target.classList.contains('modal-close')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModal.classList.contains('open')) {
            closeModal();
        }
    });

    document.querySelectorAll('.verify-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const href = link.href;
            if (href && href !== '#') {
                window.open(href, '_blank', 'noopener');
            }

            openModal(link.dataset.certTitle, link.dataset.certSrc);
        });
    });
});
