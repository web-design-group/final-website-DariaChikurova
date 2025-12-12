/* прокрутка */
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  
  field.classList.add('error');
  
  let errorElement = field.parentElement.querySelector('.error-message');
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    field.parentElement.appendChild(errorElement);
  }
  errorElement.textContent = message;
}

function removeFieldError(fieldId) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  
  field.classList.remove('error');
  
  const errorElement = field.parentElement.querySelector('.error-message');
  if (errorElement) {
    errorElement.remove();
  }
}

/* обработка формы */
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const serviceType = document.getElementById('serviceType').value;
    const message = document.getElementById('message').value.trim();
    const consent = document.getElementById('consent').checked;
    
    let isValid = true;
    
    if (fullName === '' || fullName.length < 3) {
      showFieldError('fullName', 'Введите корректное имя');
      isValid = false;
    } else {
      removeFieldError('fullName');
    }

    if (email === '' || !isValidEmail(email)) {
      showFieldError('email', 'Введите корректный email');
      isValid = false;
    } else {
      removeFieldError('email');
    }
    
    if (serviceType === '') {
      showFieldError('serviceType', 'Выберите тип услуги');
      isValid = false;
    } else {
      removeFieldError('serviceType');
    }
    
    if (message === '' || message.length < 10) {
      showFieldError('message', 'Минимум 10 символов');
      isValid = false;
    } else {
      removeFieldError('message');
    }

    if (!consent) {
      showFieldError('consent', 'Примите условия');
      isValid = false;
    } else {
      removeFieldError('consent');
    }
    
    if (isValid) {
      submitForm(fullName, email, serviceType, message);
    }
  });
  
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      removeFieldError(this.id);
    });
  });
});

/* отправка формы */
function submitForm(fullName, email, serviceType, message) {
  const form = document.getElementById('contactForm');
  const btn = form.querySelector('.btn-submit');
  const originalText = btn.textContent;
  
  btn.disabled = true;
  btn.textContent = 'Отправляем...';
  
  setTimeout(() => {
    btn.classList.add('submitted');
    btn.textContent = '✓ Отправлено';
    form.reset();
    
    setTimeout(() => {
      btn.classList.remove('submitted');
      btn.textContent = originalText;
      btn.disabled = false;
    }, 3000);
  }, 1500);
}

/* галочка*/
document.addEventListener('DOMContentLoaded', function() {
  const consentCheckbox = document.getElementById('consent');
  if (!consentCheckbox) return;
  
  consentCheckbox.addEventListener('change', function() {
    if (this.checked) {
      removeFieldError('consent');
    } else {
      const form = document.getElementById('contactForm');
      if (form && form.classList.contains('was-validated')) {
        showFieldError('consent', 'Примите условия');
      }
    }
  });
});

