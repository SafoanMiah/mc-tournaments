import { useState, useEffect } from "react";
import { Trophy, Clock, Users, DollarSign, Award, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import Navigation from "../components/Navigation";
import { fetchData, calculateLeaderboard } from "./dataService";

function calculateTimeLeft(timer: string) {
  const eventDate = new Date(timer);
  const currentDate = new Date();
  const difference = eventDate.getTime() - currentDate.getTime();

  if (difference <= 0) return "0d 0h 0m";

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  return `${days}d ${hours}h ${minutes}m`;
}

const Index = () => {
  const [eventData, setEventData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: React.ReactNode; link: string }>({ title: "", message: "", link: "" });
  const [expandedPlayer, setExpandedPlayer] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await fetchData();
      if (data) {
        setEventData(data.event);
        setLeaderboard(calculateLeaderboard(data.pastEvents));
        setPastEvents(data.pastEvents);
      }
    }
    loadData();
  }, []);

  if (!eventData) {
    return <div>Loading...</div>;
  }

  const { ongoing, event_name, description, timer, entry, sponsored, prizePool, freeSeatLink, paidSeatLink } = eventData;

  const timeLeft = ongoing ? calculateTimeLeft(timer) : "0d 0h 0m";
  const prizePoolDisplay = ongoing ? `$${prizePool}` : "$0";
  const entryFeeDisplay = ongoing ? `$${entry}` : "$0";

  const handleFreeSeatClick = () => {
    if (sponsored) {
      setModalContent({
        title: "Join Instructions",
        message: "Follow instructions in the #join channel to enter, you must re-enter every event.",
        link: freeSeatLink
      });
    } else {
      setModalContent({
        title: "Join Instructions",
        message: (
          <>
            This event is not sponsored. Entering as a free seat will exempt you from winning the prize pool.<br />
            For that, you must enter as a paid seat.<br /><br />
            Follow instructions in the #join channel to enter, you must re-enter every event.
          </>
        ),
        link: freeSeatLink
      });
    }
    setShowModal(true);
  };

  const handlePaidSeatClick = () => {
    if (sponsored) {
      setModalContent({
        title: "Notice",
        message: "Cannot enter as paid in sponsored events.",
        link: ""
      });
      setShowModal(true);
    } else {
      // Placeholder for paid seat entry
      alert("Paid seat entry is not yet available.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const togglePlayerEvents = (playerName: string) => {
    setExpandedPlayer(expandedPlayer === playerName ? null : playerName);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <div className="pt-24 pb-12 container mx-auto px-4">
        <div
          className="glass-card p-8 text-center animate-fade-in relative overflow-hidden"
          style={{
            backgroundImage: `url('/public/main-bg-1.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 mix-blend-overlay"></div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-yellow-300 text-transparent bg-clip-text relative z-10">
            {ongoing ? event_name : "No Active Events"}
          </h1>

          {/* Description */}
          <div className="mb-12 mt-1 w-1/2 mx-auto">
            <div className="text-gray-200 whitespace-pre-wrap font-semibold">{ongoing ? description : ""}</div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12 mt-12">
            <div className="text-5xl md:text-7xl font-bold text-white m-2">{timeLeft}</div>
          </div>

          {/* Event Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <Users className="w-6 h-6 text-green-400" />
              <span className="text-xl">Sponsor: {sponsored ? eventData.sponsored_by : "No Sponsor"}</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-xl">Prize Pool: {prizePoolDisplay}</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Users className="w-6 h-6 text-green-400" />
              <span className="text-xl">Entry: {entryFeeDisplay === "$0" ? "Free" : entryFeeDisplay}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
            <button
              className="glass-card hover-glow px-8 py-4 text-lg font-semibold text-white"
              onClick={handleFreeSeatClick}
              disabled={!ongoing}
            >
              Enter as Free Seat
            </button>
            <button
              className="glass-card hover-glow px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              onClick={handlePaidSeatClick}
              disabled={!ongoing}
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
                onClick={closeModal}
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
                <div key={index} className="glass-card p-4 hover-glow">
                  <div className="flex justify-between items-center cursor-pointer md:cursor-default" onClick={() => togglePlayerEvents(player.player)}>
                    <div className="text-2xl font-bold text-yellow-400 mb-2">#{index + 1}</div>
                    <div className="text-lg font-semibold">{player.player}</div>
                    <div className="md:hidden">
                      {expandedPlayer === player.player ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedPlayer === player.player || window.innerWidth >= 768 ? "max-h-40" : "max-h-0"
                      }`}
                  >
                    <ul className="list-disc list-inside text-gray-300 mt-2">
                      {player.events.map((event, idx) => (
                        <li key={idx}>{event}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Past Events Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {pastEvents.map((event, index) => (
              <div key={index} className="glass-card hover-glow">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{event.event_name}</h3>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">Winner: {event.winner}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-gray-300">Prize Pool: {event.pts}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;