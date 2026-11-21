import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Award } from 'lucide-react';

const MyResults = () => {
  const [results, setResults] = useState([]);
  const profile = JSON.parse(localStorage.getItem('profile') || '{}');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get(`/student/results/${profile._id}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (profile._id) fetchResults();
  }, [profile._id]);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Award /> Examination Results
      </h2>
      <table className="data-table">
        <thead>
          <tr><th>Semester</th><th>Subject</th><th>Marks Obtained</th><th>Total Marks</th><th>Percentage</th></tr>
        </thead>
        <tbody>
          {results.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: 'center' }}>No results published yet.</td></tr>
          ) : (
            results.map(res => (
              <tr key={res._id}>
                <td>{res.semester}</td>
                <td>{res.subject}</td>
                <td style={{ fontWeight: 'bold' }}>{res.marksObtained}</td>
                <td>{res.totalMarks}</td>
                <td>{((res.marksObtained / res.totalMarks) * 100).toFixed(1)}%</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
export default MyResults;