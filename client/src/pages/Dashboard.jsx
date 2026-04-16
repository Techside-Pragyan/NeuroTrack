import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import MoodForm from '../components/MoodForm';
import MoodStats from '../components/MoodStats';
import Chatbot from '../components/Chatbot';
import { Sparkles, AlertCircle, Info, MessageCircle } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [moodLogs, setMoodLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);

  const fetchMoodLogs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/moods');
      setMoodLogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoodLogs();
  }, []);

  const getAISuggestions = () => {
    if (moodLogs.length === 0) return ["Start logging your mood to get personalized AI insights!"];
    
    const latest = moodLogs[0];
    const suggestions = [];

    if (latest.mood === 'anxious' || latest.mood === 'stressed') {
      suggestions.push("We've noticed you're feeling a bit overwhelmed. Try a 5-minute deep breathing exercise.");
      suggestions.push("Consider reducing caffeine intake today.");
    }
    
    if (latest.activities?.sleep < 6) {
      suggestions.push("Your sleep was lower than usual. Prioritize a 20-minute nap or earlier bedtime.");
    }

    if (latest.mood === 'happy') {
      suggestions.push("You're in a great state! It's a perfect time to tackle a creative project or reach out to a friend.");
    }

    return suggestions.length > 0 ? suggestions : ["Keep up the consistent tracking! You're doing great."];
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div style={styles.dashboardGrid}>
            <div style={styles.leftCol}>
              <header style={styles.header}>
                <h1 style={styles.greeting}>Welcome back!</h1>
                <p style={styles.subtitle}>Here is how your week is looking.</p>
              </header>
              <MoodStats data={moodLogs} />
            </div>
            
            <div style={styles.rightCol}>
              <div className="glass" style={styles.aiCard}>
                <div style={styles.aiHeader}>
                  <Sparkles size={20} color="#8b5cf6" />
                  <h3 style={styles.aiTitle}>AI Insights</h3>
                </div>
                <div style={styles.aiBody}>
                  {getAISuggestions().map((s, i) => (
                    <div key={i} style={styles.suggestion}>
                      <Info size={16} color="var(--primary)" style={{ marginTop: '2px' }} />
                      <p>{s}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.helplineCard}>
                <div style={styles.aiHeader}>
                  <AlertCircle size={20} color="#ef4444" />
                  <h3 style={{...styles.aiTitle, color: '#ef4444'}}>Support</h3>
                </div>
                <p style={{fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px'}}>
                  If you're feeling overwhelmed, help is available.
                </p>
                <div style={styles.helplineLink}>National Helpline: 988</div>
              </div>
            </div>
          </div>
        );
      case 'track':
        return (
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
            <MoodForm onLogAdded={() => { fetchMoodLogs(); setActiveTab('dashboard'); }} />
          </div>
        );
      default:
        return (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Coming Soon</h2>
            <p>We are still building this feature for you.</p>
          </div>
        );
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={styles.main}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            Loading your journey...
          </div>
        ) : renderContent()}
      </main>

      <button 
        onClick={() => setShowChat(!showChat)}
        style={styles.chatToggle}
      >
        <MessageCircle size={24} />
      </button>

      {showChat && <Chatbot onClose={() => setShowChat(false)} />}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
  },
  main: {
    marginLeft: '280px',
    flex: 1,
    padding: '40px',
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: '32px',
  },
  header: {
    marginBottom: '32px',
  },
  greeting: {
    fontSize: '28px',
    fontWeight: '800',
    color: 'var(--text-main)',
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '16px',
  },
  aiCard: {
    padding: '24px',
    borderRadius: '24px',
    boxShadow: 'var(--shadow)',
    marginBottom: '24px',
  },
  aiHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  aiTitle: {
    fontSize: '16px',
    fontWeight: '700',
  },
  aiBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  suggestion: {
    display: 'flex',
    gap: '10px',
    fontSize: '14px',
    color: '#475569',
    lineHeight: '1.4',
  },
  helplineCard: {
    backgroundColor: '#fee2e2',
    padding: '24px',
    borderRadius: '24px',
  },
  helplineLink: {
    fontWeight: '700',
    color: '#b91c1c',
    fontSize: '15px',
  },
  chatToggle: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    width: '60px',
    height: '60px',
    borderRadius: '30px',
    backgroundColor: 'var(--primary)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 999,
  }
};

export default Dashboard;
