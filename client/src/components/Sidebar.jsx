import React from 'react';
import { LayoutDashboard, PlusCircle, BarChart3, MessageCircle, Settings, LogOut, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'track', icon: PlusCircle, label: 'Track Mood' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'assistant', icon: MessageCircle, label: 'AI Assistant' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="glass" style={styles.sidebar}>
      <div style={styles.brand}>
        <Heart size={24} color="var(--primary)" fill="var(--primary)" />
        <span style={styles.brandName}>NeuroTrack</span>
      </div>

      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              ...styles.navItem,
              backgroundColor: activeTab === item.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              color: activeTab === item.id ? 'var(--primary)' : 'var(--text-muted)',
            }}
          >
            <item.icon size={20} />
            <span style={{ fontWeight: activeTab === item.id ? '600' : '400' }}>{item.label}</span>
          </button>
        ))}
      </nav>

      <button onClick={logout} style={styles.logoutBtn}>
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '260px',
    height: '95vh',
    margin: '10px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    position: 'fixed',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '40px',
    padding: '0 12px',
  },
  brandName: {
    fontSize: '20px',
    fontWeight: '700',
    color: 'var(--text-main)',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    width: '100%',
    textAlign: 'left',
    fontSize: '15px',
    borderRadius: '12px',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    color: '#ef4444',
    background: 'none',
    fontSize: '15px',
    marginTop: 'auto',
  }
};

export default Sidebar;
