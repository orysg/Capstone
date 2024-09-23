import React, { useState } from 'react';
import './FallReport.css';

function FallReport() {
  // Sample fall history data
  const [fallHistory, setFallHistory] = useState([
    { 
      id: 1,
      date: new Date('2024-08-25T12:00:00'), 
      severity: 'Moderate', 
      location: 'Lat: 12.34, Long: 56.78', 
      responseTime: '2 minutes', 
      contact: 'Nurse Mary', 
      notes: ''
    },
    { 
      id: 2,
      date: new Date('2024-08-20T10:30:00'), 
      severity: 'Severe', 
      location: 'Lat: 23.45, Long: 67.89', 
      responseTime: '1 minute', 
      contact: 'Nurse John', 
      notes: ''
    },
    // Add more fall history as needed
  ]);

  const [expandedFallId, setExpandedFallId] = useState(null);

  // Toggle the expansion of a fall item
  const toggleExpandFall = (fallId) => {
    setExpandedFallId(expandedFallId === fallId ? null : fallId);
  };

  // Handle note changes for each fall
  const handleNoteChange = (fallId, newNote) => {
    setFallHistory(fallHistory.map(fall =>
      fall.id === fallId ? { ...fall, notes: newNote } : fall
    ));
  };

  const handleDownload = () => {
    const reportContent = fallHistory.map(fall => (
      `Fall on ${fall.date.toLocaleDateString('en-GB')}:
Severity: ${fall.severity}
Location: ${fall.location}
Response Time: ${fall.responseTime}
Contact: ${fall.contact}
Notes: ${fall.notes || 'No notes provided'}
\n`
    )).join('\n');
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'fall_report.txt';
    link.click();
  };

  return (
    <div className="fall-report-container">
      <h1>Fall Report</h1>
      
      {/* Expandable List of Falls */}
      <ul className="fall-list">
        {fallHistory.map(fall => (
          <li key={fall.id} className="fall-item">
            <button className="expand-btn" onClick={() => toggleExpandFall(fall.id)}>
              Fall on {fall.date.toLocaleDateString('en-GB')}
            </button>
            {expandedFallId === fall.id && (
              <div className="fall-details">
                <p>Severity: {fall.severity}</p>
                <p>Location: {fall.location}</p>
                <p>Response Time: {fall.responseTime}</p>
                <p>Contact: {fall.contact}</p>

                {/* Notes Section */}
                <textarea
                  rows="4"
                  cols="50"
                  value={fall.notes}
                  onChange={(e) => handleNoteChange(fall.id, e.target.value)}
                  placeholder="Enter notes about the fall..."
                />
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Download Button */}
      <div className="report-buttons">
        <button onClick={handleDownload}>Download Fall Report</button>
      </div>
    </div>
  );
}

export default FallReport;
