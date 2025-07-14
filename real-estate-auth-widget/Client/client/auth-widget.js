class AuthWidget {
  constructor(options) {
    this.options = {
      logoUrl: 'https://assets.agentfire3.com/uploads/sites/685/2025/03/LOGO-NO-WEB-shadow-800xAUTOfit.svg',
      title: 'Hello!',
      description: 'Please verify your identity to access this premium content. Protect from competitors and AI bots.',
      apiEndpoint: null, // Set to your Railway URL for real mode
      sessionDuration: 24 * 60 * 60 * 1000, // 24 hours
      autoInit: true,
      ...options
    };
    if (this.options.autoInit) {
      this.init();
    }
  }

  init() {
    if (this.isAuthenticated()) {
      this.unlockContent();
    } else {
      this.showOverlay();
      this.blurContent();
    }
  }

  isAuthenticated() {
    const token = localStorage.getItem('auth_token');
    if (!token) return false;
    const { expiry } = JSON.parse(token);
    return Date.now() < expiry;
  }

  setAuthenticated() {
    const expiry = Date.now() + this.options.sessionDuration;
    localStorage.setItem('auth_token', JSON.stringify({ expiry }));
  }

  logout() {
    localStorage.removeItem('auth_token');
    location.reload();
  }

  showOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('auth-overlay', 'opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => overlay.classList.add('opacity-100'), 100);

    const card = document.createElement('div');
    card.classList.add('auth-card', 'transform', 'scale-95', 'transition-transform', 'duration-300');
    setTimeout(() => card.classList.add('scale-100'), 200);

    const logoContainer = document.createElement('div');
    logoContainer.classList.add('logo-container', 'mx-auto');
    const logo = document.createElement('img');
    logo.src = this.options.logoUrl;
    logo.alt = 'Logo';
    logo.classList.add('w-10', 'h-10');
    logoContainer.appendChild(logo);
    card.appendChild(logoContainer);

    const title = document.createElement('h2');
    title.textContent = this.options.title;
    title.classList.add('text-2xl', 'font-bold', 'text-center', 'mb-2', 'text-cobalt');
    card.appendChild(title);

    const desc = document.createElement('p');
    desc.textContent = this.options.description;
    desc.classList.add('text-center', 'text-slate-600', 'mb-6');
    card.appendChild(desc);

    const form = document.createElement('form');
    form.classList.add('space-y-4');

    const nameInput = this.createInput('text', 'Full Name');
    const emailInput = this.createInput('email', 'Email Address');
    const phoneInput = this.createInput('tel', 'Phone Number');
    const codeInput = this.createInput('text', 'Verification Code');
    codeInput.style.display = 'none';

    const sendBtn = document.createElement('button');
    sendBtn.type = 'button';
    sendBtn.textContent = 'Send Verification Code';
    sendBtn.classList.add('w-full', 'bg-legacy-blue', 'text-chalk', 'py-3', 'rounded-lg', 'font-semibold', 'hover:bg-aqua', 'transition-colors', 'duration-200');

    const verifyBtn = document.createElement('button');
    verifyBtn.type = 'button';
    verifyBtn.textContent = 'Verify';
    verifyBtn.style.display = 'none';
    verifyBtn.classList.add('w-full', 'bg-legacy-blue', 'text-chalk', 'py-3', 'rounded-lg', 'font-semibold', 'hover:bg-aqua', 'transition-colors', 'duration-200');

    form.append(nameInput, emailInput, phoneInput, sendBtn, codeInput, verifyBtn);
    card.appendChild(form);

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    let userData = {};
    sendBtn.addEventListener('click', async () => {
      userData = {
        name: nameInput.querySelector('input').value,
        email: emailInput.querySelector('input').value,
        phone: phoneInput.querySelector('input').value
      };
      if (!userData.name || !userData.email || !userData.phone) return alert('Please fill all fields.');

      if (this.options.apiEndpoint) {
        try {
          const res = await fetch(`${this.options.apiEndpoint}/send-code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
          });
          if (!res.ok) throw new Error();
        } catch {
          return alert('Error sending code. Try again.');
        }
      }

      [nameInput, emailInput, phoneInput, sendBtn].forEach(el => el.style.display = 'none');
      [codeInput, verifyBtn].forEach(el => el.style.display = 'block');
    });

    verifyBtn.addEventListener('click', async () => {
      const code = codeInput.querySelector('input').value;
      if (!code || code.length !== 6) return alert('Enter a 6-digit code.');

      let verified = false;
      if (this.options.apiEndpoint) {
        try {
          const res = await fetch(`${this.options.apiEndpoint}/verify-code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: userData.phone, code })
          });
          if (res.ok) verified = true;
          else alert('Invalid code.');
        } catch {
          alert('Error verifying code.');
        }
      } else {
        // Demo mode
        if (/^\d{6}$/.test(code)) verified = true;
        else alert('Invalid code.');
      }

      if (verified) {
        this.setAuthenticated();
        overlay.remove();
        this.unlockContent();
      }
    });
  }

  createInput(type, placeholder) {
    const div = document.createElement('div');
    const input = document.createElement('input');
    input.type = type;
    input.placeholder = placeholder;
    input.classList.add('w-full', 'p-3', 'border', 'border-slate', 'rounded-lg', 'focus:outline-none', 'focus:border-legacy-blue', 'transition-colors');
    div.appendChild(input);
    return div;
  }

  blurContent() {
    document.querySelectorAll('body > *:not(.auth-overlay)').forEach(el => {
      el.classList.add('protected-content');
    });
  }

  unlockContent() {
    document.querySelectorAll('.protected-content').forEach(el => {
      el.classList.remove('protected-content');
    });
  }
}

// Expose globally for manual triggers
window.AuthWidget = AuthWidget;
window.showAuth = () => new AuthWidget().showOverlay();