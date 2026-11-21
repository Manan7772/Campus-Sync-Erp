import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Bell } from 'lucide-react';

const FacultyNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', targetAudience: 'student' });
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');

  const fetchNotices = async () => {
    try {
      const res = await api.get('/notices');
      setNotices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchNotices(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Append a signature so students know which professor posted it
      const payload = {
        ...formData,
        content: `${formData.content}\n\n- Prof. ${profile.name}`
      };
      await api.post('/notices', payload);
      setFormData({ title: '', content: '', targetAudience: 'student' });
      fetchNotices();
      alert('Notice published to students!');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add notice');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Class Announcements</h2>
      
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Bell size={20} /> Publish Announcement</h3>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Announcement Title</label>
              <input type="text" className="form-control" placeholder="e.g. Assignment Deadline Extended" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Target Audience</label>
              <select className="form-control" value={formData.targetAudience} onChange={(e) => setFormData({...formData, targetAudience: e.target.value})} required>
                <option value="student">My Students</option>
                <option value="all">Entire College</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Message Content</label>
            <textarea className="form-control" rows="4" placeholder="Type your message here..." value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} required></textarea>
          </div>
          <div>
            <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0.75rem 2rem' }} disabled={loading}>Publish Announcement</button>
          </div>
        </form>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        <h3 style={{ color: '#1e293b' }}>Recent Announcements</h3>
        {notices.map(notice => (
          <div key={notice._id} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #9333ea' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h4 style={{ color: '#1e293b' }}>{notice.title}</h4>
              <span style={{ fontSize: '0.8rem', background: '#f3e8ff', color: '#9333ea', padding: '2px 8px', borderRadius: '12px' }}>{notice.targetAudience.toUpperCase()}</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>{notice.content}</p>
            <small style={{ color: '#94a3b8', display: 'block', marginTop: '1rem' }}>Published: {new Date(notice.createdAt).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FacultyNotices;