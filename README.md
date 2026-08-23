# EduLearn - Interactive Learning Platform

A modern, responsive web-based learning platform featuring user authentication, interactive modules, activities, resources, assessments, and badge tracking.

## 📋 Project Structure

```
EduLearn/
├── index.html              # Login & Signup page
├── dashboard.html          # Main dashboard with progress tracking
├── modules.html            # Learning modules and lessons
├── activities.html         # Interactive activities and practice
├── resources.html          # Study materials and downloadable resources
├── assessments.html        # Quizzes and assessments
├── badges.html             # Badges and achievements
├── css/
│   └── style.css          # All styling (responsive design)
├── js/
│   ├── auth.js            # Authentication logic
│   └── script.js          # General functionality
└── README.md              # This file
```

## 🚀 Features

### 1. **Authentication System**
- User login and signup with form validation
- Email validation
- Password strength requirements
- Secure user session management using localStorage
- Logout functionality

### 2. **Dashboard**
- User welcome greeting
- Progress tracking with visual progress bars
- Quick access cards to all major sections
- Recent activity timeline
- Performance statistics

### 3. **Learning Modules**
- 6+ progressive modules with difficulty levels
- Progress tracking for each module
- Module status indicators (Completed, In Progress, Locked)
- Search and sorting functionality
- Estimated completion times

### 4. **Interactive Activities**
- 6 different types of activities:
  - Hazard Hunt
  - PPE Matching
  - Emergency Response Scenario
  - Tool Identification
  - Safety Quiz
  - Workplace Simulation
- Difficulty levels (Beginner, Intermediate, Advanced)
- Performance statistics
- Progress tracking

### 5. **Learning Resources**
- Multiple resource types:
  - PDF Documents
  - Video Tutorials
  - E-Books
  - Checklists & Templates
- Search and filter functionality
- Download and preview options
- Resource organization by category

### 6. **Assessments & Quizzes**
- Module-specific assessments
- Performance summary dashboard
- Score tracking
- Quiz review functionality
- Retake options
- Certification path tracking

### 7. **Badges & Achievements**
- Badge system with unlock conditions
- 5+ earned badges
- Achievement progress tracking
- Certification path with milestones

### 8. **Responsive Design**
- Mobile-first approach
- Tablets and desktop optimization
- Touch-friendly interface
- Breakpoints for various screen sizes

## 🎨 Design Features

- **Color Scheme**: Professional green (#1a5f3a) with accent colors
- **Typography**: Clean, readable fonts (Segoe UI)
- **Components**: 
  - Sidebar navigation
  - Card-based layouts
  - Progress bars
  - Badges and status indicators
  - Interactive buttons
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: Semantic HTML and proper contrast

## 💾 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No backend server required (uses localStorage for data)

### Installation

1. **Extract the files** to a folder on your computer

2. **Open in browser**: 
   - Simply double-click `index.html` to open in your default browser
   - OR right-click and select "Open with" → Choose your preferred browser

3. **Create an account**:
   - Click "Sign Up" on the login page
   - Fill in your details (Name, Email, Password)
   - Click "Create Account"

4. **Login**:
   - Use your registered email and password to login
   - You'll be redirected to the dashboard

### Default Test Account
You can create your own account, but here's a test account you can use:
- **Email**: test@example.com
- **Password**: password123
- **Name**: Test User

(Create this account through the signup page)

## 📱 Usage Guide

### Dashboard
- View your overall progress
- Access quick shortcuts to all sections
- Track recent activities
- Monitor your learning statistics

### Learning Modules
- Browse available modules
- Track completion status
- Progress through sequential modules
- Some modules may be locked until prerequisites are completed

### Interactive Activities
- Practice with various interactive exercises
- Track your performance and accuracy
- Complete activities at your own pace
- View detailed results and statistics

### Resources
- Download study materials (PDFs, e-books)
- Watch video tutorials
- Access templates and checklists
- Use the search feature to find specific resources

### Assessments
- Complete module-specific quizzes
- Get instant feedback on your performance
- Review your answers
- Retake assessments to improve your score

### Badges
- Track badge achievements
- Monitor your path to certification

## 🔧 Customization

### Adding New Modules
Edit `modules.html` and add new module cards with appropriate content and styling.

### Changing Colors
Edit the CSS variables in `css/style.css` (`:root` section):
```css
:root {
    --primary-color: #1a5f3a;  /* Change these values */
    --accent-color: #f39c12;
    /* ... other colors ... */
}
```

### Adding More Activities
Edit `activities.html` to add new activity cards with different icons and descriptions.

### Extending Resources
Edit `resources.html` to add more resource types or categories.

## 📊 Data Storage

- All user data is stored in browser's **localStorage**
- No server or database required for basic functionality
- Data persists between sessions
- Can be enhanced with a backend (Node.js, Python, etc.)

### Data Structure
```javascript
// Users stored in localStorage
{
    "users": {
        "email@example.com": {
            "name": "John Doe",
            "email": "email@example.com",
            "password": "hashedpassword",
            "createdDate": "2024-06-15T10:30:00Z"
        }
    },
    "currentUser": {
        "email": "email@example.com",
        "name": "John Doe"
    }
}
```

## 🚀 Enhancement Ideas

1. **Backend Integration**
   - Connect to a Node.js/Express backend
   - Use MongoDB or PostgreSQL for data storage
   - Implement JWT authentication

2. **Advanced Features**
   - Real-time progress synchronization
   - Discussion forums
   - Live mentor sessions
   - Peer-to-peer learning
   - Gamification system
   - Leaderboards

3. **Content Additions**
   - More interactive simulations
   - Video player for embedded videos
   - Real-time progress notifications
   - Mobile app version

4. **Analytics**
   - Detailed learning analytics
   - Performance insights
   - Time tracking
   - Learning patterns analysis

## 🔒 Security Notes

**Current Implementation**: Uses localStorage (for demonstration)

**For Production Use**, implement:
- Secure backend authentication
- Password hashing (bcrypt)
- HTTPS/SSL encryption
- Session tokens (JWT)
- CORS protection
- Input validation and sanitization

## 🐛 Troubleshooting

### Users not logging in after signup?
- Check browser's localStorage settings
- Ensure cookies are enabled
- Clear browser cache if issues persist

### Styles not loading?
- Check that `css/` folder exists in the same directory
- Verify CSS file path is correct
- Refresh the browser (Ctrl+F5)

### JavaScript not working?
- Check browser's developer console for errors
- Verify `js/` folder exists
- Ensure JavaScript is enabled in browser

## 📞 Support

For questions or issues:
1. Check the console for error messages (F12)
2. Verify file structure matches the project layout
3. Ensure all files are in the correct directories
4. Try refreshing the page or clearing cache

## 📝 License

This project is open source and available for educational use.

## 👥 Credits

Designed and built as an educational learning platform demonstration.

---

**Version**: 1.0  
**Last Updated**: 2024  
**Status**: Ready for use and customization

---

## 📖 File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | Entry point with login/signup forms |
| `dashboard.html` | Main dashboard after login |
| `modules.html` | Learning modules listing and tracking |
| `activities.html` | Interactive activities and exercises |
| `resources.html` | Study materials and downloadable content |
| `assessments.html` | Quizzes and exam management |
| `badges.html` | Badge and achievement tracking |
| `css/style.css` | Complete responsive styling |
| `js/auth.js` | User authentication logic |
| `js/script.js` | Page functionality and interactions |

---

Happy Learning! 🎓
