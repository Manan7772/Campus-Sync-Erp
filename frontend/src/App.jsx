import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// Pages & Layouts
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import StudentLayout from './layouts/StudentLayout';
import FacultyLayout from './layouts/FacultyLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageFaculty from './pages/admin/ManageFaculty';
import StudentDashboard from './pages/student/StudentDashboard';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import ManageDepartments from './pages/admin/ManageDepartments';
import ManageCourses from './pages/admin/ManageCourses';
import ManageNotices from './pages/admin/ManageNotices';
import MyAttendance from './pages/student/MyAttendance';
import MyResults from './pages/student/MyResults';
import Timetable from './pages/student/Timetable';
import StudentNotices from './pages/student/StudentNotices';
import MarkAttendance from './pages/faculty/MarkAttendance';
import ManageMarks from './pages/faculty/ManageMarks';
import MyStudents from './pages/faculty/MyStudents';
import FacultyNotices from './pages/faculty/FacultyNotices';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/" replace />;
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  return children;
};

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={`/${user.role}`} /> : <Login />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<ManageStudents />} />
        <Route path="faculty" element={<ManageFaculty />} />
      </Route>

      {/* Student Routes */}
      <Route path="/student" element={
        <ProtectedRoute allowedRole="student"><StudentLayout /></ProtectedRoute>
      }>
        <Route index element={<StudentDashboard />} />
      </Route>

      {/* Faculty Routes */}
      <Route path="/faculty" element={
        <ProtectedRoute allowedRole="faculty"><FacultyLayout /></ProtectedRoute>
      }>
        <Route index element={<FacultyDashboard />} />
      </Route>

      <Route path="/admin" element={
        <ProtectedRoute allowedRole="admin"><AdminLayout /></ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<ManageStudents />} />
        <Route path="faculty" element={<ManageFaculty />} />
        <Route path="departments" element={<ManageDepartments />} />
        <Route path="courses" element={<ManageCourses />} />
        <Route path="notices" element={<ManageNotices />} />
      </Route>

      {/* Faculty Routes */}
      <Route path="/faculty" element={
        <ProtectedRoute allowedRole="faculty"><FacultyLayout /></ProtectedRoute>
      }>
        <Route index element={<FacultyDashboard />} />
        <Route path="students" element={<MyStudents />} />
        <Route path="attendance" element={<MarkAttendance />} />
        <Route path="marks" element={<ManageMarks />} />
        
        {/* Replace StudentNotices with FacultyNotices */}
        <Route path="notices" element={<FacultyNotices />} /> 
      </Route>

{/* Student Routes */}
      <Route path="/student" element={
        <ProtectedRoute allowedRole="student"><StudentLayout /></ProtectedRoute>
      }>
        <Route index element={<StudentDashboard />} />
        <Route path="attendance" element={<MyAttendance />} />
        <Route path="results" element={<MyResults />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="notices" element={<StudentNotices />} />
      </Route>

     {/* Faculty Routes */}
      <Route path="/faculty" element={
        <ProtectedRoute allowedRole="faculty"><FacultyLayout /></ProtectedRoute>
      }>
        <Route index element={<FacultyDashboard />} />
        <Route path="students" element={<MyStudents />} />
        <Route path="attendance" element={<MarkAttendance />} />
        <Route path="marks" element={<ManageMarks />} />
        <Route path="notices" element={<StudentNotices />} />
      </Route>

    </Routes>
  );
};

export default App;