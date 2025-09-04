const API_URL = 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  // 🔐 Login logic
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;

      fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert('Login successful');
            window.location.href = 'index.html'; // ✅ Redirect to dashboard
          } else {
            alert(data.message || 'Login failed');
          }
        });
    });
  }

  // 📝 Signup logic
  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = document.getElementById('signupUsername').value;
      const password = document.getElementById('signupPassword').value;

      fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert('Signup successful! Redirecting to login...');
            window.location.href = 'login.html'; // ✅ Redirect to login
          } else {
            alert(data.message || 'Signup failed');
          }
        });
    });
  }
});
