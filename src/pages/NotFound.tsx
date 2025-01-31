import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "../components/Navigation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <div className="glass-card p-12 text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-4">Oops! Page not found</p>
          <a href="/" className="text-blue-400 hover:text-blue-300 underline">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;