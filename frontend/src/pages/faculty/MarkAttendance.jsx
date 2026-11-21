import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { ClipboardCheck } from 'lucide-react';

const MarkAttendance = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');
  
  const [formData, setFormData] = useState({ 
    studentId: '', 
    subject: '', 
    date: new Date().toISOString().split('T')[0], 
    status: 'Present' 
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get('/admin/students');
        setStudents(res.data.filter(s => s.department === profile.department));
      } catch (err) { 
        console.error(err); 
      }
    };
    fetchStudents();
  }, [profile.department]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/faculty/attendance', { ...formData, facultyId: profile._id });
      alert('Attendance marked successfully!');
    } catch (err) { 
      alert('Failed to mark attendance'); 
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Mark Daily Attendance</h2>
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><ClipboardCheck size={20} /> Input Record</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Select Student</label>
            <select className="form-control" onChange={(e) => setFormData({...formData, studentId: e.target.value})} required>
              <option value="">-- Choose Student --</option>
              {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.enrollmentNo})</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Subject</label>
            <select className="form-control" onChange={(e) => setFormData({...formData, subject: e.target.value})} required>
              <option value="">-- Choose Subject --</option>
              {profile.subjects?.map(sub => <option key={sub} value={sub}>{sub}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" className="form-control" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select className="form-control" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Submit Attendance'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarkAttendance;