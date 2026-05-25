// ==========================================
// DASHBOARD & TASK CRUD LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Setup
    setupDashboard();
    fetchAndRenderTasks();

    // 2. Event Listeners
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    document.getElementById('create-task-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        await createTask();
    });
});

/**
 * UI Setup (Greeting)
 */
function setupDashboard() {
    // Fetch profile data to guarantee accuracy, or just use localStorage cache
    const userNameDisplay = document.getElementById('user-name-display');
    
    // We fetch '/auth/me' to verify token is valid and get fresh user data
    apiCall('/api/auth/me', 'GET')
        .then(user => {
            userNameDisplay.textContent = `Hello, ${user.name}`;
            localStorage.setItem('userName', user.name); // update cache
        })
        .catch(() => {
            // If /me fails, apiCall handles the 401 logout, but we catch to avoid console errors
            userNameDisplay.textContent = "Error loading profile";
        });
}

/**
 * READ: Fetch all tasks and render them to the DOM
 */
async function fetchAndRenderTasks() {
    const container = document.getElementById('tasks-container');
    
    try {
        const tasks = await apiCall('/api/tasks', 'GET');
        
        container.innerHTML = ''; // Clear loading text
        
        if (tasks.length === 0) {
            container.innerHTML = `<div class="text-center" style="color: var(--text-muted); padding: 2rem;">No tasks yet. Create one above!</div>`;
            return;
        }

        // Loop through tasks and build HTML string
        tasks.forEach(task => {
            const taskEl = document.createElement('div');
            taskEl.className = `task-item ${task.completed ? 'completed' : ''}`;
            // Store the ID in the dataset for easy access during updates/deletes
            taskEl.dataset.id = task._id; 
            
            taskEl.innerHTML = `
                <div class="checkbox-wrapper">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                           onchange="toggleTaskStatus('${task._id}', this.checked)">
                </div>
                <div class="task-content">
                    <div class="task-title">${escapeHTML(task.title)}</div>
                    ${task.description ? `<div class="task-desc">${escapeHTML(task.description)}</div>` : ''}
                    <div class="task-meta">Created: ${formatDate(task.createdAt)}</div>
                </div>
                <div class="task-actions">
                    <button class="btn btn-sm btn-danger" onclick="deleteTask('${task._id}')">Delete</button>
                </div>
            `;
            container.appendChild(taskEl);
        });

    } catch (error) {
        container.innerHTML = `<div class="alert alert-error">Failed to load tasks. Please refresh.</div>`;
    }
}

/**
 * CREATE: Add a new task
 */
async function createTask() {
    hideError('task-error');
    setLoading('task-submit-btn', true);

    const titleInput = document.getElementById('task-title');
    const descInput = document.getElementById('task-desc');

    try {
        // Send POST request
        await apiCall('/api/tasks', 'POST', {
            title: titleInput.value,
            description: descInput.value
        });

        // Clear form on success
        titleInput.value = '';
        descInput.value = '';

        // Re-fetch list to show new task at the top
        fetchAndRenderTasks();
    } catch (error) {
        showError('task-error', error.message);
    } finally {
        setLoading('task-submit-btn', false);
    }
}

/**
 * UPDATE: Toggle completion status
 * Triggered by the onchange attribute in the checkbox HTML
 */
async function toggleTaskStatus(taskId, isCompleted) {
    try {
        // Find the UI element to add visual feedback immediately (Optimistic UI update)
        const taskElement = document.querySelector(`.task-item[data-id="${taskId}"]`);
        if (isCompleted) {
            taskElement.classList.add('completed');
        } else {
            taskElement.classList.remove('completed');
        }

        // Send PUT request to backend
        await apiCall(`/api/tasks/${taskId}`, 'PUT', {
            completed: isCompleted
        });
        
    } catch (error) {
        alert('Failed to update task status.');
        // Revert UI on failure
        fetchAndRenderTasks(); 
    }
}

/**
 * DELETE: Remove a task
 * Triggered by the onclick attribute on the Delete button
 */
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        await apiCall(`/api/tasks/${taskId}`, 'DELETE');
        
        // Optimistically remove from UI without needing a full re-fetch
        const taskElement = document.querySelector(`.task-item[data-id="${taskId}"]`);
        if (taskElement) {
            taskElement.remove();
        }
        
        // If empty, show empty state
        const container = document.getElementById('tasks-container');
        if (container.children.length === 0) {
            container.innerHTML = `<div class="text-center" style="color: var(--text-muted); padding: 2rem;">No tasks yet. Create one above!</div>`;
        }
        
    } catch (error) {
        alert('Failed to delete task: ' + error.message);
    }
}

/**
 * Security: Prevent XSS attacks by escaping user input before rendering to DOM
 */
function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}