export async function fetchData() {
    try {
        const response = await fetch('/data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return null; // Return null in case of an error
    }
}

export function calculateLeaderboard(pastEvents) {
    const leaderboardMap = new Map();

    pastEvents.forEach(event => {
        const { winner, event: eventName } = event;
        if (leaderboardMap.has(winner)) {
            const winnerData = leaderboardMap.get(winner);
            winnerData.wins += 1;
            winnerData.events.push(eventName);
        } else {
            leaderboardMap.set(winner, { wins: 1, events: [eventName] });
        }
    });

    const leaderboard = Array.from(leaderboardMap.entries())
        .map(([player, { wins, events }]) => ({ player, wins, events }))
        .sort((a, b) => b.wins - a.wins)
        .slice(0, 3); // Get top 3

    return leaderboard;
} 