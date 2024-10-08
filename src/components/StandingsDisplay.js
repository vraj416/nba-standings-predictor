import React from 'react';

const easternTeams = ["ATL", "BOS", "BKN", "CHA", "CHI", "CLE", "DET", "IND", "MIA", "MIL", "NYK", "ORL", "PHI", "TOR", "WAS"];
const westernTeams = ["DAL", "DEN", "GSW", "HOU", "LAC", "LAL", "MEM", "MIN", "NOP", "OKC", "PHX", "POR", "SAC", "SAS", "UTA"];

const StandingsDisplay = ({ standings }) => {
    const standingsArray = Object.entries(standings).map(([team, wins]) => {
        const losses = 82 - wins; // Assuming an 82-game season
        return { team, wins: Number(wins), losses };
    });

    standingsArray.sort((a, b) => b.wins - a.wins); // Sort standings by wins in descending order

    const easternStandings = standingsArray.filter(({ team }) => easternTeams.includes(team));
    const westernStandings = standingsArray.filter(({ team }) => westernTeams.includes(team));

    const categorizeTeams = (conferenceStandings) => {
        return {
            playoffs: conferenceStandings.slice(0, 6), // Top 6 teams
            playIn: conferenceStandings.slice(6, 10), // Teams 7-10
            outOfContention: conferenceStandings.slice(10), // Teams 11-15
        };
    };

    const easternCategories = categorizeTeams(easternStandings);
    const westernCategories = categorizeTeams(westernStandings);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <h2>Predicted Standings</h2>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Team</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Wins</th>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Losses</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standingsArray.map(({ team, wins, losses }) => (
                            <tr key={team}>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{team}</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{wins}</td>
                                <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{losses}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div>
                <h2>Eastern Conference</h2>
                {renderConferenceTable(easternCategories)}

                <h2>Western Conference</h2>
                {renderConferenceTable(westernCategories)}
            </div>
        </div>
    );
};

const renderConferenceTable = ({ playoffs, playIn, outOfContention }) => {
    return (
        <div>
            <h3>Playoffs</h3>
            {renderTeamTable(playoffs)}

            <h3>Play-In</h3>
            {renderTeamTable(playIn)}

            <h3>Out of Contention</h3>
            {renderTeamTable(outOfContention)}
        </div>
    );
};

const renderTeamTable = (teams) => {
    return (
        <table style={{ borderCollapse: 'collapse', width: '100%', marginBottom: '20px' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Team</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Wins</th>
                    <th style={{ border: '1px solid black', padding: '8px' }}>Losses</th>
                </tr>
            </thead>
            <tbody>
                {teams.map(({ team, wins, losses }) => (
                    <tr key={team}>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{team}</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{wins}</td>
                        <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{losses}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default StandingsDisplay;
