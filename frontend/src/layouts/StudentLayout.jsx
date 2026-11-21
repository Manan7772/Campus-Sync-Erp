import React, { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, ClipboardList, Award, Calendar, Bell, LogOut, GraduationCap } from 'lucide-react';

const StudentLayout = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');

  const navItems = [
    { path: '/student', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/student/attendance', icon: <ClipboardList size={20} />, label: 'My Attendance' },
    { path: '/student/results', icon: <Award size={20} />, label: 'My Results' },
    { path: '/student/timetable', icon: <Calendar size={20} />, label: 'Timetable' },
    { path: '/student/notices', icon: <Bell size={20} />, label: 'College Notices' },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <GraduationCap size={28} />
          <span>Student Portal</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <div className="main-content">
        <header className="topbar">
          <div>
            <h3 style={{ color: '#1e293b' }}>Student Portal</h3>
            <small style={{ color: '#64748b' }}>{profile.name} ({profile.enrollmentNo})</small>
          </div>
          <button onClick={logout} className="btn-logout" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={16} /> Logout
          </button>
        </header>
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;