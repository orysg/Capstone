import React, { useState } from 'react';
import './TestAPI.css';

const TestAPI = () => {
  const [numbers, setNumbers] = useState([]);
  const [fallStatus, setFallStatus] = useState('');
  const [isGenerating, setIsGenerating] = useState(false); // Track if numbers are being generated

  const generateNumbers = () => {
    setNumbers([]); // Reset numbers
    setFallStatus(''); // Reset fall status
    setIsGenerating(true); // Indicate that generation is in progress

    const newNumbers = Array.from({ length: 10 }, () => Math.floor(Math.random() * 4) + 1);

    // Incrementally display numbers
    newNumbers.forEach((num, index) => {
      setTimeout(() => {
        setNumbers(prevNumbers => [...prevNumbers, num]);
        
        // Calculate fall status only after the last number is displayed
        if (index === newNumbers.length - 1) {
          calculateFallStatus(newNumbers);
          setIsGenerating(false); // Reset generating state
        }
      }, index * 1000); // 1000ms delay for each number
    });
  };

  const calculateFallStatus = (numbers) => {
    const count = [0, 0, 0, 0]; // Counts for numbers 1, 2, 3, 4 :)

    // Count occurrences of each number
    numbers.forEach(num => {
      count[num - 1]++;
    });

    const majorityCount = Math.max(...count);
    const totalNumbers = numbers.length;
    
    if (majorityCount > totalNumbers / 2) {
      if (count[0] > count[1]) {
        setFallStatus('A fall has occurred (Majority are 1s)');
      } else if (count[1] > count[0]) {
        setFallStatus('A fall is likely (Majority are 2s)');
      } else if (count[2] > count[3]) {
        setFallStatus('A fall is unlikely (Majority are 3s)');
      } else if (count[3] > count[2]) {
        setFallStatus('No fall has occurred (Majority are 4s)');
      }
    } else if (count[0] > 0 && count[1] > 0) {
      setFallStatus('A fall is likely (Majority are 1s and 2s)');
    } else if (count[2] > 0 && count[3] > 0) {
      setFallStatus('A fall is unlikely (Majority are 3s and 4s)');
    } else {
      setFallStatus('Inconclusive (Even distribution)');
    }
  };

  return (
    <div className="test-api">
      <h1>Fall Detection Test</h1>
      <button onClick={generateNumbers} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Generate Numbers'}
      </button>
      <div className="results">
        <h2>Generated Numbers:</h2>
        <p>{numbers.join(', ')}</p>
        <h2>Fall Status:</h2>
        <p>{fallStatus}</p>
      </div>
    </div>
  );
};

export default TestAPI;
