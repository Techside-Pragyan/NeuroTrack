import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Auth from './pages/Auth';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return user ? children : <Navigate to="/auth" />;
};

function AppContent() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/dashboard" />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <div className="fade-in" style={{ padding: '40px', textAlign: 'center' }}>
                  <h1>NeuroTrack Dashboard</h1>
                  <p>Welcome back, {user?.name}!</p>
                  <button 
                    onClick={() => { localStorage.clear(); window.location.reload(); }}
                    style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'var(--primary)', color: 'white' }}
                  >
                    Logout (Temp)
                  </button>
                </div>
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
