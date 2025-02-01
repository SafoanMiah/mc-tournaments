import { supabase } from '../supabaseClient';

type LeaderboardEntry = {
    player: string;
    totalPrize: number;
    totalPoints: number;
    events: string[];
};

export async function fetchData() {
    try {
        const { data, error } = await supabase
            .from('tournaments_private') // Ensure this is the correct table name
            .select('*');

        if (error) {
            console.error('Supabase Error:', error);
            throw error;
        }

        console.log('Fetched Data:', data); // Log the fetched data
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return null; // Return null in case of an error
    }
}

export function calculateLeaderboard(tournaments): LeaderboardEntry[] {
    // Filter out tournaments with NULL or empty winner
    const validTournaments = tournaments.filter(tournament => tournament.winner);

    // Calculate leaderboard based on valid tournaments
    const leaderboard = validTournaments.reduce((acc: Record<string, LeaderboardEntry>, tournament) => {
        const { winner, points } = tournament;
        if (!acc[winner]) {
            acc[winner] = { player: winner, totalPrize: 0, totalPoints: 0, events: [] };
        }
        acc[winner].totalPoints += points;
        acc[winner].events.push(tournament.tournament_name);
        return acc;
    }, {});

    // Convert to array and sort by totalPoints descending
    const sortedLeaderboard = Object.values(leaderboard) as LeaderboardEntry[];
    sortedLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints);

    // Limit to top 3 entries
    return sortedLeaderboard.slice(0, 3);
}