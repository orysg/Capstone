import React, { useState } from 'react';

function FallReport() {
  const [notes, setNotes] = useState('');

  const handleDownload = () => {
    const reportContent = `Fall Report:\n\nNotes:\n${notes}`;
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'fall_report.txt';
    link.click();
  };

  return (
    <div className="fall-report-container">
      <h1>Fall Report</h1>
      <textarea
        rows="10"
        cols="50"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Enter notes about the fall..."
      />
      <div className="report-buttons">
        <button onClick={handleDownload}>Download Fall Report</button>
      </div>
    </div>
  );
}

export default FallReport;
