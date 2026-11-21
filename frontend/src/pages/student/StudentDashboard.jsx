import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BookOpen, Award } from 'lucide-react';

const StudentDashboard = () => {
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');

  // Mock attendance data
  const attendanceData = [
    { name: 'Present', value: 85 },
    { name: 'Absent', value: 15 },
  ];
  const COLORS = ['#16a34a', '#ef4444'];

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Welcome back, {profile.name}</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* Profile Card */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Academic Profile</h3>
          <p style={{ margin: '0.5rem 0' }}><strong>Enrollment No:</strong> {profile.enrollmentNo}</p>
          <p style={{ margin: '0.5rem 0' }}><strong>Department:</strong> {profile.department}</p>
          <p style={{ margin: '0.5rem 0' }}><strong>Course:</strong> {profile.course}</p>
        </div>

        {/* Attendance Chart */}
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Overall Attendance</h3>
          <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={attendanceData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p style={{ textAlign: 'center', fontWeight: 'bold', color: '#16a34a' }}>85% Present</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;