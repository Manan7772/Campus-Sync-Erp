import React from 'react';
import { Users, BookOpen, ClipboardCheck } from 'lucide-react';

const FacultyDashboard = () => {
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Welcome, Prof. {profile.name}</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><BookOpen size={24} /></div>
          <div className="stat-info">
            <p>Assigned Subjects</p>
            <h3>{profile.subjects?.length || 2}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dcfce7', color: '#16a34a' }}><Users size={24} /></div>
          <div className="stat-info">
            <p>Total Students</p>
            <h3>120</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f3e8ff', color: '#9333ea' }}><ClipboardCheck size={24} /></div>
          <div className="stat-info">
            <p>Pending Attendance</p>
            <h3>1 Class</h3>
          </div>
        </div>
      </div>

      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>Your Profile</h3>
        <p><strong>Employee ID:</strong> {profile.employeeId}</p>
        <p><strong>Department:</strong> {profile.department}</p>
        <p><strong>Subjects:</strong> {profile.subjects?.join(', ') || 'N/A'}</p>
      </div>
    </div>
  );
};

export default FacultyDashboard;