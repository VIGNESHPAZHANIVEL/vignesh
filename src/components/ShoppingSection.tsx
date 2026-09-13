import React, { useState } from "react";
import {
  ShoppingBag,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  Stethoscope,
  Shirt,
  Sparkles,
  Building2,
  Store,
  Tag,
  Navigation,
} from "lucide-react";
import { ShoppingSpot } from "../types";
import { SHOPPING_DATA } from "../data/chennaiData";

interface ShoppingSectionProps {
  searchQuery: string;
}

export const ShoppingSection: React.FC<ShoppingSectionProps> = ({ searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [directionsNotice, setDirectionsNotice] = useState<string | null>(null);

  const categories = [
    { id: "All", label: "All Destinations", icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { id: "Medical Supplies", label: "Medical Supplies", icon: <Stethoscope className="w-3.5 h-3.5" /> },
    { id: "Men's Wear", label: "Men's Wear", icon: <Shirt className="w-3.5 h-3.5" /> },
    { id: "Women's Wear", label: "Women's Wear & Silks", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "Shopping Malls", label: "Shopping Malls", icon: <Building2 className="w-3.5 h-3.5" /> },
    { id: "Street Markets", label: "Street Markets & Bazaars", icon: <Store className="w-3.5 h-3.5" /> },
  ];

  const filteredSpots = SHOPPING_DATA.filter((spot) => {
    const matchesCat = activeCategory === "All" || spot.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      spot.name.toLowerCase().includes(q) ||
      spot.description.toLowerCase().includes(q) ||
      spot.area.toLowerCase().includes(q) ||
      spot.specialties.some((s) => s.toLowerCase().includes(q));

    return matchesCat && matchesSearch;
  });

  const handleGetDirections = (spot: ShoppingSpot) => {
    setDirectionsNotice(`Navigating to ${spot.name} in ${spot.area}. Nearest transit and route details saved.`);
    setTimeout(() => setDirectionsNotice(null), 4000);
  };

  return (
    <section id="shopping-section" className="py-12 bg-stone-950 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Retail, Handlooms & Essentials</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Shopping Destinations
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-1">
              Medical supplies, men&apos;s wear, women&apos;s wear—find stores nearby. Shopping malls, boutiques, and markets.
            </p>
          </div>

          <div className="text-xs text-stone-400 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl">
            Showing <strong className="text-amber-400">{filteredSpots.length}</strong> shopping landmarks
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? "bg-amber-600 text-stone-950 shadow-md shadow-amber-950/20"
                  : "bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800"
              }`}
              id={`shop-cat-${cat.id.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Floating directions toast */}
        {directionsNotice && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span>{directionsNotice}</span>
            </div>
            <button onClick={() => setDirectionsNotice(null)} className="text-emerald-400 font-bold ml-4">
              ✕
            </button>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map((spot) => (
            <div
              key={spot.id}
              className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-stone-700 hover:shadow-xl transition-all group"
              id={`shop-card-${spot.id}`}
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden bg-stone-800">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />

                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/30">
                    {spot.category}
                  </span>

                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-stone-800/90 text-stone-200 border border-stone-700">
                    {spot.priceLevel}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-sm sm:text-base text-stone-100 group-hover:text-amber-400 transition-colors leading-snug">
                      {spot.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{spot.rating}</span>
                    </div>
                  </div>

                  <div className="text-xs text-stone-400 flex items-center gap-1 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">{spot.area}</span>
                  </div>

                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed mb-3">
                    {spot.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mb-3">
                    <Clock className="w-3 h-3 text-stone-500 shrink-0" />
                    <span>{spot.timings}</span>
                  </div>

                  {/* Specialties tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {spot.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-stone-950 text-stone-300 text-[10px] border border-stone-800"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {spot.bargainFriendly && (
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-800/60 text-emerald-400 text-[10px] font-medium">
                      <Tag className="w-3 h-3" />
                      <span>Bargaining Welcomed</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => handleGetDirections(spot)}
                  className="w-full py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors flex items-center justify-center gap-1.5"
                  id={`shop-directions-btn-${spot.id}`}
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Locate Store</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
