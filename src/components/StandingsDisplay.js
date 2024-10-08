import React from 'react';

const StandingsDisplay = ({ standings }) => {
    // Convert the standings object to an array for easier manipulation
    const standingsArray = Object.entries(standings).map(([team, wins]) => {
        const losses = 82 - wins; // Assuming an 82-game season
        return { team, wins: Number(wins), losses };
    });

    // Sort standings by wins, then losses (optional)
    standingsArray.sort((a, b) => {
        if (b.wins === a.wins) {
            return a.losses - b.losses; // Lower losses first
        }
        return b.wins - a.wins; // Higher wins first
    });

    return (
        <div>
            <h2>Predicted Standings</h2>
            <table style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid black', padding: '4px', width: '5px' }}>Team</th>
                        <th style={{ border: '1px solid black', padding: '4px', width: '5px' }}>W</th>
                        <th style={{ border: '1px solid black', padding: '4px', width: '5px' }}>L</th>
                    </tr>
                </thead>
                <tbody>
                    {standingsArray.map(({ team, wins, losses }) => (
                        <tr key={team}>
                            <td style={{ border: '1px solid black', padding: '2px', textAlign: 'center' }}>{team}</td>
                            <td style={{ border: '1px solid black', padding: '2px', textAlign: 'center' }}>{wins}</td>
                            <td style={{ border: '1px solid black', padding: '2px', textAlign: 'center' }}>{losses}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StandingsDisplay;
