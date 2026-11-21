import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { BookOpen } from 'lucide-react';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', code: '', department: '' });

  const fetchData = async () => {
    try {
      const [courseRes, deptRes] = await Promise.all([
        api.get('/admin/courses'),
        api.get('/admin/departments')
      ]);
      setCourses(courseRes.data);
      setDepartments(deptRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/admin/courses', formData);
      setFormData({ title: '', code: '', department: '' });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add course');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Manage Courses</h2>
      
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><BookOpen size={20} /> Add Course</h3>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Course Title</label>
            <input type="text" className="form-control" placeholder="e.g. B.Tech Computer Engineering" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Course Code</label>
            <input type="text" className="form-control" placeholder="e.g. CS101" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Department</label>
            <select className="form-control" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} required>
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept._id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>
          <div style={{ gridColumn: 'span 3' }}>
            <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0.75rem 2rem' }} disabled={loading}>Save Course</button>
          </div>
        </form>
      </div>

      <table className="data-table">
        <thead><tr><th>Course Code</th><th>Title</th><th>Department</th></tr></thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}><td>{course.code}</td><td>{course.title}</td><td>{course.department}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ManageCourses;