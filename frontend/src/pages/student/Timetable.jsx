import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Calendar } from 'lucide-react';

const Timetable = () => {
  const [schedule, setSchedule] = useState([]);
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await api.get('/timetable');
        // Filter timetable to match student's specific department and course
        const mySchedule = res.data.filter(t => t.department === profile.department && t.course === profile.course);
        setSchedule(mySchedule);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTimetable();
  }, [profile.department, profile.course]);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Calendar /> My Timetable
      </h2>
      <table className="data-table">
        <thead>
          <tr><th>Day</th><th>Time</th><th>Subject</th><th>Faculty</th></tr>
        </thead>
        <tbody>
          {schedule.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: 'center' }}>Schedule pending from administration.</td></tr>
          ) : (
            schedule.map(slot => (
              <tr key={slot._id}>
                <td style={{ fontWeight: '600' }}>{slot.day}</td>
                <td>{slot.time}</td>
                <td>{slot.subject}</td>
                <td>{slot.facultyName}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Timetable;