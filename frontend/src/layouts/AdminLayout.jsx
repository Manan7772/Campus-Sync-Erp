import React, { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Users, UserCog, BookOpen, Building, Bell, LogOut, GraduationCap } from 'lucide-react';

const AdminLayout = () => {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');

  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/students', icon: <Users size={20} />, label: 'Manage Students' },
    { path: '/admin/faculty', icon: <UserCog size={20} />, label: 'Manage Faculty' },
    { path: '/admin/departments', icon: <Building size={20} />, label: 'Departments' },
    { path: '/admin/courses', icon: <BookOpen size={20} />, label: 'Courses' },
    { path: '/admin/notices', icon: <Bell size={20} />, label: 'Notices' },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <GraduationCap size={28} />
          <span>College ERP</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        <header className="topbar">
          <div>
            <h3 style={{ color: '#1e293b' }}>Administrator Portal</h3>
            <small style={{ color: '#64748b' }}>Welcome, {profile.name || 'Admin'}</small>
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

export default AdminLayout;