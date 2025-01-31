import Navigation from "../components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Book, Shield, Swords, Users, Clock, Ban, Trophy, DollarSign } from "lucide-react";

const rules = [
  {
    title: "Entry & Seat Types",
    icon: <Users className="w-6 h-6 text-blue-400" />,
    content: "If an event is not sponsored, participants may register as either a paid or free seat. If an event is sponsored, all participants compete on equal terms for the prize."
  },
  {
    title: "Entry Limits & Alternate Accounts",
    icon: <Ban className="w-6 h-6 text-red-400" />,
    content: "One entry per participant per event. Alternate accounts (alts) are strictly prohibited. Detection of alts results in immediate disqualification and a three-event ban."
  },
  {
    title: "Prize Distribution & Eligibility",
    icon: <DollarSign className="w-6 h-6 text-green-400" />,
    content: "Only the highest-ranking paid seat can win in non-sponsored events. Free-seat participants cannot claim the prize."
  },
  {
    title: "Prize Pool Carry-Over",
    icon: <DollarSign className="w-6 h-6 text-green-400" />,
    content: "If no paid-seat participant wins, the prize pool carries over to the next event."
  },
  {
    title: "Prize Payment",
    icon: <DollarSign className="w-6 h-6 text-green-400" />,
    content: "100% of the prize pool will be paid out. If a prize cannot be paid immediately, it will be allocated to a future event."
  },
  {
    title: "Fair Play & Cheating",
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    content: "Cheating, hacking, and unfair advantages are prohibited. Violations include using external software/hacks, exploiting unintended game mechanics, and collusion/team play in solo events. Any violation results in permanent disqualification."
  },
  {
    title: "Gameplay Monitoring & Review",
    icon: <Clock className="w-6 h-6 text-orange-400" />,
    content: "All gameplay is recorded via Minecraft Replay Mod. Winner’s gameplay is publicly reviewed for compliance. Rule violations in reviewed footage lead to penalties."
  },
  {
    title: "Exploits & Unintended Mechanics",
    icon: <Ban className="w-6 h-6 text-red-400" />,
    content: "Game-breaking exploits are prohibited. Bypassing the challenge results in a three-event ban."
  }
];

const Rules = () => (
  <div className="min-h-screen bg-background ">
    <Navigation />
    <div className="pt-24 pb-12 container mx-auto px-4 ">
      <div className="glass-card p-8 text-center animate-fade-in ">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Event Rules
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {rules.map((rule, index) => (
            <Card key={index} className="glass-card hover-glow">
              <CardHeader className="text-center flex flex-col items-center">
                <div className="flex items-center gap-2">
                  {rule.icon}
                  <CardTitle>{rule.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{rule.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Rules;
