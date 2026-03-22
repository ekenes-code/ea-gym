const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const modal = document.getElementById('infoModal');
const modalClose = document.querySelector('.modal-close');
const triggerButtons = document.querySelectorAll('.modal-trigger');
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');
const registerForm = document.querySelector('.register-form');
const formStatus = document.querySelector('.form-status');
const setActiveTab = (tabId) => {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tabTarget === tabId;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.id === tabId;
    panel.classList.toggle('active', isActive);
    panel.hidden = !isActive;
  });
};
const openModal = (tabId = 'register') => {
  setActiveTab(tabId);
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};
const closeModal = () => {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

triggerButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const tabId = button.dataset.tab || 'register';
    openModal(tabId);
    siteNav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveTab(button.dataset.tabTarget);
  });
});

modalClose?.addEventListener('click', closeModal);

modal?.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});

registerForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(registerForm);
  const userName = String(formData.get('name') || '').trim();

  formStatus.textContent = userName
    ? `Спасибо, ${userName}! Форма регистрации готова к интеграции на основной сайт.`
    : 'Форма регистрации готова к интеграции на основной сайт.';

  registerForm.reset();
});
