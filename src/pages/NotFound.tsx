import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";

const items = [
  "diamond_sword",
  "iron_pickaxe",
  "golden_apple",
  "ender_pearl",
  "emerald",
  "redstone",
  "lapis_lazuli",
  "book",
  "bow",
  "stone",
  "dirt",
  "grass_block",
  "oak_log",
  "cobblestone",
  "iron_ingot",
  "gold_ingot",
  "diamond",
  "coal",
  "obsidian",
  "crafting_table",
  "furnace",
  "chest",
  "torch",
  "ladder",
  "bed",
  "tnt",
  "bucket",
  "shears",
  "fishing_rod",
  "map",
  "anvil",
  "enchanting_table",
  "elytra",
  "trident",
  "crossbow",
  "shield"
];

const NotFound = () => {
  const location = useLocation();
  const [currentItem, setCurrentItem] = useState(items[0]);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const randomizeItem = () => {
    const randomIndex = Math.floor(Math.random() * items.length);
    setCurrentItem(items[randomIndex]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <div className="glass-card p-12 text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-4">Oops! Page not found</p>
          <div onClick={randomizeItem} className="cursor-pointer mb-4">
            <img
              src={`https://minecraft-api.vercel.app/images/items/${currentItem}.png`}
              alt={currentItem}
              className="mx-auto"
              style={{ width: "150px", height: "150px", imageRendering: 'pixelated' }}
            />
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="w-1/3 mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded hover:bg-blue-400"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;