/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Coordinates, MapMarkerItem } from "../types";
import {
  PLACES_DATA,
  RESTAURANTS_DATA,
  SHOPPING_DATA,
  HOTELS_DATA,
  TRANSIT_HUBS,
} from "./chennaiData";

export const CHENNAI_DEFAULT_CENTER: Coordinates = {
  lat: 13.0475,
  lng: 80.2520,
};

// High precision Chennai geographical coordinates
export const CHENNAI_COORDINATES: Record<string, Coordinates> = {
  // Attractions
  "marina-beach": { lat: 13.0499, lng: 80.2824 },
  "kapaleeshwarar-temple": { lat: 13.0334, lng: 80.2699 },
  "san-thome-cathedral": { lat: 13.0337, lng: 80.2785 },
  "fort-st-george": { lat: 13.0797, lng: 80.2871 },
  "government-museum-egmore": { lat: 13.0732, lng: 80.2608 },
  "dakshinachitra-heritage-museum": { lat: 12.8227, lng: 80.2415 },
  "guindy-national-park": { lat: 13.0067, lng: 80.2206 },
  "elliots-beach": { lat: 13.0001, lng: 80.2721 },
  "valluvar-kottam": { lat: 13.0528, lng: 80.2409 },
  "mahabalipuram-shore-temple": { lat: 12.6166, lng: 80.1983 },
  "parthasarathy-temple": { lat: 13.0538, lng: 80.2764 },
  "ashtalakshmi-temple": { lat: 12.9984, lng: 80.2728 },
  "marundeeswarar-temple": { lat: 12.9868, lng: 80.2605 },
  "vadapalani-murugan-temple": { lat: 13.0514, lng: 80.2121 },
  "kalikambal-temple": { lat: 13.0905, lng: 80.2882 },
  "st-thomas-mount": { lat: 13.0039, lng: 80.1925 },
  "madras-high-court": { lat: 13.0891, lng: 80.2884 },
  "ripon-building": { lat: 13.0827, lng: 80.2745 },
  "chennai-lighthouse": { lat: 13.0396, lng: 80.2801 },
  "armenian-church": { lat: 13.0898, lng: 80.2888 },
  "semmozhi-poonga": { lat: 13.0478, lng: 80.2520 },
  "chetpet-ecopark": { lat: 13.0722, lng: 80.2415 },
  "vandalur-zoo": { lat: 12.8797, lng: 80.0817 },
  "madras-crocodile-bank": { lat: 12.7562, lng: 80.2378 },
  "theosophical-society": { lat: 13.0116, lng: 80.2618 },
  "kalakshetra-foundation": { lat: 12.9902, lng: 80.2612 },
  "thiruvanmiyur-beach": { lat: 12.9825, lng: 80.2678 },
  "covelong-beach": { lat: 12.7915, lng: 80.2528 },
  "muttukadu-boat-house": { lat: 12.8197, lng: 80.2458 },
  "birla-planetarium": { lat: 13.0084, lng: 80.2418 },
  "vivekananda-house": { lat: 13.0489, lng: 80.2809 },
  "connemara-library": { lat: 13.0718, lng: 80.2612 },
  "anna-centenary-library": { lat: 13.0119, lng: 80.2365 },

  // Restaurants
  "murugan-idli-shop": { lat: 13.0402, lng: 80.2335 },
  "ratna-cafe": { lat: 13.0569, lng: 80.2741 },
  "buhari-hotel": { lat: 13.0642, lng: 80.2678 },
  "dindigul-thalappakatti": { lat: 13.0418, lng: 80.2341 },
  "annalakshmi-restaurant": { lat: 13.0711, lng: 80.2425 },
  "nair-mess": { lat: 13.0628, lng: 80.2798 },
  "amethyst-wild-garden": { lat: 13.0526, lng: 80.2587 },
  "rayars-mess": { lat: 13.0345, lng: 80.2682 },
  "saravana-bhavan": { lat: 13.0331, lng: 80.2694 },
  "sangeetha-veg": { lat: 13.0336, lng: 80.2698 },
  "grand-sweets": { lat: 13.0061, lng: 80.2562 },
  "anjappar-chettinad": { lat: 13.0415, lng: 80.2339 },
  "junior-kuppanna": { lat: 13.0422, lng: 80.2345 },
  "sea-emperor": { lat: 13.0492, lng: 80.2815 },
  "madras-fish-market": { lat: 12.9995, lng: 80.2723 },
  "copper-chimney": { lat: 13.0578, lng: 80.2461 },
  "writers-cafe": { lat: 13.0519, lng: 80.2536 },
  "cafe-g-chola": { lat: 13.0104, lng: 80.2208 },
  "hot-chips": { lat: 13.0408, lng: 80.2332 },
  "kailash-parbat": { lat: 13.0915, lng: 80.2785 },
  "pakwan-chennai": { lat: 13.0431, lng: 80.2378 },
  "dakshin-crowne": { lat: 13.0372, lng: 80.2519 },
  "southern-spice-taj": { lat: 13.0598, lng: 80.2452 },

  // Shopping & Supplies
  "apollo-pharmacy-greams": { lat: 13.0601, lng: 80.2514 },
  "kakani-medical-surgical": { lat: 13.0844, lng: 80.2745 },
  "medplus-healthcare-tnagar": { lat: 13.0415, lng: 80.2338 },
  "kauvery-pharmacy-alwarpet": { lat: 13.0381, lng: 80.2523 },
  "fortis-malar-pharmacy": { lat: 13.0072, lng: 80.2575 },
  "syed-bawkher-menswear": { lat: 13.0512, lng: 80.2520 },
  "pothys-swarna-mahal-men": { lat: 13.0412, lng: 80.2334 },
  "cotton-house-derby": { lat: 13.0409, lng: 80.2372 },
  "ramraj-cotton-tnagar": { lat: 13.0410, lng: 80.2375 },
  "raymond-flagship-mount-road": { lat: 13.0578, lng: 80.2592 },
  "nalli-silks-flagship": { lat: 13.0411, lng: 80.2336 },
  "rmkv-silks": { lat: 13.0425, lng: 80.2339 },
  "sundari-silks-mylapore": { lat: 13.0342, lng: 80.2687 },
  "kumaran-silks-flagship": { lat: 13.0418, lng: 80.2341 },
  "tulsi-silks-mylapore": { lat: 13.0351, lng: 80.2638 },
  "express-avenue-mall": { lat: 13.0587, lng: 80.2641 },
  "phoenix-marketcity-chennai": { lat: 12.9922, lng: 80.2170 },
  "vr-chennai-mall": { lat: 13.0844, lng: 80.1942 },
  "spencer-plaza": { lat: 13.0618, lng: 80.2612 },
  "forum-vijaya-mall": { lat: 13.0514, lng: 80.2121 },
  "pondy-bazaar-pedestrian": { lat: 13.0409, lng: 80.2372 },
  "sowcarpet-mint-street": { lat: 13.0912, lng: 80.2789 },
  "mylapore-tank-bazaar": { lat: 13.0334, lng: 80.2699 },
  "parrys-corner-bazaar": { lat: 13.0891, lng: 80.2884 },
  "moore-market-books": { lat: 13.0832, lng: 80.2762 },

  // Hotels
  "taj-coromandel": { lat: 13.0598, lng: 80.2452 },
  "itc-grand-chola": { lat: 13.0104, lng: 80.2208 },
  "the-leela-palace": { lat: 13.0189, lng: 80.2786 },
  "the-residency-towers": { lat: 13.0435, lng: 80.2384 },
  "broadlands-heritage-guesthouse": { lat: 13.0582, lng: 80.2719 },
  "zostel-chennai": { lat: 13.0445, lng: 80.2389 },
  "taj-fishermans-cove": { lat: 12.7915, lng: 80.2528 },
  "the-park-chennai": { lat: 13.0518, lng: 80.2514 },
  "hyatt-regency-chennai": { lat: 13.0441, lng: 80.2492 },
  "radisson-blu-grt": { lat: 12.9982, lng: 80.1872 },
  "hotel-savera": { lat: 13.0448, lng: 80.2588 },
  "the-accord-metropolitan": { lat: 13.0428, lng: 80.2415 },
  "clarion-hotel-president": { lat: 13.0442, lng: 80.2678 },
  "ginger-hotel-chennai": { lat: 12.9897, lng: 80.2493 },
  "ywca-international-guesthouse": { lat: 13.0789, lng: 80.2584 },
  "red-lantern-hostel": { lat: 13.0336, lng: 80.2783 },

  // Transit Hubs
  "central": { lat: 13.0827, lng: 80.2757 },
  "airport": { lat: 12.9818, lng: 80.1643 },
  "marina": { lat: 13.0499, lng: 80.2824 },
  "tnagar": { lat: 13.0411, lng: 80.2336 },
  "mylapore": { lat: 13.0334, lng: 80.2699 },
  "cmbt": { lat: 13.0694, lng: 80.2052 },
  "guindy": { lat: 13.0093, lng: 80.2132 },
  "omr": { lat: 12.9897, lng: 80.2493 },
  "besant": { lat: 13.0001, lng: 80.2721 },
  "egmore": { lat: 13.0784, lng: 80.2608 },
  "annanagar": { lat: 13.0844, lng: 80.1942 },
  "vadapalani": { lat: 13.0514, lng: 80.2121 },
  "tambaram": { lat: 12.9249, lng: 80.1276 },
  "highcourt": { lat: 13.0891, lng: 80.2884 },
  "chetpet": { lat: 13.0722, lng: 80.2415 },
  "mahabs": { lat: 12.6166, lng: 80.1983 },

  // Parking Lots
  "pk-1": { lat: 13.0412, lng: 80.2378 },
  "pk-2": { lat: 13.0827, lng: 80.2757 },
  "pk-3": { lat: 13.0485, lng: 80.2810 },
  "pk-4": { lat: 12.9922, lng: 80.2170 },
  "pk-5": { lat: 13.0334, lng: 80.2699 },
  "pk-6": { lat: 13.0001, lng: 80.2721 },
  "pk-7": { lat: 13.0694, lng: 80.2052 },
  "pk-8": { lat: 13.0587, lng: 80.2641 },
  "pk-9": { lat: 12.9822, lng: 80.1636 },
  "pk-10": { lat: 13.0844, lng: 80.1942 },
  "pk-11": { lat: 13.0782, lng: 80.2611 },
  "pk-12": { lat: 13.0888, lng: 80.2882 },
  "pk-13": { lat: 13.0514, lng: 80.2121 },
  "pk-14": { lat: 13.0336, lng: 80.2783 },
  "pk-15": { lat: 13.0566, lng: 80.2528 },
  "pk-16": { lat: 13.0067, lng: 80.2128 },
  "pk-17": { lat: 12.9825, lng: 80.2678 },
  "pk-18": { lat: 13.0119, lng: 80.2365 },
  "pk-19": { lat: 12.6166, lng: 80.1983 },
  "pk-20": { lat: 12.8797, lng: 80.0817 },
};

// Fallback Parking Lots data with coordinates
export const CHENNAI_PARKING_DATA = [
  { id: "pk-1", name: "Pondy Bazaar Multi-Level Parking (MLCP)", area: "T. Nagar", totalSlots4W: 240, occupied4W: 195, available4W: 45, totalSlots2W: 500, occupied2W: 380, available2W: 120, ratePerHour: 20, type: "Automated MLCP", distanceKm: 0.4, coordinates: CHENNAI_COORDINATES["pk-1"] },
  { id: "pk-2", name: "Chennai Central Railway Station MLCP", area: "Park Town / Central", totalSlots4W: 350, occupied4W: 290, available4W: 60, totalSlots2W: 600, occupied2W: 440, available2W: 160, ratePerHour: 30, type: "Multi-level covered", distanceKm: 1.2, coordinates: CHENNAI_COORDINATES["pk-2"] },
  { id: "pk-3", name: "Marina Beach Promenade Parking", area: "Kamarajar Salai", totalSlots4W: 400, occupied4W: 320, available4W: 80, totalSlots2W: 800, occupied2W: 610, available2W: 190, ratePerHour: 15, type: "Open Beachfront Bay", distanceKm: 0.2, coordinates: CHENNAI_COORDINATES["pk-3"] },
  { id: "pk-4", name: "Phoenix Marketcity Basement P1-P4", area: "Velachery", totalSlots4W: 1200, occupied4W: 940, available4W: 260, totalSlots2W: 1500, occupied2W: 1100, available2W: 400, ratePerHour: 40, type: "Mall Underground", distanceKm: 3.5, coordinates: CHENNAI_COORDINATES["pk-4"] },
  { id: "pk-5", name: "Kapaleeshwarar South Mada Street Parking", area: "Mylapore", totalSlots4W: 60, occupied4W: 55, available4W: 5, totalSlots2W: 180, occupied2W: 165, available2W: 15, ratePerHour: 20, type: "Designated Temple Bay", distanceKm: 0.1, coordinates: CHENNAI_COORDINATES["pk-5"] },
  { id: "pk-6", name: "Besant Nagar (Elliot's Beach) 6th Avenue", area: "Besant Nagar", totalSlots4W: 150, occupied4W: 110, available4W: 40, totalSlots2W: 350, occupied2W: 260, available2W: 90, ratePerHour: 20, type: "Civic Open Lot", distanceKm: 0.5, coordinates: CHENNAI_COORDINATES["pk-6"] },
  { id: "pk-7", name: "CMBT Koyambedu Bus Terminal Parking", area: "Koyambedu", totalSlots4W: 450, occupied4W: 310, available4W: 140, totalSlots2W: 900, occupied2W: 720, available2W: 180, ratePerHour: 25, type: "Transit Terminal Hub", distanceKm: 4.8, coordinates: CHENNAI_COORDINATES["pk-7"] },
  { id: "pk-8", name: "Express Avenue Mall Parking (Gate 2 & 3)", area: "Royapettah", totalSlots4W: 800, occupied4W: 620, available4W: 180, totalSlots2W: 1000, occupied2W: 780, available2W: 220, ratePerHour: 35, type: "Mall Basement", distanceKm: 1.8, coordinates: CHENNAI_COORDINATES["pk-8"] },
  { id: "pk-9", name: "Chennai Airport Aerohub West MLCP", area: "Meenambakkam", totalSlots4W: 1400, occupied4W: 980, available4W: 420, totalSlots2W: 800, occupied2W: 510, available2W: 290, ratePerHour: 50, type: "Airport Aerohub Multi-Level", distanceKm: 12.5, coordinates: CHENNAI_COORDINATES["pk-9"] },
  { id: "pk-10", name: "VR Chennai Multi-Level Basement Parking", area: "Anna Nagar", totalSlots4W: 1100, occupied4W: 780, available4W: 320, totalSlots2W: 1200, occupied2W: 890, available2W: 310, ratePerHour: 40, type: "Smart Basement Automated", distanceKm: 6.2, coordinates: CHENNAI_COORDINATES["pk-10"] },
  { id: "pk-11", name: "Chennai Egmore Railway Station Parking", area: "Egmore", totalSlots4W: 220, occupied4W: 185, available4W: 35, totalSlots2W: 450, occupied2W: 360, available2W: 90, ratePerHour: 25, type: "Railway Transit Lot", distanceKm: 1.5, coordinates: CHENNAI_COORDINATES["pk-11"] },
  { id: "pk-12", name: "High Court & Parry's Commercial Bay", area: "George Town", totalSlots4W: 180, occupied4W: 165, available4W: 15, totalSlots2W: 400, occupied2W: 350, available2W: 50, ratePerHour: 30, type: "Civic Commercial Lot", distanceKm: 2.1, coordinates: CHENNAI_COORDINATES["pk-12"] },
  { id: "pk-13", name: "Vadapalani Metro & Temple Park-and-Ride", area: "Vadapalani", totalSlots4W: 200, occupied4W: 155, available4W: 45, totalSlots2W: 420, occupied2W: 310, available2W: 110, ratePerHour: 20, type: "Transit Park & Ride", distanceKm: 3.8, coordinates: CHENNAI_COORDINATES["pk-13"] },
  { id: "pk-14", name: "San Thome Basilica Beach Parking Ground", area: "Santhome", totalSlots4W: 120, occupied4W: 85, available4W: 35, totalSlots2W: 280, occupied2W: 190, available2W: 90, ratePerHour: 20, type: "Open Coastal Bay", distanceKm: 1.0, coordinates: CHENNAI_COORDINATES["pk-14"] },
  { id: "pk-15", name: "Apollo Hospitals Greams Road Visitor MLCP", area: "Thousand Lights", totalSlots4W: 320, occupied4W: 295, available4W: 25, totalSlots2W: 400, occupied2W: 370, available2W: 30, ratePerHour: 30, type: "Hospital Automated MLCP", distanceKm: 1.9, coordinates: CHENNAI_COORDINATES["pk-15"] },
  { id: "pk-16", name: "Guindy Metro Park & Ride Station Hub", area: "Guindy", totalSlots4W: 280, occupied4W: 220, available4W: 60, totalSlots2W: 600, occupied2W: 480, available2W: 120, ratePerHour: 20, type: "Transit Metro Lot", distanceKm: 7.0, coordinates: CHENNAI_COORDINATES["pk-16"] },
  { id: "pk-17", name: "Thiruvanmiyur Beach Civic Car Bay", area: "Thiruvanmiyur", totalSlots4W: 160, occupied4W: 105, available4W: 55, totalSlots2W: 320, occupied2W: 210, available2W: 110, ratePerHour: 20, type: "Open Beach Parking", distanceKm: 4.2, coordinates: CHENNAI_COORDINATES["pk-17"] },
  { id: "pk-18", name: "Anna Centenary Library Underground Parking", area: "Kotturpuram", totalSlots4W: 300, occupied4W: 170, available4W: 130, totalSlots2W: 500, occupied2W: 290, available2W: 210, ratePerHour: 20, type: "Civic Library Underground", distanceKm: 3.9, coordinates: CHENNAI_COORDINATES["pk-18"] },
  { id: "pk-19", name: "Mahabalipuram Shore Temple Archaeological Lot", area: "Mahabalipuram", totalSlots4W: 500, occupied4W: 360, available4W: 140, totalSlots2W: 700, occupied2W: 490, available2W: 210, ratePerHour: 40, type: "ASI Heritage Tourist Lot", distanceKm: 42.0, coordinates: CHENNAI_COORDINATES["pk-19"] },
  { id: "pk-20", name: "Vandalur Zoo Mega Parking Complex", area: "Vandalur", totalSlots4W: 800, occupied4W: 530, available4W: 270, totalSlots2W: 1200, occupied2W: 780, available2W: 420, ratePerHour: 30, type: "Zoo Forest Park Lot", distanceKm: 28.0, coordinates: CHENNAI_COORDINATES["pk-20"] }
];

// Chennai Metro Stations key locations
export const CHENNAI_METRO_STATIONS = [
  { id: "metro-central", name: "Puratchi Thalaivar Dr. M.G. Ramachandran Central", line: "Interchange", area: "Central", coordinates: { lat: 13.0827, lng: 80.2757 }, terminalFor: "North-South & East-West", popularFor: "Suburban trains, long-distance railway, Ripon Building" },
  { id: "metro-airport", name: "Chennai International Airport Metro", line: "Blue", area: "Meenambakkam", coordinates: { lat: 12.9818, lng: 80.1643 }, terminalFor: "Blue Line South Terminal", popularFor: "Flight terminals T1, T2 & T4 passenger walkways" },
  { id: "metro-guindy", name: "Guindy Metro", line: "Blue", area: "Guindy", coordinates: { lat: 13.0093, lng: 80.2132 }, popularFor: "National Park, Race Course, Kathipara Junction" },
  { id: "metro-agdms", name: "AG-DMS (Teynampet) Metro", line: "Blue", area: "Teynampet", coordinates: { lat: 13.0441, lng: 80.2492 }, popularFor: "Anna Salai business corridor, Semmozhi Poonga garden" },
  { id: "metro-thousandlights", name: "Thousand Lights Metro", line: "Blue", area: "Royapettah", coordinates: { lat: 13.0583, lng: 80.2547 }, popularFor: "Express Avenue Mall, Apollo Hospital Greams Rd" },
  { id: "metro-govtestate", name: "Government Estate Metro", line: "Blue", area: "Island Grounds", coordinates: { lat: 13.0694, lng: 80.2751 }, popularFor: "Marina Beach access, Kalaivanar Arangam" },
  { id: "metro-highcourt", name: "High Court Metro", line: "Blue", area: "George Town", coordinates: { lat: 13.0891, lng: 80.2884 }, popularFor: "Madras High Court, Fort St. George, Broadway Bus stand" },
  { id: "metro-cmbt", name: "Koyambedu (CMBT) Metro", line: "Green", area: "Koyambedu", coordinates: { lat: 13.0694, lng: 80.2052 }, popularFor: "Asia's largest bus terminus, Vegetable wholesale market" },
  { id: "metro-vadapalani", name: "Vadapalani Metro", line: "Green", area: "Vadapalani", coordinates: { lat: 13.0514, lng: 80.2121 }, popularFor: "Vadapalani Murugan Temple, Forum Vijaya Mall, Film studios" },
  { id: "metro-egmore", name: "Chennai Egmore Metro", line: "Green", area: "Egmore", coordinates: { lat: 13.0784, lng: 80.2608 }, popularFor: "Egmore Railway Station, Government Museum & Art Gallery" },
  { id: "metro-alandur", name: "Alandur Metro (Elevated Double-Decker)", line: "Interchange", area: "Alandur", coordinates: { lat: 13.0039, lng: 80.2014 }, popularFor: "Major interchange hub between Blue Line and Green Line" }
];

// Metro Line Paths (Approximate coordinates connecting stations)
export const METRO_BLUE_LINE_PATH: Coordinates[] = [
  { lat: 13.0891, lng: 80.2884 }, // High Court
  { lat: 13.0827, lng: 80.2757 }, // Central
  { lat: 13.0694, lng: 80.2751 }, // Govt Estate
  { lat: 13.0583, lng: 80.2547 }, // Thousand Lights
  { lat: 13.0441, lng: 80.2492 }, // AG-DMS
  { lat: 13.0298, lng: 80.2355 }, // Nandanam
  { lat: 13.0189, lng: 80.2223 }, // Saidapet
  { lat: 13.0093, lng: 80.2132 }, // Guindy
  { lat: 13.0039, lng: 80.2014 }, // Alandur
  { lat: 12.9818, lng: 80.1643 }, // Airport
];

export const METRO_GREEN_LINE_PATH: Coordinates[] = [
  { lat: 13.0827, lng: 80.2757 }, // Central
  { lat: 13.0784, lng: 80.2608 }, // Egmore
  { lat: 13.0792, lng: 80.2365 }, // Kilpauk
  { lat: 13.0788, lng: 80.2263 }, // Shenoy Nagar
  { lat: 13.0722, lng: 80.1947 }, // Koyambedu
  { lat: 13.0694, lng: 80.2052 }, // CMBT
  { lat: 13.0514, lng: 80.2121 }, // Vadapalani
  { lat: 13.0333, lng: 80.2008 }, // Ashok Nagar
  { lat: 13.0039, lng: 80.2014 }, // Alandur
  { lat: 12.9942, lng: 80.1989 }, // St. Thomas Mount
];

/**
 * Returns all Chennai points of interest consolidated into unified MapMarkerItems
 */
export function getAllChennaiMapMarkers(liveParkingLots?: any[]): MapMarkerItem[] {
  const markers: MapMarkerItem[] = [];

  // Attractions
  PLACES_DATA.forEach((place) => {
    const coords = CHENNAI_COORDINATES[place.id] || place.coordinates;
    if (coords) {
      markers.push({
        id: `place-${place.id}`,
        title: place.name,
        subTitle: place.tamilName,
        category: "attraction",
        categoryLabel: place.category,
        area: place.area,
        coordinates: coords,
        rating: place.rating,
        image: place.image,
        info: place.timings + " • " + place.entryFee,
        extraBadge: place.category,
        dataRef: place,
      });
    }
  });

  // Restaurants
  RESTAURANTS_DATA.forEach((restaurant) => {
    const coords = CHENNAI_COORDINATES[restaurant.id] || restaurant.coordinates;
    if (coords) {
      markers.push({
        id: `restaurant-${restaurant.id}`,
        title: restaurant.name,
        subTitle: restaurant.cuisine,
        category: "restaurant",
        categoryLabel: restaurant.category + " Dining",
        area: restaurant.area,
        coordinates: coords,
        rating: restaurant.rating,
        image: restaurant.image,
        info: restaurant.priceRange + " • " + restaurant.famousFor,
        extraBadge: restaurant.category,
        dataRef: restaurant,
      });
    }
  });

  // Shopping Spots
  SHOPPING_DATA.forEach((shop) => {
    const coords = CHENNAI_COORDINATES[shop.id] || shop.coordinates;
    if (coords) {
      markers.push({
        id: `shopping-${shop.id}`,
        title: shop.name,
        subTitle: shop.specialties[0] || shop.area,
        category: "shopping",
        categoryLabel: shop.category,
        area: shop.area,
        coordinates: coords,
        rating: shop.rating,
        image: shop.image,
        info: shop.timings + " • " + shop.priceLevel,
        extraBadge: shop.category,
        dataRef: shop,
      });
    }
  });

  // Hotels
  HOTELS_DATA.forEach((hotel) => {
    const coords = CHENNAI_COORDINATES[hotel.id] || hotel.coordinates;
    if (coords) {
      markers.push({
        id: `hotel-${hotel.id}`,
        title: hotel.name,
        subTitle: hotel.type,
        category: "hotel",
        categoryLabel: hotel.type,
        area: hotel.area,
        coordinates: coords,
        rating: hotel.rating,
        image: hotel.image,
        info: `From ₹${hotel.pricePerNight.toLocaleString("en-IN")}/night • ${hotel.amenities[0]}`,
        extraBadge: hotel.type,
        dataRef: hotel,
      });
    }
  });

  // Parking Lots
  const lots = liveParkingLots && liveParkingLots.length > 0 ? liveParkingLots : CHENNAI_PARKING_DATA;
  lots.forEach((lot) => {
    const coords = CHENNAI_COORDINATES[lot.id] || lot.coordinates;
    if (coords) {
      const avail4W = lot.available4W !== undefined ? lot.available4W : (lot.totalSlots4W - lot.occupied4W);
      markers.push({
        id: `parking-${lot.id}`,
        title: lot.name,
        subTitle: `Rate: ₹${lot.ratePerHour}/hr • ${lot.type}`,
        category: "parking",
        categoryLabel: "Live Parking",
        area: lot.area,
        coordinates: coords,
        info: `${avail4W} 4W slots available • ${lot.status || "Live Telemetry"}`,
        extraBadge: `${avail4W} Free`,
        dataRef: lot,
      });
    }
  });

  // Metro Stations
  CHENNAI_METRO_STATIONS.forEach((station) => {
    markers.push({
      id: `metro-${station.id}`,
      title: station.name,
      subTitle: `${station.line} Line • ${station.popularFor}`,
      category: "metro",
      categoryLabel: "Chennai Metro Station",
      area: station.area,
      coordinates: station.coordinates,
      info: station.terminalFor || `Fast connectivity across Chennai`,
      extraBadge: `${station.line} Line`,
      dataRef: station,
    });
  });

  return markers;
}

/**
 * Generate standard Google Maps Directions URL
 */
export function getDirectionsUrl(lat: number, lng: number, label?: string): string {
  const encodedLabel = label ? encodeURIComponent(label) : "";
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=&travelmode=transit${encodedLabel ? `&destination_name=${encodedLabel}` : ""}`;
}

/**
 * Generate Google Maps Search URL
 */
export function getPlaceSearchUrl(name: string, area: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${area}, Chennai, Tamil Nadu, India`)}`;
}
