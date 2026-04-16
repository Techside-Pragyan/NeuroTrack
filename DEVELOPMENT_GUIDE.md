# 🧠 NeuroTrack Development Guide

Welcome to the full development walkthrough of **NeuroTrack**, a production-ready mental health tracker. This guide follows the 11-step development phase we planned.

---

## 1. Project Planning & Architecture
**Concept:** A centralized hub to track emotional well-being using a MERN-like stack (Node, Express, React, MongoDB).
**Structure:**
- `client/`: React + Vite frontend.
- `server/`: Node.js + Express backend.
**Design Principle:** Calm, minimal UI using "Outfit" typography and glassmorphism.

## 2. UI/UX Design
We implemented a **Sidebar-driven Dashboard** layout:
- **Calm Palette:** Soft indigos, clean whites, and meaningful status colors (Greens for happy, Ambers for stress).
- **Interactivity:** Smooth transitions (Fade-ins) and hover effects on all interactive cards.

## 3. Frontend Development
- **Auth System:** Use React Context API (`AuthContext.jsx`) to manage global user state.
- **Analytics:** Integrated **Recharts** to visualize mood intensity trends.
- **Responsive Components:** Modular cards for mood logging and AI insights.

## 4. Backend Development
- **REST APIs:** Created endpoints for `/api/auth` (Register/Login) and `/api/moods` (Create/Retrieve).
- **Controllers:** Modular logic to handle data processing and database interaction.

## 5. Database Design
- **Users:** Hashed passwords with `bcryptjs` and unique email validation.
- **MoodLogs:** Linked to users via `ObjectId`, tracking mood category, intensity, and health metrics (sleep/water).

## 6. AI & Smart Features
- **Trend Analysis:** A logic-based engine in `Dashboard.jsx` detects low sleep patterns or high anxiety entries.
- **Suggestions:** Dynamically generated wellness tips based on the latest logs.

## 7. Chatbot & Extra Features
- **NeuroAssistant:** A rule-based chatbot for immediate interaction and support.
- **Emergency Helpline:** A dedicated section in the dashboard for high-risk situations.

## 8. Security Implementation
- **JWT Authentication:** All private routes require a `Bearer` token.
- **Middleware:** `helmet` for header security and `cors` for safe cross-origin requests.

## 9. Testing & Debugging
- All API routes follow standard HTTP status codes.
- Frontend includes loading states and error handling for failed requests.

---

## 🚀 How to Run Locally

### 1. Start the Server
```bash
cd server
npm install
npm start (or node index.js)
```

### 2. Start the Client
```bash
cd client
npm install
npm run dev
```

---

## 🌐 Deployment Suggestions
- **Frontend:** [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) (Free and easy).
- **Backend:** [Render](https://render.com/) or [Railway](https://railway.app/).
- **Database:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier).

---

## 🎯 Best Practices Implemented
1. **Clean Code:** Modular components and separated routes/controllers.
2. **UX:** Immediate feedback on actions (alerts/ui changes).
3. **Security:** Never sending passwords back in API responses.
