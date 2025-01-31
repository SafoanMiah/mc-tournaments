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
    const leaderboard = {};

    pastEvents.forEach(event => {
        const winner = event.winner;
        if (!leaderboard[winner]) {
            leaderboard[winner] = {
                player: winner,
                events: []
            };
        }
        leaderboard[winner].events.push(event.event_name);
    });

    return Object.values(leaderboard);
} 