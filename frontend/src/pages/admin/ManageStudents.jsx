import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { UserPlus } from 'lucide-react';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Form State
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', enrollmentNo: '', department: '', course: ''
  });

  const fetchStudents = async () => {
    try {
      const res = await api.get('/admin/students');
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      await api.post('/admin/students', formData);
      setMessage({ type: 'success', text: 'Student added successfully!' });
      setFormData({ name: '', email: '', password: '', enrollmentNo: '', department: '', course: '' });
      fetchStudents(); // Refresh table
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to add student' });
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Manage Students</h2>

      {/* Add Student Form */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserPlus size={20} /> Add New Student
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
            <label>Enrollment Number</label>
            <input type="text" name="enrollmentNo" className="form-control" value={formData.enrollmentNo} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Department</label>
            <select name="department" className="form-control" value={formData.department} onChange={handleChange} required>
              <option value="">Select Department</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Computer Engineering">Computer Engineering</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>
          <div className="form-group">
            <label>Course</label>
            <input type="text" name="course" className="form-control" placeholder="e.g. B.Tech" value={formData.course} onChange={handleChange} required />
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0.75rem 2rem' }} disabled={loading}>
              {loading ? 'Adding...' : 'Save Student'}
            </button>
          </div>
        </form>
      </div>

      {/* Students Table */}
      <table className="data-table">
        <thead>
          <tr>
            <th>Enrollment No</th>
            <th>Name</th>
            <th>Department</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>No students found.</td></tr>
          ) : (
            students.map(student => (
              <tr key={student._id}>
                <td>{student.enrollmentNo}</td>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.course}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageStudents;