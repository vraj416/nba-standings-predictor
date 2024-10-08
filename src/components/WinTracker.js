import React from 'react';

const WinTracker = ({ remainingWins }) => {
    return (
        <div style={{ marginBottom: '20px', fontWeight: 'bold' }}>
            {remainingWins > 0 
                ? `You have ${remainingWins} wins left to distribute.`
                : `You are ${Math.abs(remainingWins)} wins over the valid amount.`}
        </div>
    );
};

export default WinTracker;
