// ==================== GENERAL FUNCTIONS ====================

// Navigation function
function navigateTo(page) {
    window.location.href = page;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');

    if (!currentUser) {
        const isPublicPage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('about.html');
        if (!isPublicPage) {
            window.location.href = 'index.html';
        }
        return;
    }

    const user = JSON.parse(currentUser);
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = user.name || 'User';
    }

    const avatarElement = document.getElementById('userAvatar');
    if (avatarElement) {
        const avatar = user.avatar || '';
        if (avatar) {
            avatarElement.style.backgroundImage = `url('${avatar}')`;
            avatarElement.style.backgroundSize = 'cover';
            avatarElement.style.backgroundPosition = 'center';
            avatarElement.textContent = '';
        } else {
            avatarElement.style.backgroundImage = 'none';
            avatarElement.textContent = '👤';
        }
    }
}

function initializeMobileNavigation() {
    const sidebar = document.querySelector('.sidebar');
    const menuButton = document.querySelector('.mobile-menu-toggle');
    if (!sidebar || !menuButton) return;

    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    const closeMenu = () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
    };

    menuButton.addEventListener('click', () => {
        const isOpen = sidebar.classList.toggle('active');
        overlay.classList.toggle('active', isOpen);
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    overlay.addEventListener('click', closeMenu);
    sidebar.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', closeMenu));
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

function openProfileModal() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const existingUser = users[currentUser.email] || {};

    const existingModal = document.getElementById('profileModal');
    if (existingModal) {
        existingModal.remove();
    }

    const avatarPreview = existingUser.avatar || currentUser.avatar || '';

    const modal = document.createElement('div');
    modal.id = 'profileModal';
    modal.className = 'logout-modal-overlay';
    modal.innerHTML = `
        <div class="profile-modal">
            <h3>Edit Profile</h3>
            <div class="profile-form">
                <div class="profile-avatar-preview-wrap">
                    <div class="profile-avatar-preview" id="profileAvatarPreview" style="background-image: ${avatarPreview ? `url('${avatarPreview}')` : 'none'}; background-size: cover; background-position: center;">${avatarPreview ? '' : '👤'}</div>
                </div>
                <div class="form-group">
                    <label for="profileName">Full Name</label>
                    <input id="profileName" type="text" value="${(existingUser.name || currentUser.name || '').replace(/"/g, '&quot;')}" required>
                </div>
                <div class="form-group">
                    <label for="profileEmail">Email Address</label>
                    <input id="profileEmail" type="email" value="${(currentUser.email || '').replace(/"/g, '&quot;')}" required>
                </div>
                <div class="form-group">
                    <label for="profilePassword">New Password</label>
                    <input id="profilePassword" type="password" placeholder="Leave blank to keep current password">
                </div>
                <div class="form-group">
                    <label for="profileImage">Profile Picture</label>
                    <input id="profileImage" type="file" accept="image/*">
                </div>
            </div>
            <div class="logout-modal-actions">
                <button type="button" class="btn btn-secondary save-profile">Save</button>
                <button type="button" class="btn btn-primary cancel-profile">Cancel</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const fileInput = document.getElementById('profileImage');
    const avatarPreviewEl = document.getElementById('profileAvatarPreview');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;
            avatarPreviewEl.style.backgroundImage = `url('${imageData}')`;
            avatarPreviewEl.style.backgroundSize = 'cover';
            avatarPreviewEl.style.backgroundPosition = 'center';
            avatarPreviewEl.textContent = '';
            avatarPreviewEl.dataset.avatar = imageData;
        };
        reader.readAsDataURL(file);
    });

    const saveButton = modal.querySelector('.save-profile');
    const cancelButton = modal.querySelector('.cancel-profile');

    saveButton.addEventListener('click', () => {
        const name = document.getElementById('profileName').value.trim();
        const email = document.getElementById('profileEmail').value.trim();
        const password = document.getElementById('profilePassword').value.trim();
        const avatarData = avatarPreviewEl.dataset.avatar || avatarPreview || '';

        if (!name || !email) {
            alert('Please fill in your name and email.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const originalEmail = currentUser.email;
        const sanitizedPassword = password || existingUser.password || '';

        if (email !== originalEmail && users[email]) {
            alert('This email is already registered to another account.');
            return;
        }

        if (originalEmail !== email) {
            delete users[originalEmail];
        }

        users[email] = {
            name: name,
            email: email,
            password: sanitizedPassword,
            avatar: avatarData,
            createdDate: existingUser.createdDate || new Date().toISOString()
        };

        const updatedCurrentUser = {
            email: email,
            name: name,
            avatar: avatarData
        };

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));

        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = name;
        }

        const userAvatarElement = document.getElementById('userAvatar');
        if (userAvatarElement) {
            if (avatarData) {
                userAvatarElement.style.backgroundImage = `url('${avatarData}')`;
                userAvatarElement.style.backgroundSize = 'cover';
                userAvatarElement.style.backgroundPosition = 'center';
                userAvatarElement.textContent = '';
            } else {
                userAvatarElement.style.backgroundImage = 'none';
                userAvatarElement.textContent = '👤';
            }
        }

        modal.remove();
        alert('Profile updated successfully.');
    });

    cancelButton.addEventListener('click', () => {
        modal.remove();
    });
}

window.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initializeMobileNavigation();
});

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

const researchers = [
    { id: 'felicity', name: 'Felicity Loreign Mission', age: '21', sex: 'Female', address: 'Manila City | BSIE - ICT', role: 'Web Developer' },
    { id: 'micaela', name: 'Micaela Lopez', age: '21', sex: 'Female', address: 'Quezon City | BSIE - ICT', role: 'Thesis Paper' },
    { id: 'nadenalthea', name: 'Naden Althea Eustaquio', age: '22', sex: 'Female', address: 'Manila City | BSIE - ICT', role: 'Web Developer' },
    { id: 'jennyrose', name: 'Jenny Rose Bayubay', age: '22', sex: 'Female', address: 'Las Piñas City | BSIE - ICT', role: 'Thesis Paper' }
];

window.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('researcherModal');
    if (!modal) return;

    const closeButton = modal.querySelector('.researcher-modal-close');
    const closeModal = () => {
        modal.hidden = true;
        document.body.style.overflow = '';
    };

    document.querySelectorAll('[data-researcher-id]').forEach((card) => {
        card.addEventListener('click', () => {
            const researcher = researchers.find(({ id }) => id === card.dataset.researcherId);
            if (!researcher) return;

            document.getElementById('researcherModalName').textContent = researcher.name;
            document.getElementById('researcherAge').textContent = researcher.age;
            document.getElementById('researcherSex').textContent = researcher.sex;
            document.getElementById('researcherAddress').textContent = researcher.address;
            document.getElementById('researcherRole').textContent = researcher.role;
            modal.hidden = false;
            document.body.style.overflow = 'hidden';
            closeButton.focus();
        });
    });

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.hidden) closeModal();
    });
});
