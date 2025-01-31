import Navigation from "../components/Navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Sponsor = () => {
  const [discordUsername, setDiscordUsername] = useState("");
  const [eventName, setEventName] = useState("");
  const [prizeValue, setPrizeValue] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailBody = `
      Discord Username: ${discordUsername}
      Event Name: ${eventName}
      Prize Value: ${prizeValue}
      Event Description: ${eventDescription}
    `;
    window.location.href = `mailto:saf.home.2017@gmail.com?subject=Event Sponsorship&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-12 container mx-auto px-4">
        <div className="glass-card p-8 text-center animate-fade-in relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 mix-blend-overlay"></div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text relative z-10">
            Sponsor An Event
          </h1>

          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            You can also DM <span className="text-blue-400 font-semibold">@drsaf</span> on Discord to discuss it further.
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto space-y-6 bg-white/10 p-6 rounded-2xl backdrop-blur-lg shadow-lg border border-white/20"
          >
            <div className="relative">
              <label className="block text-gray-300 mb-2">Discord Username</label>
              <input
                type="text"
                value={discordUsername}
                onChange={(e) => setDiscordUsername(e.target.value)}
                className="w-full p-3 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Name of Event</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full p-3 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Value of Prize (us dollars)</label>
              <input
                type="text"
                value={prizeValue}
                onChange={(e) => setPrizeValue(e.target.value)}
                className="w-full p-3 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Description of Event</label>
              <textarea
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className="w-full p-3 bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white placeholder-gray-400"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              Send Email
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sponsor;
