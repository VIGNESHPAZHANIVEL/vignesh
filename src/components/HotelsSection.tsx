import React, { useState } from "react";
import {
  Hotel as HotelIcon,
  MapPin,
  Star,
  CheckCircle,
  Calendar,
  Users,
  IndianRupee,
  Plane,
  Train,
  Check,
  QrCode,
  X,
  BedDouble,
} from "lucide-react";
import { Hotel, HotelBooking } from "../types";
import { HOTELS_DATA } from "../data/chennaiData";

interface HotelsSectionProps {
  searchQuery: string;
  onHotelBooked: (booking: HotelBooking) => void;
}

export const HotelsSection: React.FC<HotelsSectionProps> = ({
  searchQuery,
  onHotelBooked,
}) => {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [bookingHotel, setBookingHotel] = useState<Hotel | null>(null);

  // Booking form state
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split("T")[0]);
  const [checkOut, setCheckOut] = useState(
    new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0]
  );
  const [selectedRoomIdx, setSelectedRoomIdx] = useState(0);
  const [guestsCount, setGuestsCount] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);
  const [confirmedBooking, setConfirmedBooking] = useState<HotelBooking | null>(null);

  const types = ["All", "Luxury 5-Star", "Boutique & Mid-Range", "Heritage", "Budget & Hostel"];

  const filteredHotels = HOTELS_DATA.filter((h) => {
    const matchesType = selectedType === "All" || h.type === selectedType;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      h.name.toLowerCase().includes(q) ||
      h.area.toLowerCase().includes(q) ||
      h.description.toLowerCase().includes(q);

    return matchesType && matchesSearch;
  });

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    return isNaN(diff) ? 1 : diff;
  };

  const nights = calculateNights();
  const activeRoom = bookingHotel ? bookingHotel.roomTypes[selectedRoomIdx] || bookingHotel.roomTypes[0] : null;
  const roomRate = activeRoom ? activeRoom.price : (bookingHotel?.pricePerNight || 0);
  const baseTotal = roomRate * nights * roomsCount;
  const gst = Math.round(baseTotal * 0.12);
  const grandTotal = baseTotal + gst;

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingHotel || !guestName || !guestEmail || !guestPhone) return;

    const newBooking: HotelBooking = {
      id: `HTL-${Date.now()}`,
      hotelId: bookingHotel.id,
      hotelName: bookingHotel.name,
      roomType: activeRoom ? activeRoom.name : "Deluxe Room",
      checkIn,
      checkOut,
      guests: guestsCount,
      rooms: roomsCount,
      totalPrice: grandTotal,
      guestName,
      guestEmail,
      guestPhone,
      bookingRef: `CHN-HTL-${Math.floor(100000 + Math.random() * 900000)}`,
      status: "Confirmed",
    };

    onHotelBooked(newBooking);
    setConfirmedBooking(newBooking);
  };

  const handleCloseModal = () => {
    setBookingHotel(null);
    setConfirmedBooking(null);
    setGuestName("");
    setGuestEmail("");
    setGuestPhone("");
  };

  return (
    <section id="hotels-section" className="py-12 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold mb-2">
              <HotelIcon className="w-3.5 h-3.5" />
              <span>Hospitality & Accommodations</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              Accommodation & Hotels
            </h2>
            <p className="text-stone-400 text-sm sm:text-base mt-1">
              Stay at the best hotels, hostels, and guesthouses. Book your stay directly through our site.
            </p>
          </div>

          <div className="text-xs text-stone-400 bg-stone-950 border border-stone-800 px-3 py-1.5 rounded-xl">
            Showing <strong className="text-amber-400">{filteredHotels.length}</strong> vetted accommodations
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedType === type
                  ? "bg-amber-600 text-stone-950 font-bold shadow-md shadow-amber-950/20"
                  : "bg-stone-950 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-stone-700 hover:shadow-xl transition-all group"
              id={`hotel-card-${hotel.id}`}
            >
              <div>
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-stone-800">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/30" />

                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/30">
                    {hotel.type}
                  </span>

                  <div className="absolute bottom-3 right-3 text-right">
                    <span className="text-[10px] text-stone-300 block">From</span>
                    <span className="text-lg font-bold text-amber-400">
                      ₹{hotel.pricePerNight.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-stone-400">/night</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-bold text-base text-stone-100 group-hover:text-amber-400 transition-colors leading-snug">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{hotel.rating}</span>
                      <span className="text-[10px] text-stone-500 font-normal">
                        ({hotel.reviewsCount})
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-stone-400 flex items-center gap-1 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">{hotel.area}</span>
                  </div>

                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed mb-3">
                    {hotel.description}
                  </p>

                  {/* Proximity */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-400 mb-3 bg-stone-900/80 p-2 rounded-xl border border-stone-800">
                    <div className="flex items-center gap-1">
                      <Plane className="w-3 h-3 text-sky-400 shrink-0" />
                      <span className="truncate">Airport: {hotel.distanceToAirport}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Train className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">Central: {hotel.distanceToCentral}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-stone-900 text-stone-300 text-[10px] border border-stone-800"
                      >
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Booking CTA */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => {
                    setBookingHotel(hotel);
                    setSelectedRoomIdx(0);
                  }}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                  id={`book-hotel-btn-${hotel.id}`}
                >
                  <Calendar className="w-3.5 h-3.5 text-stone-950" />
                  <span>Book Stay Directly</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Direct Booking Modal */}
        {bookingHotel && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 text-stone-100 shadow-2xl relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {!confirmedBooking ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                      <BedDouble className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base font-serif text-white">
                        Direct Booking: {bookingHotel.name}
                      </h3>
                      <p className="text-xs text-stone-400">{bookingHotel.area} • Official Direct Reservation</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmitBooking} className="space-y-3.5 text-xs">
                    {/* Room selection */}
                    <div>
                      <label className="block text-stone-300 font-medium mb-1">Select Room Tier</label>
                      <div className="space-y-1.5">
                        {bookingHotel.roomTypes.map((room, idx) => (
                          <label
                            key={idx}
                            className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
                              selectedRoomIdx === idx
                                ? "bg-amber-950/40 border-amber-600 text-stone-100"
                                : "bg-stone-950 border-stone-800 text-stone-300"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="roomType"
                                checked={selectedRoomIdx === idx}
                                onChange={() => setSelectedRoomIdx(idx)}
                                className="accent-amber-500"
                              />
                              <div>
                                <span className="font-semibold block">{room.name}</span>
                                <span className="text-[10px] text-stone-500">{room.capacity}</span>
                              </div>
                            </div>
                            <span className="font-bold text-amber-400">
                              ₹{room.price.toLocaleString()}/nt
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Check-in Date</label>
                        <input
                          type="date"
                          required
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Check-out Date</label>
                        <input
                          type="date"
                          required
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    {/* Guests & Rooms */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Rooms</label>
                        <select
                          value={roomsCount}
                          onChange={(e) => setRoomsCount(Number(e.target.value))}
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:ring-1 focus:ring-amber-500"
                        >
                          {[1, 2, 3, 4].map((r) => (
                            <option key={r} value={r}>
                              {r} {r === 1 ? "Room" : "Rooms"}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Guests</label>
                        <select
                          value={guestsCount}
                          onChange={(e) => setGuestsCount(Number(e.target.value))}
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:ring-1 focus:ring-amber-500"
                        >
                          {[1, 2, 3, 4, 5, 6].map((g) => (
                            <option key={g} value={g}>
                              {g} {g === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Guest Contact */}
                    <div>
                      <label className="block text-stone-300 font-medium mb-1">Primary Guest Full Name</label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Ananya Sundaram"
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:ring-1 focus:ring-amber-500"
                        id="hotel-guest-name-input"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="ananya@example.com"
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:ring-1 focus:ring-amber-500"
                          id="hotel-guest-email-input"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-300 font-medium mb-1">Mobile Number</label>
                        <input
                          type="tel"
                          required
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          placeholder="+91 98400 54321"
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-stone-100 focus:ring-1 focus:ring-amber-500"
                          id="hotel-guest-phone-input"
                        />
                      </div>
                    </div>

                    {/* Pricing summary */}
                    <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-1 text-xs">
                      <div className="flex justify-between text-stone-400">
                        <span>Stay Duration:</span>
                        <span className="text-stone-200">{nights} {nights === 1 ? "Night" : "Nights"}</span>
                      </div>
                      <div className="flex justify-between text-stone-400">
                        <span>Base Rate:</span>
                        <span className="text-stone-200">₹{baseTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-stone-400">
                        <span>Taxes & GST (12%):</span>
                        <span className="text-stone-200">₹{gst.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-amber-400 font-bold text-sm pt-1 border-t border-stone-800">
                        <span>Total Payable at Hotel:</span>
                        <span>₹{grandTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs mt-3 transition-colors"
                      id="confirm-hotel-booking-btn"
                    >
                      Confirm Direct Stay Reservation (Pay at Property)
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-2 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg font-serif text-white">Booking Confirmed!</h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Your stay at <span className="text-amber-400 font-semibold">{confirmedBooking.hotelName}</span> is reserved.
                  </p>

                  <div className="mt-4 p-4 rounded-xl bg-stone-950 border border-dashed border-stone-700 text-left text-xs space-y-2">
                    <div className="flex justify-between border-b border-stone-800 pb-2">
                      <span className="text-stone-400">Voucher Reference:</span>
                      <span className="font-mono font-bold text-amber-400">{confirmedBooking.bookingRef}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Guest Name:</span>
                      <span className="text-stone-200 font-semibold">{confirmedBooking.guestName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Room Category:</span>
                      <span className="text-stone-200">{confirmedBooking.roomType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Dates:</span>
                      <span className="text-stone-200">
                        {confirmedBooking.checkIn} to {confirmedBooking.checkOut}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Total Amount:</span>
                      <span className="text-amber-400 font-bold">₹{confirmedBooking.totalPrice.toLocaleString()} (Pay on Arrival)</span>
                    </div>

                    <div className="pt-2 flex justify-center">
                      <QrCode className="w-16 h-16 text-amber-400" />
                    </div>
                    <p className="text-[10px] text-center text-stone-500">
                      Show this confirmation voucher at check-in reception desk
                    </p>
                  </div>

                  <button
                    onClick={handleCloseModal}
                    className="mt-5 w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-colors"
                  >
                    Done & View Voucher
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
