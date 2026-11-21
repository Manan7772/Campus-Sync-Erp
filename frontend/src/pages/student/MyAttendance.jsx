import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { ClipboardList } from 'lucide-react';

const MyAttendance = () => {
  const [records, setRecords] = useState([]);
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get(`/student/attendance/${profile._id}`);
        setRecords(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (profile._id) fetchAttendance();
  }, [profile._id]);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <ClipboardList /> Attendance Records
      </h2>
      <table className="data-table">
        <thead>
          <tr><th>Date</th><th>Subject</th><th>Status</th></tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr><td colSpan="3" style={{ textAlign: 'center' }}>No attendance records found.</td></tr>
          ) : (
            records.map(record => (
              <tr key={record._id}>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.subject}</td>
                <td>
                  <span style={{ 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '0.875rem',
                    background: record.status === 'Present' ? '#dcfce7' : '#fee2e2',
                    color: record.status === 'Present' ? '#16a34a' : '#dc2626'
                  }}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default MyAttendance;