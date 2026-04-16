// Smooth scroll for nav links
for (const a of document.querySelectorAll('.nav a')) {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Theme toggle (dark by default, optional light)
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved === 'light') root.classList.add('light');
const toggleBtn = document.getElementById('themeToggle');
const setIcon = () => toggleBtn.textContent = root.classList.contains('light') ? '🌞' : '🌙';
setIcon();
toggleBtn.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  setIcon();
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form validation + local save
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  if (!data.name || !data.email || !data.message) {
    statusEl.textContent = 'Please fill in all fields.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    statusEl.textContent = 'Enter a valid email.';
    return;
  }
  const msgs = JSON.parse(localStorage.getItem('messages') || '[]');
  msgs.push({ ...data, at: new Date().toISOString() });
  localStorage.setItem('messages', JSON.stringify(msgs));
  statusEl.textContent = 'Message saved locally (demo).';
  form.reset();
});
