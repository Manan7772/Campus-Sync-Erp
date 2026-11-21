import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users } from 'lucide-react';

const MyStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get('/admin/students');
        // Filter students to only show those in the faculty's department
        const myDepartmentStudents = res.data.filter(s => s.department === profile.department);
        setStudents(myDepartmentStudents);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };
    if (profile.department) fetchStudents();
  }, [profile.department]);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Users /> My Students
      </h2>
      
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>
          Department: {profile.department}
        </h3>
        
        {loading ? (
          <p>Loading students...</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Enrollment No</th>
                <th>Name</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr><td colSpan="3" style={{ textAlign: 'center' }}>No students found in your department.</td></tr>
              ) : (
                students.map(student => (
                  <tr key={student._id}>
                    <td>{student.enrollmentNo}</td>
                    <td style={{ fontWeight: '500' }}>{student.name}</td>
                    <td>{student.course}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyStudents;