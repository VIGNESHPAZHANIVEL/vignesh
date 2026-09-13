/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HeroBanner } from "./components/HeroBanner";
import { GoogleMapView } from "./components/GoogleMapView";
import { TransportSection } from "./components/TransportSection";
import { ParkingSection } from "./components/ParkingSection";
import { PlacesSection } from "./components/PlacesSection";
import { RestaurantsSection } from "./components/RestaurantsSection";
import { ShoppingSection } from "./components/ShoppingSection";
import { HotelsSection } from "./components/HotelsSection";
import { PlannerSection } from "./components/PlannerSection";
import { AiAssistantModal } from "./components/AiAssistantModal";
import { Footer } from "./components/Footer";
import {
  ActiveTab,
  SavedTripItem,
  TableReservation,
  HotelBooking,
} from "./types";
import {
  Sparkles,
  ArrowRight,
  MapPin,
  Train,
  Car,
  Landmark,
  Utensils,
  ShoppingBag,
  Hotel,
  CalendarCheck,
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("explore");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiModalPrompt, setAiModalPrompt] = useState<string | undefined>(undefined);
  const [mapFocusId, setMapFocusId] = useState<string | undefined>(undefined);
  const [liveParkingLots, setLiveParkingLots] = useState<any[]>([]);

  // Fetch live parking lots for map & parking synchronization
  useEffect(() => {
    async function fetchParking() {
      try {
        const res = await fetch("/api/parking/live");
        if (res.ok) {
          const data = await res.json();
          if (data.lots) {
            setLiveParkingLots(data.lots);
          }
        }
      } catch (e) {
        console.warn("Parking telemetry fallback active", e);
      }
    }
    fetchParking();
  }, []);

  // Saved Items & Bookings (with localStorage persistence)
  const [savedTripItems, setSavedTripItems] = useState<SavedTripItem[]>(() => {
    try {
      const stored = localStorage.getItem("chennai_saved_trip_items");
      return stored
        ? JSON.parse(stored)
        : [
            {
              id: "kapaleeshwarar",
              type: "place",
              title: "Kapaleeshwarar Temple",
              category: "Temples",
              area: "Mylapore",
            },
            {
              id: "marina-beach",
              type: "place",
              title: "Marina Beach & Promenade",
              category: "Beaches",
              area: "Kamarajar Salai",
            },
          ];
    } catch {
      return [];
    }
  });

  const [tableReservations, setTableReservations] = useState<TableReservation[]>(() => {
    try {
      const stored = localStorage.getItem("chennai_table_reservations");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [hotelBookings, setHotelBookings] = useState<HotelBooking[]>(() => {
    try {
      const stored = localStorage.getItem("chennai_hotel_bookings");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem("chennai_saved_trip_items", JSON.stringify(savedTripItems));
    } catch (e) {
      console.warn("Storage sync failed", e);
    }
  }, [savedTripItems]);

  useEffect(() => {
    try {
      localStorage.setItem("chennai_table_reservations", JSON.stringify(tableReservations));
    } catch (e) {
      console.warn("Storage sync failed", e);
    }
  }, [tableReservations]);

  useEffect(() => {
    try {
      localStorage.setItem("chennai_hotel_bookings", JSON.stringify(hotelBookings));
    } catch (e) {
      console.warn("Storage sync failed", e);
    }
  }, [hotelBookings]);

  // Handler for saving/removing items
  const handleToggleSaveItem = (item: {
    id: string;
    type: "place" | "restaurant" | "shopping";
    title: string;
    category: string;
    area: string;
  }) => {
    setSavedTripItems((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) {
        return prev.filter((p) => p.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleRemoveSavedItem = (id: string) => {
    setSavedTripItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleTableReserved = (reservation: TableReservation) => {
    setTableReservations((prev) => [reservation, ...prev]);
  };

  const handleHotelBooked = (booking: HotelBooking) => {
    setHotelBookings((prev) => [booking, ...prev]);
  };

  const handleOpenAiWithPrompt = (prompt?: string) => {
    setAiModalPrompt(prompt);
    setIsAiModalOpen(true);
  };

  const savedItemIds = savedTripItems.map((item) => item.id);

  const handleLocateOnMap = (id?: string) => {
    if (id) setMapFocusId(id);
    setActiveTab("map");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // If user enters search query and is on "explore", stay on current or switch to relevant view
  const handleCategorySelect = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Navigation Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        savedItemsCount={savedTripItems.length + tableReservations.length + hotelBookings.length}
        onOpenAiChat={() => handleOpenAiWithPrompt()}
      />

      <main className="flex-1">
        {/* Render views based on activeTab */}
        {activeTab === "explore" && (
          <div>
            <HeroBanner
              onSelectCategory={handleCategorySelect}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onOpenAiAssistant={() => handleOpenAiWithPrompt()}
            />

            {/* Quick Section previews for All-in-One Experience */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
              {/* Google Map Interactive Section */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      Google Maps Explorer
                    </h2>
                  </div>
                  <button
                    onClick={() => handleCategorySelect("map")}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>Full Screen Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <GoogleMapView
                  initialSelectedId={mapFocusId}
                  onSelectTab={handleCategorySelect}
                  savedItemIds={savedItemIds}
                  onToggleSaveItem={handleToggleSaveItem}
                  onTableReserved={handleTableReserved}
                  onHotelBooked={handleHotelBooked}
                  liveParkingLots={liveParkingLots}
                />
              </div>

              {/* Transport teaser */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Train className="w-5 h-5 text-amber-500" />
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      Explore Local Transport
                    </h2>
                  </div>
                  <button
                    onClick={() => handleCategorySelect("transport")}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>Full Transport Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <TransportSection onLocateOnMap={handleLocateOnMap} />
              </div>

              {/* Parking teaser */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-emerald-500" />
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      Parking Availability
                    </h2>
                  </div>
                  <button
                    onClick={() => handleCategorySelect("parking")}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <span>Live Parking Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <ParkingSection onLocateOnMap={handleLocateOnMap} />
              </div>

              {/* Places teaser */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-sky-500" />
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      Top Places to Visit
                    </h2>
                  </div>
                  <button
                    onClick={() => handleCategorySelect("places")}
                    className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                  >
                    <span>All Attractions</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <PlacesSection
                  searchQuery={searchQuery}
                  savedItemIds={savedItemIds}
                  onToggleSaveItem={handleToggleSaveItem}
                  onLocateOnMap={handleLocateOnMap}
                  onSelectTab={handleCategorySelect}
                  onTableReserved={handleTableReserved}
                  onHotelBooked={handleHotelBooked}
                  liveParkingLots={liveParkingLots}
                  onOpenAiPlannerForPlace={(placeName) =>
                    handleOpenAiWithPrompt(
                      `Please create a customized day trip plan centered around visiting ${placeName} in Chennai, including nearby metro routes, parking advice, and authentic local eateries.`
                    )
                  }
                />
              </div>

              {/* Restaurants teaser */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-orange-500" />
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      Restaurant Options
                    </h2>
                  </div>
                  <button
                    onClick={() => handleCategorySelect("restaurants")}
                    className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                  >
                    <span>Browse & Reserve Tables</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <RestaurantsSection
                  searchQuery={searchQuery}
                  onTableReserved={handleTableReserved}
                />
              </div>

              {/* Shopping teaser */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-purple-500" />
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      Shopping Destinations
                    </h2>
                  </div>
                  <button
                    onClick={() => handleCategorySelect("shopping")}
                    className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    <span>Explore Stores & Malls</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <ShoppingSection searchQuery={searchQuery} />
              </div>

              {/* Hotels teaser */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Hotel className="w-5 h-5 text-rose-500" />
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      Accommodation & Hotels
                    </h2>
                  </div>
                  <button
                    onClick={() => handleCategorySelect("hotels")}
                    className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1"
                  >
                    <span>Direct Booking Stays</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <HotelsSection
                  searchQuery={searchQuery}
                  onHotelBooked={handleHotelBooked}
                />
              </div>

              {/* Trip Planner teaser */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-teal-500" />
                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      Plan Your Trip
                    </h2>
                  </div>
                  <button
                    onClick={() => handleCategorySelect("planner")}
                    className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1"
                  >
                    <span>Custom Itineraries & Weather</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <PlannerSection
                  savedItems={savedTripItems}
                  onRemoveSavedItem={handleRemoveSavedItem}
                  reservations={tableReservations}
                  hotelBookings={hotelBookings}
                  onOpenAiPlanner={(prompt) =>
                    handleOpenAiWithPrompt(
                      prompt ||
                        "Please create a customized 2-day Chennai itinerary tailored for a first-time visitor."
                    )
                  }
                  onLocateOnMap={handleLocateOnMap}
                  onSelectTab={handleCategorySelect}
                  liveParkingLots={liveParkingLots}
                />
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Tab Views */}
        {activeTab === "map" && (
          <GoogleMapView
            initialSelectedId={mapFocusId}
            onSelectTab={handleCategorySelect}
            savedItemIds={savedItemIds}
            onToggleSaveItem={handleToggleSaveItem}
            onTableReserved={handleTableReserved}
            onHotelBooked={handleHotelBooked}
            liveParkingLots={liveParkingLots}
          />
        )}

        {activeTab === "transport" && <TransportSection onLocateOnMap={handleLocateOnMap} />}

        {activeTab === "parking" && <ParkingSection onLocateOnMap={handleLocateOnMap} />}

        {activeTab === "places" && (
          <PlacesSection
            searchQuery={searchQuery}
            savedItemIds={savedItemIds}
            onToggleSaveItem={handleToggleSaveItem}
            onLocateOnMap={handleLocateOnMap}
            onSelectTab={handleCategorySelect}
            onTableReserved={handleTableReserved}
            onHotelBooked={handleHotelBooked}
            liveParkingLots={liveParkingLots}
            onOpenAiPlannerForPlace={(placeName) =>
              handleOpenAiWithPrompt(
                `Please create a customized day trip plan centered around visiting ${placeName} in Chennai, including nearby metro routes, parking advice, and authentic local eateries.`
              )
            }
          />
        )}

        {activeTab === "restaurants" && (
          <RestaurantsSection
            searchQuery={searchQuery}
            onTableReserved={handleTableReserved}
            onLocateOnMap={handleLocateOnMap}
          />
        )}

        {activeTab === "shopping" && (
          <ShoppingSection
            searchQuery={searchQuery}
            onLocateOnMap={handleLocateOnMap}
          />
        )}

        {activeTab === "hotels" && (
          <HotelsSection
            searchQuery={searchQuery}
            onHotelBooked={handleHotelBooked}
            onLocateOnMap={handleLocateOnMap}
          />
        )}

        {activeTab === "planner" && (
          <PlannerSection
            savedItems={savedTripItems}
            onRemoveSavedItem={handleRemoveSavedItem}
            reservations={tableReservations}
            hotelBookings={hotelBookings}
            onOpenAiPlanner={(prompt) =>
              handleOpenAiWithPrompt(
                prompt ||
                  "Please generate an insider cultural itinerary for Chennai with food spots and historical temples."
              )
            }
            onLocateOnMap={handleLocateOnMap}
            onSelectTab={handleCategorySelect}
            liveParkingLots={liveParkingLots}
          />
        )}
      </main>

      {/* Floating Local AI Assistant Quick Trigger */}
      <button
        onClick={() => handleOpenAiWithPrompt()}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 font-bold text-xs sm:text-sm shadow-2xl shadow-amber-950/60 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-amber-300/40 group"
        id="floating-ai-guide-button"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-stone-950"></span>
        </span>
        <Sparkles className="w-4 h-4 text-stone-950" />
        <span className="font-bold">Ask Chennai AI</span>
      </button>

      {/* AI Assistant Modal */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        initialPrompt={aiModalPrompt}
      />

      {/* Footer */}
      <Footer onSelectTab={handleCategorySelect} />
    </div>
  );
}
