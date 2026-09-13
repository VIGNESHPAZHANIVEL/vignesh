import React from "react";
import {
  Compass,
  Train,
  Car,
  Landmark,
  Utensils,
  ShoppingBag,
  Hotel as HotelIcon,
  CalendarDays,
  Sparkles,
  CloudSun,
  BookmarkCheck,
} from "lucide-react";
import { ActiveTab } from "../types";

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab?: (tab: ActiveTab) => void;
  setActiveTab?: (tab: ActiveTab) => void;
  onOpenAiAssistant?: () => void;
  onOpenAiChat?: () => void;
  savedCount?: number;
  savedItemsCount?: number;
  reservationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  setActiveTab,
  onOpenAiAssistant,
  onOpenAiChat,
  savedCount = 0,
  savedItemsCount = 0,
  reservationsCount = 0,
}) => {
  const handleTabChange = (tab: ActiveTab) => {
    if (onSelectTab) onSelectTab(tab);
    else if (setActiveTab) setActiveTab(tab);
  };

  const handleOpenAi = () => {
    if (onOpenAiChat) onOpenAiChat();
    else if (onOpenAiAssistant) onOpenAiAssistant();
  };

  const totalSaved = (savedItemsCount || savedCount) + reservationsCount;

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: "explore", label: "Overview", icon: <Compass className="w-4 h-4" /> },
    { id: "transport", label: "Local Transport", icon: <Train className="w-4 h-4" /> },
    { id: "parking", label: "Live Parking", icon: <Car className="w-4 h-4" /> },
    { id: "places", label: "Top Places", icon: <Landmark className="w-4 h-4" /> },
    { id: "restaurants", label: "Restaurants", icon: <Utensils className="w-4 h-4" /> },
    { id: "shopping", label: "Shopping", icon: <ShoppingBag className="w-4 h-4" /> },
    { id: "hotels", label: "Hotels & Stays", icon: <HotelIcon className="w-4 h-4" /> },
    { id: "planner", label: "Plan Your Trip", icon: <CalendarDays className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-stone-800 text-stone-100 shadow-md">
      {/* Top Ticker Bar */}
      <div className="bg-amber-700/30 border-b border-amber-600/30 px-4 py-1.5 text-xs text-amber-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="inline-flex items-center gap-1 font-semibold text-amber-300 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Chennai Live:
            </span>
            <span className="truncate text-stone-300">
              Metro running normally on Blue & Green lines • Marina sea breeze 18 km/h • 31°C Partly Cloudy
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 shrink-0 text-stone-300">
            <span className="flex items-center gap-1.5">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              31°C Bay Breeze
            </span>
            <span className="text-stone-500">•</span>
            <span className="text-amber-300 font-medium">Vanakkam! Welcome to Madras</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => handleTabChange("explore")}
          className="flex items-center gap-3 text-left focus:outline-none group"
          id="brand-logo-btn"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-stone-950 font-bold shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-transform">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg sm:text-xl tracking-tight text-white font-serif">
                Chennai Tourist Guide
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Official
              </span>
            </div>
            <p className="text-xs text-stone-400 hidden sm:block">
              Discover the best of Chennai • All-In-One Travel Companion
            </p>
          </div>
        </button>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Trip Planner shortcut badge */}
          <button
            onClick={() => handleTabChange("planner")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium border border-stone-700 transition-colors relative"
            id="header-my-trip-btn"
            title="View Saved Itinerary & Bookings"
          >
            <BookmarkCheck className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">My Itinerary</span>
            {totalSaved > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-amber-500 text-stone-950 text-[10px] font-bold">
                {totalSaved}
              </span>
            )}
          </button>

          {/* AI Travel Assistant Button */}
          <button
            onClick={handleOpenAi}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 text-xs font-bold shadow-md shadow-amber-900/20 transition-all hover:scale-105 active:scale-95"
            id="header-ai-assistant-btn"
          >
            <Sparkles className="w-4 h-4 text-stone-950" />
            <span>Ask Vanakkam AI</span>
          </button>
        </div>
      </div>

      {/* Horizontal Nav Tabs */}
      <nav className="border-t border-stone-800/80 px-4 sm:px-6 bg-stone-950/60 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 sm:space-x-2 py-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id || (item.id === "explore" && activeTab === "all");
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-amber-600 text-white shadow-sm font-semibold"
                    : "text-stone-300 hover:text-white hover:bg-stone-800/70"
                }`}
                id={`nav-tab-${item.id}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
