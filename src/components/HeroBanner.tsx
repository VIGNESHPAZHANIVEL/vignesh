import React from "react";
import {
  Search,
  Train,
  Car,
  Landmark,
  Utensils,
  ShoppingBag,
  Hotel,
  CalendarCheck,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ActiveTab } from "../types";

interface HeroBannerProps {
  onSelectCategory: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenAiAssistant: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSelectCategory,
  searchQuery,
  setSearchQuery,
  onOpenAiAssistant,
}) => {
  const quickCategories = [
    {
      tab: "transport" as ActiveTab,
      label: "Local Transport",
      desc: "Metro, MTC buses, autos & rentals",
      icon: <Train className="w-5 h-5 text-amber-500" />,
      color: "hover:border-amber-500/50 hover:bg-amber-950/20",
    },
    {
      tab: "parking" as ActiveTab,
      label: "Parking Availability",
      desc: "Live multi-level & beach lots",
      icon: <Car className="w-5 h-5 text-emerald-500" />,
      color: "hover:border-emerald-500/50 hover:bg-emerald-950/20",
    },
    {
      tab: "places" as ActiveTab,
      label: "Top Places to Visit",
      desc: "Marina Beach, Kapaleeshwarar & more",
      icon: <Landmark className="w-5 h-5 text-sky-500" />,
      color: "hover:border-sky-500/50 hover:bg-sky-950/20",
    },
    {
      tab: "restaurants" as ActiveTab,
      label: "Restaurant Options",
      desc: "Reserve tables & taste staples",
      icon: <Utensils className="w-5 h-5 text-orange-500" />,
      color: "hover:border-orange-500/50 hover:bg-orange-950/20",
    },
    {
      tab: "shopping" as ActiveTab,
      label: "Shopping Hubs",
      desc: "Silks, medical supplies & malls",
      icon: <ShoppingBag className="w-5 h-5 text-purple-500" />,
      color: "hover:border-purple-500/50 hover:bg-purple-950/20",
    },
    {
      tab: "hotels" as ActiveTab,
      label: "Accommodation & Hotels",
      desc: "Book directly at best stays",
      icon: <Hotel className="w-5 h-5 text-rose-500" />,
      color: "hover:border-rose-500/50 hover:bg-rose-950/20",
    },
    {
      tab: "planner" as ActiveTab,
      label: "Plan Your Trip",
      desc: "Custom itineraries & weather",
      icon: <CalendarCheck className="w-5 h-5 text-teal-500" />,
      color: "hover:border-teal-500/50 hover:bg-teal-950/20",
    },
  ];

  return (
    <div className="relative bg-stone-900 border-b border-stone-800 overflow-hidden text-stone-100">
      {/* Subtle decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-12 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>வணக்கம் சென்னை • The Gateway to South India</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-serif leading-tight">
            Welcome to <span className="text-amber-400">Chennai</span> Tourist Guide!
          </h1>

          <p className="mt-3 text-base sm:text-lg text-stone-300 leading-relaxed">
            Discover the best of Chennai with our all-in-one travel companion.
            Whether you&apos;re here for sightseeing, shopping, dining, or staying overnight,
            we&apos;ve got you covered!
          </p>

          {/* Search bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search places, restaurants, metro routes, silk shops, hotels..."
                className="w-full pl-11 pr-4 py-3 bg-stone-800/90 border border-stone-700 rounded-xl text-stone-100 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all shadow-inner"
                id="hero-global-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200 px-1.5 py-0.5 rounded bg-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              onClick={onOpenAiAssistant}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm shadow-lg shadow-amber-950/40 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
              id="hero-ask-ai-cta"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>Ask Local AI</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </button>
          </div>
        </div>

        {/* Quick Launch Cards Grid */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-2.5 sm:gap-3">
          {quickCategories.map((cat) => (
            <button
              key={cat.tab}
              onClick={() => onSelectCategory(cat.tab)}
              className={`p-3 rounded-xl bg-stone-800/60 border border-stone-700/60 text-left transition-all ${cat.color} group hover:shadow-md flex flex-col justify-between`}
              id={`quick-cat-btn-${cat.tab}`}
            >
              <div>
                <div className="p-2 rounded-lg bg-stone-900/80 w-fit mb-2 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div className="font-semibold text-xs text-stone-100 group-hover:text-white leading-tight">
                  {cat.label}
                </div>
              </div>
              <div className="text-[11px] text-stone-400 mt-1 line-clamp-1">
                {cat.desc}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
