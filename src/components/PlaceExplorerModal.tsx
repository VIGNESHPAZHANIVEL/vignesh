/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  X,
  MapPin,
  Clock,
  IndianRupee,
  Train,
  Car,
  Utensils,
  ShoppingBag,
  Hotel as HotelIcon,
  CalendarCheck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Compass,
  Check,
  Plus,
  Navigation,
  ShieldAlert,
} from "lucide-react";
import { Place, ParkingLot, ActiveTab, TableReservation, HotelBooking } from "../types";
import { getNearbyForPlace } from "../data/nearbyHelper";
import { getDirectionsUrl } from "../data/mapLocations";

interface PlaceExplorerModalProps {
  place: Place;
  onClose: () => void;
  savedItemIds: string[];
  onToggleSaveItem: (item: {
    id: string;
    type: "place";
    title: string;
    category: string;
    area: string;
  }) => void;
  onLocateOnMap?: (id: string) => void;
  onSelectTab?: (tab: ActiveTab) => void;
  onTableReserved?: (reservation: TableReservation) => void;
  onHotelBooked?: (booking: HotelBooking) => void;
  liveParkingLots?: ParkingLot[];
  onOpenAiPlannerForPlace?: (placeName: string) => void;
}

export const PlaceExplorerModal: React.FC<PlaceExplorerModalProps> = ({
  place,
  onClose,
  savedItemIds,
  onToggleSaveItem,
  onLocateOnMap,
  onSelectTab,
  onTableReserved,
  onHotelBooked,
  liveParkingLots = [],
  onOpenAiPlannerForPlace,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<
    "overview" | "plan" | "transport" | "parking" | "dining" | "shopping" | "hotels"
  >("overview");

  const nearby = getNearbyForPlace(place.id, liveParkingLots);
  const isSaved = savedItemIds.includes(place.id);

  const coords = nearby?.placeCoords;
  const directionsHref = coords
    ? getDirectionsUrl(coords.lat, coords.lng, place.name)
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " Chennai")}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      id={`place-explorer-modal-${place.id}`}
    >
      <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col text-stone-100 shadow-2xl relative overflow-hidden my-auto">
        {/* Modal Header Bar with Image banner */}
        <div className="relative h-48 sm:h-60 w-full shrink-0 overflow-hidden bg-stone-950">
          <img
            src={place.image}
            alt={place.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-black/60" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 hover:bg-black text-stone-300 hover:text-white border border-stone-700 transition z-20"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-500/90 text-stone-950 shadow-md">
              {place.category}
            </span>
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-black/70 text-stone-300 border border-stone-700">
              ★ {place.rating} ({place.reviewsCount ? place.reviewsCount.toLocaleString() : "10,000+"} reviews)
            </span>
          </div>

          {/* Place Title & Quick Location */}
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-amber-400 text-xs font-bold tracking-wide block">
              {place.tamilName}
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-white drop-shadow-sm">
              {place.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-stone-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {place.area}
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">{place.entryFee}</span>
              <span>•</span>
              <span className="text-stone-300">{place.timings}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Pill Bar (Places Contextual Hub) */}
        <div className="bg-stone-950 border-b border-stone-800 px-3 py-2 shrink-0 overflow-x-auto no-scrollbar flex items-center gap-1.5">
          <button
            onClick={() => setActiveSubTab("overview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeSubTab === "overview"
                ? "bg-amber-500 text-stone-950 font-bold"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Place Guide</span>
          </button>

          <button
            onClick={() => setActiveSubTab("plan")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeSubTab === "plan"
                ? "bg-amber-500 text-stone-950 font-bold"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Plan Your Visit</span>
          </button>

          <button
            onClick={() => setActiveSubTab("transport")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeSubTab === "transport"
                ? "bg-amber-500 text-stone-950 font-bold"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
            }`}
          >
            <Train className="w-3.5 h-3.5 text-sky-400" />
            <span>Transit & Metro</span>
          </button>

          <button
            onClick={() => setActiveSubTab("parking")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeSubTab === "parking"
                ? "bg-amber-500 text-stone-950 font-bold"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
            }`}
          >
            <Car className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Parking</span>
          </button>

          <button
            onClick={() => setActiveSubTab("dining")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeSubTab === "dining"
                ? "bg-amber-500 text-stone-950 font-bold"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
            }`}
          >
            <Utensils className="w-3.5 h-3.5 text-amber-400" />
            <span>Nearby Food</span>
          </button>

          <button
            onClick={() => setActiveSubTab("shopping")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeSubTab === "shopping"
                ? "bg-amber-500 text-stone-950 font-bold"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-purple-400" />
            <span>Nearby Shopping</span>
          </button>

          <button
            onClick={() => setActiveSubTab("hotels")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeSubTab === "hotels"
                ? "bg-amber-500 text-stone-950 font-bold"
                : "text-stone-400 hover:text-stone-200 hover:bg-stone-800"
            }`}
          >
            <HotelIcon className="w-3.5 h-3.5 text-rose-400" />
            <span>Nearby Stays</span>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* TAB 1: OVERVIEW & SIGHTSEEING DETAILS */}
          {activeSubTab === "overview" && (
            <div className="space-y-4">
              <p className="text-stone-300 text-sm leading-relaxed">
                {place.description}
              </p>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-stone-950 border border-stone-800 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-stone-900/60">
                  <span className="text-stone-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Visiting Hours</span>
                  </span>
                  <span className="font-semibold text-stone-200 text-right truncate max-w-[170px]">
                    {place.timings}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-stone-900/60">
                  <span className="text-stone-400 flex items-center gap-1.5">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Entry Fee</span>
                  </span>
                  <span className="font-bold text-emerald-400">
                    {place.entryFee}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-lg bg-stone-900/60 sm:col-span-2">
                  <span className="text-stone-400 flex items-center gap-1.5">
                    <Train className="w-3.5 h-3.5 text-sky-400" />
                    <span>Nearest Transit</span>
                  </span>
                  <span className="font-semibold text-sky-300 truncate text-right max-w-[280px]">
                    {place.nearestMetro || "Available via MTC Buses & Taxis"}
                  </span>
                </div>
              </div>

              {/* Must-See Highlights */}
              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Must-See Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {place.highlights.map((hl, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-stone-950/70 border border-stone-800 text-xs text-stone-200 flex items-start gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-400 mt-1 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Insider Tip */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
                <strong className="text-amber-400 block mb-1">💡 Local Insider Tip:</strong>
                {place.tips}
              </div>
            </div>
          )}

          {/* TAB 2: PLAN YOUR TRIP BASED ON THIS PLACE */}
          {activeSubTab === "plan" && nearby && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30">
                <div className="flex items-center gap-2 text-teal-300 font-bold text-sm mb-1">
                  <CalendarCheck className="w-4 h-4 text-teal-400" />
                  <span>Custom Day Schedule for {place.name}</span>
                </div>
                <p className="text-xs text-stone-300">
                  Optimized visiting sequence connecting food, shopping, parking, and transit for a seamless day out in Chennai.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-[11px] text-stone-400 block">Recommended Timing</span>
                  <p className="text-xs font-bold text-amber-400 mt-0.5">
                    {nearby.suggestedItineraryTimeSlot.idealTimeOfDay}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-[11px] text-stone-400 block">Suggested Duration</span>
                  <p className="text-xs font-bold text-stone-100 mt-0.5">
                    {nearby.suggestedItineraryTimeSlot.duration}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-stone-950 border border-stone-800">
                <span className="text-xs font-bold text-stone-300 uppercase tracking-wider block mb-2">
                  Recommended Sequence of Activities
                </span>
                <p className="text-xs text-stone-200 leading-relaxed">
                  {nearby.suggestedItineraryTimeSlot.recommendedSequence}
                </p>
                <div className="mt-3 pt-3 border-t border-stone-800 text-[11px] text-stone-400 flex items-center gap-1.5">
                  <span className="text-amber-400">★ Planning Note:</span>
                  <span>{nearby.suggestedItineraryTimeSlot.travelTip}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => {
                    if (onOpenAiPlannerForPlace) {
                      onOpenAiPlannerForPlace(place.name);
                    } else if (onSelectTab) {
                      onSelectTab("planner");
                    }
                    onClose();
                  }}
                  className="flex-1 min-w-[200px] py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Build Full Multi-Day Itinerary around {place.name}</span>
                </button>

                {onSelectTab && (
                  <button
                    onClick={() => {
                      onSelectTab("planner");
                      onClose();
                    }}
                    className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs border border-stone-700 transition"
                  >
                    View Trip Planner Tab
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: LOCAL TRANSPORT & TRANSIT */}
          {activeSubTab === "transport" && nearby && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/30">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sky-300 font-bold text-sm">
                    <Train className="w-4 h-4 text-sky-400" />
                    <span>How to Reach {place.name}</span>
                  </div>
                  {onSelectTab && (
                    <button
                      onClick={() => {
                        onSelectTab("transport");
                        onClose();
                      }}
                      className="text-xs font-semibold text-sky-400 hover:underline flex items-center gap-1"
                    >
                      <span>Transport Section</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-stone-300 mt-1">
                  Nearest metro stations, local MTC buses, and direct rail connections.
                </p>
              </div>

              {nearby.nearestTransitHub && (
                <div className="p-4 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-200">
                      {nearby.nearestTransitHub.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      {nearby.nearestTransitHub.distanceKm} km away
                    </span>
                  </div>
                  <div className="text-xs text-stone-400">
                    <strong>Line / Mode:</strong> {nearby.nearestTransitHub.metroLine}
                  </div>
                  {place.nearestMetro && (
                    <div className="text-xs text-stone-300 pt-1">
                      <strong>Specific Landmark Station:</strong> {place.nearestMetro}
                    </div>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="font-bold text-sky-400 block mb-1">Chennai Metro (CMRL)</span>
                  <p className="text-stone-300">
                    Direct air-conditioned trains. Frequency: 5–7 mins. Fares ₹10–₹50.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="font-bold text-emerald-400 block mb-1">Auto & Cabs</span>
                  <p className="text-stone-300">
                    Uber, Ola, and Rapido autos operate widely. Insist on meter or ride-hailing app.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="font-bold text-amber-400 block mb-1">MTC City Buses</span>
                  <p className="text-stone-300">
                    Extensive network. Free travel for women on standard white-board city services.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Turn-by-Turn Transit Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 4: LIVE PARKING FOR THIS PLACE */}
          {activeSubTab === "parking" && nearby && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                    <Car className="w-4 h-4 text-emerald-400" />
                    <span>Parking Options near {place.name}</span>
                  </div>
                  {onSelectTab && (
                    <button
                      onClick={() => {
                        onSelectTab("parking");
                        onClose();
                      }}
                      className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <span>Full Parking Board</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-stone-300 mt-1">
                  Real-time occupancy for 4-wheelers and 2-wheelers near {place.area}.
                </p>
              </div>

              <div className="space-y-3">
                {nearby.nearbyParkingLots.map(({ lot, distanceKm }) => {
                  const statusColor =
                    lot.status === "Available"
                      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                      : lot.status === "Filling Fast"
                      ? "text-amber-400 bg-amber-500/10 border-amber-500/30"
                      : "text-rose-400 bg-rose-500/10 border-rose-500/30";

                  return (
                    <div
                      key={lot.id}
                      className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-stone-100">{lot.name}</h5>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border ${statusColor}`}
                          >
                            {lot.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-stone-400 mt-1">
                          <span>~{distanceKm} km from place</span>
                          <span>•</span>
                          <span className="text-amber-400 font-bold">₹{lot.ratePerHour}/hr</span>
                          <span>•</span>
                          <span>{lot.type}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-stone-300 mt-1.5">
                          <span>
                            Cars (4W): <strong className="text-emerald-400">{lot.available4W}</strong> / {lot.totalSlots4W} left
                          </span>
                          <span>
                            Bikes (2W): <strong className="text-sky-400">{lot.available2W}</strong> / {lot.totalSlots2W} left
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {onLocateOnMap && (
                          <button
                            onClick={() => {
                              onLocateOnMap(`parking-${lot.id}`);
                              onClose();
                            }}
                            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-semibold border border-stone-700 transition"
                          >
                            View Map
                          </button>
                        )}
                        {onSelectTab && (
                          <button
                            onClick={() => {
                              onSelectTab("parking");
                              onClose();
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-stone-950 text-xs font-bold transition"
                          >
                            Hold Pass
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: RESTAURANTS & FOOD NEAR THIS PLACE */}
          {activeSubTab === "dining" && nearby && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                    <Utensils className="w-4 h-4 text-amber-400" />
                    <span>Top Restaurants near {place.name}</span>
                  </div>
                  {onSelectTab && (
                    <button
                      onClick={() => {
                        onSelectTab("restaurants");
                        onClose();
                      }}
                      className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>Explore All Dining</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-stone-300 mt-1">
                  Authentic South Indian tiffin, Chettinad feasts, and biryani spots closest to this landmark.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {nearby.nearbyRestaurants.map(({ restaurant, distanceKm }) => (
                  <div
                    key={restaurant.id}
                    className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-28 w-full rounded-lg overflow-hidden bg-stone-800 mb-2 relative">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/70 text-amber-400">
                          ~{distanceKm} km
                        </span>
                        <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/70 text-stone-200">
                          ★ {restaurant.rating}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-stone-100 line-clamp-1">
                        {restaurant.name}
                      </h5>
                      <span className="text-[11px] text-amber-400 block truncate">
                        {restaurant.cuisine}
                      </span>
                      <p className="text-[11px] text-stone-400 line-clamp-2 mt-1">
                        {restaurant.famousFor}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-800 flex items-center gap-1.5">
                      {onLocateOnMap && (
                        <button
                          onClick={() => {
                            onLocateOnMap(`restaurant-${restaurant.id}`);
                            onClose();
                          }}
                          className="flex-1 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 text-[11px] font-semibold border border-stone-700 transition text-center"
                        >
                          Pin on Map
                        </button>
                      )}
                      {onSelectTab && (
                        <button
                          onClick={() => {
                            onSelectTab("restaurants");
                            onClose();
                          }}
                          className="flex-1 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-[11px] font-bold transition text-center"
                        >
                          Reserve
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SHOPPING SPOTS NEAR THIS PLACE */}
          {activeSubTab === "shopping" && nearby && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                    <ShoppingBag className="w-4 h-4 text-purple-400" />
                    <span>Shopping & Bazaars near {place.name}</span>
                  </div>
                  {onSelectTab && (
                    <button
                      onClick={() => {
                        onSelectTab("shopping");
                        onClose();
                      }}
                      className="text-xs font-semibold text-purple-400 hover:underline flex items-center gap-1"
                    >
                      <span>All Shopping Hubs</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-stone-300 mt-1">
                  Silk sarees, street markets, local handloom, and essential supplies around this area.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {nearby.nearbyShopping.map(({ spot, distanceKm }) => (
                  <div
                    key={spot.id}
                    className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-28 w-full rounded-lg overflow-hidden bg-stone-800 mb-2 relative">
                        <img
                          src={spot.image}
                          alt={spot.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/70 text-purple-300">
                          ~{distanceKm} km
                        </span>
                        <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/70 text-stone-200">
                          ★ {spot.rating}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-stone-100 line-clamp-1">
                        {spot.name}
                      </h5>
                      <span className="text-[11px] text-purple-400 block">
                        {spot.category} • {spot.priceLevel}
                      </span>
                      <p className="text-[11px] text-stone-400 line-clamp-2 mt-1">
                        {spot.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-800 flex items-center gap-1.5">
                      {onLocateOnMap && (
                        <button
                          onClick={() => {
                            onLocateOnMap(`shopping-${spot.id}`);
                            onClose();
                          }}
                          className="flex-1 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 text-[11px] font-semibold border border-stone-700 transition text-center"
                        >
                          Pin on Map
                        </button>
                      )}
                      {onSelectTab && (
                        <button
                          onClick={() => {
                            onSelectTab("shopping");
                            onClose();
                          }}
                          className="flex-1 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-[11px] font-semibold border border-stone-700 transition text-center"
                        >
                          Details
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: HOTELS & STAYS NEAR THIS PLACE */}
          {activeSubTab === "hotels" && nearby && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                    <HotelIcon className="w-4 h-4 text-rose-400" />
                    <span>Hotels & Stays near {place.name}</span>
                  </div>
                  {onSelectTab && (
                    <button
                      onClick={() => {
                        onSelectTab("hotels");
                        onClose();
                      }}
                      className="text-xs font-semibold text-rose-400 hover:underline flex items-center gap-1"
                    >
                      <span>All Hotels & Bookings</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <p className="text-xs text-stone-300 mt-1">
                  Heritage guesthouses, luxury oceanfront palaces, and boutique rooms nearest to {place.area}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {nearby.nearbyHotels.map(({ hotel, distanceKm }) => (
                  <div
                    key={hotel.id}
                    className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-28 w-full rounded-lg overflow-hidden bg-stone-800 mb-2 relative">
                        <img
                          src={hotel.image}
                          alt={hotel.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/70 text-rose-300">
                          ~{distanceKm} km
                        </span>
                        <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/70 text-stone-200">
                          ★ {hotel.rating}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-stone-100 line-clamp-1">
                        {hotel.name}
                      </h5>
                      <span className="text-[11px] text-amber-400 font-bold block">
                        ₹{hotel.pricePerNight.toLocaleString()}/night
                      </span>
                      <p className="text-[11px] text-stone-400 line-clamp-2 mt-1">
                        {hotel.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-800 flex items-center gap-1.5">
                      {onLocateOnMap && (
                        <button
                          onClick={() => {
                            onLocateOnMap(`hotel-${hotel.id}`);
                            onClose();
                          }}
                          className="flex-1 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-400 text-[11px] font-semibold border border-stone-700 transition text-center"
                        >
                          Map
                        </button>
                      )}
                      {onSelectTab && (
                        <button
                          onClick={() => {
                            onSelectTab("hotels");
                            onClose();
                          }}
                          className="flex-1 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-stone-950 text-[11px] font-bold transition text-center"
                        >
                          Book Stay
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="bg-stone-950 border-t border-stone-800 p-3 sm:p-4 shrink-0 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {onLocateOnMap && (
              <button
                onClick={() => {
                  onLocateOnMap(`place-${place.id}`);
                  onClose();
                }}
                className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 font-bold text-xs border border-stone-700 transition flex items-center gap-1.5"
              >
                <MapPin className="w-4 h-4" />
                <span>Locate on Map</span>
              </button>
            )}

            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-xs border border-stone-700 transition flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center gap-2">
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
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                isSaved
                  ? "bg-amber-600 border-amber-500 text-stone-950"
                  : "bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-200"
              }`}
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saved in Itinerary</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to My Trip</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
