import React from 'react';

const teams = [
    "ATL", "BOS", "BKN", "CHA", "CHI", "CLE", "DAL", "DEN", "GSW",
    "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOP",
    "NYK", "OKC", "ORL", "PHI", "PHX", "POR", "SAC", "SAS", "TOR",
    "UTA", "WAS"
];

const PredictionForm = ({ onSubmit, records, onRecordsChange }) => {

    const handleChange = (team, value) => {
        onRecordsChange(team, value); // Update individual team record
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(records); // Submit the current records
    };

    // Autofill all teams with 41 wins
    const autofill41Wins = () => {
        const newRecords = {};
        teams.forEach(team => {
            newRecords[team] = 41; // Set 41 wins for every team
        });
        onRecordsChange(null, newRecords); // Update all records at once
    };

    // Autofill with last year's standings
    const autofillLastYearStandings = () => {
        const lastYearStandings = {
            ATL: 36,
            BOS: 64,
            BKN: 32,
            CHA: 21,
            CHI: 39,
            CLE: 48,
            DET: 14,
            IND: 47,
            MIA: 46,
            MIL: 49,
            NYK: 50,
            ORL: 47,
            PHI: 47,
            TOR: 25,
            WAS: 15,
            DAL: 50,
            DEN: 57,
            GSW: 46,
            HOU: 41,
            LAC: 51,
            LAL: 47,
            MEM: 27,
            MIN: 56,
            NOP: 49,
            OKC: 57,
            PHX: 49,
            POR: 21,
            SAC: 46,
            SAS: 22,
            UTA: 31
        };
        onRecordsChange(null, lastYearStandings); // Update all records with last year's standings
    };

    return (
        <form onSubmit={handleSubmit}>
            {teams.map(team => (
                <div key={team} style={{ margin: '10px 0' }}>
                    <label>{team}: </label>
                    <input
                        type="number"
                        value={records[team] || ''} // Controlled input value
                        onChange={(e) => handleChange(team, e.target.value)} // Update value via handleChange
                        required
                        min="0" 
                        max="82" 
                    />
                </div>
            ))}
            <button type="button" onClick={autofill41Wins}>Autofill 41 Wins</button>
            <button type="button" onClick={autofillLastYearStandings}>Autofill Last Year's Standings</button>
            <button type="submit">Submit Predictions</button>
        </form>
    );
};

export default PredictionForm;
