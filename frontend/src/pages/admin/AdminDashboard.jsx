import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, UserCog, BookOpen, Building } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ students: 0, faculty: 0, courses: 0, departments: 0, notices: 0 });
  const [loading, setLoading] = useState(true);

  // Mock data for the chart (In a full app, this would come from the API)
  const departmentData = [
    { name: 'Computer Eng', students: 120 },
    { name: 'IT', students: 98 },
    { name: 'Mechanical', students: 86 },
    { name: 'Civil', students: 65 },
    { name: 'Electrical', students: 75 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard data...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>System Overview</h2>
      
      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><Users size={24} /></div>
          <div className="stat-info">
            <p>Total Students</p>
            <h3>{stats.students}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dcfce7', color: '#16a34a' }}><UserCog size={24} /></div>
          <div className="stat-info">
            <p>Total Faculty</p>
            <h3>{stats.faculty}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f3e8ff', color: '#9333ea' }}><BookOpen size={24} /></div>
          <div className="stat-info">
            <p>Total Courses</p>
            <h3>{stats.courses}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ffedd5', color: '#ea580c' }}><Building size={24} /></div>
          <div className="stat-info">
            <p>Departments</p>
            <h3>{stats.departments}</h3>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginBottom: '1.5rem', color: '#1e293b' }}>Students by Department</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={departmentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip cursor={{ fill: '#f8fafc' }} />
              <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;