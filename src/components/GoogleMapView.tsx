/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Source: Google Maps Platform Code Assist
import React, { useState, useMemo, useCallback } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import {
  CHENNAI_DEFAULT_CENTER,
  getAllChennaiMapMarkers,
  getDirectionsUrl,
  getPlaceSearchUrl,
  CHENNAI_METRO_STATIONS,
} from "../data/mapLocations";
import { MapMarkerItem, SavedTripItem, TableReservation, HotelBooking } from "../types";
import {
  MapPin,
  Navigation,
  ExternalLink,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  Compass,
  Train,
  Car,
  Utensils,
  ShoppingBag,
  Hotel,
  Landmark,
  KeyRound,
  Layers,
  Sparkles,
  Info,
  X,
} from "lucide-react";

interface GoogleMapViewProps {
  initialSelectedId?: string;
  onSelectTab?: (tab: any) => void;
  savedItemIds?: string[];
  onToggleSaveItem?: (item: {
    id: string;
    type: "place" | "restaurant" | "shopping";
    title: string;
    category: string;
    area: string;
  }) => void;
  onTableReserved?: (reservation: TableReservation) => void;
  onHotelBooked?: (booking: HotelBooking) => void;
  liveParkingLots?: any[];
}

export const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  initialSelectedId,
  onSelectTab,
  savedItemIds = [],
  onToggleSaveItem,
  liveParkingLots = [],
}) => {
  // Read env key or allow quick temporary testing key
  const envKey =
    ((import.meta as unknown as { env?: { VITE_GOOGLE_MAPS_API_KEY?: string } }).env
      ?.VITE_GOOGLE_MAPS_API_KEY as string) || "";
  const [apiKey, setApiKey] = useState<string>(() => {
    try {
      return localStorage.getItem("chennai_gmaps_custom_key") || envKey;
    } catch {
      return envKey;
    }
  });
  const [customKeyInput, setCustomKeyInput] = useState("");
  const [isKeyBannerOpen, setIsKeyBannerOpen] = useState(!apiKey);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMarker, setSelectedMarker] = useState<MapMarkerItem | null>(null);

  // Map state
  const [mapCenter, setMapCenter] = useState(CHENNAI_DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(12);

  // Consolidated markers
  const allMarkers = useMemo(() => {
    return getAllChennaiMapMarkers(liveParkingLots);
  }, [liveParkingLots]);

  // Set initial selected marker if requested
  React.useEffect(() => {
    if (initialSelectedId) {
      const found = allMarkers.find(
        (m) => m.id === initialSelectedId || m.id.endsWith(initialSelectedId)
      );
      if (found) {
        setSelectedMarker(found);
        setMapCenter(found.coordinates);
        setMapZoom(15);
      }
    }
  }, [initialSelectedId, allMarkers]);

  // Filtered markers
  const filteredMarkers = useMemo(() => {
    return allMarkers.filter((marker) => {
      const matchesCategory =
        activeCategory === "all" || marker.category === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        marker.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        marker.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (marker.subTitle &&
          marker.subTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (marker.categoryLabel &&
          marker.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allMarkers, activeCategory, searchQuery]);

  // Save custom key
  const handleApplyCustomKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customKeyInput.trim()) return;
    const cleanKey = customKeyInput.trim();
    setApiKey(cleanKey);
    try {
      localStorage.setItem("chennai_gmaps_custom_key", cleanKey);
    } catch (err) {
      console.warn(err);
    }
    setIsKeyBannerOpen(false);
  };

  const handleMarkerClick = useCallback((marker: MapMarkerItem) => {
    setSelectedMarker(marker);
    setMapCenter(marker.coordinates);
  }, []);

  const handleQuickPreset = (preset: { name: string; center: { lat: number; lng: number }; zoom: number }) => {
    setMapCenter(preset.center);
    setMapZoom(preset.zoom);
  };

  // Color mappings for pin aesthetics
  const getPinColor = (category: MapMarkerItem["category"]) => {
    switch (category) {
      case "attraction":
        return { bg: "#0284c7", border: "#0369a1", glyph: "#ffffff" }; // Sky
      case "restaurant":
        return { bg: "#ea580c", border: "#c2410c", glyph: "#ffffff" }; // Orange
      case "shopping":
        return { bg: "#9333ea", border: "#7e22ce", glyph: "#ffffff" }; // Purple
      case "hotel":
        return { bg: "#e11d48", border: "#be123c", glyph: "#ffffff" }; // Rose
      case "parking":
        return { bg: "#16a34a", border: "#15803d", glyph: "#ffffff" }; // Green
      case "metro":
        return { bg: "#2563eb", border: "#1d4ed8", glyph: "#ffffff" }; // Blue
      default:
        return { bg: "#f59e0b", border: "#d97706", glyph: "#ffffff" }; // Amber
    }
  };

  const isSaved = (markerId: string) => {
    const rawId = markerId.replace(/^[a-z]+-/, "");
    return savedItemIds.includes(rawId) || savedItemIds.includes(markerId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header section */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Google Maps Platform
            </span>
            <span className="text-xs text-stone-400">• Chennai Live Navigation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight">
            Chennai Interactive Map
          </h1>
          <p className="text-stone-400 text-sm mt-0.5">
            Pinpoint historical temples, Marina beach, metro corridors, live parking spots, dining, and silk hubs.
          </p>
        </div>

        {/* Quick controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsKeyBannerOpen((prev) => !prev)}
            className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-amber-500/40 text-xs text-stone-300 hover:text-white transition-all flex items-center gap-1.5"
            title="Google Maps Platform API Key status"
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>{apiKey ? "API Key Active" : "Setup Maps Key"}</span>
          </button>

          <a
            href="https://www.google.com/maps/search/Chennai,+Tamil+Nadu"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-800 hover:border-stone-700 text-xs text-stone-300 hover:text-white transition-all flex items-center gap-1.5"
          >
            <span>Open in Google Maps App</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>
        </div>
      </div>

      {/* API Key Banner / Config Helper */}
      {isKeyBannerOpen && (
        <div className="mb-6 p-4 rounded-xl bg-stone-900/90 border border-amber-500/30 shadow-xl relative">
          <button
            onClick={() => setIsKeyBannerOpen(false)}
            className="absolute top-3 right-3 p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3">
            <KeyRound className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">
                Google Maps Platform API Key Configuration
              </h3>
              <p className="text-xs text-stone-400 mt-1 max-w-2xl leading-relaxed">
                For interactive maps and tiles, use your Google Cloud project key, or get a free{" "}
                <a
                  href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 underline hover:text-amber-300 font-medium"
                >
                  Maps Demo Key
                </a>{" "}
                with zero billing setup. Set it in <code className="text-stone-300 bg-stone-950 px-1.5 py-0.5 rounded">.env.example</code> as <code className="text-amber-300">VITE_GOOGLE_MAPS_API_KEY</code>, or paste it below for instant preview.
              </p>

              <form
                onSubmit={handleApplyCustomKey}
                className="mt-3 flex flex-col sm:flex-row gap-2 max-w-lg"
              >
                <input
                  type="text"
                  value={customKeyInput}
                  onChange={(e) => setCustomKeyInput(e.target.value)}
                  placeholder="Paste your Google Maps API Key here..."
                  className="flex-1 px-3 py-1.5 rounded-lg bg-stone-950 border border-stone-800 focus:border-amber-500 text-xs text-white placeholder:text-stone-600 outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs transition"
                >
                  Apply Key
                </button>
                {apiKey && (
                  <button
                    type="button"
                    onClick={() => {
                      setApiKey("");
                      localStorage.removeItem("chennai_gmaps_custom_key");
                    }}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-stone-300 transition"
                  >
                    Clear
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Filter bar & Quick Areas */}
      <div className="mb-4 space-y-3">
        {/* Search & Category tabs */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: "all", label: "All Pins", icon: Layers, count: allMarkers.length },
              {
                id: "attraction",
                label: "Attractions",
                icon: Landmark,
                count: allMarkers.filter((m) => m.category === "attraction").length,
              },
              {
                id: "metro",
                label: "Metro Transit",
                icon: Train,
                count: allMarkers.filter((m) => m.category === "metro").length,
              },
              {
                id: "parking",
                label: "Live Parking",
                icon: Car,
                count: allMarkers.filter((m) => m.category === "parking").length,
              },
              {
                id: "restaurant",
                label: "Dining",
                icon: Utensils,
                count: allMarkers.filter((m) => m.category === "restaurant").length,
              },
              {
                id: "shopping",
                label: "Shopping",
                icon: ShoppingBag,
                count: allMarkers.filter((m) => m.category === "shopping").length,
              },
              {
                id: "hotel",
                label: "Hotels",
                icon: Hotel,
                count: allMarkers.filter((m) => m.category === "hotel").length,
              },
            ].map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                    isActive
                      ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 font-semibold"
                      : "bg-stone-900/90 text-stone-300 hover:text-white border border-stone-800 hover:border-stone-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-stone-950/20 text-stone-950 font-bold" : "bg-stone-800 text-stone-400"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Map search input */}
          <div className="relative min-w-[240px] max-w-md">
            <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search map places or areas..."
              className="w-full pl-9 pr-8 py-1.5 rounded-lg bg-stone-900 border border-stone-800 focus:border-amber-500 text-xs text-white placeholder:text-stone-500 outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Area Presets */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs text-stone-400">
          <span className="font-semibold text-stone-500 text-[11px] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Navigation className="w-3 h-3 text-amber-500" /> Focus Area:
          </span>
          {[
            { name: "All Chennai", center: { lat: 13.0475, lng: 80.2520 }, zoom: 12 },
            { name: "Mylapore & San Thome", center: { lat: 13.0334, lng: 80.2740 }, zoom: 14 },
            { name: "Marina Beach & Central", center: { lat: 13.0650, lng: 80.2790 }, zoom: 13 },
            { name: "T. Nagar Shopping Hub", center: { lat: 13.0410, lng: 80.2350 }, zoom: 15 },
            { name: "Guindy & Airport", center: { lat: 13.0000, lng: 80.1900 }, zoom: 13 },
            { name: "Mahabalipuram", center: { lat: 12.6166, lng: 80.1983 }, zoom: 14 },
          ].map((preset) => (
            <button
              key={preset.name}
              onClick={() => handleQuickPreset(preset)}
              className="px-2.5 py-1 rounded-md bg-stone-900/60 hover:bg-stone-800 border border-stone-800/80 text-stone-300 hover:text-amber-400 text-xs whitespace-nowrap transition"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Container: Explicit Height is mandatory (CF2) */}
      <div className="relative w-full h-[540px] sm:h-[620px] lg:h-[680px] rounded-2xl overflow-hidden border border-stone-800 bg-stone-900 shadow-2xl">
        {apiKey ? (
          <APIProvider apiKey={apiKey} libraries={["marker"]}>
            <Map
              center={mapCenter}
              zoom={mapZoom}
              onCenterChanged={(ev) => setMapCenter(ev.detail.center)}
              onZoomChanged={(ev) => setMapZoom(ev.detail.zoom)}
              mapId="DEMO_MAP_ID"
              internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
              gestureHandling="greedy"
              disableDefaultUI={false}
              className="w-full h-full"
            >
              {/* Render Advanced Markers */}
              {filteredMarkers.map((marker) => {
                const colors = getPinColor(marker.category);
                return (
                  <AdvancedMarker
                    key={marker.id}
                    position={marker.coordinates}
                    onClick={() => handleMarkerClick(marker)}
                    title={marker.title}
                  >
                    <Pin
                      background={colors.bg}
                      borderColor={colors.border}
                      glyphColor={colors.glyph}
                      scale={selectedMarker?.id === marker.id ? 1.25 : 1.0}
                    />
                  </AdvancedMarker>
                );
              })}

              {/* InfoWindow Popup */}
              {selectedMarker && (
                <InfoWindow
                  position={selectedMarker.coordinates}
                  onCloseClick={() => setSelectedMarker(null)}
                  maxWidth={320}
                >
                  <div className="p-1 text-stone-900 font-sans">
                    {selectedMarker.image && (
                      <div className="relative h-28 w-full rounded-lg overflow-hidden mb-2 bg-stone-200">
                        <img
                          src={selectedMarker.image}
                          alt={selectedMarker.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-950/80 text-white backdrop-blur-sm">
                          {selectedMarker.categoryLabel}
                        </span>
                      </div>
                    )}

                    <h4 className="font-bold text-sm text-stone-950 leading-tight">
                      {selectedMarker.title}
                    </h4>
                    {selectedMarker.subTitle && (
                      <p className="text-xs text-stone-600 font-medium mt-0.5">
                        {selectedMarker.subTitle}
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                      <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="truncate">{selectedMarker.area}</span>
                      {selectedMarker.rating && (
                        <span className="font-semibold text-amber-600 ml-auto">
                          ★ {selectedMarker.rating}
                        </span>
                      )}
                    </div>

                    {selectedMarker.info && (
                      <p className="text-[11px] text-stone-600 bg-stone-100 p-1.5 rounded mt-2 line-clamp-2">
                        {selectedMarker.info}
                      </p>
                    )}

                    {/* Actions in InfoWindow */}
                    <div className="mt-3 pt-2 border-t border-stone-200 flex items-center justify-between gap-1.5">
                      {/* Open Directions directly in Google Maps */}
                      <a
                        href={getDirectionsUrl(
                          selectedMarker.coordinates.lat,
                          selectedMarker.coordinates.lng,
                          selectedMarker.title
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-md bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs transition flex items-center gap-1"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Directions</span>
                      </a>

                      <a
                        href={getPlaceSearchUrl(selectedMarker.title, selectedMarker.area)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-1.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs transition flex items-center gap-1"
                        title="Search on Google Maps"
                      >
                        <span>Google Maps</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {/* Bookmark toggle */}
                      {onToggleSaveItem && selectedMarker.category !== "metro" && selectedMarker.category !== "parking" && (
                        <button
                          onClick={() => {
                            const rawId = selectedMarker.id.replace(/^[a-z]+-/, "");
                            onToggleSaveItem({
                              id: rawId,
                              type: selectedMarker.category as any,
                              title: selectedMarker.title,
                              category: selectedMarker.categoryLabel,
                              area: selectedMarker.area,
                            });
                          }}
                          className={`p-1.5 rounded-md transition ${
                            isSaved(selectedMarker.id)
                              ? "bg-amber-100 text-amber-600"
                              : "bg-stone-100 text-stone-600 hover:text-stone-900"
                          }`}
                          title="Save to Trip Planner"
                        >
                          {isSaved(selectedMarker.id) ? (
                            <BookmarkCheck className="w-4 h-4" />
                          ) : (
                            <Bookmark className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        ) : (
          /* Interactive Fallback Preview when API key is pending */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-radial from-stone-900 to-stone-950 text-center relative overflow-hidden">
            {/* Ambient map grid pattern background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]"></div>

            <div className="relative z-10 max-w-md p-6 rounded-2xl bg-stone-900/90 border border-stone-800 shadow-2xl backdrop-blur-md">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-white font-serif">
                Connect Google Maps
              </h3>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                Add your Google Maps Platform key to unlock interactive satellite tiles, 3D street views, and live dynamic markers across Chennai.
              </p>

              <div className="mt-4 p-3 rounded-xl bg-stone-950/80 border border-stone-800 text-left text-xs space-y-2">
                <div className="flex items-center justify-between text-stone-300">
                  <span className="font-medium">Free Prototyping:</span>
                  <a
                    href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Get Demo Key</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-stone-500">
                  No billing setup or credit card required with the public Maps Demo Key.
                </p>
              </div>

              <form onSubmit={handleApplyCustomKey} className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={customKeyInput}
                  onChange={(e) => setCustomKeyInput(e.target.value)}
                  placeholder="Paste Maps API Key..."
                  className="flex-1 px-3 py-2 rounded-lg bg-stone-950 border border-stone-800 focus:border-amber-500 text-xs text-white placeholder:text-stone-600 outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition"
                >
                  Load Map
                </button>
              </form>

              {/* Direct Link to Google Maps */}
              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-center gap-4">
                <a
                  href="https://www.google.com/maps/search/Chennai+landmarks+and+attractions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Explore Chennai on Google Maps Web</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Floating Marker List Drawer / Side overlay */}
        <div className="absolute top-3 left-3 z-10 max-h-[calc(100%-24px)] w-64 sm:w-72 overflow-y-auto rounded-xl bg-stone-950/90 border border-stone-800/80 backdrop-blur-md p-3 shadow-xl hidden md:block">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Locations ({filteredMarkers.length})</span>
            </span>
            <span className="text-[10px] text-stone-500 uppercase tracking-wider">
              {activeCategory}
            </span>
          </div>

          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-stone-800">
            {filteredMarkers.map((item) => (
              <button
                key={item.id}
                onClick={() => handleMarkerClick(item)}
                className={`w-full text-left p-2 rounded-lg transition text-xs flex items-center gap-2 ${
                  selectedMarker?.id === item.id
                    ? "bg-amber-500/20 border border-amber-500/40 text-amber-300"
                    : "bg-stone-900/50 hover:bg-stone-900 border border-stone-800/40 text-stone-300 hover:text-white"
                }`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: getPinColor(item.category).bg }}
                />
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="text-[10px] text-stone-500 truncate">{item.area}</p>
                </div>
                {item.rating && (
                  <span className="text-[10px] text-amber-400 font-semibold shrink-0">
                    ★ {item.rating}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Featured Map Locations with Direct "View on Google Map" & Directions */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold font-serif text-white">
              Chennai Landmark Directory
            </h3>
            <p className="text-xs text-stone-400">
              Select any destination to center on the map or launch turn-by-turn navigation.
            </p>
          </div>
          <span className="text-xs text-amber-400 font-semibold">
            {filteredMarkers.length} Places Found
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMarkers.slice(0, 9).map((marker) => {
            const colors = getPinColor(marker.category);
            return (
              <div
                key={marker.id}
                className="p-4 rounded-xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-semibold text-white"
                      style={{ backgroundColor: colors.bg }}
                    >
                      {marker.categoryLabel}
                    </span>
                    {marker.rating && (
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        ★ {marker.rating}
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition">
                    {marker.title}
                  </h4>
                  {marker.subTitle && (
                    <p className="text-xs text-stone-400 mt-0.5 line-clamp-1">
                      {marker.subTitle}
                    </p>
                  )}

                  <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-600" />
                    <span>{marker.area}</span>
                  </p>

                  {marker.info && (
                    <p className="text-xs text-stone-400 mt-2 bg-stone-950/60 p-2 rounded line-clamp-2 border border-stone-800/60">
                      {marker.info}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      handleMarkerClick(marker);
                      window.scrollTo({ top: 120, behavior: "smooth" });
                    }}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Locate on Map</span>
                  </button>

                  <a
                    href={getDirectionsUrl(marker.coordinates.lat, marker.coordinates.lng, marker.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-stone-400 hover:text-white flex items-center gap-1"
                  >
                    <span>Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
