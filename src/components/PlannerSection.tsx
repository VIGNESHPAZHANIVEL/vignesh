import React, { useState } from "react";
import {
  CalendarCheck,
  Sun,
  CloudSun,
  Droplets,
  Wind,
  Compass,
  Clock,
  MapPin,
  ShieldAlert,
  Coffee,
  CheckCircle2,
  Trash2,
  Download,
  PhoneCall,
  Sparkles,
  HeartHandshake,
  Train,
  Car,
  Utensils,
  ShoppingBag,
  Hotel as HotelIcon,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { SavedTripItem, TableReservation, HotelBooking, ActiveTab, ParkingLot } from "../types";
import { CHENNAI_WEATHER, CURATED_ITINERARIES, LOCAL_CUSTOMS_AND_TIPS, PLACES_DATA } from "../data/chennaiData";
import { getNearbyForPlace } from "../data/nearbyHelper";

interface PlannerSectionProps {
  savedItems: SavedTripItem[];
  onRemoveSavedItem: (id: string) => void;
  reservations: TableReservation[];
  hotelBookings: HotelBooking[];
  onOpenAiPlanner: (customPrompt?: string) => void;
  onLocateOnMap?: (id: string) => void;
  onSelectTab?: (tab: ActiveTab) => void;
  liveParkingLots?: ParkingLot[];
}

export const PlannerSection: React.FC<PlannerSectionProps> = ({
  savedItems,
  onRemoveSavedItem,
  reservations,
  hotelBookings,
  onOpenAiPlanner,
  onLocateOnMap,
  onSelectTab,
  liveParkingLots = [],
}) => {
  const [selectedItinerary, setSelectedItinerary] = useState(CURATED_ITINERARIES[0]);
  const [activeTab, setActiveTab] = useState<"itineraries" | "myTrip" | "customs">("itineraries");
  const [customNote, setCustomNote] = useState("");
  const [expandedPlaceId, setExpandedPlaceId] = useState<string | null>(null);
  const [userNotes, setUserNotes] = useState<string[]>([
    "Remember to try Filter Coffee at Rayar's Mess before 9:00 AM.",
    "Carry modest cotton attire for Kapaleeshwarar Temple visit.",
  ]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customNote.trim()) return;
    setUserNotes([...userNotes, customNote.trim()]);
    setCustomNote("");
  };

  const handleRemoveNote = (index: number) => {
    setUserNotes(userNotes.filter((_, i) => i !== index));
  };

  const handleExportTrip = () => {
    let content = `CHENNAI TRIP PLANNER ITINERARY\nGenerated via Chennai Tourist Guide\n\n`;
    content += `WEATHER IN CHENNAI:\nTemp: ${CHENNAI_WEATHER.temperature} (Feels like ${CHENNAI_WEATHER.feelsLike})\nCondition: ${CHENNAI_WEATHER.condition}\n\n`;

    content += `SAVED ATTRACTIONS & PLACES:\n`;
    savedItems.forEach((item, i) => {
      content += `${i + 1}. ${item.title} (${item.category} - ${item.area})\n`;
    });

    if (reservations.length > 0) {
      content += `\nTABLE RESERVATIONS:\n`;
      reservations.forEach((r) => {
        content += `- ${r.restaurantName}: ${r.date} at ${r.time} for ${r.guests} guests (Ref: ${r.bookingRef})\n`;
      });
    }

    if (hotelBookings.length > 0) {
      content += `\nHOTEL RESERVATIONS:\n`;
      hotelBookings.forEach((b) => {
        content += `- ${b.hotelName}: ${b.checkIn} to ${b.checkOut} (${b.roomType}) (Ref: ${b.bookingRef})\n`;
      });
    }

    content += `\nPERSONAL TRAVEL NOTES:\n`;
    userNotes.forEach((n, i) => {
      content += `${i + 1}. ${n}\n`;
    });

    content += `\nEMERGENCY HELPLINES:\nPolice: 100 / 112\nTourist Police: 044-25384520\nWomen Helpline: 1091\nAmbulance: 108\n`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chennai-travel-itinerary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="planner-section" className="py-12 bg-stone-950 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold mb-2">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Itineraries & Travel Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Plan Your Trip
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-1">
              Customized itineraries and travel tips. Weather updates, local customs, and safety guidelines.
            </p>
          </div>

          <button
            onClick={onOpenAiPlanner}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-all shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Custom AI Itinerary</span>
          </button>
        </div>

        {/* Live Weather Card */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/30 border border-stone-800 rounded-2xl p-5 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Sun className="w-8 h-8 animate-spin-slow" />
              </div>
              <div>
                <div className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Live Bay of Bengal Coastal Weather • Chennai
                </div>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-bold font-serif text-white">
                    {CHENNAI_WEATHER.temperature}
                  </span>
                  <span className="text-xs text-stone-400">
                    Feels like {CHENNAI_WEATHER.feelsLike} • {CHENNAI_WEATHER.condition}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full lg:w-auto text-xs">
              <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800">
                <div className="flex items-center gap-1 text-stone-400 text-[11px] mb-0.5">
                  <Droplets className="w-3 h-3 text-sky-400" />
                  <span>Humidity</span>
                </div>
                <span className="font-bold text-stone-200">{CHENNAI_WEATHER.humidity}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800">
                <div className="flex items-center gap-1 text-stone-400 text-[11px] mb-0.5">
                  <Wind className="w-3 h-3 text-teal-400" />
                  <span>Sea Breeze</span>
                </div>
                <span className="font-bold text-stone-200">{CHENNAI_WEATHER.wind}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800">
                <div className="flex items-center gap-1 text-stone-400 text-[11px] mb-0.5">
                  <Compass className="w-3 h-3 text-amber-400" />
                  <span>Best Months</span>
                </div>
                <span className="font-bold text-amber-300 truncate">Nov – Feb</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-800 pb-3 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("itineraries")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "itineraries"
                ? "bg-amber-600 text-stone-950 font-bold shadow"
                : "bg-stone-900 text-stone-300 hover:text-white"
            }`}
          >
            Curated Day Plans
          </button>
          <button
            onClick={() => setActiveTab("myTrip")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "myTrip"
                ? "bg-amber-600 text-stone-950 font-bold shadow"
                : "bg-stone-900 text-stone-300 hover:text-white"
            }`}
          >
            <span>My Chennai Trip Hub</span>
            {(savedItems.length > 0 || reservations.length > 0 || hotelBookings.length > 0) && (
              <span className="w-4 h-4 rounded-full bg-amber-400 text-stone-950 text-[10px] font-bold flex items-center justify-center">
                {savedItems.length + reservations.length + hotelBookings.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("customs")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "customs"
                ? "bg-amber-600 text-stone-950 font-bold shadow"
                : "bg-stone-900 text-stone-300 hover:text-white"
            }`}
          >
            Customs, Etiquette & Safety
          </button>
        </div>

        {/* TAB 1: Curated Itineraries */}
        {activeTab === "itineraries" && (
          <div className="space-y-6">
            {/* Itinerary Selector Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {CURATED_ITINERARIES.map((itinerary) => (
                <button
                  key={itinerary.id}
                  onClick={() => setSelectedItinerary(itinerary)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedItinerary.id === itinerary.id
                      ? "bg-stone-900 border-amber-500 shadow-md shadow-amber-950/30"
                      : "bg-stone-900/60 border-stone-800 hover:border-stone-700"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                      {itinerary.days.length} {itinerary.days.length === 1 ? "Day Tour" : "Days Tour"}
                    </span>
                    <span className="text-xs text-stone-400">Curated Plan</span>
                  </div>
                  <h3 className="font-bold text-sm text-stone-100">{itinerary.title}</h3>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2">{itinerary.subtitle}</p>
                </button>
              ))}
            </div>

            {/* Selected Itinerary Timeline */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
              <div className="border-b border-stone-800 pb-4 mb-6">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                  Full Schedule & Timeline
                </span>
                <h3 className="text-xl font-bold font-serif text-white">
                  {selectedItinerary.title}
                </h3>
                <p className="text-xs text-stone-300 mt-1">{selectedItinerary.subtitle}</p>
              </div>

              {/* Day blocks */}
              <div className="space-y-6">
                {selectedItinerary.days.map((day) => (
                  <div key={day.day} className="border-l-2 border-amber-500/60 pl-4 ml-2 space-y-4">
                    <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 -ml-[21px]"></span>
                      Day {day.day}: {day.title} • {day.theme}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {day.activities.map((act, idx) => (
                        <div
                          key={idx}
                          className="bg-stone-950 p-3.5 rounded-xl border border-stone-800 flex items-start gap-3"
                        >
                          <div className="px-2 py-1 rounded bg-stone-900 border border-stone-700 text-stone-300 text-[10px] font-mono shrink-0">
                            {act.time}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-stone-100">{act.title}</div>
                            <div className="text-[11px] text-amber-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 shrink-0" />
                              <span>{act.location}</span>
                            </div>
                            <p className="text-[11px] text-stone-400 mt-1">{act.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: My Trip Hub */}
        {activeTab === "myTrip" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Saved Attractions */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-sky-400" />
                    <span>Saved Attractions ({savedItems.length})</span>
                  </h3>
                </div>

                {savedItems.length === 0 ? (
                  <div className="text-center py-6 px-4 bg-stone-950/60 rounded-xl border border-stone-800 space-y-2">
                    <p className="text-xs text-stone-400">
                      You haven&apos;t saved any places yet. Browse &quot;Places to Visit&quot; and click &quot;Add&quot; to plan your trip around specific landmarks!
                    </p>
                    {onSelectTab && (
                      <button
                        onClick={() => onSelectTab("places")}
                        className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition inline-flex items-center gap-1.5"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Browse Places to Visit</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Quick helper banner */}
                    <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/30 text-xs text-teal-300 flex items-center justify-between">
                      <span>
                        📍 Click on any saved place below to reveal nearby Metro routes, live parking slots, restaurants, and hotels.
                      </span>
                      <button
                        onClick={() => {
                          const placesNames = savedItems.map((i) => i.title).join(", ");
                          onOpenAiPlanner(
                            `Generate a step-by-step custom day-by-day Chennai trip itinerary based strictly on my saved places to visit: ${placesNames}. Recommend optimal visiting hours, metro connectivity, and nearby eateries.`
                          );
                        }}
                        className="ml-2 px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-[11px] whitespace-nowrap flex items-center gap-1 transition shadow"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>Plan Route with AI</span>
                      </button>
                    </div>

                    {savedItems.map((item) => {
                      const isExpanded = expandedPlaceId === item.id;
                      const nearbyContext = getNearbyForPlace(item.id, liveParkingLots);

                      return (
                        <div
                          key={item.id}
                          className="rounded-xl bg-stone-950 border border-stone-800 overflow-hidden transition-all"
                        >
                          <div className="flex items-center justify-between p-3">
                            <button
                              onClick={() =>
                                setExpandedPlaceId(isExpanded ? null : item.id)
                              }
                              className="flex-1 text-left flex items-center gap-2 group"
                            >
                              <ChevronRight
                                className={`w-4 h-4 text-amber-400 transition-transform ${
                                  isExpanded ? "rotate-90" : ""
                                }`}
                              />
                              <div>
                                <div className="font-semibold text-xs text-stone-100 group-hover:text-amber-400 transition">
                                  {item.title}
                                </div>
                                <div className="text-[10px] text-stone-400">
                                  {item.category} • {item.area}
                                </div>
                              </div>
                            </button>

                            <div className="flex items-center gap-1.5">
                              {onLocateOnMap && (
                                <button
                                  onClick={() => onLocateOnMap(`place-${item.id}`)}
                                  className="px-2 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-400 hover:text-amber-300 text-[11px] font-semibold border border-stone-800 transition flex items-center gap-1"
                                  title="Pin on Google Map"
                                >
                                  <MapPin className="w-3 h-3" />
                                  <span>Map</span>
                                </button>
                              )}

                              <button
                                onClick={() =>
                                  setExpandedPlaceId(isExpanded ? null : item.id)
                                }
                                className="px-2 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 text-[11px] font-semibold border border-stone-800 transition"
                              >
                                {isExpanded ? "Close" : "Nearby"}
                              </button>

                              <button
                                onClick={() => onRemoveSavedItem(item.id)}
                                className="p-1.5 rounded-lg text-stone-500 hover:text-rose-400 hover:bg-stone-800 transition-colors"
                                title="Remove from list"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Contextual Drawer for this Place */}
                          {isExpanded && nearbyContext && (
                            <div className="px-3 pb-3 pt-2 border-t border-stone-800/80 bg-stone-900/40 text-xs space-y-3">
                              {/* Suggested Visiting Slot */}
                              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200 text-[11px]">
                                <strong className="text-amber-400">Optimal Slot: </strong>
                                {nearbyContext.suggestedItineraryTimeSlot.idealTimeOfDay} ({nearbyContext.suggestedItineraryTimeSlot.duration})
                                <div className="text-stone-300 mt-1">
                                  {nearbyContext.suggestedItineraryTimeSlot.recommendedSequence}
                                </div>
                              </div>

                              {/* Grid of Nearby Essentials */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                                {/* 1. Transport */}
                                <div className="p-2 rounded-lg bg-stone-950 border border-stone-800">
                                  <div className="flex items-center gap-1 text-sky-400 font-bold mb-1">
                                    <Train className="w-3 h-3" />
                                    <span>Transit</span>
                                  </div>
                                  <div className="text-stone-300 font-medium truncate">
                                    {nearbyContext.nearestTransitHub?.name || "Metro nearby"}
                                  </div>
                                  <span className="text-[10px] text-stone-400">
                                    ~{nearbyContext.nearestTransitHub?.distanceKm} km away
                                  </span>
                                  {onSelectTab && (
                                    <button
                                      onClick={() => onSelectTab("transport")}
                                      className="mt-1 text-[10px] text-sky-400 hover:underline block"
                                    >
                                      View routes →
                                    </button>
                                  )}
                                </div>

                                {/* 2. Parking */}
                                <div className="p-2 rounded-lg bg-stone-950 border border-stone-800">
                                  <div className="flex items-center gap-1 text-emerald-400 font-bold mb-1">
                                    <Car className="w-3 h-3" />
                                    <span>Parking</span>
                                  </div>
                                  <div className="text-stone-300 font-medium truncate">
                                    {nearbyContext.nearbyParkingLots[0]?.lot.name || "Designated Lot"}
                                  </div>
                                  <span className="text-[10px] text-emerald-400 font-bold">
                                    {nearbyContext.nearbyParkingLots[0]?.lot.available4W || "Plenty"} 4W slots
                                  </span>
                                  {onSelectTab && (
                                    <button
                                      onClick={() => onSelectTab("parking")}
                                      className="mt-1 text-[10px] text-emerald-400 hover:underline block"
                                    >
                                      Check rates →
                                    </button>
                                  )}
                                </div>

                                {/* 3. Food */}
                                <div className="p-2 rounded-lg bg-stone-950 border border-stone-800">
                                  <div className="flex items-center gap-1 text-amber-400 font-bold mb-1">
                                    <Utensils className="w-3 h-3" />
                                    <span>Eatery</span>
                                  </div>
                                  <div className="text-stone-300 font-medium truncate">
                                    {nearbyContext.nearbyRestaurants[0]?.restaurant.name || "South Indian"}
                                  </div>
                                  <span className="text-[10px] text-stone-400 truncate block">
                                    {nearbyContext.nearbyRestaurants[0]?.restaurant.cuisine}
                                  </span>
                                  {onSelectTab && (
                                    <button
                                      onClick={() => onSelectTab("restaurants")}
                                      className="mt-1 text-[10px] text-amber-400 hover:underline block"
                                    >
                                      Reserve table →
                                    </button>
                                  )}
                                </div>

                                {/* 4. Hotel Stay */}
                                <div className="p-2 rounded-lg bg-stone-950 border border-stone-800">
                                  <div className="flex items-center gap-1 text-rose-400 font-bold mb-1">
                                    <HotelIcon className="w-3 h-3" />
                                    <span>Nearby Stay</span>
                                  </div>
                                  <div className="text-stone-300 font-medium truncate">
                                    {nearbyContext.nearbyHotels[0]?.hotel.name || "City Hotel"}
                                  </div>
                                  <span className="text-[10px] text-rose-400 font-bold">
                                    ₹{nearbyContext.nearbyHotels[0]?.hotel.pricePerNight}/night
                                  </span>
                                  {onSelectTab && (
                                    <button
                                      onClick={() => onSelectTab("hotels")}
                                      className="mt-1 text-[10px] text-rose-400 hover:underline block"
                                    >
                                      Book stay →
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Confirmed Bookings & Tables */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5">
                <h3 className="font-bold text-sm text-white mb-3">
                  Confirmed Bookings & Reservations ({reservations.length + hotelBookings.length})
                </h3>

                {reservations.length === 0 && hotelBookings.length === 0 ? (
                  <p className="text-xs text-stone-400 py-4 text-center bg-stone-950/60 rounded-xl border border-stone-800">
                    No active reservations. Reserve a table or book a hotel directly from the tabs above.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {reservations.map((r) => (
                      <div
                        key={r.id}
                        className="p-3 rounded-xl bg-stone-950 border border-amber-900/40 flex justify-between items-center"
                      >
                        <div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-bold uppercase">
                            Table Reservation
                          </span>
                          <div className="font-bold text-xs text-stone-100 mt-1">
                            {r.restaurantName}
                          </div>
                          <div className="text-[10px] text-stone-400">
                            {r.date} at {r.time} • {r.guests} Guests
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-amber-400 block">
                            {r.bookingRef}
                          </span>
                          <span className="text-[10px] text-emerald-400">Confirmed</span>
                        </div>
                      </div>
                    ))}

                    {hotelBookings.map((b) => (
                      <div
                        key={b.id}
                        className="p-3 rounded-xl bg-stone-950 border border-rose-900/40 flex justify-between items-center"
                      >
                        <div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold uppercase">
                            Hotel Stay
                          </span>
                          <div className="font-bold text-xs text-stone-100 mt-1">{b.hotelName}</div>
                          <div className="text-[10px] text-stone-400">
                            {b.checkIn} to {b.checkOut} • {b.roomType}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-amber-400 block">
                            {b.bookingRef}
                          </span>
                          <span className="text-[10px] text-emerald-400">
                            ₹{b.totalPrice.toLocaleString()} Pay on Arrival
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Custom Notes & Export */}
            <div className="space-y-6">
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5">
                <h3 className="font-bold text-sm text-white mb-3">Trip Notes & Reminders</h3>

                <form onSubmit={handleAddNote} className="mb-3 flex gap-2">
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Add reminder (e.g. buy silk dhoti)..."
                    className="flex-1 bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs"
                  >
                    Add
                  </button>
                </form>

                <div className="space-y-2">
                  {userNotes.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs flex justify-between items-start gap-2"
                    >
                      <span className="text-stone-300">{note}</span>
                      <button
                        onClick={() => handleRemoveNote(idx)}
                        className="text-stone-500 hover:text-rose-400"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Export Button */}
                <button
                  onClick={handleExportTrip}
                  className="w-full mt-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Complete Itinerary (.txt)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Customs & Etiquette & Safety */}
        {activeTab === "customs" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Local Customs */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 font-bold text-base text-amber-400 mb-4">
                <HeartHandshake className="w-5 h-5" />
                <span>Madras Customs & Cultural Etiquette</span>
              </div>

              <div className="space-y-3.5 text-xs text-stone-300">
                {LOCAL_CUSTOMS_AND_TIPS.map((tip, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                    <div className="font-bold text-stone-100 mb-1 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                      {tip.title}
                    </div>
                    <p className="text-stone-400 leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Guidelines & Emergency Numbers */}
            <div className="space-y-6">
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 font-bold text-base text-rose-400 mb-4">
                  <ShieldAlert className="w-5 h-5" />
                  <span>Important Safety Advice</span>
                </div>

                <ul className="space-y-3 text-xs text-stone-300">
                  <li className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/40">
                    <strong className="text-rose-300 block mb-1">
                      ⚠️ Strictly Avoid Sea Swimming at Marina & Besant Nagar:
                    </strong>
                    <span className="text-stone-400">
                      The Bay of Bengal coastal waters have hazardous undertows, sudden drop-offs, and strong rip currents. Wading on the shore sand is wonderful, but swimming is prohibited for visitor safety.
                    </span>
                  </li>

                  <li className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                    <strong className="text-stone-200 block mb-1">
                      ☀️ Sun & Hydration Protection:
                    </strong>
                    <span className="text-stone-400">
                      Chennai enjoys warm tropical warmth year-round. Drink tender coconut water (available fresh everywhere for ₹40–₹50) and stay well-hydrated.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
                <div className="flex items-center gap-2 font-bold text-sm text-stone-100 mb-3">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>24/7 Chennai Tourist & Emergency Helpline Directory</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                    <span className="text-stone-400 text-[10px] block">POLICE / ALL EMERGENCIES</span>
                    <span className="font-bold text-amber-400 text-sm">112 / 100</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                    <span className="text-stone-400 text-[10px] block">TOURIST POLICE CHENNAI</span>
                    <span className="font-bold text-amber-400 text-sm">044-25384520</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                    <span className="text-stone-400 text-[10px] block">WOMEN HELPLINE</span>
                    <span className="font-bold text-amber-400 text-sm">1091</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                    <span className="text-stone-400 text-[10px] block">MEDICAL AMBULANCE</span>
                    <span className="font-bold text-amber-400 text-sm">108</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
