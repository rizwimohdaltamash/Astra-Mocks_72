# 🚀 Astra-Mocks

<div align="center">

![Astra-Mocks Banner](https://img.shields.io/badge/Astra--Mocks-Master%20Your%20Technical%20Interviews-blue?style=for-the-badge)

**Master Your Technical Interviews with Confidence**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.12.5-FFCA28?logo=firebase&logoColor=white)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.9-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [Screenshots](#-screenshots)
- [Scoring System](#-scoring-system)
- [Admin Features](#-admin-features)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Astra-Mocks** is a comprehensive web application designed to help developers ace their technical interviews through practice and repetition. With hundreds of curated questions across multiple technologies, users can practice unlimited times, review solutions immediately after completion, and track their progress through an intuitive dashboard.

The platform supports practice tests for:
- 🟨 **JavaScript** (Vanilla JS fundamentals)
- ⚛️ **ReactJS** (Frontend library)
- 🟢 **Node.js** (Backend runtime)
- 🚂 **Express.js** (Web framework)
- 🍃 **MongoDB** (NoSQL database)

---

## ✨ Key Features

### 🎯 **Unlimited Practice Tests**
- Take the same mock test infinite times to master concepts
- Three difficulty levels: **Easy**, **Medium**, and **Hard**
- Each test contains 10 carefully curated questions

### ⏱️ **Timed Assessments**
- Real-time countdown timer (20 minutes per test)
- Auto-submission when time expires
- Timer persists across page refreshes

### 📊 **Instant Feedback & Analytics**
- Detailed score breakdown after each attempt
- Visual progress indicators with color-coded circles
- Track correct, incorrect, and unattempted questions
- View solutions immediately after test completion

### 💾 **Smart Progress Tracking**
- Automatic answer saving to localStorage
- Resume tests from where you left off
- Persistent question navigation
- User-specific progress tracking

### 🔐 **Secure Authentication**
- Firebase-based authentication system
- User and Admin role management
- Protected routes for admin dashboard
- Persistent login sessions

### 📱 **Responsive Design**
- Mobile-first approach with Tailwind CSS
- Hamburger menu for mobile navigation
- Optimized for all screen sizes
- Beautiful gradient backgrounds and glassmorphism effects

### 👨‍💼 **Admin Dashboard**
- View all registered users
- Monitor quiz attempts and scores
- Track user performance across difficulty levels
- Real-time statistics and analytics

### 🎨 **Modern UI/UX**
- Stunning gradient backgrounds
- Glassmorphism effects with backdrop blur
- Smooth transitions and animations
- Intuitive navigation and pagination
- React Icons integration

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18.3.1** - UI library
- **React Router DOM 6.26.0** - Client-side routing
- **Tailwind CSS 3.4.9** - Utility-first CSS framework
- **React Icons 5.2.1** - Icon library
- **React Hot Toast 2.4.1** - Toast notifications
- **React Toastify 10.0.5** - Alternative notification system
- **React SweetAlert2 0.6.0** - Beautiful alerts

### **Backend & Database**
- **Firebase 10.12.5** - Authentication and Firestore database
- **Firebase Auth** - User authentication
- **Firestore** - NoSQL cloud database

### **State Management**
- **React Redux 9.1.2** - State management
- **LocalStorage** - Client-side data persistence

### **Development Tools**
- **React Scripts 5.0.1** - Build tooling
- **Testing Library** - Testing utilities
- **Web Vitals** - Performance metrics

---

## 📁 Project Structure

```
Astra-Mocks_72-main/
│
├── public/                      # Static assets
│   ├── index.html              # HTML template
│   ├── manifest.json           # PWA manifest
│   └── robots.txt              # SEO configuration
│
├── src/
│   ├── admin/                   # Admin dashboard components
│   │   ├── AdminDash.jsx       # Registered users view
│   │   └── DashboardAdmin.jsx  # Quiz results view
│   │
│   ├── assets/                  # Images and static files
│   │   ├── rct1.jpg            # ReactJS card image
│   │   ├── js1.jpg             # JavaScript card image
│   │   ├── node3.jpg           # Node.js card image
│   │   ├── express.jpg         # Express.js card image
│   │   └── mon.jpg             # MongoDB card image
│   │
│   ├── components/              # Reusable components
│   │   ├── Home.jsx            # Landing page
│   │   ├── Intro.jsx           # Main dashboard
│   │   ├── About.jsx           # About page
│   │   ├── Reactjs.jsx         # ReactJS difficulty selector
│   │   ├── Javascript.jsx      # JavaScript difficulty selector
│   │   ├── Nodejs.jsx          # Node.js difficulty selector
│   │   ├── Express.jsx         # Express.js difficulty selector
│   │   ├── Mongodb.jsx         # MongoDB difficulty selector
│   │   └── StaticTime.jsx      # Timer component
│   │
│   ├── firebase/                # Firebase configuration
│   │   └── ConfigFirebase.jsx  # Firebase initialization
│   │
│   ├── pages/                   # Quiz pages organized by technology
│   │   ├── Js/                 # JavaScript quizzes
│   │   │   ├── Jseasy.jsx
│   │   │   ├── Jseasysols.jsx
│   │   │   ├── Jsmedium.jsx
│   │   │   ├── Jsmediumsols.jsx
│   │   │   ├── Jshard.jsx
│   │   │   └── Jshardsols.jsx
│   │   │
│   │   ├── Reactjs/            # ReactJS quizzes
│   │   │   ├── Reacteasy.jsx
│   │   │   ├── Reacteasysols.jsx
│   │   │   ├── Reactmedium.jsx
│   │   │   ├── Reactmediumsols.jsx
│   │   │   ├── Reacthard.jsx
│   │   │   └── Reacthardsols.jsx
│   │   │
│   │   ├── NodeJs/             # Node.js quizzes
│   │   │   ├── Nodeeasy.jsx
│   │   │   ├── Nodeeasysols.jsx
│   │   │   ├── Nodemedium.jsx
│   │   │   ├── Nodemediumsols.jsx
│   │   │   ├── Nodehard.jsx
│   │   │   └── Nodehardsols.jsx
│   │   │
│   │   ├── Express/            # Express.js quizzes
│   │   │   ├── Exeasy.jsx
│   │   │   ├── Exeasysols.jsx
│   │   │   ├── Exmedium.jsx
│   │   │   ├── Exmediumsols.jsx
│   │   │   ├── Exhard.jsx
│   │   │   └── Exhardsols.jsx
│   │   │
│   │   └── MongoDb/            # MongoDB quizzes
│   │       ├── Mongoeasy.jsx
│   │       ├── Mongoeasysols.jsx
│   │       ├── Mongomedium.jsx
│   │       ├── Mongomediumsols.jsx
│   │       ├── Mongohard.jsx
│   │       └── Mongohardsols.jsx
│   │
│   ├── protectedRoute/          # Route protection
│   │   ├── ProtectedRouteForAdmin.jsx
│   │   └── ProtectedRouteForUser.jsx
│   │
│   ├── register/                # Authentication pages
│   │   ├── Login.jsx           # User login
│   │   └── Signup.jsx          # User registration
│   │
│   ├── App.js                   # Main app component
│   ├── App.css                  # App styles
│   ├── index.js                 # Entry point
│   └── index.css                # Global styles
│
├── package.json                 # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── vercel.json                 # Vercel deployment config
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/astra-mocks.git
   cd astra-mocks
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase configuration
   - Update `src/firebase/ConfigFirebase.jsx` with your credentials

4. **Configure Firestore Collections**
   
   Create two collections:
   - **`user`** - Stores user information
     ```javascript
     {
       uid: string,
       name: string,
       email: string,
       role: "user" | "admin",
       timestamp: timestamp
     }
     ```
   
   - **`quizResults`** - Stores quiz attempt data
     ```javascript
     {
       userId: string,
       userName: string,
       email: string,
       difficulty: string,
       totalScore: number,
       correctCount: number,
       incorrectCount: number,
       unattemptedCount: number,
       result: array,
       timestamp: timestamp
     }
     ```

5. **Run the development server**
   ```bash
   npm start
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

---

## 📘 Usage Guide

### For Users

1. **Sign Up / Login**
   - Create an account using email and password
   - Login with your credentials

2. **Choose Technology**
   - Navigate to the main dashboard
   - Select from JavaScript, ReactJS, Node.js, Express.js, or MongoDB

3. **Select Difficulty**
   - Choose Easy, Medium, or Hard level
   - Each test contains 10 questions worth 40 marks total

4. **Take the Test**
   - Answer questions within the 20-minute time limit
   - Navigate between questions using pagination
   - Your progress is automatically saved
   - Submit when complete or wait for auto-submission

5. **View Results**
   - See your score breakdown immediately
   - View correct answers and explanations
   - Retake the test unlimited times to improve

### For Admins

1. **Access Admin Dashboard**
   - Login with admin credentials
   - Navigate to admin panel from the navigation bar

2. **View Quiz Results**
   - See all users who have taken quizzes
   - View scores by difficulty and technology
   - Track user performance over time

3. **View Registered Users**
   - Access user management dashboard
   - See total registered users
   - Monitor user activity

---

## 📊 Scoring System

| Result Type | Points | Description |
|------------|--------|-------------|
| ✅ **Correct Answer** | +4 | Full marks for correct response |
| ❌ **Incorrect Answer** | -1 | Negative marking for wrong choice |
| ⚪ **Unattempted** | 0 | No penalty for skipped questions |

**Maximum Score per Test:** 40 marks (10 questions × 4 marks)  
**Minimum Score:** -10 marks (all incorrect)

### Progress Indicators

- 🔴 **Red Circle** (< 25%): Needs improvement
- 🟡 **Yellow Circle** (25-74%): Good progress
- 🟢 **Green Circle** (≥ 75%): Excellent performance

---

## 👨‍💼 Admin Features

### Quiz Results Dashboard
- Comprehensive table of all quiz attempts
- Columns: Serial No., Name, Email, Difficulty, Total Score, Timestamp
- Real-time updates from Firestore
- Sorted by submission time

### User Management
- View all registered users
- Track user engagement
- Monitor sign-up trends

### Protected Routes
- Role-based access control
- Automatic redirection for unauthorized access
- Secure admin panel

---

## 🎨 Screenshots

### Landing Page
Beautiful gradient background with animated welcome message and auto-redirect to main dashboard.

### Main Dashboard
Responsive card layout showcasing all available technologies with user statistics and personalized greeting.

### Quiz Interface
Clean, distraction-free test-taking environment with:
- Real-time countdown timer
- Question pagination
- Answer selection highlighting
- Previous/Next navigation
- Submit button on final question

### Results Page
Visual score breakdown with:
- Progress circle indicator
- Correct/Incorrect/Unattempted count
- Detailed score display
- View Solutions button

### Admin Dashboard
Comprehensive data table showing all quiz attempts with filtering and sorting capabilities.

---

## 🔒 Security Features

- ✅ Firebase Authentication
- ✅ Protected routes with role-based access
- ✅ Secure data storage in Firestore
- ✅ Client-side validation
- ✅ User-specific data isolation
- ✅ Persistent sessions with localStorage

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. Install Vercel CLI
   ```bash
   npm i -g vercel
   ```

2. Deploy
   ```bash
   vercel --prod
   ```

### Manual Deployment

1. Build the project
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting provider

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 Future Enhancements

- [ ] Add more technologies (Python, Java, SQL, etc.)
- [ ] Implement leaderboard system
- [ ] Add detailed analytics and performance tracking
- [ ] Create mobile app versions
- [ ] Add video explanations for solutions
- [ ] Implement peer-to-peer learning features
- [ ] Add dark mode toggle
- [ ] Create practice mode without time limits
- [ ] Add question bookmarking
- [ ] Implement social sharing of achievements

---

## 📧 Contact & Support

For questions, suggestions, or issues:
- 📧 Email: your.email@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/astra-mocks/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/astra-mocks/discussions)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- React team for the amazing framework
- Firebase for backend services
- Tailwind CSS for the utility-first CSS framework
- All contributors and users of Astra-Mocks

---

<div align="center">

**Made with ❤️ to help developers succeed in technical interviews**

⭐ **Star this repo if you find it helpful!** ⭐

</div>
