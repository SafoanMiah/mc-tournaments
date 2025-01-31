import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy, Calendar, DollarSign } from "lucide-react";
import { fetchData } from "./dataService";

const PastTournaments = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    async function loadData() {
      const data = await fetchData();
      if (data) {
        setTournaments(data.pastTournaments);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-12 container mx-auto px-4">
        <div className="glass-card p-8 text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Past Tournaments
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {tournaments.map((tournament, index) => (
              <Card key={index} className="glass-card hover-glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    {tournament.tournament_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{tournament.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-300">Winner: {tournament.winner}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Prize Pool: {tournament.pts}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastTournaments;