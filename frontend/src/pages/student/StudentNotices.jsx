import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Bell } from 'lucide-react';

const StudentNotices = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await api.get('/notices');
        // Filter out notices meant only for the other role
        const role = localStorage.getItem('role');
        const relevant = res.data.filter(n => n.targetAudience === 'all' || n.targetAudience === role);
        setNotices(relevant);
      } catch (err) {
        console.error(err);
      }
    };
    fetchNotices();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Bell /> Notice Board
      </h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {notices.length === 0 ? <p>No new notices.</p> : notices.map(notice => (
          <div key={notice._id} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #3b82f6', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h4 style={{ color: '#1e293b', marginBottom: '0.5rem' }}>{notice.title}</h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>{notice.content}</p>
            <small style={{ color: '#94a3b8', display: 'block', marginTop: '1rem' }}>{new Date(notice.createdAt).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};
export default StudentNotices;