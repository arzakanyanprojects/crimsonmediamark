// Crimson Media Marketing — shared behavior

document.documentElement.classList.add('is-loading');
window.addEventListener('load', () => {
  requestAnimationFrame(() => document.documentElement.classList.remove('is-loading'));
});

document.addEventListener('DOMContentLoaded', () => {
  /* Stagger reveal groups so siblings cascade in smoothly */
  const groups = document.querySelectorAll('.grid-services, .process, .values-grid, .hero-trust, .footer-grid');
  groups.forEach(group => {
    Array.from(group.children).forEach((child, i) => {
      if (child.classList && child.classList.contains('reveal')) {
        child.style.setProperty('--stagger', `${Math.min(i * 0.1, 0.5)}s`);
      }
    });
  });

  /* Mobile nav toggle */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      item.classList.toggle('open', !isOpen);
      a.style.maxHeight = !isOpen ? a.scrollHeight + 'px' : null;
    });
  });

  /* Header shadow on scroll */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 8 ? '0 6px 20px rgba(0,0,0,0.06)' : 'none';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Contact form -> mailto composer (static site, no backend) */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value.trim();
      const email = form.querySelector('#email').value.trim();
      const phone = form.querySelector('#phone').value.trim();
      const service = form.querySelector('#service').value;
      const message = form.querySelector('#message').value.trim();

      const subject = `Consultation Request from ${name || 'Website Visitor'}`;
      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'N/A'}`,
        `Service Interest: ${service || 'N/A'}`,
        '',
        'Message:',
        message
      ];
      const mailto = `mailto:Crimsonmediamark@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

      window.location.href = mailto;

      const status = document.getElementById('form-status');
      if (status) {
        status.textContent = 'Opening your email client to send this request to Crimson Media Marketing…';
        status.classList.add('show');
      }
    });
  }
});
