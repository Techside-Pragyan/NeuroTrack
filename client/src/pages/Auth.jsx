import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Heart, Mail, Lock, User } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = isLogin 
      ? await login(formData.email, formData.password)
      : await register(formData.name, formData.email, formData.password);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div className="glass fade-in" style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>
            <Heart size={32} color="var(--primary)" fill="var(--primary)" />
          </div>
          <h1 style={styles.title}>{isLogin ? 'Welcome Back' : 'Join NeuroTrack'}</h1>
          <p style={styles.subtitle}>
            {isLogin ? 'Continuing your journey to mindfulness' : 'Start tracking your mental well-being today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && <div style={styles.error}>{error}</div>}
          
          {!isLogin && (
            <div style={styles.inputGroup}>
              <User size={20} style={styles.icon} />
              <input
                type="text"
                placeholder="Full Name"
                style={styles.input}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <Mail size={20} style={styles.icon} />
            <input
              type="email"
              placeholder="Email Address"
              style={styles.input}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <Lock size={20} style={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              style={styles.input}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div style={styles.footer}>
          <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            style={styles.linkButton}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #e0e7ff 0%, #fef2f2 100%)',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    borderRadius: '24px',
    boxShadow: 'var(--shadow-lg)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logo: {
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'var(--text-main)',
    marginBottom: '8px',
  },
  subtitle: {
    color: 'var(--text-muted)',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  inputGroup: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: '12px',
    color: 'var(--text-muted)',
  },
  input: {
    width: '100%',
    padding: '12px 12px 12px 40px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    fontSize: '15px',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  button: {
    backgroundColor: 'var(--primary)',
    color: 'white',
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '10px',
    boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
  },
  error: {
    color: 'var(--error)',
    fontSize: '14px',
    textAlign: 'center',
    padding: '8px',
    backgroundColor: '#fee2e2',
    borderRadius: '8px',
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center',
    fontSize: '14px',
    color: 'var(--text-muted)',
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
  },
  linkButton: {
    background: 'none',
    color: 'var(--primary)',
    fontWeight: '600',
    padding: '0',
    fontSize: '14px',
  }
};

export default Auth;
