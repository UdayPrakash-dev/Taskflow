// ==========================================
// API COMMUNICATION LAYER
// ==========================================

// MUST match your backend server port
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Core Fetch Wrapper to handle headers, tokens, and errors globally.
 * * @param {string} endpoint - e.g., '/auth/login'
 * @param {string} method - 'GET', 'POST', 'PUT', 'DELETE'
 * @param {object|null} body - JS object to be stringified (optional)
 * @returns {Promise<object>} - Parsed JSON response
 */
async function apiCall(endpoint, method = 'GET', body = null) {
    // 1. Setup default headers
    const headers = {
        'Content-Type': 'application/json'
    };

    // 2. Attach JWT token if it exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // 3. Configure the fetch options
    const options = {
        method,
        headers
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        // 4. Execute the network request
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        
        // 5. Parse the JSON (assuming backend always sends JSON)
        const data = await response.json();

        // 6. Handle HTTP Errors
        if (!response.ok) {
            // Check if token is invalid/expired (Backend sends 401)
            if (response.status === 401) {
                console.warn('Unauthorized. Token may be expired.');
                logout(); // Automatically clear token and kick to login
            }
            
            // Throw an error so the calling function can catch it and show UI
            throw new Error(data.message || 'Something went wrong');
        }

        // 7. Return successful data
        return data;

    } catch (error) {
        // Catch network errors (server down) or the manual throw above
        console.error('API Call Failed:', error.message);
        throw error; // Re-throw to be handled by specific controllers (auth/dashboard)
    }
}