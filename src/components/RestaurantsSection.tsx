import React, { useState } from "react";
import {
  Utensils,
  MapPin,
  Clock,
  Star,
  Check,
  Calendar,
  Users,
  IndianRupee,
  Sparkles,
  Award,
  CheckCircle,
  QrCode,
  X,
} from "lucide-react";
import { Restaurant, TableReservation } from "../types";
import { RESTAURANTS_DATA } from "../data/chennaiData";

interface RestaurantsSectionProps {
  searchQuery: string;
  onTableReserved: (reservation: TableReservation) => void;
  onLocateOnMap?: (id: string) => void;
}

export const RestaurantsSection: React.FC<RestaurantsSectionProps> = ({
  searchQuery,
  onTableReserved,
  onLocateOnMap,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPrice, setSelectedPrice] = useState<string>("All");
  const [reservingRestaurant, setReservingRestaurant] = useState<Restaurant | null>(null);

  // Modal form state
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [reserveDate, setReserveDate] = useState(new Date().toISOString().split("T")[0]);
  const [reserveTime, setReserveTime] = useState("13:00");
  const [guestCount, setGuestCount] = useState(2);
  const [specialRequest, setSpecialRequest] = useState("Traditional Banana Leaf Seating");
  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(null);

  const categories = ["All", "Veg", "Non-Veg", "Seafood", "Cafe", "Tiffin & Coffee"];
  const priceRanges = ["All", "₹", "₹₹", "₹₹₹"];

  const filteredRestaurants = RESTAURANTS_DATA.filter((r) => {
    const matchesCat = selectedCategory === "All" || r.category === selectedCategory;
    const matchesPrice = selectedPrice === "All" || r.priceRange === selectedPrice;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.famousFor.toLowerCase().includes(q) ||
      r.area.toLowerCase().includes(q);

    return matchesCat && matchesPrice && matchesSearch;
  });

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservingRestaurant || !guestName || !guestPhone) return;

    const newReservation: TableReservation = {
      id: `RES-${Date.now()}`,
      restaurantId: reservingRestaurant.id,
      restaurantName: reservingRestaurant.name,
      date: reserveDate,
      time: reserveTime,
      guests: guestCount,
      name: guestName,
      phone: guestPhone,
      specialRequest,
      status: "Confirmed",
      bookingRef: `CHN-TB-${Math.floor(10000 + Math.random() * 90000)}`,
    };

    onTableReserved(newReservation);
    setConfirmedReservation(newReservation);
  };

  const handleCloseModal = () => {
    setReservingRestaurant(null);
    setConfirmedReservation(null);
    setGuestName("");
    setGuestPhone("");
  };

  return (
    <section id="restaurants-section" className="py-12 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-2">
              <Utensils className="w-3.5 h-3.5" />
              <span>Culinary Heritage of Madras</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Restaurant Options
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-1">
              Browse restaurants by cuisine, price range, and ratings. Reserve your table at top eateries.
            </p>
          </div>

          <div className="text-xs text-stone-400 bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-xl">
            Showing <strong className="text-amber-400">{filteredRestaurants.length}</strong> top culinary hotspots
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-stone-950/60 border border-stone-800">
          {/* Cuisine Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-xs text-stone-400 mr-1 font-medium">Cuisine:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-600 text-stone-950 font-bold"
                    : "bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price Filters */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-stone-400 mr-1 font-medium">Price:</span>
            {priceRanges.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPrice(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedPrice === p
                    ? "bg-amber-600 text-stone-950 font-bold"
                    : "bg-stone-900 text-stone-300 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Restaurant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-stone-700 hover:shadow-xl transition-all group"
              id={`restaurant-card-${restaurant.id}`}
            >
              <div>
                {/* Image */}
                <div className="relative h-44 w-full overflow-hidden bg-stone-800">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />

                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/30">
                    {restaurant.category}
                  </span>

                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-xs font-bold bg-amber-600 text-stone-950">
                    {restaurant.priceRange}
                  </span>
                </div>

                {/* Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-sm text-stone-100 group-hover:text-amber-400 transition-colors leading-snug">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{restaurant.rating}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-stone-400 flex items-center gap-1 mb-2">
                    <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                    <span className="truncate">{restaurant.area}</span>
                  </div>

                  <p className="text-xs text-amber-200/90 italic line-clamp-2 mb-3 bg-amber-950/20 p-2 rounded-lg border border-amber-900/30">
                    &ldquo;{restaurant.famousFor}&rdquo;
                  </p>

                  <div className="text-[11px] text-stone-400 mb-3 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-stone-500" />
                      <span>{restaurant.timings}</span>
                    </div>
                  </div>

                  {/* Menu highlights */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {restaurant.menuHighlights.slice(0, 3).map((item, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-stone-900 text-stone-300 text-[10px] border border-stone-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 pt-0 flex items-center gap-2">
                <button
                  onClick={() => setReservingRestaurant(restaurant)}
                  className="flex-1 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                  id={`reserve-table-btn-${restaurant.id}`}
                >
                  <Calendar className="w-3.5 h-3.5 text-stone-950" />
                  <span>Reserve Table</span>
                </button>

                {onLocateOnMap && (
                  <button
                    onClick={() => onLocateOnMap(`restaurant-${restaurant.id}`)}
                    className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 border border-stone-700 transition"
                    title="View restaurant on Google Map"
                  >
                    <MapPin className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Table Reservation Modal */}
        {reservingRestaurant && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-md w-full p-6 text-stone-100 shadow-2xl relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {!confirmedReservation ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base font-serif text-white">
                        Reserve Table at {reservingRestaurant.name}
                      </h3>
                      <p className="text-xs text-stone-400">{reservingRestaurant.area} • Instant Digital Confirmation</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitReservation} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block text-stone-300 font-medium mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        id="reserve-guest-name-input"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+91 98400 12345"
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          id="reserve-guest-phone-input"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Number of Guests</label>
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Date</label>
                        <input
                          type="date"
                          required
                          value={reserveDate}
                          onChange={(e) => setReserveDate(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Time Slot</label>
                        <select
                          value={reserveTime}
                          onChange={(e) => setReserveTime(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        >
                          <option value="08:00">08:00 AM (Breakfast / Tiffin)</option>
                          <option value="09:30">09:30 AM (Morning Tiffin)</option>
                          <option value="12:30">12:30 PM (Lunch)</option>
                          <option value="13:30">01:30 PM (Lunch)</option>
                          <option value="19:30">07:30 PM (Dinner)</option>
                          <option value="20:30">08:30 PM (Dinner)</option>
                          <option value="21:30">09:30 PM (Late Dinner)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-stone-300 font-medium mb-1">Seating Preference</label>
                      <select
                        value={specialRequest}
                        onChange={(e) => setSpecialRequest(e.target.value)}
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        <option value="Traditional Banana Leaf Seating">Traditional Banana Leaf Seating</option>
                        <option value="Air-Conditioned Family Section">Air-Conditioned Family Section</option>
                        <option value="Window Booth Seating">Window Booth Seating</option>
                        <option value="Anniversary / Birthday Special">Anniversary / Birthday Special</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs mt-4 transition-colors"
                      id="submit-table-booking-btn"
                    >
                      Confirm Table Reservation (Free)
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-2 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg font-serif text-white">Table Reserved!</h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Your table at <span className="text-amber-400 font-semibold">{confirmedReservation.restaurantName}</span> is confirmed.
                  </p>

                  <div className="mt-4 p-4 rounded-xl bg-stone-950 border border-dashed border-stone-700 text-left text-xs space-y-2">
                    <div className="flex justify-between border-b border-stone-800 pb-2">
                      <span className="text-stone-400">Confirmation Code:</span>
                      <span className="font-mono font-bold text-amber-400">{confirmedReservation.bookingRef}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Date & Time:</span>
                      <span className="text-stone-200">{confirmedReservation.date} at {confirmedReservation.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Guests:</span>
                      <span className="text-stone-200">{confirmedReservation.guests} Persons</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Seating:</span>
                      <span className="text-stone-200">{confirmedReservation.specialRequest}</span>
                    </div>

                    <div className="pt-2 flex justify-center">
                      <QrCode className="w-16 h-16 text-amber-400" />
                    </div>
                  </div>

                  <button
                    onClick={handleCloseModal}
                    className="mt-5 w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
