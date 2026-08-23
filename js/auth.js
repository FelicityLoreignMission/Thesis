// ==================== AUTHENTICATION FUNCTIONS ====================

// Toggle between login and signup forms
function toggleForms() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    loginForm.classList.toggle('hidden');
    signupForm.classList.toggle('hidden');
}

function initializePasswordToggles() {
    document.querySelectorAll('.password-toggle').forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const input = toggle.parentElement.querySelector('input');
            const isVisible = input.type === 'text';

            input.type = isVisible ? 'password' : 'text';
            toggle.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
            toggle.setAttribute('aria-pressed', String(!isVisible));
        });
    });
}

// Handle login
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Store user in localStorage (simulate backend)
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (!users[email]) {
        alert('Email not found. Please sign up first.');
        return;
    }

    if (users[email].password !== password) {
        alert('Incorrect password');
        return;
    }

    // Successful login
    localStorage.setItem('currentUser', JSON.stringify({
        email: email,
        name: users[email].name,
        avatar: users[email].avatar || ''
    }));

    alert('Login successful! Redirecting to dashboard...');
    window.location.href = 'dashboard.html';
}

// Handle signup
function handleSignup(event) {
    event.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;

    // Validation
    if (!name || !email || !password || !confirm) {
        alert('Please fill in all fields');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    if (password !== confirm) {
        alert('Passwords do not match');
        return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[email]) {
        alert('This email is already registered');
        return;
    }

    // Store new user
    users[email] = {
        name: name,
        email: email,
        password: password,
        createdDate: new Date().toISOString()
    };

    localStorage.setItem('users', JSON.stringify(users));

    alert('Account created successfully! Please log in.');
    toggleForms();

    // Clear form
    document.getElementById('signupName').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('signupConfirm').value = '';
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        // Redirect to login if not on login page
        if (!window.location.pathname.includes('index.html')) {
            window.location.href = 'index.html';
        }
    } else {
        // Update user name on dashboard
        const user = JSON.parse(currentUser);
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = user.name || 'User';
        }
    }
}

// Show a custom logout confirmation with save-account options
function showLogoutPrompt() {
    const existingModal = document.getElementById('logoutModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'logoutModal';
    modal.className = 'logout-modal-overlay';
    modal.innerHTML = `
        <div class="logout-modal">
            <p>Do you want to save your account?</p>
            <div class="logout-modal-actions">
                <button type="button" class="btn btn-secondary logout-yes">Yes</button>
                <button type="button" class="btn btn-primary logout-no">No</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const yesButton = modal.querySelector('.logout-yes');
    const noButton = modal.querySelector('.logout-no');

    yesButton.addEventListener('click', () => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            localStorage.setItem('rememberUser', 'true');
        }
        modal.remove();
        window.location.href = 'index.html';
    });

    noButton.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberUser');
        modal.remove();
        window.location.href = 'index.html';
    });
}

// Logout function
function handleLogout() {
    showLogoutPrompt();
}

// Run auth check on page load
window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initializePasswordToggles();
});
