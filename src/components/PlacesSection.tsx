import React, { useState } from "react";
import {
  Landmark,
  MapPin,
  Clock,
  IndianRupee,
  Star,
  Volume2,
  VolumeX,
  Plus,
  Check,
  Info,
  Train,
  X,
  Sparkles,
} from "lucide-react";
import { Place } from "../types";
import { PLACES_DATA } from "../data/chennaiData";

interface PlacesSectionProps {
  searchQuery: string;
  savedItemIds: string[];
  onToggleSaveItem: (item: {
    id: string;
    type: "place";
    title: string;
    category: string;
    area: string;
  }) => void;
}

export const PlacesSection: React.FC<PlacesSectionProps> = ({
  searchQuery,
  savedItemIds,
  onToggleSaveItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activePlaceModal, setActivePlaceModal] = useState<Place | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const categories = ["All", "Beaches", "Temples", "Historic", "Culture", "Parks", "Hidden Gem"];

  const filteredPlaces = PLACES_DATA.filter((place) => {
    const matchesCategory = selectedCategory === "All" || place.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      place.name.toLowerCase().includes(q) ||
      place.tamilName.toLowerCase().includes(q) ||
      place.area.toLowerCase().includes(q) ||
      place.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleToggleAudio = (placeId: string) => {
    if (playingAudioId === placeId) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(placeId);
      // Auto-stop after 8 seconds of simulated audio
      setTimeout(() => {
        setPlayingAudioId((curr) => (curr === placeId ? null : curr));
      }, 8000);
    }
  };

  return (
    <section id="places-section" className="py-12 bg-stone-950 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold mb-2">
              <Landmark className="w-3.5 h-3.5" />
              <span>Attractions & Sightseeing</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Top Places to Visit
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-1">
              Must-see attractions and hidden gems. Guided tours, historic sites, parks, and cultural spots.
            </p>
          </div>

          <div className="text-xs text-stone-400 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl">
            Showing <strong className="text-amber-400">{filteredPlaces.length}</strong> attractions in Chennai
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-amber-600 text-stone-950 font-bold shadow-md shadow-amber-950/20"
                  : "bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800"
              }`}
              id={`places-cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces.map((place) => {
            const isSaved = savedItemIds.includes(place.id);
            const isPlayingAudio = playingAudioId === place.id;

            return (
              <div
                key={place.id}
                className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-stone-700 hover:shadow-xl transition-all group"
                id={`place-card-${place.id}`}
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-800">
                    <img
                      src={place.image}
                      alt={place.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />

                    {/* Category tag */}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30">
                      {place.category}
                    </span>

                    {/* Audio snippet CTA */}
                    {place.audioGuideAvailable && (
                      <button
                        onClick={() => handleToggleAudio(place.id)}
                        className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-md border transition-all flex items-center gap-1.5 ${
                          isPlayingAudio
                            ? "bg-amber-500 text-stone-950 border-amber-400 animate-pulse"
                            : "bg-black/60 text-stone-200 border-stone-600 hover:bg-black/80"
                        }`}
                        title="Play audio tour snippet"
                      >
                        {isPlayingAudio ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Playing</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                            <span>Audio Tour</span>
                          </>
                        )}
                      </button>
                    )}

                    {/* Name & Tamil script overlay */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-[11px] text-amber-300 font-medium">
                        {place.tamilName}
                      </div>
                      <h3 className="text-lg font-bold text-white leading-snug drop-shadow-md">
                        {place.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5">
                    {/* Meta bar */}
                    <div className="flex items-center justify-between text-xs text-stone-400 mb-3 pb-2.5 border-b border-stone-800">
                      <span className="flex items-center gap-1 text-stone-300">
                        <MapPin className="w-3.5 h-3.5 text-amber-500" />
                        <span className="truncate max-w-[150px]">{place.area}</span>
                      </span>
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{place.rating}</span>
                        <span className="text-[10px] text-stone-500 font-normal">
                          ({place.reviewsCount.toLocaleString()})
                        </span>
                      </span>
                    </div>

                    <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed mb-3">
                      {place.description}
                    </p>

                    {/* Timings & Fee */}
                    <div className="space-y-1 text-[11px] text-stone-400 mb-4 bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/80">
                      <div className="flex items-center gap-1.5 truncate">
                        <Clock className="w-3 h-3 text-stone-400 shrink-0" />
                        <span className="truncate">{place.timings}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <IndianRupee className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="text-emerald-300 font-medium">{place.entryFee}</span>
                      </div>
                    </div>

                    {/* Key Highlights bullet pills */}
                    <div className="flex flex-wrap gap-1.5">
                      {place.highlights.slice(0, 2).map((hl, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 text-[10px] border border-stone-700/60 line-clamp-1"
                        >
                          ✓ {hl}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => setActivePlaceModal(place)}
                    className="flex-1 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold border border-stone-700 transition-colors"
                  >
                    View Guide
                  </button>

                  <button
                    onClick={() =>
                      onToggleSaveItem({
                        id: place.id,
                        type: "place",
                        title: place.name,
                        category: place.category,
                        area: place.area,
                      })
                    }
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 ${
                      isSaved
                        ? "bg-amber-600 border-amber-500 text-stone-950"
                        : "bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-300"
                    }`}
                    title={isSaved ? "Remove from Itinerary" : "Add to Itinerary"}
                  >
                    {isSaved ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    <span className="hidden sm:inline">{isSaved ? "Saved" : "Add"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Modal */}
        {activePlaceModal && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto text-stone-100 shadow-2xl relative">
              <button
                onClick={() => setActivePlaceModal(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 text-stone-300 hover:text-white border border-stone-700 z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative h-56 w-full">
                <img
                  src={activePlaceModal.image}
                  alt={activePlaceModal.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/40" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-amber-400 text-xs font-bold block">
                    {activePlaceModal.tamilName}
                  </span>
                  <h3 className="text-xl font-bold font-serif text-white">
                    {activePlaceModal.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {activePlaceModal.description}
                </p>

                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Timings:</span>
                    <span className="text-stone-200 font-semibold">{activePlaceModal.timings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Entry Fee:</span>
                    <span className="text-emerald-400 font-semibold">{activePlaceModal.entryFee}</span>
                  </div>
                  {activePlaceModal.nearestMetro && (
                    <div className="flex justify-between">
                      <span className="text-stone-400">Nearest Metro/Train:</span>
                      <span className="text-sky-400 font-semibold">{activePlaceModal.nearestMetro}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                    Must-See Highlights
                  </h4>
                  <ul className="space-y-1 text-xs text-stone-300">
                    {activePlaceModal.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                  <strong>Insider Travel Tip:</strong> {activePlaceModal.tips}
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => {
                      onToggleSaveItem({
                        id: activePlaceModal.id,
                        type: "place",
                        title: activePlaceModal.name,
                        category: activePlaceModal.category,
                        area: activePlaceModal.area,
                      });
                      setActivePlaceModal(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-colors"
                  >
                    {savedItemIds.includes(activePlaceModal.id)
                      ? "Remove from Itinerary"
                      : "Add to My Chennai Itinerary"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
