document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

ScrollReveal().reveal('.hero, .about, .skills, .projects, .contact', {
    delay: 200,
    distance: '50px',
    duration: 1000,
    easing: 'ease-in-out',
    origin: 'bottom',
    interval: 200
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 0);
});

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
});
