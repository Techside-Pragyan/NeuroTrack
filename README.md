# 🧠 NeuroTrack

<div align="center">
  <p><strong>A Production-Ready Mental Health & Emotional Well-being Tracker</strong></p>
</div>

## 📖 Overview
NeuroTrack is a centralized hub designed to help users track and analyze their emotional well-being. Built with the MERN stack (MongoDB, Express, React, Node.js), it provides a calm, minimal UI featuring a sidebar-driven dashboard, secure authentication, and insightful mood analytics. The application not only tracks daily moods but also correlates them with physical health metrics like sleep and hydration, offering smart suggestions and trend analysis.

## ✨ Features
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing.
- **Mood Logging & Tracking**: Log daily moods along with intensity, sleep quality, and water intake.
- **Interactive Dashboard**: Calm, glassmorphism-inspired UI with smooth Framer Motion transitions.
- **Data Visualization**: Real-time mood trend analysis utilizing Recharts.
- **AI & Smart Insights**: Logic-based engine to detect emotional patterns (e.g., low sleep, high anxiety) and provide dynamic wellness suggestions.
- **NeuroAssistant**: A built-in rule-based chatbot for immediate interaction, support, and guidance.
- **Responsive Design**: Fully responsive layout optimized for all device sizes.

## 💻 Tech Stack
**Frontend:**
- React.js (Vite)
- Framer Motion (Animations)
- Recharts (Data Visualization)
- Lucide React (Icons)
- Axios (API Client)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & Bcrypt.js
- Helmet & CORS (Security)

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (Local or Atlas)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Techside-Pragyan/NeuroTrack.git
   cd NeuroTrack
   ```

2. **Backend Setup:**
   ```bash
   cd server
   npm install
   ```
   - Create a `.env` file in the `server` directory and add your environment variables (e.g., `PORT=5000`, `MONGO_URI=your_mongodb_uri`, `JWT_SECRET=your_secret_key`).
   - Start the backend server:
   ```bash
   node index.js
   ```

3. **Frontend Setup:**
   Open a new terminal window/tab:
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Open in Browser:**
   Navigate to `http://localhost:5173` to view the application.

## 📂 Project Structure
```text
NeuroTrack/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context (Auth)
│   │   ├── pages/          # Application pages (Dashboard, Auth, etc.)
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── index.js            # Main server entry point
│   ├── package.json
│   └── ...
├── DEVELOPMENT_GUIDE.md    # Detailed development roadmap
└── README.md
```

## 🛡️ Security & Best Practices
- **Helmet.js** for securing HTTP headers.
- **Protected Routes** requiring valid Bearer tokens for sensitive API endpoints.
- Modular architecture with clean separation of routes, controllers, and models.
- Calm UI palette with smooth user feedback (alerts and transitions).

## 📜 License
This project is licensed under the terms found in the `LICENSE` file.
