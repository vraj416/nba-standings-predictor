import React from 'react';

const WinTracker = ({ totalWins }) => {
    const totalPossibleWins = 1230; // Total wins in an NBA season (30 teams * 82 games / 2)
    const remainingWins = totalPossibleWins - totalWins;

    return (
        <div style={{ marginBottom: '20px', fontWeight: 'bold' }}>
            {remainingWins > 0 
                ? `You have ${remainingWins} wins left to distribute`
                : `You are ${Math.abs(remainingWins)} wins over the valid amount`}
        </div>
    );
};

export default WinTracker;
