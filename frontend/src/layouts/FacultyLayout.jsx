import React, { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Users, ClipboardCheck, FileText, Bell, LogOut, GraduationCap } from 'lucide-react';

const FacultyLayout = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');

  const navItems = [
    { path: '/faculty', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/faculty/students', icon: <Users size={20} />, label: 'My Students' },
    { path: '/faculty/attendance', icon: <ClipboardCheck size={20} />, label: 'Mark Attendance' },
    { path: '/faculty/marks', icon: <FileText size={20} />, label: 'Manage Marks' },
    { path: '/faculty/notices', icon: <Bell size={20} />, label: 'College Notices' },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <GraduationCap size={28} />
          <span>Faculty Portal</span>
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
            <h3 style={{ color: '#1e293b' }}>Faculty Portal</h3>
            <small style={{ color: '#64748b' }}>Prof. {profile.name || 'Faculty'}</small>
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

export default FacultyLayout;