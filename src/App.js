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
      const totalGames = 82; // NBA season length
      const totalTeams = 30;
      const totalLeagueGames = (totalGames * totalTeams) / 2; // Total number of games in the season (each game counts for both teams)
  
      // Sum of all wins across the league
      const totalWins = Object.values(records).reduce((a, b) => a + Number(b), 0);
  
      // Validate the overall win/loss balance
      if (totalWins !== totalLeagueGames) {
        console.log(`${totalWins}`);
        console.log(`${totalLeagueGames}`);
        return false; // Total wins must match total games played in the league
      }
  
      // Check if any team's wins exceed 82 or are less than 0
      for (const wins of Object.values(records)) {
        const winCount = Number(wins);
        if (winCount < 0 || winCount > 82) {
          return false; // Invalid if any team has less than 0 or more than 82 wins
        }
      }
  
      // Splitting teams into conferences
      const easternTeams = ["ATL", "BOS", "BKN", "CHA", "CHI", "CLE", "DET", "IND", "MIA", "MIL", "NYK", "ORL", "PHI", "TOR", "WAS"];
      const westernTeams = ["DAL", "DEN", "GSW", "HOU", "LAC", "LAL", "MEM", "MIN", "NOP", "OKC", "PHX", "POR", "SAC", "SAS", "UTA"];
  
      // Wins in each conference
      const easternWins = easternTeams.reduce((sum, team) => sum + Number(records[team] || 0), 0);
      const westernWins = westernTeams.reduce((sum, team) => sum + Number(records[team] || 0), 0);
  
      const totalEasternGames = 52 * easternTeams.length; // 52 games per team in the conference
      const totalWesternGames = 52 * westernTeams.length; // Same for the West
  
      // Validate that wins make sense in the context of their respective conference schedules
      if (easternWins > totalEasternGames || westernWins > totalWesternGames) {
        return false; // Invalid if wins exceed the total games played within their respective conferences
      }
  
      // If all checks pass
      return true;
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
