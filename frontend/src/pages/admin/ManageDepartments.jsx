import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Building } from 'lucide-react';

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({ name: '', headOfDepartment: '' });

  const fetchDepartments = async () => {
    try {
      const res = await api.get('/admin/departments');
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchDepartments(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/admin/departments', formData);
      setMessage({ type: 'success', text: 'Department added!' });
      setFormData({ name: '', headOfDepartment: '' });
      fetchDepartments();
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to add department' });
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Manage Departments</h2>
      
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Building size={20} /> Add Department</h3>
        
        {message.text && (
          <div style={{ padding: '0.75rem', marginBottom: '1rem', borderRadius: '6px', background: message.type === 'success' ? '#dcfce7' : '#fee2e2', color: message.type === 'success' ? '#16a34a' : '#dc2626' }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Department Name</label>
            <input type="text" className="form-control" placeholder="e.g. Information Technology" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Head of Department (HOD)</label>
            <input type="text" className="form-control" value={formData.headOfDepartment} onChange={(e) => setFormData({...formData, headOfDepartment: e.target.value})} required />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0.75rem 2rem' }} disabled={loading}>
              {loading ? 'Saving...' : 'Save Department'}
            </button>
          </div>
        </form>
      </div>

      <table className="data-table">
        <thead>
          <tr><th>Department Name</th><th>Head of Department</th></tr>
        </thead>
        <tbody>
          {departments.length === 0 ? (
            <tr><td colSpan="2" style={{ textAlign: 'center' }}>No departments found.</td></tr>
          ) : (
            departments.map(dept => (
              <tr key={dept._id}><td>{dept.name}</td><td>{dept.headOfDepartment}</td></tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default ManageDepartments;