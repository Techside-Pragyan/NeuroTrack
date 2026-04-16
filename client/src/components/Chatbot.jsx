import React, { useState } from 'react';
import { Send, User, Bot, X } from 'lucide-react';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm your NeuroTrack assistant. How are you feeling today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simple rule-based bot response
    setTimeout(() => {
      let response = "I'm here to listen. Tell me more about that.";
      const lowInput = input.toLowerCase();
      
      if (lowInput.includes('sad') || lowInput.includes('down')) {
        response = "I'm sorry you're feeling this way. Remember that it's okay to have bad days. Have you tried talking to someone today?";
      } else if (lowInput.includes('anxious') || lowInput.includes('stress')) {
        response = "That sounds tough. Let's try a quick grounding exercise: name 3 things you can see right now.";
      } else if (lowInput.includes('help')) {
        response = "If you're in immediate distress, please check our Helpline section or call 988.";
      }

      setMessages([...newMessages, { role: 'bot', text: response }]);
    }, 1000);
  };

  return (
    <div className="glass fade-in" style={styles.chatBox}>
      <div style={styles.chatHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bot size={20} color="var(--primary)" />
          <span style={{ fontWeight: '700' }}>NeuroAssistant</span>
        </div>
        <button onClick={onClose} style={{ background: 'none' }}><X size={20} /></button>
      </div>

      <div style={styles.chatBody}>
        {messages.map((m, i) => (
          <div key={i} style={{
            ...styles.messageRow,
            justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start'
          }}>
            <div style={{
              ...styles.message,
              backgroundColor: m.role === 'user' ? 'var(--primary)' : '#f1f5f9',
              color: m.role === 'user' ? 'white' : 'var(--text-main)',
              borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px'
            }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div style={styles.chatFooter}>
        <input 
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          style={styles.chatInput}
        />
        <button onClick={handleSend} style={styles.sendBtn}><Send size={18} /></button>
      </div>
    </div>
  );
};

const styles = {
  chatBox: {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    width: '350px',
    height: '500px',
    borderRadius: '24px',
    boxShadow: 'var(--shadow-lg)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 1000,
  },
  chatHeader: {
    padding: '16px 20px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  chatBody: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  messageRow: {
    display: 'flex',
    width: '100%',
  },
  message: {
    padding: '10px 16px',
    maxWidth: '80%',
    fontSize: '14px',
    lineHeight: '1.4',
  },
  chatFooter: {
    padding: '16px',
    display: 'flex',
    gap: '8px',
  },
  chatInput: {
    flex: 1,
    padding: '10px 16px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    fontSize: '14px',
  },
  sendBtn: {
    backgroundColor: 'var(--primary)',
    color: 'white',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
  }
};

export default Chatbot;
