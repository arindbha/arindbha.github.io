// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // ===========================
    // Modal Popup Functionality
    // ===========================

    const modal = document.getElementById('experienceModal');
    const modalClose = document.getElementById('modalClose');
    const modalIcon = document.getElementById('modalIcon');
    const modalCompanyName = document.getElementById('modalCompanyName');
    const modalCompanyDesc = document.getElementById('modalCompanyDesc');
    const modalTenureText = document.getElementById('modalTenureText');
    const modalBody = document.getElementById('modalBody');
    const experienceToggles = document.querySelectorAll('.experience-toggle');

    // Open modal when clicking on company name
    experienceToggles.forEach(toggle => {
        toggle.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const experienceDetails = document.getElementById(targetId);

            if (experienceDetails) {
                // Extract company logo from button
                const logoElement = this.querySelector('.company-logo');
                const logoSrc = this.getAttribute('data-logo') || (logoElement ? logoElement.src : '');

                // Extract company name and tenure from button
                const companyNameElement = this.querySelector('.company-name');
                const companyTenureElement = this.querySelector('.company-tenure');

                const companyName = companyNameElement ? companyNameElement.textContent.trim() : this.textContent.trim();
                const tenure = companyTenureElement ? companyTenureElement.textContent.trim() : '';

                // Get company description and content
                const companyDesc = experienceDetails.querySelector('p');
                const contentList = experienceDetails.querySelector('ul');

                // Update modal logo
                if (logoSrc) {
                    modalIcon.innerHTML = `<img src="${logoSrc}" alt="${companyName}">`;
                } else {
                    modalIcon.innerHTML = `<i class="fas fa-building"></i>`;
                }

                // Populate modal
                modalCompanyName.textContent = companyName;
                modalCompanyDesc.textContent = companyDesc ? companyDesc.textContent : '';
                modalTenureText.textContent = tenure;

                modalBody.innerHTML = contentList ? contentList.outerHTML : '';

                // Show modal
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close modal when clicking close button
    modalClose.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // ===========================
    // Smooth Scrolling
    // ===========================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // ===========================
    // Fade-in Animation on Scroll
    // ===========================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.section, .skill-category, .achievement-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===========================
    // Active Link Highlighting
    // ===========================

    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.contact-link');

    window.addEventListener('scroll', function () {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===========================
    // Responsive Navigation
    // ===========================

    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
});
