import { Trophy, Book, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const links = [
    { name: "Events", icon: <Trophy className="w-4 h-4" />, path: "/" },
    { name: "Rules", icon: <Book className="w-4 h-4" />, path: "/rules" },
    { name: "Sponsor", icon: <DollarSign className="w-4 h-4" />, path: "/sponsor" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card" style={{ borderRadius: '0' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-white md:text-lg">
            Saf's Event Hub
          </Link>
          <div className="flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                {link.icon}
                <span className="hidden md:inline">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;