import React, { useState } from 'react';
import PredictionForm from './components/PredictionForm';
import StandingsDisplay from './components/StandingsDisplay';
import WinTracker from './components/WinTracker'; // Import the Tracker component

const App = () => {
    const [standings, setStandings] = useState(() => {
        const savedStandings = localStorage.getItem('standings');
        return savedStandings ? JSON.parse(savedStandings) : null;
    });

    // Initialize records with all teams and default values
    const teams = [
        "ATL", "BOS", "BKN", "CHA", "CHI", "CLE", "DAL", "DEN", "GSW",
        "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOP",
        "NYK", "OKC", "ORL", "PHI", "PHX", "POR", "SAC", "SAS", "TOR",
        "UTA", "WAS"
    ];

    const [records, setRecords] = useState(() => {
        const savedRecords = localStorage.getItem('records');
        const initialRecords = savedRecords ? JSON.parse(savedRecords) : {};
        
        // Initialize any missing teams to zero
        return teams.reduce((acc, team) => {
            acc[team] = initialRecords[team] || 0; // Default to 0 if not present
            return acc;
        }, {});
    });

    const totalPossibleWins = 1230; // Total wins available (30 teams * 82 games / 2)
    
    // Calculate total wins based on current input
    const totalWins = Object.values(records).reduce((sum, wins) => sum + (Number(wins) || 0), 0);
    const remainingWins = totalPossibleWins - totalWins; // Calculate remaining wins

    const handleRecordsChange = (team, value) => {
      if (value && typeof value === 'object') {
          // If a full records object is provided (for autofill), set records all at once
          setRecords(value);
          localStorage.setItem('records', JSON.stringify(value));
      } else {
          // Update a specific team's record
          const updatedRecords = { ...records, [team]: Number(value) || 0 }; // Ensure value is a number
          setRecords(updatedRecords);
          localStorage.setItem('records', JSON.stringify(updatedRecords));
      }
  };

    const handlePredictionSubmit = (newRecords) => {
        if (validateStandings(newRecords)) {
            setStandings(newRecords);
            localStorage.setItem('standings', JSON.stringify(newRecords));
            alert('Predictions are valid!');
        } else {
            alert('Invalid predictions! Please check the totals.');
        }
    };

    const clearData = () => {
        setStandings(null);
        setRecords({});
        localStorage.removeItem('standings');
        localStorage.removeItem('records');
    };

    const validateStandings = (records) => {
        // Ensure total wins match total available games
        return totalWins === totalPossibleWins;
    };

    return (
        <div>
            <h1>NBA Standings Predictions for 2024-25</h1>
            
            {/* Tracker for remaining or over-capacity wins */}
            <WinTracker remainingWins={remainingWins} />
            
            {/* Prediction Form */}
            <PredictionForm onSubmit={handlePredictionSubmit} records={records} onRecordsChange={handleRecordsChange} />
            
            {standings && <StandingsDisplay standings={standings} />}
            
            <button onClick={clearData}>Clear Standings and Inputs</button> 
        </div>
    );
};

export default App;
