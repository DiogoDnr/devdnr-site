// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Typing effect — hero subtitle
const typingText = document.getElementById('typing-text');
const fullText = 'Desenvolvedor Full Stack';
let i = 0;

function typeWriter() {
  if (i <= fullText.length) {
    typingText.textContent = fullText.slice(0, i);
    i++;
    setTimeout(typeWriter, 60);
  }
}
typeWriter();

// Terminal typing animation — starts when terminal enters view, loops every 60s
function initTerminalAnimation() {
  const terminal = document.querySelector('.terminal');
  const terminalBody = document.querySelector('.terminal-body');
  if (!terminal || !terminalBody) return;

  const lines = Array.from(terminalBody.querySelectorAll('p'));
  const savedHTML = lines.map(p => p.innerHTML);

  terminalBody.style.minHeight = terminalBody.offsetHeight + 'px';
  lines.forEach(p => { p.style.opacity = '0'; });

  function typeHTML(el, html, onDone) {
    el.innerHTML = '';
    el.style.opacity = '1';
    let pos = 0;

    function step() {
      if (pos >= html.length) { onDone && onDone(); return; }
      if (html[pos] === '<') {
        const end = html.indexOf('>', pos);
        el.innerHTML = html.slice(0, end + 1);
        pos = end + 1;
        setTimeout(step, 0);
      } else {
        el.innerHTML = html.slice(0, pos + 1);
        pos++;
        setTimeout(step, 28);
      }
    }
    step();
  }

  function runLoop() {
    lines.forEach((p, idx) => {
      p.style.opacity = '0';
      p.innerHTML = savedHTML[idx];
    });

    let idx = 0;
    function nextLine() {
      if (idx >= lines.length) {
        setTimeout(runLoop, 60000);
        return;
      }
      const line = lines[idx];
      const html = savedHTML[idx];
      idx++;
      typeHTML(line, html, () => setTimeout(nextLine, 120));
    }
    nextLine();
  }

  const termObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        termObserver.unobserve(entry.target);
        setTimeout(runLoop, 350);
      }
    });
  }, { threshold: 0.4 });

  termObserver.observe(terminal);
}

initTerminalAnimation();

// Service cards entrance animation
const skillCards = document.querySelectorAll('.skill-card');

function animateCards() {
  skillCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85 && !card.classList.contains('visible')) {
      setTimeout(() => {
        card.classList.add('visible');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 60);
    }
  });
}

skillCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(16px)';
  card.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
});

window.addEventListener('scroll', animateCards);
animateCards();

// Contact form — AJAX submit via Web3Forms
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(contactForm),
      });
      const data = await res.json();
      if (data.success) {
        btn.textContent = 'Mensagem enviada!';
        btn.style.background = '#22c55e';
        btn.style.borderColor = '#22c55e';
        contactForm.reset();
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.disabled = false;
        }, 4000);
      } else {
        throw new Error('Falha no envio');
      }
    } catch {
      btn.textContent = 'Erro ao enviar. Tente novamente.';
      btn.style.background = '#ef4444';
      btn.style.borderColor = '#ef4444';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 4000);
    }
  });
}

// Smooth reveal animation for sections
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

sections.forEach((section, index) => {
  if (index > 0) {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
  }
});
