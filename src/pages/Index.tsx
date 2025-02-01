import { useState, useEffect } from "react";
import { Trophy, Clock, Users, Coins, Award, Calendar, ChevronDown, ChevronUp, List } from "lucide-react";
import Navigation from "../components/Navigation";
import { fetchData, calculateLeaderboard } from "./dataService";

function calculateTimeLeft(targetTime: string) {
  const targetDate = new Date(targetTime);
  const currentDate = new Date();
  const difference = targetDate.getTime() - currentDate.getTime();

  if (difference <= 0) return "0d 0h 0m 0s";

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

const Index = () => {
  const [data, setData] = useState({ tournaments: [] });
  const [leaderboard, setLeaderboard] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: React.ReactNode; link: string }>({ title: "", message: "", link: "" });
  const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState("0d 0h 0m 0s");
  const [statusMessage, setStatusMessage] = useState("");

  const currentEvent = data.tournaments.find(tournament => tournament.status) || data.tournaments[data.tournaments.length - 1];

  useEffect(() => {
    async function loadData() {
      const fetchedData = await fetchData();
      if (fetchedData) {
        setData({ tournaments: fetchedData });
        setLeaderboard(calculateLeaderboard(fetchedData));
      } else {
        console.error('No data fetched');
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentEvent) {
        const { status, start_time, end_time } = currentEvent;
        let newTimeLeft = "0d 0h 0m 0s";
        let newStatusMessage = "";

        if (status === "starting") {
          newTimeLeft = calculateTimeLeft(start_time);
          newStatusMessage = "STARTING IN";
        } else if (status === "ending") {
          newTimeLeft = calculateTimeLeft(end_time);
          newStatusMessage = "ENDING IN";
        }

        setTimeLeft(newTimeLeft);
        setStatusMessage(newStatusMessage);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentEvent]);

  if (!currentEvent) {
    return <div>Loading...</div>;
  }

  const { status, tournament_name, description, end_time, entry_fee, is_sponsored, prize_pool, sponsored_by } = currentEvent;

  const prize_poolDisplay = status === "ending" ? `$${prize_pool}` : "$0";
  const entryFeeDisplay = status === "ending" ? `$${entry_fee}` : "#0";

  const FreeSeatLink = "https://ptb.discord.com/channels/1331351023704473691/1334664421678518293"
  const PaidSeatLink = "placeholder_for_paid_seat_link"

  const handleFreeSeatClick = () => {
    if (is_sponsored) {
      setModalContent({
        title: "Join Instructions",
        message: "Follow instructions in the #join channel to enter, you must re-enter every tournament.",
        link: FreeSeatLink
      });
    } else {
      setModalContent({
        title: "Join Instructions",
        message: (
          <>
            This tournament is not sponsored. Entering as a free seat will exempt you from winning the prize pool.<br />
            For that, you must enter as a paid seat.<br /><br />
            Follow instructions in the #join channel to enter, you must re-enter every tournament.
          </>
        ),
        link: FreeSeatLink
      });
    }
    setShowModal(true);
  };

  const handlePaidSeatClick = () => {
    if (is_sponsored) {
      setModalContent({
        title: "Notice",
        message: "Cannot enter as paid in sponsored tournaments.",
        link: ""
      });
      setShowModal(true);
    } else {
      // Placeholder for paid seat entry
      alert("Paid seat entry is not yet available.");
    }
  };

  const togglePlayerTournaments = (player: string) => {
    setExpandedPlayer(expandedPlayer === player ? null : player);
  };

  return (
    <div>
      <Navigation />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <div
          className="glass-card p-8 text-center animate-fade-in relative overflow-hidden"
          style={{
            backgroundImage: `url('/main-bg-1.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 mix-blend-overlay"></div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-purple-500 text-transparent bg-clip-text relative z-10">
            {status ? tournament_name : "No Active Tournaments"}
          </h1>

          {/* Description */}
          <div className="mb-12 mt-1 w-1/2 mx-auto">
            <div className="text-gray-200 whitespace-pre-wrap font-semibold">{status ? description : ""}</div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12 mt-12">
            <div className={`text-5xl md:text-7xl font-bold m-2 ${status === "ending" ? "text-yellow-400" : "text-white"}`}>{timeLeft}</div>
            <div className="text-xl font-semibold text-gray-300">{statusMessage}</div>
          </div>

          {/* Tournament Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <Users className="w-6 h-6 text-green-400" />
              <span className="text-xl">Sponsor: {is_sponsored ? sponsored_by : "No Sponsor"}</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-xl">Prize Pool: {prize_poolDisplay}</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Users className="w-6 h-6 text-green-400" />
              <span className="text-xl">Entry: {entryFeeDisplay === "$0" ? "$0" : entryFeeDisplay}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
            <button
              className="glass-card hover-glow px-8 py-4 text-lg font-semibold text-white"
              onClick={handleFreeSeatClick}
              disabled={status !== "ending"}
            >
              Enter as Free Seat
            </button>
            <button
              className="glass-card hover-glow px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              onClick={handlePaidSeatClick}
              disabled={status !== "ending"}
            >
              Enter as Paid Seat
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h2 className="text-xl font-bold mb-4 text-center text-gray-700">{modalContent.title}</h2>
              <p className="text-gray-700 mb-4">{modalContent.message}</p>
              {modalContent.link && (
                <a
                  href={modalContent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full block text-center mb-2"
                >
                  Go to Link
                </a>
              )}
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Leaderboard Section */}
        <div className="mt-12">
          <div className="glass-card p-6 mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Award className="w-6 h-6 text-yellow-400" />
              <h2 className="text-2xl font-bold">Event Leaderboard</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {leaderboard.map((player, index) => (
                <div key={index} className="glass-card p-4 hover-glow flex items-start">
                  <div className="flex-1">
                    <div
                      className="flex items-center cursor-pointer md:cursor-default"
                      onClick={() => togglePlayerTournaments(player.player)}
                    >
                      <div className="text-2xl font-bold text-yellow-400 mr-4" style={{ alignSelf: 'flex-start' }}>
                        #{index + 1}
                      </div>
                      <div className="text-lg font-semibold">{player.player}</div>
                      <div className="text-sm text-gray-400 ml-2">({player.totalPoints} points)</div>
                      <div className="md:hidden">
                        {expandedPlayer === player.player ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedPlayer === player.player || window.innerWidth >= 768 ? "max-h-40" : "max-h-0"
                        }`}
                    >
                      <ul className="list-disc list-inside text-gray-300 mt-2">
                        {player.events.map((tournament, idx) => (
                          <li key={idx}>{tournament}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Conditionally render skin image based on expanded state */}
                  <img
                    src={`https://minotar.net/armor/body/${player.player}/100.png`}
                    alt={`${player.player}'s skin`}
                    className={`w-20 ml-4 ${expandedPlayer === player.player ? 'block' : 'hidden md:block'}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Past Tournaments Section */}
        <div className="mt-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <List className="w-6 h-6 text-gray-400" />
            <h2 className="text-2xl font-bold">Past Tournaments</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {data.tournaments
              .filter(tournament => !tournament.status)
              .sort((a, b) => new Date(b.end_time).getTime() - new Date(a.end_time).getTime()) // Sort by end_time descending
              .map((tournament, index) => {
                const startDate = new Date(tournament.start_time);
                const endDate = new Date(tournament.end_time);
                const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)); // Duration in days

                return (
                  <div key={index} className="glass-card hover-glow p-4">
                    <h3 className="text-lg font-semibold mb-2">{tournament.tournament_name}</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{tournament.end_time.split('T')[0]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-300">{duration} days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300">Winner: {tournament.winner || "No Winner"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Prize Pool: {tournament.prize_pool}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-red-400" />
                      <span className="text-gray-300">Points: {tournament.points}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;