import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { UserPlus } from 'lucide-react';

const ManageFaculty = () => {
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Form State
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', employeeId: '', department: '', subjects: ''
  });

  const fetchFaculty = async () => {
    try {
      const res = await api.get('/admin/faculty');
      setFacultyList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      await api.post('/admin/faculty', formData);
      setMessage({ type: 'success', text: 'Faculty added successfully!' });
      setFormData({ name: '', email: '', password: '', employeeId: '', department: '', subjects: '' });
      fetchFaculty();
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to add faculty' });
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Manage Faculty</h2>

      {/* Add Faculty Form */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserPlus size={20} /> Add New Faculty
        </h3>
        
        {message.text && (
          <div style={{ padding: '0.75rem', marginBottom: '1rem', borderRadius: '6px', background: message.type === 'success' ? '#dcfce7' : '#fee2e2', color: message.type === 'success' ? '#16a34a' : '#dc2626' }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Employee ID</label>
            <input type="text" name="employeeId" className="form-control" value={formData.employeeId} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Department</label>
            <select name="department" className="form-control" value={formData.department} onChange={handleChange} required>
              <option value="">Select Department</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Computer Engineering">Computer Engineering</option>
            </select>
          </div>
          <div className="form-group">
            <label>Subjects (Comma separated)</label>
            <input type="text" name="subjects" className="form-control" placeholder="e.g. React, Node, DBMS" value={formData.subjects} onChange={handleChange} required />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0.75rem 2rem' }} disabled={loading}>
              {loading ? 'Adding...' : 'Save Faculty'}
            </button>
          </div>
        </form>
      </div>

      {/* Faculty Table */}
      <table className="data-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Subjects</th>
          </tr>
        </thead>
        <tbody>
          {facultyList.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No faculty found.</td></tr>
          ) : (
            facultyList.map(faculty => (
              <tr key={faculty._id}>
                <td>{faculty.employeeId}</td>
                <td>{faculty.name}</td>
                <td>{faculty.department}</td>
                <td>{faculty.subjects.join(', ')}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageFaculty;