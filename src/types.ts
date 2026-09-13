export type ActiveTab =
  | "all"
  | "explore"
  | "transport"
  | "parking"
  | "places"
  | "restaurants"
  | "shopping"
  | "hotels"
  | "planner";

export interface Place {
  id: string;
  name: string;
  tamilName: string;
  category: "Historic" | "Beaches" | "Temples" | "Culture" | "Parks" | "Hidden Gem";
  rating: number;
  reviewsCount: number;
  image: string;
  area: string;
  timings: string;
  entryFee: string;
  description: string;
  highlights: string[];
  tips: string;
  nearestMetro?: string;
  audioGuideAvailable: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  category: "Veg" | "Non-Veg" | "Seafood" | "Cafe" | "Tiffin & Coffee";
  priceRange: "₹" | "₹₹" | "₹₹₹" | "₹₹₹₹";
  rating: number;
  reviewsCount: number;
  image: string;
  area: string;
  famousFor: string;
  timings: string;
  address: string;
  features: string[];
  menuHighlights: string[];
}

export interface ShoppingSpot {
  id: string;
  name: string;
  category: "Medical Supplies" | "Men's Wear" | "Women's Wear" | "Shopping Malls" | "Street Markets";
  area: string;
  rating: number;
  reviewsCount?: number;
  image: string;
  description: string;
  specialties: string[];
  timings: string;
  priceLevel: "Budget" | "Moderate" | "Premium" | "Luxury";
  address: string;
  bargainFriendly: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  type: "Luxury 5-Star" | "Heritage" | "Boutique & Mid-Range" | "Budget & Hostel";
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  image: string;
  area: string;
  amenities: string[];
  distanceToAirport: string;
  distanceToCentral: string;
  description: string;
  roomTypes: { name: string; price: number; capacity: string }[];
}

export interface ParkingLot {
  id: string;
  name: string;
  area: string;
  totalSlots4W: number;
  occupied4W: number;
  available4W: number;
  totalSlots2W: number;
  occupied2W: number;
  available2W: number;
  ratePerHour: number;
  type: string;
  distanceKm: number;
  status: "Available" | "Filling Fast" | "Almost Full";
  occupancyPercent?: number;
  lastUpdated?: string;
}

export interface MetroStation {
  name: string;
  line: "Blue" | "Green" | "Interchange";
  terminalFor?: string;
  popularFor: string;
}

export interface ItineraryDayActivity {
  time: string;
  title?: string;
  activity?: string;
  location: string;
  description: string;
  type?: "visit" | "food" | "transport" | "shopping";
}

export interface ItineraryDay {
  day?: number;
  dayNumber?: number;
  title: string;
  theme: string;
  activities: ItineraryDayActivity[];
}

export interface Itinerary {
  id: string;
  title: string;
  subtitle?: string;
  duration?: string;
  pace?: string;
  description?: string;
  days: ItineraryDay[];
}

export interface TableReservation {
  id: string;
  restaurantId: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
  specialRequest?: string;
  status: "Confirmed";
  bookingRef: string;
}

export interface HotelBooking {
  id: string;
  hotelId: string;
  hotelName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  totalPrice: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  bookingRef: string;
  status: "Confirmed";
}

export interface SavedTripItem {
  id: string;
  type: "place" | "restaurant" | "hotel" | "shopping";
  title: string;
  category: string;
  area: string;
  preferredTime?: string;
  notes?: string;
}

export type ItineraryItem = SavedTripItem;

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp: string;
}
