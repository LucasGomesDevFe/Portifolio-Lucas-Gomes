window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loader').classList.add('hidden');
  }, 1000);
});


const elementsL = document.querySelectorAll('.leftSide');
const elementsR = document.querySelectorAll('.rightSide');
const projectsFade = document.querySelectorAll('.projetos-container');
// Menu Mobile - Substitua o código existente
const mobileMenu = () => {
  const mobile = document.querySelector('.menu-mobile');
  const navMenu = document.querySelector('.about--me');
  const menuOverlay = document.querySelector('.menu-overlay');
  
  const toggleMenu = () => {
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    mobile.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
  };
  
  mobile.addEventListener('click', toggleMenu);
  menuOverlay.addEventListener('click', toggleMenu);
  
  // Fechar menu ao clicar nos links
  document.querySelectorAll('.about--me a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        toggleMenu();
        
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      }
    });
  });
};

// Inicializar
mobileMenu();
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

elementsL.forEach(el => observer.observe(el));
elementsR.forEach(el => observer.observe(el));
projectsFade.forEach(el => observer.observe(el));

// Animação de Scroll
const scrollAnimation = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  });

  document.querySelectorAll('.leftSide, .rightSide, .projetos-container, section').forEach(el => {
    observer.observe(el);
  });
};

// Carrossel
const initCarousel = () => {
  const carousel = document.querySelector('.carousel');
  const next = document.querySelector('.next');
  const prev = document.querySelector('.prev');
  
  next.addEventListener('click', () => {
    const cardWidth = document.querySelector('.card').offsetWidth;
    carousel.scrollBy({ left: cardWidth + 30, behavior: 'smooth' });
  });

  prev.addEventListener('click', () => {
    const cardWidth = document.querySelector('.card').offsetWidth;
    carousel.scrollBy({ left: -(cardWidth + 30), behavior: 'smooth' });
  });

  // Efeito de arrastar
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
  });
};

// Efeito de Digitação
const typeEffect = () => {
  const titles = ["Desenvolvedor Front-end", "UI/UX Enthusiast", "React Developer"];
  const element = document.querySelector('.linguagens h1');
  let currentIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const currentTitle = titles[currentIndex];

    if (isDeleting) {
      element.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentIndex = (currentIndex + 1) % titles.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? 50 : 100);
    }
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      type();
      observer.disconnect();
    }
  });

  observer.observe(document.querySelector('.linguagens'));
};

// Formulário de Contato
const initForm = () => {
  const form = document.querySelector('.contact-form');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Validação simples
    if (!email.value.includes('@')) {
      email.style.borderColor = 'red';
      setTimeout(() => {
        email.style.borderColor = 'var(--color-secundary)';
      }, 2000);
      return;
    }
    
    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      
      // Simulação de envio (substitua pelo seu Formspree ou outro serviço)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      form.innerHTML = '<p class="success-message">Mensagem enviada com sucesso! Entrarei em contato em breve.</p>';
    } catch (error) {
      form.insertAdjacentHTML('beforeend', '<p class="error-message">Ocorreu um erro. Tente novamente mais tarde.</p>');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar';
    }
  });
};

const initCertificados = () => {
  const imagens = document.querySelectorAll('.certificado-img');

  const modal = document.createElement('div');
  modal.classList.add('modal');
  document.body.appendChild(modal);

  const imgModal = document.createElement('img');
  modal.appendChild(imgModal);

    imagens.forEach(img => {
      img.addEventListener('click', () => {
        imgModal.src = img.src;
        modal.classList.add('active');
      });
    });

  modal.addEventListener('click', () => {
    modal.classList.remove('active');
  });
};

initCertificados();

// Inicializar tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  scrollAnimation();
  initCarousel();
  typeEffect();
  initForm();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    // Add this check:
    if (!targetElement) {
      console.warn(`Element not found: ${targetId}`);
      return;
    }
    
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});
