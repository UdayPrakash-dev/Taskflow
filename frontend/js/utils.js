// ==========================================
// UTILITY FUNCTIONS (Shared globally)
// ==========================================

// Display error messages inside a specific DOM element
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

// Hide error messages
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
}

// Toggle loading state on buttons (hides text, shows spinner, disables button)
function setLoading(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (!button) return;

    const btnText = button.querySelector('.btn-text');
    const loader = button.querySelector('.loader');

    if (isLoading) {
        button.disabled = true;
        if (btnText) btnText.classList.add('hidden');
        if (loader) loader.classList.remove('hidden');
    } else {
        button.disabled = false;
        if (btnText) btnText.classList.remove('hidden');
        if (loader) loader.classList.add('hidden');
    }
}

// Security Routing: Kick unauthenticated users to login
function requireAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
    }
}

// Security Routing: Kick authenticated users to dashboard (used on login/register pages)
function redirectIfAuthenticated() {
    const token = localStorage.getItem('token');
    if (token) {
        window.location.href = 'dashboard.html';
    }
}

// Centralized Logout function
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

// Format MongoDB timestamps to human-readable text
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}