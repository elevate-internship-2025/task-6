// Contact form validation (vanilla JS)
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const errName = document.getElementById('error-name');
const errEmail = document.getElementById('error-email');
const errMessage = document.getElementById('error-message');
const formMessage = document.getElementById('formMessage');

// Simple but robust email regex (common safe pattern)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Utility: show error and style input
function showError(inputEl, errEl, message) {
  errEl.textContent = message;
  inputEl.classList.add('input-error');
}

// Clear error for a field
function clearError(inputEl, errEl) {
  errEl.textContent = '';
  inputEl.classList.remove('input-error');
}

// Validate single fields
function validateName() {
  const val = nameInput.value.trim();
  if (!val) {
    showError(nameInput, errName, 'Name is required');
    return false;
  }
  if (val.length < 2) {
    showError(nameInput, errName, 'Please enter at least 2 characters');
    return false;
  }
  clearError(nameInput, errName);
  return true;
}

function validateEmail() {
  const val = emailInput.value.trim();
  if (!val) {
    showError(emailInput, errEmail, 'Email is required');
    return false;
  }
  if (!emailRegex.test(val)) {
    showError(emailInput, errEmail, 'Please enter a valid email address');
    return false;
  }
  clearError(emailInput, errEmail);
  return true;
}

function validateMessage() {
  const val = messageInput.value.trim();
  if (!val) {
    showError(messageInput, errMessage, 'Message cannot be empty');
    return false;
  }
  if (val.length < 6) {
    showError(messageInput, errMessage, 'Please write a bit more (at least 6 characters)');
    return false;
  }
  clearError(messageInput, errMessage);
  return true;
}

// Live validation to improve UX
[nameInput, emailInput, messageInput].forEach(el => {
  el.addEventListener('input', () => {
    // call corresponding validator on input
    if (el === nameInput) validateName();
    if (el === emailInput) validateEmail();
    if (el === messageInput) validateMessage();
    formMessage.textContent = ''; // clear global messages while typing
    formMessage.classList.remove('success');
  });
});

// On submit
form.addEventListener('submit', (e) => {
  e.preventDefault(); // always prevent actual submission for this task

  const okName = validateName();
  const okEmail = validateEmail();
  const okMessage = validateMessage();

  if (!okName || !okEmail || !okMessage) {
    formMessage.textContent = 'Please fix the errors above and try again.';
    formMessage.classList.remove('success');
    return;
  }

  // If all valid: show success message and clear form (no sending)
  formMessage.textContent = 'Thanks — your message looks good! (This demo does not send emails)';
  formMessage.classList.add('success');

  // Optionally reset the form after a short delay
  setTimeout(() => {
    form.reset();
    [errName, errEmail, errMessage].forEach(el => el.textContent = '');
    formMessage.textContent = '';
    formMessage.classList.remove('success');
  }, 2200);
});
