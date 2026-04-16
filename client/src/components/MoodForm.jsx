import React, { useState } from 'react';
import axios from 'axios';
import { Smile, Frown, Zap, Coffee, Moon, Droplets } from 'lucide-react';

const MoodForm = ({ onLogAdded }) => {
  const [mood, setMood] = useState('calm');
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState({ sleep: 8, water: 4 });

  const moods = [
    { id: 'happy', icon: Smile, color: '#10b981', label: 'Happy' },
    { id: 'calm', icon: Smile, color: '#6366f1', label: 'Calm' },
    { id: 'neutral', icon: Smile, color: '#64748b', label: 'Neutral' },
    { id: 'stressed', icon: Zap, color: '#f59e0b', label: 'Stressed' },
    { id: 'anxious', icon: Zap, color: '#ec4899', label: 'Anxious' },
    { id: 'sad', icon: Frown, color: '#ef4444', label: 'Sad' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/moods', {
        mood,
        intensity,
        note,
        activities
      });
      setNote('');
      if (onLogAdded) onLogAdded();
      alert('Mood tracked successfully!');
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="fade-in" style={styles.formCard}>
      <h2 style={styles.title}>How are you feeling?</h2>
      
      <div style={styles.moodGrid}>
        {moods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMood(m.id)}
            style={{
              ...styles.moodBtn,
              borderColor: mood === m.id ? m.color : '#e2e8f0',
              backgroundColor: mood === m.id ? `${m.color}10` : 'transparent',
              color: mood === m.id ? m.color : 'var(--text-muted)',
            }}
          >
            <m.icon size={24} />
            <span style={{ fontSize: '12px', marginTop: '4px' }}>{m.label}</span>
          </button>
        ))}
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Intensity ({intensity}/10)</label>
        <input 
          type="range" 
          min="1" max="10" 
          value={intensity} 
          onChange={(e) => setIntensity(e.target.value)}
          style={styles.range}
        />
      </div>

      <div style={styles.metricsGrid}>
        <div style={styles.metricItem}>
          <Moon size={18} color="var(--primary)" />
          <input 
            type="number" 
            placeholder="Sleep (hrs)" 
            value={activities.sleep}
            onChange={(e) => setActivities({...activities, sleep: e.target.value})}
            style={styles.miniInput}
          />
        </div>
        <div style={styles.metricItem}>
          <Droplets size={18} color="#3b82f6" />
          <input 
            type="number" 
            placeholder="Water (gls)" 
            value={activities.water}
            onChange={(e) => setActivities({...activities, water: e.target.value})}
            style={styles.miniInput}
          />
        </div>
      </div>

      <textarea
        placeholder="Add a note (optional)..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={styles.textarea}
      />

      <button type="submit" disabled={loading} style={styles.submitBtn}>
        {loading ? 'Saving...' : 'Log Mood'}
      </button>
    </form>
  );
};

const styles = {
  formCard: {
    backgroundColor: 'var(--surface)',
    padding: '32px',
    borderRadius: '24px',
    boxShadow: 'var(--shadow)',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '24px',
    color: 'var(--text-main)',
  },
  moodGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '24px',
  },
  moodBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    borderRadius: '16px',
    border: '2px solid transparent',
    transition: 'all 0.2s ease',
  },
  section: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '8px',
    color: 'var(--text-muted)',
  },
  range: {
    width: '100%',
    accentColor: 'var(--primary)',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '24px',
  },
  metricItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#f1f5f9',
    padding: '8px 12px',
    borderRadius: '12px',
  },
  miniInput: {
    border: 'none',
    background: 'none',
    width: '100%',
    fontSize: '14px',
    fontWeight: '500',
  },
  textarea: {
    width: '100%',
    minHeight: '100px',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    marginBottom: '24px',
    resize: 'none',
    fontSize: '14px',
  },
  submitBtn: {
    width: '100%',
    backgroundColor: 'var(--primary)',
    color: 'white',
    padding: '14px',
    fontWeight: '600',
    fontSize: '16px',
  }
};

export default MoodForm;
