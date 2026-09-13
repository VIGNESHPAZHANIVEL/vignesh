import React, { useEffect, useState } from "react";
import {
  Car,
  Bike,
  RefreshCw,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  QrCode,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { ParkingLot } from "../types";

export const ParkingSection: React.FC = () => {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");
  const [vehicleFilter, setVehicleFilter] = useState<"all" | "4w" | "2w">("all");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [reservedLot, setReservedLot] = useState<ParkingLot | null>(null);
  const [reservationSlip, setReservationSlip] = useState<{ code: string; time: string } | null>(null);

  const fetchLiveParking = async () => {
    try {
      const res = await fetch("/api/parking/live");
      if (res.ok) {
        const data = await res.json();
        if (data.lots) {
          setParkingLots(data.lots);
          setLastRefreshed(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
        }
      }
    } catch (err) {
      console.warn("Could not fetch live parking data, using local fallback", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveParking();
    let interval: any = null;
    if (autoRefresh) {
      interval = setInterval(fetchLiveParking, 7000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const areas = ["all", ...Array.from(new Set(parkingLots.map((p) => p.area)))];

  const filteredLots = parkingLots.filter((lot) => {
    if (areaFilter !== "all" && lot.area !== areaFilter) return false;
    if (vehicleFilter === "4w" && lot.available4W <= 0) return false;
    if (vehicleFilter === "2w" && lot.available2W <= 0) return false;
    return true;
  });

  const handleHoldSpot = (lot: ParkingLot) => {
    setReservedLot(lot);
    setReservationSlip({
      code: `CHN-PK-${Math.floor(1000 + Math.random() * 9000)}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
  };

  return (
    <section id="parking-section" className="py-12 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <Car className="w-3.5 h-3.5" />
              <span>Smart City Chennai Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Parking Availability
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-1">
              Locate nearby parking lots and multi-level garages. Check real-time parking space availability to save time.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-stone-300 bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Updated: {lastRefreshed || "Just now"}</span>
            </div>

            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                autoRefresh
                  ? "bg-emerald-950/60 border-emerald-700 text-emerald-300"
                  : "bg-stone-800 border-stone-700 text-stone-400"
              }`}
              title="Toggle automatic sensor polling"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${autoRefresh ? "animate-spin" : ""}`} />
              <span>{autoRefresh ? "Auto-Refresh On" : "Auto-Refresh Off"}</span>
            </button>

            <button
              onClick={fetchLiveParking}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
              title="Refresh now"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-stone-950/60 border border-stone-800 mb-6">
          {/* Vehicle type */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-medium">Vehicle:</span>
            <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-lg border border-stone-800">
              <button
                onClick={() => setVehicleFilter("all")}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  vehicleFilter === "all" ? "bg-amber-600 text-stone-950 font-bold" : "text-stone-300 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setVehicleFilter("4w")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  vehicleFilter === "4w" ? "bg-amber-600 text-stone-950 font-bold" : "text-stone-300 hover:text-white"
                }`}
              >
                <Car className="w-3.5 h-3.5" />
                <span>Cars (4W)</span>
              </button>
              <button
                onClick={() => setVehicleFilter("2w")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  vehicleFilter === "2w" ? "bg-amber-600 text-stone-950 font-bold" : "text-stone-300 hover:text-white"
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Bikes (2W)</span>
              </button>
            </div>
          </div>

          {/* Area dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-medium">Area:</span>
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="bg-stone-900 border border-stone-700 text-stone-200 text-xs rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-amber-500 focus:outline-none capitalize"
            >
              {areas.map((a) => (
                <option key={a} value={a}>
                  {a === "all" ? "All Neighborhoods" : a}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Parking Lot Cards Grid */}
        {loading ? (
          <div className="p-12 text-center text-stone-400 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-500" />
            Loading live parking telemetry across Chennai...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredLots.map((lot) => {
              const occupancy = lot.occupancyPercent || 0;
              const isHigh = occupancy > 85;
              const isMedium = occupancy > 60 && occupancy <= 85;

              return (
                <div
                  key={lot.id}
                  className="bg-stone-950 border border-stone-800 rounded-2xl p-4 flex flex-col justify-between hover:border-stone-700 transition-all hover:shadow-lg relative overflow-hidden group"
                  id={`parking-card-${lot.id}`}
                >
                  {/* Top area & status */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-semibold text-amber-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {lot.area}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          isHigh
                            ? "bg-rose-950/80 text-rose-300 border border-rose-800/80"
                            : isMedium
                            ? "bg-yellow-950/80 text-yellow-300 border border-yellow-800/80"
                            : "bg-emerald-950/80 text-emerald-300 border border-emerald-800/80"
                        }`}
                      >
                        {lot.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-stone-100 group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                      {lot.name}
                    </h3>
                    <div className="text-[11px] text-stone-400 mt-1 flex items-center gap-2">
                      <span>{lot.type}</span>
                      <span>•</span>
                      <span>{lot.distanceKm} km away</span>
                    </div>

                    {/* Occupancy bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-[11px] font-medium mb-1">
                        <span className="text-stone-400">Total Occupancy</span>
                        <span
                          className={
                            isHigh ? "text-rose-400 font-bold" : isMedium ? "text-yellow-400" : "text-emerald-400"
                          }
                        >
                          {occupancy}% Filled
                        </span>
                      </div>
                      <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isHigh ? "bg-rose-500" : isMedium ? "bg-yellow-500" : "bg-emerald-500"
                          }`}
                          style={{ width: `${occupancy}%` }}
                        />
                      </div>
                    </div>

                    {/* Slots breakdown */}
                    <div className="mt-4 grid grid-cols-2 gap-2 bg-stone-900/90 p-2.5 rounded-xl border border-stone-800">
                      <div>
                        <div className="flex items-center gap-1 text-[11px] text-stone-400">
                          <Car className="w-3.5 h-3.5 text-sky-400" />
                          <span>4-Wheeler</span>
                        </div>
                        <div className="text-base font-bold text-stone-100 mt-0.5">
                          {lot.available4W}{" "}
                          <span className="text-[10px] font-normal text-stone-400">
                            / {lot.totalSlots4W}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-1 text-[11px] text-stone-400">
                          <Bike className="w-3.5 h-3.5 text-amber-400" />
                          <span>2-Wheeler</span>
                        </div>
                        <div className="text-base font-bold text-stone-100 mt-0.5">
                          {lot.available2W}{" "}
                          <span className="text-[10px] font-normal text-stone-400">
                            / {lot.totalSlots2W}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block">Parking Rate</span>
                      <span className="text-xs font-bold text-amber-400">₹{lot.ratePerHour}/hr</span>
                    </div>

                    <button
                      onClick={() => handleHoldSpot(lot)}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-amber-600 hover:text-stone-950 text-stone-200 text-xs font-semibold border border-stone-700 transition-all flex items-center gap-1"
                      id={`hold-spot-btn-${lot.id}`}
                    >
                      <span>Hold Pass</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Spot Reservation Modal */}
        {reservedLot && reservationSlip && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-sm w-full p-6 text-stone-100 shadow-2xl relative animate-in fade-in zoom-in-95">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>

              <h3 className="text-center font-bold text-lg font-serif text-white">
                Parking Slip Confirmed
              </h3>
              <p className="text-center text-xs text-stone-400 mt-1">
                Your entry spot is temporarily held for 25 minutes.
              </p>

              {/* Digital Slip Box */}
              <div className="mt-5 p-4 rounded-xl bg-stone-950 border border-dashed border-stone-700">
                <div className="flex justify-between items-start text-xs border-b border-stone-800 pb-2 mb-2">
                  <div>
                    <span className="text-stone-500 block text-[10px]">FACILITY</span>
                    <span className="font-bold text-stone-200">{reservedLot.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-500 block text-[10px]">PASS REF</span>
                    <span className="font-mono font-bold text-amber-400">{reservationSlip.code}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs py-1">
                  <div>
                    <span className="text-stone-500 text-[10px] block">RATE</span>
                    <span className="text-stone-200 font-semibold">₹{reservedLot.ratePerHour}/hour</span>
                  </div>
                  <div>
                    <span className="text-stone-500 text-[10px] block">ISSUED AT</span>
                    <span className="text-stone-200 font-semibold">{reservationSlip.time}</span>
                  </div>
                </div>

                {/* Simulated QR Code */}
                <div className="mt-3 flex items-center justify-center p-2 rounded-lg bg-stone-900 border border-stone-800">
                  <QrCode className="w-16 h-16 text-amber-400" />
                </div>
                <p className="text-[10px] text-center text-stone-500 mt-1">
                  Scan at automated barrier boom or show to lot attendant
                </p>
              </div>

              <button
                onClick={() => {
                  setReservedLot(null);
                  setReservationSlip(null);
                }}
                className="mt-5 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-colors"
              >
                Done & Close Pass
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
