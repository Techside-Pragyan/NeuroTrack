import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const MoodStats = ({ data }) => {
  // Process data for charts
  const chartData = data.slice().reverse().map(log => ({
    date: new Date(log.createdAt).toLocaleDateString(undefined, { weekday: 'short' }),
    intensity: log.intensity,
    mood: log.mood
  }));

  const getMoodColor = (mood) => {
    switch(mood) {
      case 'happy': return '#10b981';
      case 'calm': return '#6366f1';
      case 'stressed': return '#f59e0b';
      case 'anxious': return '#ec4899';
      case 'sad': return '#ef4444';
      default: return '#64748b';
    }
  };

  return (
    <div style={styles.container} className="fade-in">
      <div className="glass" style={styles.chartCard}>
        <h3 style={styles.title}>Mood Trends (Last 7 Entries)</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 10]} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow)' }}
                itemStyle={{ fontWeight: '600' }}
              />
              <Area 
                type="monotone" 
                dataKey="intensity" 
                stroke="var(--primary)" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorMood)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={styles.summaryGrid}>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Avg. Intensity</span>
          <span style={styles.statValue}>
            {(data.reduce((acc, curr) => acc + curr.intensity, 0) / (data.length || 1)).toFixed(1)}
          </span>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Logs this week</span>
          <span style={styles.statValue}>{data.length}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
  },
  chartCard: {
    padding: '24px',
    borderRadius: '24px',
    boxShadow: 'var(--shadow)',
  },
  title: {
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '24px',
    color: 'var(--text-main)',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  statCard: {
    backgroundColor: 'var(--surface)',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: 'var(--shadow)',
    display: 'flex',
    flexDirection: 'column',
  },
  statLabel: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    marginBottom: '4px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'var(--primary)',
  }
};

export default MoodStats;
