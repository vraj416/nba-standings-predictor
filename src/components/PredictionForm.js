import React, { useState, useEffect } from 'react';

const teams = [
    "ATL", "BOS", "BKN", "CHA", "CHI", "CLE", "DAL", "DEN", "GSW", "HOU", "IND", "LAC", "LAL", "MEM", "MIA", "MIL", "MIN", "NOP", "NYK", "OKC", "ORL", "PHI", "PHX", "POR", "SAC", "SAS", "TOR", "UTA", "WAS"
];

// Last year's standings (example data)
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

const PredictionForm = ({ onSubmit, records }) => {
    const [inputValues, setInputValues] = useState(records);

    useEffect(() => {
        setInputValues(records); // Set input values from records when component mounts
    }, [records]);

    const handleChange = (team, value) => {
        const updatedValues = { ...inputValues, [team]: value };
        setInputValues(updatedValues);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(inputValues);
    };

    // Autofill 41 wins for all teams
    const autofill41Wins = () => {
        const newRecords = {};
        teams.forEach(team => {
            newRecords[team] = 41; // Set 41 wins for each team
        });
        setInputValues(newRecords);
    };

    // Autofill with last year's standings
    const autofillLastYearStandings = () => {
        setInputValues(lastYearStandings);
    };

    return (
        <form onSubmit={handleSubmit}>
            {teams.map(team => (
                <div key={team} style={{ margin: '10px 0' }}>
                    <label>{team}: </label>
                    <input
                        type="number"
                        value={inputValues[team] || ''}
                        onChange={(e) => handleChange(team, e.target.value)}
                        required
                        min="0" // Minimum value
                        max="82" // Maximum value
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
