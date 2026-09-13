import React, { useState } from "react";
import {
  Train,
  Bus,
  Car,
  Bike,
  Navigation,
  Clock,
  IndianRupee,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Info,
  MapPin,
} from "lucide-react";
import { TRANSIT_HUBS } from "../data/chennaiData";

export const TransportSection: React.FC = () => {
  const [origin, setOrigin] = useState("central");
  const [destination, setDestination] = useState("airport");
  const [activeTransportMode, setActiveTransportMode] = useState<"metro" | "bus" | "taxi" | "bike">("metro");

  // Dynamic route calculation
  const getRouteDetails = (fromId: string, toId: string) => {
    if (fromId === toId) {
      return {
        metro: { time: "0 mins", fare: "₹0", line: "Same Station", interchange: "None", notes: "You are already at this hub." },
        bus: { routeNo: "Walk", time: "0 mins", fare: "₹0" },
        cab: { time: "0 mins", fare: "₹0" },
      };
    }

    // High profile route combinations
    if ((fromId === "central" && toId === "airport") || (fromId === "airport" && toId === "central")) {
      return {
        metro: {
          time: "38 mins",
          fare: "₹50 (Token) / ₹40 (Card)",
          line: "Blue Line (Direct)",
          interchange: "None (Direct express journey)",
          stops: 14,
          frequency: "Every 5 mins peak, 7 mins non-peak",
          notes: "Board at Central Underground Station directly to Airport T2/T4 terminal connection walkway.",
        },
        bus: {
          routeNo: "18A / 18G / AC 21G",
          time: "65-80 mins (Traffic dependent)",
          fare: "₹25 (Deluxe) / ₹50 (AC)",
          frequency: "Every 10-15 mins",
        },
        cab: {
          time: "45-60 mins",
          fare: "₹450 – ₹650 (Uber/Ola) / Auto: ₹350",
          tips: "Take Kathipara flyover route. Peak hours (8-11 AM & 5-8 PM) expect heavy GST road slowdown.",
        },
      };
    }

    if ((fromId === "central" && toId === "marina") || (fromId === "marina" && toId === "central")) {
      return {
        metro: {
          time: "12 mins",
          fare: "₹20",
          line: "Blue Line to Government Estate + 1.2km walk/auto",
          interchange: "None",
          stops: 2,
          frequency: "Every 5 mins",
          notes: "Alternatively take MRTS Suburban train from Chennai Beach/Fort to Light House Station (₹5).",
        },
        bus: {
          routeNo: "21G / 11G / 13 / 6A",
          time: "20 mins",
          fare: "₹10 - ₹15",
          frequency: "Every 4 mins (Very frequent)",
        },
        cab: {
          time: "15 mins",
          fare: "₹150 – ₹200 (Cab) / ₹80 - ₹120 (Auto)",
          tips: "Scenic coastal stretch along Rajaji Salai and Kamarajar Salai.",
        },
      };
    }

    if ((fromId === "central" && toId === "tnagar") || (fromId === "tnagar" && toId === "central")) {
      return {
        metro: {
          time: "18 mins",
          fare: "₹30",
          line: "Blue Line to AG-DMS or Nandanam",
          interchange: "None",
          stops: 6,
          frequency: "Every 5 mins",
          notes: "Nandanam station has direct feeder autos to Panagal Park.",
        },
        bus: {
          routeNo: "5C / 12B / 47A",
          time: "35 mins",
          fare: "₹15",
          frequency: "Every 6 mins",
        },
        cab: {
          time: "25-30 mins",
          fare: "₹220 – ₹300 (Cab) / ₹150 - ₹180 (Auto)",
          tips: "Route via Mount Road (Anna Salai).",
        },
      };
    }

    // Default calculated fallback
    return {
      metro: {
        time: "22-30 mins",
        fare: "₹30 - ₹40",
        line: "Connected via Blue/Green Network",
        interchange: "Chennai Central or Alandur",
        stops: 7,
        frequency: "Every 5-7 mins",
        notes: "Air-conditioned fast transit avoiding road congestion.",
      },
      bus: {
        routeNo: "MTC Regular & Deluxe",
        time: "35-50 mins",
        fare: "₹12 - ₹25",
        frequency: "Every 8-12 mins",
      },
      cab: {
        time: "25-45 mins",
        fare: "₹200 – ₹350 (Cab) / ₹120 - ₹200 (Auto)",
        tips: "Pre-book via rideshare apps for fixed guaranteed pricing.",
      },
    };
  };

  const currentRoute = getRouteDetails(origin, destination);
  const originHub = TRANSIT_HUBS.find((h) => h.id === origin);
  const destHub = TRANSIT_HUBS.find((h) => h.id === destination);

  return (
    <section id="transport-section" className="py-12 bg-stone-950 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Train className="w-3.5 h-3.5" />
              <span>Smart Transit Hub</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Explore Local Transport
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-1">
              Find the most convenient ways to get around: buses, taxis, metro, and bike rentals.
              Real-time updates on transit schedules and routes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-stone-900 border border-stone-800 px-3 py-2 rounded-xl text-stone-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Real-time CMRL & MTC feeds connected</span>
          </div>
        </div>

        {/* Interactive Route Planner Tool */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl mb-10">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-4">
            <Navigation className="w-4 h-4" />
            <span>Chennai Point-to-Point Route & Transit Fare Calculator</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Origin */}
            <div className="sm:col-span-5">
              <label className="block text-xs font-medium text-stone-400 mb-1">
                From (Origin Hub)
              </label>
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2.5 text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                id="transit-origin-select"
              >
                {TRANSIT_HUBS.map((hub) => (
                  <option key={hub.id} value={hub.id}>
                    {hub.name} ({hub.area})
                  </option>
                ))}
              </select>
            </div>

            {/* Switch icon */}
            <div className="sm:col-span-2 flex justify-center py-1 sm:py-0">
              <button
                type="button"
                onClick={() => {
                  const temp = origin;
                  setOrigin(destination);
                  setDestination(temp);
                }}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 transition-colors"
                title="Swap origin and destination"
                id="swap-origin-dest-btn"
              >
                <ArrowRight className="w-4 h-4 rotate-90 sm:rotate-0" />
              </button>
            </div>

            {/* Destination */}
            <div className="sm:col-span-5">
              <label className="block text-xs font-medium text-stone-400 mb-1">
                To (Destination Hub)
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2.5 text-stone-100 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                id="transit-destination-select"
              >
                {TRANSIT_HUBS.map((hub) => (
                  <option key={hub.id} value={hub.id}>
                    {hub.name} ({hub.area})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Route Comparison Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Metro Option */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-sky-950/40 to-stone-800/60 border border-sky-900/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-sky-900/60 text-sky-400">
                      <Train className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-white">Chennai Metro Rail</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                    Fastest
                  </span>
                </div>
                <div className="text-xl font-bold text-sky-300 mt-2">
                  {currentRoute.metro.time}
                </div>
                <div className="text-xs text-stone-300 flex items-center gap-1 mt-1">
                  <IndianRupee className="w-3 h-3 text-amber-400" />
                  <span>Fare: {currentRoute.metro.fare}</span>
                </div>
                <div className="text-xs text-stone-400 mt-2 space-y-1">
                  <div className="text-stone-300 font-medium">Line: {currentRoute.metro.line}</div>
                  {currentRoute.metro.stops && <div>Stops: {currentRoute.metro.stops} stations</div>}
                  <div>Frequency: {currentRoute.metro.frequency || "Every 5 mins"}</div>
                </div>
              </div>
              <p className="text-[11px] text-stone-400 mt-3 border-t border-stone-800 pt-2 italic">
                {currentRoute.metro.notes}
              </p>
            </div>

            {/* Bus Option */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-amber-950/30 to-stone-800/60 border border-amber-900/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-900/60 text-amber-400">
                      <Bus className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-white">MTC City Bus</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium">
                    Most Economical
                  </span>
                </div>
                <div className="text-xl font-bold text-amber-300 mt-2">
                  {currentRoute.bus.time}
                </div>
                <div className="text-xs text-stone-300 flex items-center gap-1 mt-1">
                  <IndianRupee className="w-3 h-3 text-amber-400" />
                  <span>Fare: {currentRoute.bus.fare}</span>
                </div>
                <div className="text-xs text-stone-400 mt-2 space-y-1">
                  <div className="text-stone-300 font-medium">Bus Nos: {currentRoute.bus.routeNo}</div>
                  <div>Frequency: {currentRoute.bus.frequency}</div>
                  <div>Pass: ₹50 Daily Unlimited Travel Pass available</div>
                </div>
              </div>
              <p className="text-[11px] text-stone-400 mt-3 border-t border-stone-800 pt-2 italic">
                AC Electric low-floor buses available on primary arterial corridors.
              </p>
            </div>

            {/* Taxi / Auto Option */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-stone-800 to-stone-900 border border-stone-700 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-stone-700 text-yellow-400">
                      <Car className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-white">Taxi & Auto-Rickshaw</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-700 text-stone-300 font-medium">
                    Door-to-Door
                  </span>
                </div>
                <div className="text-xl font-bold text-stone-100 mt-2">
                  {currentRoute.cab.time}
                </div>
                <div className="text-xs text-stone-300 flex items-center gap-1 mt-1">
                  <IndianRupee className="w-3 h-3 text-amber-400" />
                  <span>Est. Fare: {currentRoute.cab.fare}</span>
                </div>
                <div className="text-xs text-stone-400 mt-2 space-y-1">
                  <div>Rideshares: Uber, Ola, Rapido Auto</div>
                  <div>Street Auto: Always agree on fare or ask for meter</div>
                </div>
              </div>
              <p className="text-[11px] text-stone-400 mt-3 border-t border-stone-800 pt-2 italic">
                {currentRoute.cab.tips}
              </p>
            </div>
          </div>
        </div>

        {/* Transport Modes Guide Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-800 pb-3 mb-6 overflow-x-auto">
          {[
            { id: "metro" as const, label: "Metro Rail (CMRL)", icon: <Train className="w-4 h-4" /> },
            { id: "bus" as const, label: "MTC Buses", icon: <Bus className="w-4 h-4" /> },
            { id: "taxi" as const, label: "Autos & Taxis", icon: <Car className="w-4 h-4" /> },
            { id: "bike" as const, label: "Bike & Scooter Rentals", icon: <Bike className="w-4 h-4" /> },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveTransportMode(mode.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTransportMode === mode.id
                  ? "bg-amber-600 text-stone-950 shadow"
                  : "bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800"
              }`}
              id={`transport-subtab-${mode.id}`}
            >
              {mode.icon}
              <span>{mode.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Metro Rail Detailed Info */}
        {activeTransportMode === "metro" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Chennai Metro Rail Network (CMRL)</h3>
                  <p className="text-xs text-stone-400">Punctual, fully air-conditioned, with women-only coaches</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-stone-300">
                <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800">
                  <div className="flex items-center gap-2 font-bold text-sky-400 mb-1">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    Blue Line (Corridor 1): Wimco Nagar ↔ Chennai Airport (32.6 km)
                  </div>
                  <p className="text-stone-400 leading-relaxed">
                    Key Stops: Wimco Nagar • High Court • Chennai Central • Government Estate (Marina Beach) •
                    AG-DMS • Nandanam • Guindy • Meenambakkam • Airport Terminal.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800">
                  <div className="flex items-center gap-2 font-bold text-emerald-400 mb-1">
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    Green Line (Corridor 2): Chennai Central ↔ St. Thomas Mount (22 km)
                  </div>
                  <p className="text-stone-400 leading-relaxed">
                    Key Stops: Chennai Central • Egmore • Shenoy Nagar • CMBT (Interstate Bus Terminus) •
                    Vadapalani • Ashok Nagar • Alandur (Major Interchange) • St. Thomas Mount.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-stone-800/60 border border-stone-700/60">
                    <div className="text-amber-400 font-semibold mb-0.5">Operating Hours</div>
                    <div className="text-stone-200">5:00 AM – 11:00 PM (All days)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-800/60 border border-stone-700/60">
                    <div className="text-amber-400 font-semibold mb-0.5">Tourist Smart Card</div>
                    <div className="text-stone-200">₹100 (1-Day Unlimited Travel)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Smart Metro Travel Tips</h3>
                <ul className="space-y-2.5 text-xs text-stone-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Direct Airport Link:</strong> Metro connects directly into Terminal 2 and Terminal 4 via covered travellators and luggage trolleys.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>WhatsApp & QR Ticketing:</strong> Save CMRL WhatsApp number (+91 83000 86000) or use the CMRL mobile app for a 20% discount on single journeys.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Interchange Hubs:</strong> Switch between Blue and Green lines effortlessly at <em>Chennai Central</em> and <em>Alandur</em>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Free Feeder Bicycles:</strong> Bicycles are available for complimentary short commutes at major stations like Guindy, Vadapalani, and Anna Nagar.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Station announcements are delivered in Tamil and English with digital platform indicators.</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Bus Detailed Info */}
        {activeTransportMode === "bus" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
              <h3 className="text-lg font-bold text-white mb-2">MTC Chennai Bus Network</h3>
              <p className="text-xs text-stone-400 mb-4">
                The Metropolitan Transport Corporation operates over 3,400 buses covering every street and suburb.
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
                  <span className="font-bold text-amber-400">Route 21G:</span> Broadway ↔ Tambaram via Marina Beach, Mylapore, Guindy. (Key tourist corridor)
                </div>
                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
                  <span className="font-bold text-amber-400">Route 102 / 588:</span> Broadway / CMBT ↔ Mahabalipuram along scenic East Coast Road (ECR).
                </div>
                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
                  <span className="font-bold text-amber-400">Route 29C:</span> Perambur ↔ Besant Nagar (Elliot&apos;s Beach) via Sterling Road & Gemini flyover.
                </div>
                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700">
                  <span className="font-bold text-amber-400">Route 5C:</span> Broadway / Central ↔ T. Nagar Panagal Park Shopping Plaza.
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Bus Travel Tips & Passes</h3>
                <div className="space-y-3 text-xs text-stone-300">
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                    <div className="font-semibold text-emerald-400 mb-1">One-Day Unlimited Travel Pass (₹50)</div>
                    <p className="text-stone-400">Buy directly from the bus conductor. Allows unlimited rides on all non-AC MTC red and white buses for 24 hours.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                    <div className="font-semibold text-sky-400 mb-1">Free Travel for Women</div>
                    <p className="text-stone-400">Under the Tamil Nadu Government scheme, women travel completely free on designated white-board ordinary city buses.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800">
                    <div className="font-semibold text-amber-400 mb-1">AC Electric Buses</div>
                    <p className="text-stone-400">Low-floor silent electric buses run on routes 18A, 21G, and ECR corridors for ₹25–₹45.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Autos & Taxis */}
        {activeTransportMode === "taxi" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
              <h3 className="text-lg font-bold text-white mb-2">Auto-Rickshaw Guide & Fares</h3>
              <p className="text-xs text-stone-400 mb-4">
                Chennai&apos;s black-and-yellow three-wheelers are iconic, agile, and available at every street corner.
              </p>
              <div className="space-y-3 text-xs text-stone-300">
                <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700">
                  <div className="font-bold text-amber-400 mb-1">Government Meter Regulations</div>
                  <p className="text-stone-400">Base fare is ₹25 for the first 1.8 kilometers, and ₹12 per subsequent kilometer. Waiting charge is ₹3.50 per 5 mins.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700">
                  <div className="font-bold text-yellow-400 mb-1">Night Surcharge</div>
                  <p className="text-stone-400">Between 11:00 PM and 5:00 AM, a legally permitted 50% surcharge applies on regular fares.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700">
                  <div className="font-bold text-emerald-400 mb-1">Prepaid Auto Booths</div>
                  <p className="text-stone-400">Located at Chennai Central Railway Station, Egmore Station, and Airport exits. Pay fixed receipt inside, no bargaining needed.</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Rideshare Apps & Bargaining Advice</h3>
                <div className="space-y-3 text-xs text-stone-300">
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-200">Recommended Mobile Apps:</strong>
                      <p className="text-stone-400 mt-0.5">Use Uber, Ola, or Rapido for auto and cab bookings. They give upfront transparent prices and cashless UPI payments.</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-stone-200">Street Bargaining Tip:</strong>
                      <p className="text-stone-400 mt-0.5">If hailing an auto on the street, politely negotiate before getting in: &quot;Meter podunga&quot; (Please put meter) or agree on a round sum (typically ₹50 for under 2 km, ₹100 for 4-5 km).</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Bike Rentals */}
        {activeTransportMode === "bike" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
              <h3 className="text-lg font-bold text-white mb-2">Bike & Scooter Rentals</h3>
              <p className="text-xs text-stone-400 mb-4">
                Cruising the scenic East Coast Road (ECR) to Mahabalipuram or navigating beach lanes by scooter is one of the top traveler experiences.
              </p>
              <div className="space-y-3 text-xs text-stone-300">
                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">Honda Activa / TVS Jupiter (110cc)</div>
                    <div className="text-stone-400">Ideal for city sightseeing & beach hopping</div>
                  </div>
                  <div className="text-right">
                    <div className="text-amber-400 font-bold">₹350 – ₹500</div>
                    <div className="text-[10px] text-stone-500">per day</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">Royal Enfield Classic 350 / Hunter</div>
                    <div className="text-stone-400">The iconic cruiser for East Coast Road coastal highway</div>
                  </div>
                  <div className="text-right">
                    <div className="text-amber-400 font-bold">₹900 – ₹1,300</div>
                    <div className="text-[10px] text-stone-500">per day</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-stone-800/80 border border-stone-700 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-white">Smart Electric Scooters (Ather / Ola S1)</div>
                    <div className="text-stone-400">Eco-friendly with 100km battery range</div>
                  </div>
                  <div className="text-right">
                    <div className="text-amber-400 font-bold">₹600 – ₹800</div>
                    <div className="text-[10px] text-stone-500">per day</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Requirements & Pickup Hubs</h3>
                <ul className="space-y-2.5 text-xs text-stone-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Documents:</strong> Valid original driving license (Indian or International Driving Permit) + Government ID proof (Passport / Aadhaar).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Strict Helmet Mandate:</strong> Helmets are legally mandatory for both the rider and pillion passenger across Tamil Nadu.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Pickup Hubs:</strong> Royal Brothers & Bounce booths are located at Chennai Central Station, Thiruvanmiyur (ECR starting point), and Meenambakkam Airport.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                💡 <em>Traveler Tip:</em> Top recommended route: Ride down ECR from Thiruvanmiyur to Kovalam beach and Mahabalipuram (45 km of picturesque coastline).
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
