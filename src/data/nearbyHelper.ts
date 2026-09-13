/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Place, Restaurant, ShoppingSpot, Hotel, ParkingLot, PlaceTransitInfo } from "../types";
import {
  PLACES_DATA,
  RESTAURANTS_DATA,
  SHOPPING_DATA,
  HOTELS_DATA,
  TRANSIT_HUBS,
  DEFAULT_PARKING_LOTS,
} from "./chennaiData";
import { CHENNAI_COORDINATES } from "./mapLocations";

// Helper function to calculate great-circle distance in kilometers
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export interface NearbyPlaceContext {
  place: Place;
  placeCoords?: { lat: number; lng: number };
  transitInfo: PlaceTransitInfo;
  nearestTransitHub?: {
    id: string;
    name: string;
    distanceKm: number;
    metroLine: string;
  };
  nearbyParkingLots: Array<{
    lot: ParkingLot;
    distanceKm: number;
  }>;
  nearbyRestaurants: Array<{
    restaurant: Restaurant;
    distanceKm: number;
  }>;
  nearbyShopping: Array<{
    spot: ShoppingSpot;
    distanceKm: number;
  }>;
  nearbyHotels: Array<{
    hotel: Hotel;
    distanceKm: number;
  }>;
  suggestedItineraryTimeSlot: {
    idealTimeOfDay: string;
    duration: string;
    recommendedSequence: string;
    travelTip: string;
  };
}

export const PLACE_TRANSIT_DATA: Record<string, PlaceTransitInfo> = {
  "marina-beach": {
    nearestMetroStation: "Government Estate Metro (Blue Line)",
    metroLine: "Blue Line",
    metroDistance: "1.8 km",
    walkingTime: "18 min walk or 5 min share auto",
    busRoutes: ["21G", "12B", "11G", "29C", "102", "PP21", "13B"],
    nearestBusStop: "Kannagi Statue / Marina Beach Promenade Stop",
    suburbanOrMRTS: "Light House MRTS Station (350m, 4 min walk)",
    autoCabFares: {
      fromCentral: "₹70 – ₹90 (Auto) / ₹170 (Cab)",
      fromAirport: "₹280 – ₹350 (Auto) / ₹450 (Cab)",
      fromTNagar: "₹120 – ₹160 (Auto) / ₹240 (Cab)",
    },
    navigationAdvice: "Direct access along Kamarajar Salai (Beach Road). For quick access during evening rush, take the Light House MRTS train or exit at Govt Estate Metro.",
  },
  "kapaleeshwarar-temple": {
    nearestMetroStation: "AG-DMS (Blue Line) / Teynampet",
    metroLine: "Blue Line",
    metroDistance: "2.2 km",
    walkingTime: "6 min feeder auto ride",
    busRoutes: ["12B", "21G", "29C", "5B", "M12", "11G"],
    nearestBusStop: "Mylapore Tank / Luz Corner Stop (150m)",
    suburbanOrMRTS: "Thirumayilai MRTS Railway Station (400m, 5 min walk)",
    autoCabFares: {
      fromCentral: "₹90 – ₹120 (Auto) / ₹220 (Cab)",
      fromAirport: "₹240 – ₹300 (Auto) / ₹420 (Cab)",
      fromTNagar: "₹80 – ₹110 (Auto) / ₹190 (Cab)",
    },
    navigationAdvice: "Walk 400m west from Thirumayilai MRTS station. Vehicles are restricted on temple mada streets during festival days; park at Kapaleeshwarar South Mada lot.",
  },
  "san-thome-cathedral": {
    nearestMetroStation: "Thousand Lights (Blue Line)",
    metroLine: "Blue Line",
    metroDistance: "3.0 km",
    walkingTime: "8 min auto ride",
    busRoutes: ["21G", "102", "6D", "PP21", "12B"],
    nearestBusStop: "Santhome Church Stop (Opposite Cathedral Gates)",
    suburbanOrMRTS: "Thirumayilai MRTS Station (950m, 12 min walk)",
    autoCabFares: {
      fromCentral: "₹100 – ₹130 (Auto) / ₹240 (Cab)",
      fromAirport: "₹260 – ₹320 (Auto) / ₹440 (Cab)",
      fromTNagar: "₹110 – ₹140 (Auto) / ₹220 (Cab)",
    },
    navigationAdvice: "Situated right on Santhome High Road along the coastline. Free parking in church courtyard for visitors.",
  },
  "fort-st-george": {
    nearestMetroStation: "High Court Metro Station (Blue Line)",
    metroLine: "Blue Line",
    metroDistance: "800 meters",
    walkingTime: "9 min walk via Rajaji Salai",
    busRoutes: ["1A", "21G", "11G", "17D", "102"],
    nearestBusStop: "Secretariat / Fort St. George Bus Stand",
    suburbanOrMRTS: "Chennai Fort Railway Station (450m)",
    autoCabFares: {
      fromCentral: "₹50 – ₹70 (Auto) / ₹140 (Cab)",
      fromAirport: "₹320 – ₹400 (Auto) / ₹520 (Cab)",
      fromTNagar: "₹150 – ₹190 (Auto) / ₹300 (Cab)",
    },
    navigationAdvice: "High Court Metro is within easy walking distance. Bring original government photo ID for military checkpoint security.",
  },
  "government-museum-egmore": {
    nearestMetroStation: "Egmore Metro Station (Green Line)",
    metroLine: "Green Line",
    metroDistance: "750 meters",
    walkingTime: "8 min walk via Pantheon Road",
    busRoutes: ["17D", "27B", "29A", "22", "11G"],
    nearestBusStop: "Egmore Museum / Pantheon Road Bus Stop",
    suburbanOrMRTS: "Chennai Egmore Railway Station (900m)",
    autoCabFares: {
      fromCentral: "₹60 – ₹80 (Auto) / ₹160 (Cab)",
      fromAirport: "₹260 – ₹320 (Auto) / ₹450 (Cab)",
      fromTNagar: "₹90 – ₹120 (Auto) / ₹200 (Cab)",
    },
    navigationAdvice: "Direct Green Line Metro connection to Central and Koyambedu. Covered parking available inside the museum grounds.",
  },
  "dakshinachitra-heritage-museum": {
    nearestMetroStation: "Guindy / Airport Metro (Then ECR Express)",
    metroLine: "ECR Express Corridor",
    metroDistance: "22 km south of city center",
    walkingTime: "35 min scenic coastal road drive",
    busRoutes: ["102", "102K", "588", "589", "599"],
    nearestBusStop: "Muttukadu / DakshinaChitra Main Gate Stop",
    suburbanOrMRTS: "Velachery MRTS (18 km feeder link)",
    autoCabFares: {
      fromCentral: "₹450 – ₹550 (Auto) / ₹750 (Cab)",
      fromAirport: "₹400 – ₹500 (Auto) / ₹650 (Cab)",
      fromTNagar: "₹380 – ₹480 (Auto) / ₹650 (Cab)",
    },
    navigationAdvice: "Situated on East Coast Road beside Muttukadu backwaters. Take express bus 588 or 599 from CMBT, Adyar or T. Nagar.",
  },
  "guindy-national-park": {
    nearestMetroStation: "Guindy Metro Station (Blue Line)",
    metroLine: "Blue Line",
    metroDistance: "1.2 km",
    walkingTime: "12 min walk or 3 min auto",
    busRoutes: ["5B", "21G", "47A", "M70", "M45"],
    nearestBusStop: "Gandhi Mandapam / Children's Park Stop",
    suburbanOrMRTS: "Guindy Suburban Railway Junction (1.3 km)",
    autoCabFares: {
      fromCentral: "₹140 – ₹180 (Auto) / ₹280 (Cab)",
      fromAirport: "₹120 – ₹160 (Auto) / ₹240 (Cab)",
      fromTNagar: "₹70 – ₹90 (Auto) / ₹160 (Cab)",
    },
    navigationAdvice: "Direct Blue Line train from Airport or Central. Dedicated visitor parking beside the Children's Park entrance.",
  },
  "elliots-beach": {
    nearestMetroStation: "Kasturba Nagar MRTS / Guindy Metro",
    metroLine: "MRTS / Suburban Feeder",
    metroDistance: "2.1 km",
    walkingTime: "5 min auto from Kasturba Nagar station",
    busRoutes: ["29C", "5B", "M70", "23C", "PP21"],
    nearestBusStop: "Besant Nagar Bus Terminus (300m, 4 min walk)",
    suburbanOrMRTS: "Kasturba Nagar MRTS Station (2.1 km)",
    autoCabFares: {
      fromCentral: "₹150 – ₹190 (Auto) / ₹300 (Cab)",
      fromAirport: "₹240 – ₹300 (Auto) / ₹420 (Cab)",
      fromTNagar: "₹110 – ₹140 (Auto) / ₹220 (Cab)",
    },
    navigationAdvice: "Besant Nagar Bus Terminus is 300m from the sand. Parking bays available along 6th Avenue promenade.",
  },
  "valluvar-kottam": {
    nearestMetroStation: "AG-DMS / Nandanam (Blue Line)",
    metroLine: "Blue Line",
    metroDistance: "1.5 km",
    walkingTime: "15 min walk or 4 min auto",
    busRoutes: ["12B", "47A", "11G", "27B", "M12"],
    nearestBusStop: "Valluvar Kottam Junction Stop",
    suburbanOrMRTS: "Nungambakkam Railway Station (1.8 km)",
    autoCabFares: {
      fromCentral: "₹90 – ₹120 (Auto) / ₹210 (Cab)",
      fromAirport: "₹220 – ₹280 (Auto) / ₹380 (Cab)",
      fromTNagar: "₹50 – ₹70 (Auto) / ₹140 (Cab)",
    },
    navigationAdvice: "Centrally located at the junction of Nungambakkam and T. Nagar. Dedicated parking inside the monument complex.",
  },
  "mahabalipuram-shore-temple": {
    nearestMetroStation: "Tambaram / Airport (Then ECR Expressway)",
    metroLine: "ECR Express Corridor",
    metroDistance: "48 km south of Chennai",
    walkingTime: "1 hr scenic coastal highway drive",
    busRoutes: ["588", "588B", "599", "102P"],
    nearestBusStop: "Mahabalipuram Bus Stand (600m from Shore Temple)",
    suburbanOrMRTS: "Chengalpattu Junction (28 km connection)",
    autoCabFares: {
      fromCentral: "₹900 – ₹1200 (Auto) / ₹1400 (Cab)",
      fromAirport: "₹800 – ₹1100 (Auto) / ₹1300 (Cab)",
      fromTNagar: "₹850 – ₹1150 (Auto) / ₹1350 (Cab)",
    },
    navigationAdvice: "MTC Bus 588 runs every 15 minutes from CMBT and T. Nagar. Paid ASI parking lot right next to Shore Temple entry.",
  },
  "parthasarathy-temple": {
    nearestMetroStation: "Government Estate Metro (Blue Line)",
    metroLine: "Blue Line",
    metroDistance: "1.4 km",
    walkingTime: "14 min walk or 4 min auto",
    busRoutes: ["11G", "21G", "12B", "29C", "45A"],
    nearestBusStop: "Triplicane High Road / Ice House Stop",
    suburbanOrMRTS: "Thiruvallikeni MRTS Station (500m, 6 min walk)",
    autoCabFares: {
      fromCentral: "₹70 – ₹90 (Auto) / ₹180 (Cab)",
      fromAirport: "₹260 – ₹320 (Auto) / ₹440 (Cab)",
      fromTNagar: "₹100 – ₹130 (Auto) / ₹220 (Cab)",
    },
    navigationAdvice: "Thiruvallikeni MRTS station is 500m away. Narrow car streets; park on Pycrofts Road or Marina beachfront.",
  },
  "vadapalani-murugan-temple": {
    nearestMetroStation: "Vadapalani Metro Station (Green Line)",
    metroLine: "Green Line",
    metroDistance: "250 meters",
    walkingTime: "3 min direct walk from Station Exit 2",
    busRoutes: ["17D", "25G", "70V", "M70", "570"],
    nearestBusStop: "Vadapalani Bus Depot / Temple Junction",
    suburbanOrMRTS: "Kodambakkam Railway Station (2.2 km)",
    autoCabFares: {
      fromCentral: "₹120 – ₹150 (Auto) / ₹250 (Cab)",
      fromAirport: "₹180 – ₹230 (Auto) / ₹320 (Cab)",
      fromTNagar: "₹60 – ₹80 (Auto) / ₹150 (Cab)",
    },
    navigationAdvice: "Vadapalani Metro Station Exit 2 has direct pedestrian access. Multilevel parking available at Forum Vijaya Mall nearby.",
  },
  "kalikambal-temple": {
    nearestMetroStation: "High Court Metro Station (Blue Line)",
    metroLine: "Blue Line",
    metroDistance: "600 meters",
    walkingTime: "7 min walk via Thambu Chetty Street",
    busRoutes: ["1A", "21G", "17D", "6D"],
    nearestBusStop: "High Court / Broadway Bus Terminus",
    suburbanOrMRTS: "Chennai Beach Station (850m)",
    autoCabFares: {
      fromCentral: "₹60 – ₹80 (Auto) / ₹150 (Cab)",
      fromAirport: "₹310 – ₹380 (Auto) / ₹500 (Cab)",
      fromTNagar: "₹140 – ₹180 (Auto) / ₹280 (Cab)",
    },
    navigationAdvice: "High Court Metro is closest. Best visited in early morning before George Town wholesale market congests.",
  },
  "st-thomas-mount": {
    nearestMetroStation: "St. Thomas Mount Metro Station (Green / Blue Line)",
    metroLine: "Interchange",
    metroDistance: "900 meters",
    walkingTime: "10 min walk or 3 min auto",
    busRoutes: ["52", "70A", "M1", "M70"],
    nearestBusStop: "St. Thomas Mount Hillfoot Stop",
    suburbanOrMRTS: "St. Thomas Mount Suburban Station (1.0 km)",
    autoCabFares: {
      fromCentral: "₹200 – ₹260 (Auto) / ₹380 (Cab)",
      fromAirport: "₹90 – ₹120 (Auto) / ₹190 (Cab)",
      fromTNagar: "₹110 – ₹140 (Auto) / ₹220 (Cab)",
    },
    navigationAdvice: "Drive up the paved hill road to the summit parking or walk the 134 stone pilgrimage steps for panoramic city views.",
  },
  "madras-high-court": {
    nearestMetroStation: "High Court Metro Station (Blue Line)",
    metroLine: "Blue Line",
    metroDistance: "100 meters",
    walkingTime: "1 min direct exit from station",
    busRoutes: ["1A", "21G", "11G", "17D", "102"],
    nearestBusStop: "High Court Metro Gate Stop",
    suburbanOrMRTS: "Chennai Fort Station (350m)",
    autoCabFares: {
      fromCentral: "₹50 – ₹70 (Auto) / ₹140 (Cab)",
      fromAirport: "₹300 – ₹370 (Auto) / ₹490 (Cab)",
      fromTNagar: "₹140 – ₹180 (Auto) / ₹280 (Cab)",
    },
    navigationAdvice: "High Court Metro Station has a dedicated exit on Rajaji Salai right at the court gates.",
  },
  "ripon-building": {
    nearestMetroStation: "Chennai Central Metro (Blue & Green Interchange)",
    metroLine: "Interchange",
    metroDistance: "200 meters",
    walkingTime: "2 min walk across pedestrian plaza",
    busRoutes: ["1A", "11G", "17D", "21G", "27B"],
    nearestBusStop: "Central Railway Station Bus Stop",
    suburbanOrMRTS: "Puratchi Thalaivar Dr. MGR Central (MAS) (150m)",
    autoCabFares: {
      fromCentral: "Walkable (2 mins)",
      fromAirport: "₹280 – ₹340 (Auto) / ₹450 (Cab)",
      fromTNagar: "₹110 – ₹140 (Auto) / ₹220 (Cab)",
    },
    navigationAdvice: "Right opposite Central station. Beautifully illuminated in evening; pedestrian crossing subway available.",
  },
  "chennai-lighthouse": {
    nearestMetroStation: "Government Estate Metro (Blue Line)",
    metroLine: "Blue Line",
    metroDistance: "2.4 km",
    walkingTime: "6 min auto ride",
    busRoutes: ["21G", "12B", "PP21", "102"],
    nearestBusStop: "Light House Bus Stop (50m)",
    suburbanOrMRTS: "Light House MRTS Station (250m, 3 min walk)",
    autoCabFares: {
      fromCentral: "₹80 – ₹100 (Auto) / ₹190 (Cab)",
      fromAirport: "₹260 – ₹320 (Auto) / ₹430 (Cab)",
      fromTNagar: "₹110 – ₹140 (Auto) / ₹220 (Cab)",
    },
    navigationAdvice: "Light House MRTS station is right behind the complex. Elevator ticket counter opens at 10 AM.",
  },
  "chetpet-ecopark": {
    nearestMetroStation: "Kilpauk Metro Station (Green Line)",
    metroLine: "Green Line",
    metroDistance: "800 meters",
    walkingTime: "9 min walk",
    busRoutes: ["17D", "29B", "159A"],
    nearestBusStop: "Chetpet EcoPark Stop",
    suburbanOrMRTS: "Chetpet Suburban Railway Station (300m)",
    autoCabFares: {
      fromCentral: "₹70 – ₹90 (Auto) / ₹180 (Cab)",
      fromAirport: "₹240 – ₹300 (Auto) / ₹400 (Cab)",
      fromTNagar: "₹80 – ₹100 (Auto) / ₹180 (Cab)",
    },
    navigationAdvice: "Chetpet railway station is 300m away on Poonamallee High Road. Parking available for boaters and joggers.",
  },
  "vandalur-zoo": {
    nearestMetroStation: "Airport Metro (Then suburban train to Vandalur)",
    metroLine: "MRTS / Suburban Feeder",
    metroDistance: "14 km from Airport Metro",
    walkingTime: "25 min bus/cab drive",
    busRoutes: ["70V", "G18", "M18C", "118"],
    nearestBusStop: "Arignar Anna Zoological Park (Zoo Gate) Stop",
    suburbanOrMRTS: "Vandalur Suburban Railway Station (1.8 km)",
    autoCabFares: {
      fromCentral: "₹500 – ₹650 (Auto) / ₹850 (Cab)",
      fromAirport: "₹280 – ₹350 (Auto) / ₹480 (Cab)",
      fromTNagar: "₹400 – ₹500 (Auto) / ₹700 (Cab)",
    },
    navigationAdvice: "Take Suburban Train from Chennai Beach/Egmore/Tambaram to Vandalur station, then a 5-min share auto to the zoo entrance.",
  },
  "theosophical-society": {
    nearestMetroStation: "Guindy Metro / Kasturba Nagar MRTS",
    metroLine: "Blue Line",
    metroDistance: "2.8 km",
    walkingTime: "7 min auto",
    busRoutes: ["5B", "21G", "29C", "M70"],
    nearestBusStop: "Adyar Bridge / Malar Hospital Stop",
    suburbanOrMRTS: "Kasturba Nagar MRTS (1.4 km)",
    autoCabFares: {
      fromCentral: "₹140 – ₹180 (Auto) / ₹280 (Cab)",
      fromAirport: "₹200 – ₹250 (Auto) / ₹380 (Cab)",
      fromTNagar: "₹100 – ₹130 (Auto) / ₹210 (Cab)",
    },
    navigationAdvice: "Entrance on Adyar Bridge Road. Visitors must enter on foot; vehicle parking available outside the gate.",
  },
  "kalakshetra-foundation": {
    nearestMetroStation: "Kasturba Nagar / Thiruvanmiyur MRTS",
    metroLine: "MRTS / Suburban Feeder",
    metroDistance: "1.1 km",
    walkingTime: "12 min walk or 3 min auto",
    busRoutes: ["29C", "5B", "PP21", "102"],
    nearestBusStop: "Kalakshetra Road Stop",
    suburbanOrMRTS: "Thiruvanmiyur MRTS Station (1.1 km)",
    autoCabFares: {
      fromCentral: "₹160 – ₹200 (Auto) / ₹310 (Cab)",
      fromAirport: "₹220 – ₹280 (Auto) / ₹390 (Cab)",
      fromTNagar: "₹120 – ₹150 (Auto) / ₹230 (Cab)",
    },
    navigationAdvice: "Located on Kalakshetra Road in Thiruvanmiyur. Quiet campus; check tour timings before arrival.",
  },
  "anna-centenary-library": {
    nearestMetroStation: "Guindy Metro / Little Mount Metro (Blue Line)",
    metroLine: "Blue Line",
    metroDistance: "1.8 km",
    walkingTime: "5 min auto from Little Mount station",
    busRoutes: ["5B", "21G", "47A", "M70"],
    nearestBusStop: "Kotturpuram Library Stop",
    suburbanOrMRTS: "Kotturpuram MRTS Station (700m)",
    autoCabFares: {
      fromCentral: "₹130 – ₹170 (Auto) / ₹270 (Cab)",
      fromAirport: "₹180 – ₹230 (Auto) / ₹340 (Cab)",
      fromTNagar: "₹80 – ₹100 (Auto) / ₹180 (Cab)",
    },
    navigationAdvice: "Kotturpuram MRTS is just 700m away. Huge underground parking lot on site with free entry.",
  },
};

// Fallback parking lots with locations
export const MOCK_PARKING_LOCATIONS: Record<string, { lat: number; lng: number }> = {
  "marina-beach-p1": { lat: 13.0505, lng: 80.2820 },
  "mylapore-temple-p2": { lat: 13.0336, lng: 80.2690 },
  "tnagar-multilevel-p3": { lat: 13.0410, lng: 80.2330 },
  "express-avenue-p4": { lat: 13.0590, lng: 80.2635 },
  "central-railway-p5": { lat: 13.0825, lng: 80.2750 },
  "besant-nagar-p6": { lat: 13.0010, lng: 80.2715 },
  "airport-terminal-p7": { lat: 12.9860, lng: 80.1690 },
  "egmore-museum-p8": { lat: 13.0735, lng: 80.2615 },
};

export function getNearbyForPlace(
  placeId: string,
  liveLots?: ParkingLot[]
): NearbyPlaceContext | null {
  const place = PLACES_DATA.find((p) => p.id === placeId);
  if (!place) return null;

  const placeCoords = CHENNAI_COORDINATES[placeId];

  // If place doesn't have exact coordinates, provide heuristic defaults
  const centerLat = placeCoords ? placeCoords.lat : 13.05;
  const centerLng = placeCoords ? placeCoords.lng : 13.25;

  // 1. Calculate nearest transit hub
  let nearestTransitHub: NearbyPlaceContext["nearestTransitHub"] = undefined;
  let minTransitDist = 999;
  for (const hub of TRANSIT_HUBS) {
    const hubCoords = CHENNAI_COORDINATES[hub.id];
    if (hubCoords) {
      const d = calculateDistanceKm(centerLat, centerLng, hubCoords.lat, hubCoords.lng);
      if (d < minTransitDist) {
        minTransitDist = d;
        nearestTransitHub = {
          id: hub.id,
          name: hub.name,
          distanceKm: d,
          metroLine: hub.metroLine,
        };
      }
    }
  }

  // 2. Nearby Restaurants
  const restaurantsWithDist = RESTAURANTS_DATA.map((r) => {
    const rCoords = CHENNAI_COORDINATES[r.id];
    const dist = rCoords
      ? calculateDistanceKm(centerLat, centerLng, rCoords.lat, rCoords.lng)
      : 5.0;
    return { restaurant: r, distanceKm: dist };
  })
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 4);

  // 3. Nearby Shopping
  const shoppingWithDist = SHOPPING_DATA.map((s) => {
    const sCoords = CHENNAI_COORDINATES[s.id];
    const dist = sCoords
      ? calculateDistanceKm(centerLat, centerLng, sCoords.lat, sCoords.lng)
      : 5.0;
    return { spot: s, distanceKm: dist };
  })
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 4);

  // 4. Nearby Hotels
  const hotelsWithDist = HOTELS_DATA.map((h) => {
    const hCoords = CHENNAI_COORDINATES[h.id];
    const dist = hCoords
      ? calculateDistanceKm(centerLat, centerLng, hCoords.lat, hCoords.lng)
      : 5.0;
    return { hotel: h, distanceKm: dist };
  })
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 4);

  // 5. Nearby Parking Lots
  const allLots = liveLots && liveLots.length > 0 ? liveLots : DEFAULT_PARKING_LOTS;
  const parkingWithDist = allLots
    .map((lot) => {
      const pCoords =
        CHENNAI_COORDINATES[lot.id] || MOCK_PARKING_LOCATIONS[lot.id];
      const dist = pCoords
        ? calculateDistanceKm(centerLat, centerLng, pCoords.lat, pCoords.lng)
        : lot.distanceKm || 3.0;
      return { lot, distanceKm: dist };
    })
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 4);

  // 6. Curated time recommendation & trip sequence
  const itineraryPlanningMap: Record<
    string,
    { idealTimeOfDay: string; duration: string; recommendedSequence: string; travelTip: string }
  > = {
    "marina-beach": {
      idealTimeOfDay: "Early Morning (5:30 AM – 7:30 AM) or Late Afternoon (4:30 PM – 7:30 PM)",
      duration: "2 to 3 hours",
      recommendedSequence:
        "Morning walk & Lighthouse view → Breakfast filter coffee at nearby Triplicane Ratna Cafe → San Thome Basilica.",
      travelTip:
        "Avoid mid-day heat. Park at Marina P1 lot or take the MRTS to Light House station.",
    },
    "kapaleeshwarar-temple": {
      idealTimeOfDay: "Morning (6:30 AM – 9:00 AM) or Evening Deeparadhana (5:30 PM – 7:30 PM)",
      duration: "1.5 to 2 hours",
      recommendedSequence:
        "Temple darshan & tank circumambulation → Rayar's Mess hot ghee podi idlis → Brass & handloom shopping on Mada streets at Sundari Silks.",
      travelTip:
        "Strict dress code: covered shoulders and knees. Footwear stand available at the East Gopuram.",
    },
    "san-thome-cathedral": {
      idealTimeOfDay: "Morning (9:00 AM – 11:30 AM) or Sunset (4:30 PM – 6:30 PM)",
      duration: "1 to 1.5 hours",
      recommendedSequence:
        "Visit St. Thomas underground tomb & relic museum → Stroll towards Marina beach or Santhome coastline → Lunch at Buhari Mount Road.",
      travelTip:
        "Do not miss the underground museum located behind the main altar containing ancient stone inscriptions.",
    },
    "fort-st-george": {
      idealTimeOfDay: "Morning (9:30 AM – 12:00 PM)",
      duration: "2 to 2.5 hours",
      recommendedSequence:
        "Fort Museum & St. Mary's Church → Walk through historic George Town colonial lanes → Sowcarpet street food chaat trail.",
      travelTip:
        "Closed on Fridays. Government photo ID is strictly required at the military gate checkpoint.",
    },
    "government-museum-egmore": {
      idealTimeOfDay: "Morning or Post-Lunch (10:00 AM – 1:00 PM)",
      duration: "2 to 3 hours",
      recommendedSequence:
        "Explore Chola Bronze Gallery & Amaravati sculptures → South Indian lunch at Annalakshmi Restaurant → High-end shopping at Express Avenue Mall.",
      travelTip:
        "Closed on Fridays and national holidays. The bronze gallery is air-conditioned and has audio guide signage.",
    },
    "dakshinachitra-heritage-museum": {
      idealTimeOfDay: "Morning to Afternoon (10:30 AM – 3:30 PM)",
      duration: "3 to 4 hours",
      recommendedSequence:
        "Scenic drive along ECR → Explore 18 living heritage homes and artisan crafts → Seaside lunch at an ECR coastal seafood resort.",
      travelTip:
        "Closed on Tuesdays. Combine this with Mahabalipuram for a comprehensive south coastal excursion.",
    },
    "guindy-national-park": {
      idealTimeOfDay: "Morning (9:00 AM – 11:30 AM)",
      duration: "2 hours",
      recommendedSequence:
        "Forest deer trail & butterfly garden → Guindy Snake Park → Lunch in Guindy/Adyar → The Leela Palace waterfront evening tea.",
      travelTip:
        "Wear comfortable sports shoes and insect repellent. Closed on Tuesdays.",
    },
    "elliots-beach": {
      idealTimeOfDay: "Late Afternoon & Twilight (4:30 PM – 8:00 PM)",
      duration: "2 to 3 hours",
      recommendedSequence:
        "Breezy stroll by Karl Schmidt Memorial → Murugan Idli Shop hot dosas with 4 chutneys → Dessert/coffee at Besant Nagar beach cafes.",
      travelTip:
        "Cleaner and less crowded than Marina. Parking is available along 6th Avenue and 7th Avenue promenade.",
    },
    "valluvar-kottam": {
      idealTimeOfDay: "Morning (9:00 AM – 11:00 AM)",
      duration: "1 to 1.5 hours",
      recommendedSequence:
        "Stone chariot monument & Thirukkural couplets reading → Head to Pondy Bazaar T. Nagar for silk saree shopping → Lunch at Thalappakatti Biryani.",
      travelTip:
        "Handloom exhibitions frequently run on the complex grounds. Combine with shopping in T. Nagar.",
    },
    "mahabalipuram-shore-temple": {
      idealTimeOfDay: "Early Morning (6:30 AM – 10:30 AM) or Late Afternoon (3:30 PM – 6:00 PM)",
      duration: "Half-day to full-day excursion",
      recommendedSequence:
        "ECR Scenic Highway drive → Shore Temple & Pancha Rathas monolithic rock-cut shrines → Krishna's Butter Ball → Fresh seafood lunch at Moonrakers.",
      travelTip:
        "Start early to beat highway traffic and afternoon heat. Carry sun protection and bottled water.",
    },
    "parthasarathy-temple": {
      idealTimeOfDay: "Early Morning (6:00 AM – 8:30 AM) or Evening Darshan (5:30 PM – 8:00 PM)",
      duration: "1.5 to 2 hours",
      recommendedSequence:
        "Morning temple darshan & prasadam → Stroll down historic Triplicane car streets → Authentic breakfast & hot filter coffee at Ratna Cafe → Marina Beach promenade.",
      travelTip:
        "Do not miss the legendary ghee-laden Sakkarai Pongal prasadam. Traditional dress required inside the sanctum.",
    },
    "ashtalakshmi-temple": {
      idealTimeOfDay: "Evening Sunset (5:00 PM – 7:30 PM)",
      duration: "1 to 1.5 hours",
      recommendedSequence:
        "Ascend multi-tiered sanctum with ocean breeze → Elliot's Beach seaside walk → Fresh roasted corn and Murugan Idli Shop dinner.",
      travelTip:
        "Climb to the top tier for a majestic aerial view of crashing waves and Besant Nagar coastline.",
    },
    "marundeeswarar-temple": {
      idealTimeOfDay: "Morning (6:30 AM – 9:00 AM) or Evening (5:00 PM – 7:30 PM)",
      duration: "1.5 hours",
      recommendedSequence:
        "Temple circumambulation and sacred herbal ash darshan → Quiet meditation under ancient Vanni tree → Walk to Thiruvanmiyur beach.",
      travelTip:
        "Very peaceful and spiritually uplifting. Ample courtyard space for meditation.",
    },
    "vadapalani-murugan-temple": {
      idealTimeOfDay: "Morning (7:00 AM – 9:30 AM) or Evening (5:00 PM – 8:00 PM)",
      duration: "1 to 2 hours",
      recommendedSequence:
        "Murugan temple darshan & archana → Shop for traditional puja items on Sannadhi street → Head to nearby Forum Vijaya Mall or T. Nagar.",
      travelTip:
        "Step-free access from Vadapalani Metro station. Expect heavy crowds on Tuesdays and Sashti days.",
    },
    "kalikambal-temple": {
      idealTimeOfDay: "Morning (7:00 AM – 9:30 AM)",
      duration: "1 hour",
      recommendedSequence:
        "Historic temple visit where Chhatrapati Shivaji prayed → Heritage walk through George Town jewellery streets → Mint Street Sowcarpet chaat breakfast.",
      travelTip:
        "Best reached via High Court Metro station. Ideal beginning for a George Town heritage walking tour.",
    },
    "st-thomas-mount": {
      idealTimeOfDay: "Sunrise (6:00 AM – 7:30 AM) or Sunset (5:00 PM – 6:45 PM)",
      duration: "1.5 hours",
      recommendedSequence:
        "Climb pilgrimage stone steps or drive up summit → Historic 1523 Portuguese church & Bleeding Cross → Watch planes land at airport with 360° city view.",
      travelTip:
        "Stunning golden hour light for photography. Bring binoculars to watch flights taking off and landing.",
    },
    "madras-high-court": {
      idealTimeOfDay: "Late Afternoon (3:30 PM – 5:30 PM)",
      duration: "1 to 1.5 hours",
      recommendedSequence:
        "Heritage architectural photography of Indo-Saracenic minarets → Parry's Corner colonial street walk → Walk to Fort St. George or Marina.",
      travelTip:
        "Best admired from exterior along Rajaji Salai. Direct exit at High Court Metro.",
    },
    "ripon-building": {
      idealTimeOfDay: "Twilight & Evening (5:30 PM – 7:30 PM)",
      duration: "1 hour",
      recommendedSequence:
        "Arrive at Central Metro → View Neoclassical white palace illuminated with night floodlights → Visit Victoria Public Hall & Moore Market area.",
      travelTip:
        "Lit up dramatically after 6:30 PM. Directly opposite Chennai Central Railway Station.",
    },
    "chennai-lighthouse": {
      idealTimeOfDay: "Late Afternoon (4:30 PM – 6:30 PM)",
      duration: "1 to 1.5 hours",
      recommendedSequence:
        "Take elevator to 10th floor observation deck → Enjoy 360° coastal breeze and ocean panorama → Visit ground floor maritime museum → Stroll Marina beach.",
      travelTip:
        "Closed on Mondays. Carries a small camera fee; elevators run until 6:30 PM.",
    },
    "armenian-church": {
      idealTimeOfDay: "Morning (9:30 AM – 11:30 AM)",
      duration: "45 minutes",
      recommendedSequence:
        "Hidden tranquil courtyard visit & six-bell tower viewing → Walk down Armenian Street → Heritage lunch in North Chennai.",
      travelTip:
        "Closes early at 2:30 PM. An absolute haven of silence in the center of bustling wholesale trade districts.",
    },
    "semmozhi-poonga": {
      idealTimeOfDay: "Morning (7:00 AM – 9:30 AM) or Sunset (4:30 PM – 6:30 PM)",
      duration: "1.5 to 2 hours",
      recommendedSequence:
        "Botanical garden walk & bonsai pavilion → Green greenhouse photography → Relax by duck pond → Coffee at Cathedral Road cafes.",
      travelTip:
        "Centrally located on Anna Salai / Cathedral Road. Well shaded with clean paved walkways.",
    },
    "chetpet-ecopark": {
      idealTimeOfDay: "Late Afternoon (4:00 PM – 6:30 PM)",
      duration: "2 hours",
      recommendedSequence:
        "Pedal boating on Chetpet lake → Angling deck visit → Jogging track loop around the waters → Evening snacks at eco food court.",
      travelTip:
        "Life jackets are provided and mandatory for all boat rides. Boating tickets close by 6:00 PM.",
    },
    "vandalur-zoo": {
      idealTimeOfDay: "Full Morning (9:00 AM – 1:30 PM)",
      duration: "3 to 4 hours",
      recommendedSequence:
        "Lion & Deer Safari bus tour → Battery car ride through tiger and elephant zones → Walk-through aviary & butterfly park → Lunch at Zoo cafeteria.",
      travelTip:
        "Closed on Tuesdays. Rent battery-operated golf carts or bicycles at the entrance to cover the 1,490-acre park easily.",
    },
    "madras-crocodile-bank": {
      idealTimeOfDay: "Morning (9:30 AM – 12:00 PM) or Weekend feeding (4:00 PM – 5:30 PM)",
      duration: "2 hours",
      recommendedSequence:
        "Explore 14 crocodile species & giant tortoises → Watch Irula snake venom extraction demonstration → ECR coastal highway lunch.",
      travelTip:
        "Sunday afternoon 4:30 PM feeding is not to be missed. Ideal family stop along ECR.",
    },
    "theosophical-society": {
      idealTimeOfDay: "Morning (8:30 AM – 10:00 AM)",
      duration: "1.5 hours",
      recommendedSequence:
        "Silent morning walk to the 450-year-old Great Banyan Tree → Riverside estuary birdwatching → Adyar Ananda Bhavan traditional tiffin.",
      travelTip:
        "Strictly open 8:30 AM – 10:00 AM and 2:00 PM – 4:00 PM. Maintain silence and protect the tranquil bird sanctuary.",
    },
    "kalakshetra-foundation": {
      idealTimeOfDay: "Morning (9:00 AM – 11:30 AM)",
      duration: "2 hours",
      recommendedSequence:
        "Guided heritage walk through classical dance cottages → Natural dye weaving craft workshop → Classical music rehearsals under banyans.",
      travelTip:
        "Prior inquiry recommended for guided campus tours. Footwear removed inside thatched dance studios.",
    },
    "thiruvanmiyur-beach": {
      idealTimeOfDay: "Early Morning Sunrise (5:30 AM – 7:30 AM)",
      duration: "1.5 hours",
      recommendedSequence:
        "Quiet sunrise walk on golden sands → Beach yoga or jogging along the coastline → Fresh coconut water → Filter coffee at neighborhood bakery.",
      travelTip:
        "Far less commercialized than Marina. Gentle sea waves and clean morning air.",
    },
    "covelong-beach": {
      idealTimeOfDay: "Morning Surfing (7:00 AM – 10:30 AM) or Sunset (4:30 PM – 6:30 PM)",
      duration: "3 hours to half-day",
      recommendedSequence:
        "Surfing lesson at Covelong Point Surf School → Catamaran sea ride → Seaside fresh catch seafood lunch at Surf Turf cafe.",
      travelTip:
        "Pre-book surf lessons during weekends. Bring swimwear, towel, and waterproof sun protection.",
    },
    "muttukadu-boat-house": {
      idealTimeOfDay: "Morning (9:30 AM – 12:00 PM) or Late Afternoon (3:30 PM – 5:30 PM)",
      duration: "2 hours",
      recommendedSequence:
        "Speedboat or water scooter ride on estuary backwaters → Relax on floating bamboo boathouse → Visit adjacent DakshinaChitra heritage village.",
      travelTip:
        "Coolest breeze in late afternoon. Weekends can have a 20-minute wait for speedboats.",
    },
    "birla-planetarium": {
      idealTimeOfDay: "Midday or Afternoon (10:30 AM – 1:30 PM)",
      duration: "2 to 2.5 hours",
      recommendedSequence:
        "360-degree cosmic sky theater astronomy show → Science on a Sphere interactive earth display → Dinosaur park & physics gallery.",
      travelTip:
        "English shows at 10:45 AM, 1:15 PM, 3:45 PM. Great indoor air-conditioned activity during afternoon heat.",
    },
    "vivekananda-house": {
      idealTimeOfDay: "Afternoon to Sunset (3:30 PM – 6:30 PM)",
      duration: "1.5 hours",
      recommendedSequence:
        "Tour circular Tudor ice house architecture → Swami Vivekananda sacred meditation chamber → 4D VR cultural experience → Evening Marina beach walk.",
      travelTip:
        "Peaceful meditation hall on the upper floor with calm ocean views.",
    },
    "connemara-library": {
      idealTimeOfDay: "Morning (10:00 AM – 12:30 PM)",
      duration: "1 to 1.5 hours",
      recommendedSequence:
        "Admire Victorian Gothic timber arches and stained glass reading room → Explore rare books section → Visit adjacent Government Museum Bronze Gallery.",
      travelTip:
        "Quiet reading decorum strictly enforced. Admission to heritage reading room is free.",
    },
    "anna-centenary-library": {
      idealTimeOfDay: "Anytime (10:00 AM – 6:00 PM)",
      duration: "2 to 3 hours",
      recommendedSequence:
        "Explore 9 floors of modern literature & children's globe amphitheater → Relax in panoramic glass atrium → Kotturpuram green corridor walk.",
      travelTip:
        "Fully air-conditioned modern civic sanctuary. Spacious cafeteria and free parking on site.",
    },
  };

  const defaultItinerary = {
    idealTimeOfDay: "Morning (8:30 AM – 11:30 AM) or Sunset (4:30 PM – 7:00 PM)",
    duration: "2 to 3 hours",
    recommendedSequence: `Explore ${place.name} → Refresh with South Indian filter coffee & snacks nearby → Discover local bazaars.`,
    travelTip: place.tips || "Carry hydration and comfortable walking footwear.",
  };

  const transitInfo: PlaceTransitInfo = PLACE_TRANSIT_DATA[place.id] || {
    nearestMetroStation: nearestTransitHub
      ? `${nearestTransitHub.name} (${nearestTransitHub.metroLine})`
      : "Puratchi Thalaivar Dr. M.G.R. Central (Blue/Green Line)",
    metroLine: nearestTransitHub?.metroLine || "Blue Line",
    metroDistance: nearestTransitHub ? `${nearestTransitHub.distanceKm} km` : "2.5 km",
    walkingTime:
      nearestTransitHub && nearestTransitHub.distanceKm < 1
        ? "8 min walk"
        : "5-10 min share auto ride",
    busRoutes: ["21G", "12B", "11G", "29C", "102"],
    nearestBusStop: `${place.area} Main Junction Bus Stop`,
    suburbanOrMRTS: "Connected via Chennai Suburban Railway / MRTS network",
    autoCabFares: {
      fromCentral: "₹80 – ₹120 (Auto) / ₹200 (Cab)",
      fromAirport: "₹250 – ₹320 (Auto) / ₹450 (Cab)",
      fromTNagar: "₹90 – ₹130 (Auto) / ₹210 (Cab)",
    },
    navigationAdvice: `Easily accessible by public transit in ${place.area}. Follow ${place.name} access signboards along the main corridor.`,
  };

  return {
    place,
    placeCoords,
    transitInfo,
    nearestTransitHub,
    nearbyParkingLots: parkingWithDist,
    nearbyRestaurants: restaurantsWithDist,
    nearbyShopping: shoppingWithDist,
    nearbyHotels: hotelsWithDist,
    suggestedItineraryTimeSlot: itineraryPlanningMap[place.id] || defaultItinerary,
  };
}
