document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) {
            navLinks.classList.remove('active');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });

    // Observe app screens
    document.querySelectorAll('.screen').forEach(screen => {
        observer.observe(screen);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Parallax effect for floating apps
    document.addEventListener('mousemove', (e) => {
        const apps = document.querySelectorAll('.app-icon');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        apps.forEach(app => {
            const speed = parseFloat(app.getAttribute('data-speed') || 20);
            const x = mouseX * speed;
            const y = mouseY * speed;
            app.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Waitlist form submission
    const form = document.getElementById('waitlist-form');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.email.value;

        // Simulating form submission
        try {
            // Replace this with actual API call in a real application
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            showMessage('Thank you for joining our waitlist!', 'success');
            form.reset();
        } catch (error) {
            showMessage('Oops! Something went wrong. Please try again.', 'error');
        }
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = type;
        messageDiv.classList.remove('hidden');

        setTimeout(() => {
            messageDiv.classList.add('hidden');
        }, 5000);
    }
});

