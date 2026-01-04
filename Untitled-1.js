// ============================================================================================================
// CUSTOM CURSOR
// ============================================================================================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  setTimeout(() => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
  }, 100);
});

// Cursor hover effect on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .card, input, textarea');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorFollower.classList.add('active');
  });
  el.addEventListener('mouseleave', () => {
    cursorFollower.classList.remove('active');
  });
});

// ============================================================================================================
// PARTICLE ANIMATION
// ============================================================================================================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = `rgba(73, 230, 255, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.strokeStyle = `rgba(73, 230, 255, ${0.2 - distance / 500})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  
  connectParticles();
  requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

// ============================================================================================================
// MOBILE MENU TOGGLE
// ============================================================================================================
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
const body = document.body;

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  body.classList.toggle('menu-open');
  
  // Add ripple effect on menu toggle
  const rect = menuToggle.getBoundingClientRect();
  const ripple = document.createElement('div');
  ripple.className = 'menu-ripple';
  ripple.style.left = (rect.width / 2) + 'px';
  ripple.style.top = (rect.height / 2) + 'px';
  menuToggle.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
});

// Close menu when clicking a link
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    body.classList.remove('menu-open');
  });
});

// Add touch ripple effect to mobile links
mobileLinks.forEach(link => {
  link.addEventListener('touchstart', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'touch-ripple';
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.touches[0].clientX - rect.left - size / 2;
    const y = e.touches[0].clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// ============================================================================================================
// SMOOTH SCROLL
// ============================================================================================================
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

// ============================================================================================================
// SCROLL PROGRESS INDICATOR
// ============================================================================================================
window.addEventListener('scroll', () => {
  const scrollLine = document.querySelector('.scroll-line');
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollLine.style.width = scrolled + '%';
});

// ============================================================================================================
// STATS COUNTER ANIMATION
// ============================================================================================================
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats-container');
let hasAnimated = false;

function animateStats() {
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target;
      }
    };

    updateCounter();
  });
}

const observerStats = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !hasAnimated) {
      animateStats();
      hasAnimated = true;
    }
  });
}, { threshold: 0.5 });

if (statsSection) {
  observerStats.observe(statsSection);
}

// ============================================================================================================
// CARD TILT EFFECT
// ============================================================================================================
const cards = document.querySelectorAll('.card[data-tilt]');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ============================================================================================================
// RIPPLE EFFECT ON BUTTONS
// ============================================================================================================
document.querySelectorAll('.contact-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// ============================================================================================================
// CONTACT FORM HANDLING
// ============================================================================================================
const contactForm = document.getElementById('contactForm');
const messageTextarea = document.getElementById('message');
const charCount = document.querySelector('.char-count');

// Character counter
if (messageTextarea && charCount) {
  messageTextarea.addEventListener('input', () => {
    const length = messageTextarea.value.length;
    charCount.textContent = length;
    
    // Change color when approaching limit
    if (length > 450) {
      charCount.style.color = '#ff4081';
    } else if (length > 350) {
      charCount.style.color = '#ffd700';
    } else {
      charCount.style.color = 'var(--accent)';
    }
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span>Sending...</span><svg class="spinning" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="4" stroke-dasharray="60" stroke-dashoffset="0"/></svg>';
    submitBtn.disabled = true;
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simulate sending (replace with actual form submission)
    setTimeout(() => {
      // Success animation
      submitBtn.innerHTML = '<span>Sent! ✓</span>';
      submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc66)';
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message';
      successMsg.innerHTML = `
        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>Thank you ${name}! I'll get back to you soon at ${email}</span>
      `;
      contactForm.appendChild(successMsg);
      
      // Reset form
      setTimeout(() => {
        contactForm.reset();
        charCount.textContent = '0';
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        successMsg.remove();
      }, 3000);
    }, 1500);
  });
}

// ============================================================================================================
// SCROLL REVEAL ANIMATION
// ============================================================================================================
const revealElements = document.querySelectorAll('.panel, .card, .stat-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// ============================================================================================================
// TYPING EFFECT (Optional Enhancement)
// ============================================================================================================
const typingText = document.querySelector('.typing-effect');
if (typingText) {
  const text = typingText.textContent;
  typingText.textContent = '';
  let i = 0;
  
  function typeWriter() {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  
  // Start typing after a short delay
  setTimeout(typeWriter, 500);
}

// ============================================================================================================
// PARALLAX SCROLL EFFECT FOR BACKGROUND ORBS
// ============================================================================================================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const orbs = document.querySelectorAll('.gradient-orb');
  
  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.1;
    orb.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ============================================================================================================
// NAVIGATION ACTIVE STATE
// ============================================================================================================
const sections = document.querySelectorAll('.panel');
const navLinks = document.querySelectorAll('.v-link, .mobile-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
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

// ============================================================================================================
// PREVENT CONTEXT MENU ON CUSTOM CURSOR AREA (Optional)
// ============================================================================================================
document.addEventListener('contextmenu', (e) => {
  // Uncomment to disable right-click
  // e.preventDefault();
});

// ============================================================================================================
// LOADING ANIMATION (Optional)
// ============================================================================================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ============================================================================================================
// CONSOLE MESSAGE (Easter Egg)
// ============================================================================================================
console.log('%c👋 Hey there!', 'color: #49e6ff; font-size: 20px; font-weight: bold;');
console.log('%cLooking for something? Check out my GitHub!', 'color: #9aa3b2; font-size: 14px;');
console.log('%chttps://github.com/Neurobyte001', 'color: #49e6ff; font-size: 14px;');

// ============================================================================================================
// PERFORMANCE OPTIMIZATION
// ============================================================================================================
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events if needed
const debouncedScroll = debounce(() => {
  // Any expensive scroll operations here
}, 10);

window.addEventListener('scroll', debouncedScroll);