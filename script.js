document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Dynamic Typing Header Effect
  // ==========================================
  const typedTextSpan = document.querySelector(".typed-text");
  const textArray = ["Web Developer", "E-Commerce Specialist", "Systems Engineer", "Full-Stack Builder"];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 300);
    }
  }

  if (typedTextSpan) setTimeout(type, newTextDelay + 250);

  // ==========================================
  // 2. Interactive Terminal Widget Logic
  // ==========================================
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  if (terminalInput && terminalOutput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';
        
        appendTerminalLine(`daniel@udeagha:~$ ${command}`, 'highlight');

        switch (command) {
          case 'help':
            appendTerminalLine('Available commands: help, skills, projects, contact, clear');
            break;
          case 'skills':
            appendTerminalLine('Skills: HTML5, CSS3, JavaScript, PHP, Node.js, REST APIs, Web3/Solana');
            break;
          case 'projects':
            appendTerminalLine('Featured: Demfati Enterprise, Kaiglo Services, Waziri E-Commerce');
            break;
          case 'contact':
            appendTerminalLine('Scroll down to the contact section or email directly via contact form.');
            break;
          case 'clear':
            terminalOutput.innerHTML = '';
            break;
          case '':
            break;
          default:
            appendTerminalLine(`Command not found: '${command}'. Type 'help' for options.`, 'error');
        }

        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }
    });
  }

  function appendTerminalLine(text, className = '') {
    const p = document.createElement('p');
    p.textContent = text;
    if (className === 'highlight') p.style.color = '#facc15';
    if (className === 'error') p.style.color = '#ef4444';
    terminalOutput.appendChild(p);
  }

  // ==========================================
  // 3. Case Study Drawer Logic
  // ==========================================
  const drawerOverlay = document.getElementById('case-study-drawer');
  const drawerType = document.getElementById('drawer-type');
  const drawerTitle = document.getElementById('drawer-title');
  const drawerImage = document.getElementById('drawer-image');
  const drawerChallenge = document.getElementById('drawer-challenge');
  const drawerSolution = document.getElementById('drawer-solution');
  const drawerMetric1 = document.getElementById('drawer-metric1');
  const drawerMetric2 = document.getElementById('drawer-metric2');
  const drawerTech = document.getElementById('drawer-tech');
  const drawerLiveLink = document.getElementById('drawer-live-link');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  document.querySelectorAll('.project-card').forEach(card => {
    const openDrawerBtn = card.querySelector('.btn-drawer-open');
    if (openDrawerBtn) {
      openDrawerBtn.addEventListener('click', () => {
        drawerType.textContent = card.dataset.type;
        drawerTitle.textContent = card.dataset.title;
        drawerImage.src = card.dataset.image;
        drawerChallenge.textContent = card.dataset.challenge;
        drawerSolution.textContent = card.dataset.solution;
        drawerMetric1.textContent = card.dataset.metric1;
        drawerMetric2.textContent = card.dataset.metric2;
        drawerTech.textContent = card.dataset.tech;
        drawerLiveLink.setAttribute('href', card.dataset.link);
        
        drawerOverlay.classList.add('active');
      });
    }
  });

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', () => drawerOverlay.classList.remove('active'));
  }
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', (e) => {
      if (e.target === drawerOverlay) drawerOverlay.classList.remove('active');
    });
  }

  // ==========================================
  // 4. Scroll Progress & Back-to-Top
  // ==========================================
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    if (progressBar) progressBar.style.width = scrolled + "%";

    if (winScroll > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 5. Initialize EmailJS & Contact Form
  // ==========================================
  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";

  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending... <i class="fa-solid fa-spinner fa-spin"></i>`;
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
        .then(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Send Message <i class="fa-solid fa-paper-plane"></i>`;
          formStatus.textContent = "Thank you! Your message has been sent successfully.";
          formStatus.classList.add('success');
          contactForm.reset();
        }, (error) => {
          console.error("EmailJS Error:", error);
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Send Message <i class="fa-solid fa-paper-plane"></i>`;
          formStatus.textContent = "Oops! Failed to send your message. Please try again.";
          formStatus.classList.add('error');
        });
    });
  }

  // ==========================================
  // 6. Project Filter Logic
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // ==========================================
  // 7. Dark/Light Theme Switcher Logic
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn.querySelector('i');

  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light' || (!savedTheme && !systemPrefersDark)) {
    enableLightTheme();
  } else {
    enableDarkMode();
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      enableDarkMode();
    } else {
      enableLightTheme();
    }
  });

  function enableLightTheme() {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'light');
  }

  function enableDarkMode() {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'dark');
  }

  // ==========================================
  // 8. Smooth Scrolling & Scroll Reveal
  // ==========================================
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  const observerOptions = { threshold: 0.15 };
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const cards = document.querySelectorAll('.project-card, .skill-category, .contact-container, .terminal-card');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealOnScroll.observe(card);
  });

});