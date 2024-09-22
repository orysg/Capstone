import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './History.css';

function History() {
  const [fallHistory] = useState([
    { date: new Date('2024-08-25T12:00:00'), severity: 'Moderate', location: 'Lat: 12.34, Long: 56.78', responseTime: '2 minutes', contact: 'Nurse Mary' },
    { date: new Date('2024-08-20T10:30:00'), severity: 'Severe', location: 'Lat: 23.45, Long: 67.89', responseTime: '1 minute', contact: 'Nurse John' },
    // Add more fall history as needed
  ]);

  const [selectedFall, setSelectedFall] = useState(fallHistory[0]);
  const [isDefault, setIsDefault] = useState(true);
  const [dateRange, setDateRange] = useState([new Date('2000-01-01'), new Date()]); // Default to all dates
  const [severityFilter, setSeverityFilter] = useState('');
  const navigate = useNavigate();

  const getTileClassName = ({ date }) => {
    const hasFall = fallHistory.some(fall => 
      fall.date.toDateString() === date.toDateString() &&
      (severityFilter === '' || fall.severity === severityFilter) &&
      date >= dateRange[0] && date <= dateRange[1]
    );
    return hasFall ? 'fall-highlight' : null;
  };

  const handleDayClick = (value) => {
    const foundFall = fallHistory.find(fall => fall.date.toDateString() === value.toDateString() && (severityFilter === '' || fall.severity === severityFilter));
    setSelectedFall(foundFall || fallHistory[0]);
    setIsDefault(!foundFall);
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => name === 'start' ? [new Date(value), prev[1]] : [prev[0], new Date(value)]);
  };

  const handleSeverityChange = (e) => {
    setSeverityFilter(e.target.value);
  };

  const filteredFalls = fallHistory.filter(fall => 
    fall.date >= dateRange[0] && fall.date <= dateRange[1] &&
    (severityFilter === '' || fall.severity === severityFilter)
  );

  return (
    <div className="history-container">
      <h1>Fall History</h1>

      {/* Date Range Filter */}
      <div className="filters">
        <label>
          Start Date:
          <input type="date" name="start" onChange={handleDateRangeChange} />
        </label>
        <label>
          End Date:
          <input type="date" name="end" onChange={handleDateRangeChange} />
        </label>
        <label>
          Severity:
          <select onChange={handleSeverityChange} value={severityFilter}>
            <option value="">All</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
            <option value="Mild">Mild</option>
          </select>
        </label>
      </div>

      <Calendar
        tileClassName={getTileClassName}
        onClickDay={handleDayClick}
      />

      {/* Last Fall Detected Section */}
      <div className="last-fall-detected">
        <h2>{isDefault ? 'Last Fall Detected' : `Fall Detected on ${selectedFall.date.toLocaleDateString('en-GB')}`}</h2>
        <p>
          {isDefault ? (
            <>
              Date: {fallHistory[0].date.toLocaleDateString('en-GB')} - {fallHistory[0].severity} fall
            </>
          ) : (
            <>
              Date: {selectedFall.date.toLocaleDateString('en-GB')} - {selectedFall.severity} fall
            </>
          )}
        </p>
        <p>Location: {selectedFall.location}</p>
        <p>Response Time: {selectedFall.responseTime}</p>
        <p>Emergency Contact: {selectedFall.contact}</p>
      </div>
      <button onClick={() => navigate('/fall-report')} className="report-button">
        Go to Fall Report
      </button>
    </div>
    
  );
  
}

export default History;
