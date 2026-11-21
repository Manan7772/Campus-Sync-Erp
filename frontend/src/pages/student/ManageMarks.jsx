import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FileText } from 'lucide-react';

const ManageMarks = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');
  
  const [formData, setFormData] = useState({ student: '', subject: '', marksObtained: '', totalMarks: 100, semester: 'Semester 1' });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get('/admin/students');
        setStudents(res.data.filter(s => s.department === profile.department));
      } catch (err) { console.error(err); }
    };
    fetchStudents();
  }, [profile.department]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/faculty/results', formData);
      alert('Result published successfully!');
      setFormData({...formData, marksObtained: ''});
    } catch (err) { alert('Failed to publish result'); }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Manage Student Marks</h2>
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={20} /> Upload Result</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Select Student</label>
            <select className="form-control" onChange={(e) => setFormData({...formData, student: e.target.value})} required>
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
            <label>Semester</label>
            <input type="text" className="form-control" value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})} required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>Marks Obtained</label>
              <input type="number" className="form-control" value={formData.marksObtained} onChange={(e) => setFormData({...formData, marksObtained: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Total Marks</label>
              <input type="number" className="form-control" value={formData.totalMarks} onChange={(e) => setFormData({...formData, totalMarks: e.target.value})} required />
            </div>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <button type="submit" className="btn-primary" disabled={loading}>Publish Result</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ManageMarks;