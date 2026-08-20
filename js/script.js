// ==================== GENERAL FUNCTIONS ====================

// Navigation function
function navigateTo(page) {
    window.location.href = page;
}

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        if (!window.location.pathname.endsWith('index.html')) {
            window.location.href = 'index.html';
        }
        return;
    }

    const user = JSON.parse(currentUser);
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = user.name || 'User';
    }
}

// Show confirmation modal for logout
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
        localStorage.setItem('rememberUser', 'true');
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

function handleLogout() {
    showLogoutPrompt();
}

window.addEventListener('DOMContentLoaded', checkAuth);

// ==================== DASHBOARD FUNCTIONS ====================

function viewModule(moduleId) {
    alert(`Opening Module ${moduleId}. (Feature coming soon)`);
}

// ==================== MODULES FUNCTIONS ====================

function filterModules() {
    const searchTerm = document.getElementById('searchModules').value.toLowerCase();
    const moduleCards = document.querySelectorAll('.module-card');

    moduleCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.module-desc').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function sortModules(sortBy) {
    const container = document.querySelector('.modules-container');
    const cards = Array.from(document.querySelectorAll('.module-card'));

    if (sortBy === 'recent') {
        // Most recent first (default order)
        cards.sort((a, b) => 0);
    } else if (sortBy === 'progress') {
        // Sort by progress percentage
        cards.sort((a, b) => {
            const progressA = parseInt(a.querySelector('.progress-fill').style.width);
            const progressB = parseInt(b.querySelector('.progress-fill').style.width);
            return progressB - progressA;
        });
    } else if (sortBy === 'difficulty') {
        // Sort by difficulty (assuming module number indicates difficulty)
        cards.sort((a, b) => {
            const numA = parseInt(a.querySelector('h3').textContent.match(/\d+/)[0]);
            const numB = parseInt(b.querySelector('h3').textContent.match(/\d+/)[0]);
            return numA - numB;
        });
    }

    cards.forEach(card => container.appendChild(card));
}

// ==================== ACTIVITIES FUNCTIONS ====================

function startActivity(activityId) {
    alert(`Starting activity: ${activityId}. (Simulation loading...)`);
    // In a real app, you would navigate to activity page or load activity content
}

function viewResults(activityId) {
    alert(`Viewing results for: ${activityId}. (Coming soon)`);
}

// ==================== RESOURCES FUNCTIONS ====================

function filterResources() {
    const searchTerm = document.getElementById('searchResources').value.toLowerCase();
    const resourceCards = document.querySelectorAll('.resource-card');

    resourceCards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('.resource-desc').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterByType(type) {
    if (type === 'all') {
        document.querySelectorAll('.resource-section').forEach(section => {
            section.style.display = '';
        });
    } else {
        document.querySelectorAll('.resource-section').forEach(section => {
            const title = section.querySelector('h3').textContent.toLowerCase();
            const typeMap = {
                'pdf': 'pdf',
                'video': 'video',
                'ebook': 'e-books',
                'spreadsheet': 'checklists'
            };

            if (title.includes(typeMap[type])) {
                section.style.display = '';
            } else {
                section.style.display = 'none';
            }
        });
    }
}

function downloadResource(resourceId) {
    alert(`Downloading: ${resourceId}.pdf\n(In a real application, this would trigger a download)`);
}

function viewResource(resourceId) {
    alert(`Viewing resource: ${resourceId}\n(Preview window would open)`);
}

function watchVideo(videoId) {
    alert(`Playing video: ${videoId}\n(Video player would open)`);
}

function readEbook(ebookId) {
    alert(`Opening e-book: ${ebookId}\n(E-book reader would open)`);
}

// ==================== ASSESSMENTS FUNCTIONS ====================

function startAssessment(assessmentId) {
    alert(`Starting Assessment ${assessmentId}. Timer will start...\n(Assessment interface loading...)`);
}

function continueAssessment(assessmentId) {
    alert(`Continuing Assessment ${assessmentId}\n(Loading from where you left off...)`);
}

function exitAssessment(assessmentId) {
    if (confirm('Are you sure you want to exit? Your progress will be saved.')) {
        alert('Assessment saved. You can resume later.');
    }
}

function reviewAssessment(assessmentId) {
    alert(`Reviewing Assessment ${assessmentId}\n(Showing answers and explanations...)`);
}

function retakeAssessment(assessmentId) {
    if (confirm('Retake this assessment? Your new score will replace the old one.')) {
        alert('Starting fresh assessment...');
    }
}

// ==================== CERTIFICATES FUNCTIONS ====================

function viewCertificate(certId) {
    alert(`Displaying Certificate ${certId}\n(Full certificate view opening...)`);
}

function downloadCertificate(certId) {
    alert(`Downloading Certificate ${certId} as PDF\n(File download starting...)`);
}

// ==================== UTILITY FUNCTIONS ====================

// Format date
function formatDate(date) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations to style
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// ==================== EVENT LISTENERS ====================

// Check authentication on page load
window.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    // Add click handlers for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.href === window.location.pathname) {
            link.classList.add('active');
        }
    });
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Log initialization
console.log('EduLearn platform initialized successfully');
