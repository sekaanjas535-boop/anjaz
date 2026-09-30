// Portfolio interactions: mobile navigation, typing effect, reveal animation, page transitions, and contact form.
const styleSheet = document.createElement('style');
styleSheet.textContent = `body.page-leaving{opacity:0;transform:translateY(-10px);transition:opacity .3s ease,transform .3s ease}`;
document.head.appendChild(styleSheet);

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const typingElement = document.querySelector('.typing-text');
if (typingElement) {
  const textToType = 'Seka Afrul Anjas';
  let charIndex = 0;
  const typeText = () => {
    if (charIndex < textToType.length) {
      typingElement.textContent += textToType.charAt(charIndex++);
      setTimeout(typeText, 85);
    }
  };
  setTimeout(typeText, 550);
}

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Preserve the original Formspree integration, while adding a polished success toast.
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    try {
      const response = await fetch('https://formspree.io/f/mdaaayaa', {
        method: 'POST', body: formData, headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Form submission failed');
      showToast('Thank you! I will get back to you soon.');
      form.reset();
    } catch (error) {
      showToast('Unable to send. Please check your connection.', true);
    }
  });
}

function showToast(message, error = false) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  if (error) toast.style.borderColor = 'rgba(255,110,110,.45)';
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3200);
}

document.querySelectorAll('a[href$=".html"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    document.body.classList.add('page-leaving');
    setTimeout(() => { window.location.href = href; }, 300);
  });
});
