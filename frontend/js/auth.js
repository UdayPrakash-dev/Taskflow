// ==========================================
// AUTHENTICATION LOGIC (Login & Register)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LOGIN FORM HANDLING ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent page reload
            
            hideError('error-message');
            setLoading('submit-btn', true);

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // Call API using the wrapper
                const data = await apiCall('/auth/login', 'POST', { email, password });
                
                // Store token and routing
                localStorage.setItem('token', data.token);
                // Optional: Store user name for greeting on dashboard
                localStorage.setItem('userName', data.name); 
                
                window.location.href = 'dashboard.html';
            } catch (error) {
                showError('error-message', error.message);
            } finally {
                setLoading('submit-btn', false);
            }
        });
    }

    // --- REGISTER FORM HANDLING ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            hideError('error-message');
            setLoading('submit-btn', true);

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // Call API using the wrapper
                const data = await apiCall('/auth/register', 'POST', { name, email, password });
                
                // Store token and redirect
                localStorage.setItem('token', data.token);
                localStorage.setItem('userName', data.name);
                
                window.location.href = 'dashboard.html';
            } catch (error) {
                showError('error-message', error.message);
            } finally {
                setLoading('submit-btn', false);
            }
        });
    }
});