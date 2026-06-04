/* ============================================
   Susana Xarepe — Solicitadora
   main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Navbar: efeito de scroll ───
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ─── Menu mobile ───
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileNav = document.getElementById('mobileNav');

  function closeMobileNav() {
    mobileNav.classList.remove('open');
  }

  burgerBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  // Fechar ao clicar em qualquer link do menu mobile (remove inline onclick do HTML)
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
  });

  // ─── Scroll reveal (Intersection Observer) ───
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ─── Animação de contadores nas estatísticas ───
  function animateCounter(el, target, suffix = '') {
    const duration = 3200;
    const startTime = performance.now();
    const isFloat = !Number.isInteger(target);

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = isFloat
        ? (target * eased).toFixed(1)
        : Math.round(target * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const statsData = [
    { val: 17,   suffix: '+' },
    { val: 1200, suffix: '' },
    { val: 98,   suffix: '%' },
  ];

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const nums = entry.target.querySelectorAll('.stat-number');
          nums.forEach((el, i) => {
            if (statsData[i]) animateCounter(el, statsData[i].val, statsData[i].suffix);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(heroStats);
  }

  // ─── Formulário de contacto ───
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    let lastSubmitTime = 0;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Honeypot: bots preenchem campos ocultos — rejeitar silenciosamente
      const honeypot = contactForm.querySelector('input[name="_gotcha"]');
      if (honeypot && honeypot.value) return;

      // Rate limiting: mínimo 30 segundos entre tentativas
      const now = Date.now();
      const elapsed = now - lastSubmitTime;
      if (lastSubmitTime && elapsed < 30000) {
        const remaining = Math.ceil((30000 - elapsed) / 1000);
        showGeneralError(`Aguarde ${remaining}s antes de tentar novamente.`);
        return;
      }

      const nome     = contactForm.querySelector('#nome');
      const email    = contactForm.querySelector('#email');
      const servico  = contactForm.querySelector('#servico');
      const mensagem = contactForm.querySelector('#mensagem');

      clearErrors();

      let valid = true;
      if (!nome.value.trim())                { showError(nome,     'Preencha o seu nome.');                          valid = false; }
      if (!isValidEmail(email.value.trim())) { showError(email,    'Introduza um email válido.');                    valid = false; }
      if (!servico.value)                    { showError(servico,  'Selecione um serviço.');                         valid = false; }
      if (mensagem.value.trim().length < 20) { showError(mensagem, 'A mensagem deve ter pelo menos 20 caracteres.'); valid = false; }

      if (!valid) return;

      lastSubmitTime = Date.now();
      const btn = contactForm.querySelector('.form-submit');
      btn.textContent = 'A enviar…';
      btn.disabled = true;

      fetch('https://formspree.io/f/xnjrqyyy', {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      }).then(r => {
        if (r.ok) {
          contactForm.style.display = 'none';
          formSuccess.classList.add('show');
        } else {
          btn.textContent = 'Erro ao enviar. Tente novamente.';
          btn.disabled = false;
          showFallback();
        }
      }).catch(() => {
        btn.textContent = 'Erro ao enviar. Tente novamente.';
        btn.disabled = false;
        showFallback();
      });
    });

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(field, msg) {
      field.classList.add('input-error');
      const err = document.createElement('span');
      err.className = 'field-error';
      err.textContent = msg;
      field.insertAdjacentElement('afterend', err);
    }

    function showGeneralError(msg) {
      const existing = contactForm.querySelector('.form-general-error');
      if (existing) existing.remove();
      const err = document.createElement('p');
      err.className = 'form-general-error';
      err.textContent = msg;
      const btn = contactForm.querySelector('.form-submit');
      btn.insertAdjacentElement('beforebegin', err);
    }

    // Fallback por email direto quando o Formspree falha
    function showFallback() {
      if (contactForm.querySelector('.form-fallback')) return;
      const fallback = document.createElement('p');
      fallback.className = 'form-fallback';
      const text = document.createTextNode('Em alternativa, contacte diretamente: ');
      const link = document.createElement('a');
      link.href = 'mailto:susana.xarepe@gmail.com';
      link.textContent = 'susana.xarepe@gmail.com';
      fallback.appendChild(text);
      fallback.appendChild(link);
      contactForm.querySelector('.form-note').insertAdjacentElement('afterend', fallback);
    }

    function clearErrors() {
      contactForm.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
      contactForm.querySelectorAll('.field-error, .form-general-error').forEach(el => el.remove());
    }
  }

});
