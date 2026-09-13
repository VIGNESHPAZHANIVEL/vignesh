import {
  Place,
  Restaurant,
  ShoppingSpot,
  Hotel,
  ParkingLot,
  ItineraryDay,
} from "../types";

export const PLACES_DATA: Place[] = [
  {
    id: "marina-beach",
    name: "Marina Beach",
    tamilName: "மெரினா கடற்கரை",
    category: "Beaches",
    rating: 4.6,
    reviewsCount: 42300,
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80",
    area: "Kamarajar Salai, Triplicane",
    timings: "Open 24 Hours (Best: 5:00 AM – 8:00 AM & 4:30 PM – 9:00 PM)",
    entryFee: "Free Entry",
    description: "The second longest natural urban beach in the world, stretching over 12 km along the Bay of Bengal. Famous for its iconic lighthouse, evening food stalls, and sunset sea breeze.",
    highlights: ["Chennai Lighthouse with elevator view", "Statue of Kannagi & Labor Triumph", "Evening Sundal & Fresh Fish Fry Stalls", "Sunrise over Bay of Bengal"],
    tips: "Swimming is prohibited due to treacherous undercurrents. Visit between 5 PM and 8 PM for the lively evening atmosphere and coastal breeze.",
    nearestMetro: "LIC or Government Estate (2 km) / Light House MRTS",
    audioGuideAvailable: true,
  },
  {
    id: "kapaleeshwarar-temple",
    name: "Kapaleeshwarar Temple",
    tamilName: "கபாலீஸ்வரர் கோவில்",
    category: "Temples",
    rating: 4.8,
    reviewsCount: 28500,
    image: "https://images.unsplash.com/photo-1609766857329-87a36a9b4344?auto=format&fit=crop&w=1000&q=80",
    area: "Mylapore",
    timings: "5:30 AM – 12:00 PM & 4:30 PM – 9:30 PM (Mondays limited)",
    entryFee: "Free Entry (Special Darshan ₹50)",
    description: "A 7th-century masterpiece of Dravidian architecture dedicated to Lord Shiva and Goddess Karpagambal. Features a 120-foot ornate gopuram with hundreds of intricately carved colorful stucco sculptures.",
    highlights: ["Majestic 37m high Rainbow Gopuram", "Ancient Sacred Punnai Tree shrine", "Traditional temple tank (Kulam)", "Vibrant flower & brass market outside"],
    tips: "Dress code strictly applies (covered shoulders and knees; traditional attire appreciated). Leave footwear outside at the regulated counter.",
    nearestMetro: "Teynampet / DMS (2.5 km) / Thirumayilai MRTS",
    audioGuideAvailable: true,
  },
  {
    id: "san-thome-cathedral",
    name: "San Thome Basilica",
    tamilName: "சாந்தோம் பேராலயம்",
    category: "Historic",
    rating: 4.7,
    reviewsCount: 16400,
    image: "https://images.unsplash.com/photo-1548625361-195fe578ef2b?auto=format&fit=crop&w=1000&q=80",
    area: "Santhome High Road",
    timings: "6:00 AM – 9:00 PM",
    entryFee: "Free Entry",
    description: "A historic Roman Catholic minor basilica built in the 16th century by Portuguese explorers over the tomb of St. Thomas the Apostle, one of Jesus Christ's twelve disciples.",
    highlights: ["Tomb Chapel of Apostle St. Thomas", "Neo-Gothic soaring white spires", "Underground Relic Museum", "Scenic oceanfront location"],
    tips: "Visit the museum behind the church to view artifacts including 16th-century stone inscriptions and lance heads attributed to St. Thomas.",
    nearestMetro: "Thirumayilai MRTS (1.2 km)",
    audioGuideAvailable: true,
  },
  {
    id: "fort-st-george",
    name: "Fort St. George & Museum",
    tamilName: "புனித ஜார்ஜ் கோட்டை",
    category: "Historic",
    rating: 4.4,
    reviewsCount: 14200,
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80",
    area: "Rajaji Salai, George Town",
    timings: "9:00 AM – 5:00 PM (Fridays Closed)",
    entryFee: "₹25 (Indians), ₹300 (Foreigners)",
    description: "The first English fortress in India, founded in 1644 by the British East India Company. Today it houses the Tamil Nadu Legislative Assembly and a treasure-filled colonial museum.",
    highlights: ["St. Mary's Church (oldest Anglican church in India)", "Museum with Robert Clive artifacts & coins", "Tallest teakwood flagpole in India", "Colonial military architecture"],
    tips: "Valid government photo ID is mandatory at the security entrance as it is an active administrative headquarters.",
    nearestMetro: "Chennai Fort Station / High Court Metro (1 km)",
    audioGuideAvailable: true,
  },
  {
    id: "government-museum-egmore",
    name: "Government Museum Egmore",
    tamilName: "எழும்பூர் அரசு அருங்காட்சியகம்",
    category: "Culture",
    rating: 4.6,
    reviewsCount: 18900,
    image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=1000&q=80",
    area: "Pantheon Road, Egmore",
    timings: "9:30 AM – 5:00 PM (Fridays & National Holidays closed)",
    entryFee: "₹20 (Adults), ₹15 (Children), ₹250 (Foreigners)",
    description: "Established in 1851, it is the second oldest museum in India. World-renowned for its rare Bronze Gallery containing Chola, Pallava, and Vijayanagara masterworks, including the iconic Nataraja.",
    highlights: ["Chola Bronze Nataraja sculptures", "Amaravati Buddhist marble carvings", "National Art Gallery (Indo-Saracenic design)", "Extensive archaeology & geology sections"],
    tips: "Plan at least 2 hours. Do not miss the air-conditioned Bronze Gallery on the first floor.",
    nearestMetro: "Egmore Metro Station (800 meters)",
    audioGuideAvailable: true,
  },
  {
    id: "dakshinachitra-heritage-museum",
    name: "DakshinaChitra Heritage Village",
    tamilName: "தக்ஷிணசித்ரா",
    category: "Culture",
    rating: 4.7,
    reviewsCount: 13800,
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=1000&q=80",
    area: "Muttukadu, East Coast Road (ECR)",
    timings: "10:00 AM – 6:00 PM (Tuesdays Closed)",
    entryFee: "₹175 (Indians), ₹350 (Foreigners)",
    description: "A living-history open-air museum preserving 18 authentic heritage houses representing the lifestyle, vernacular architecture, and traditional crafts of Tamil Nadu, Kerala, Karnataka, and Andhra Pradesh.",
    highlights: ["Reconstructed Chettinad merchant mansion", "Live pottery, silk weaving, and shadow puppetry", "Folk dances (Karagattam & Oyilattam)", "Artisan craft souvenir center"],
    tips: "Great day trip on ECR combined with Mahabalipuram. Comfortable walking shoes recommended.",
    nearestMetro: "Reach via ECR Bus 102 / 588 or taxi",
    audioGuideAvailable: true,
  },
  {
    id: "guindy-national-park",
    name: "Guindy National Park & Snake Park",
    tamilName: "கிண்டி தேசிய பூங்கா",
    category: "Parks",
    rating: 4.3,
    reviewsCount: 15300,
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1000&q=80",
    area: "Rangeguindy, Guindy",
    timings: "9:00 AM – 5:30 PM (Tuesdays Closed)",
    entryFee: "₹20 (Adults), ₹5 (Children)",
    description: "One of the very few national parks situated entirely within city limits. A protected evergreen scrub forest home to blackbucks, spotted deer, jackals, and over 130 species of birds.",
    highlights: ["Free-roaming Blackbuck antelopes", "Famous Chennai Snake Park next door", "Children's park & butterfly zones", "Dense urban green lung"],
    tips: "Combine with Chennai Snake Park next door, founded by herpetologist Romulus Whitaker.",
    nearestMetro: "Guindy Metro Station (1.5 km)",
    audioGuideAvailable: false,
  },
  {
    id: "elliots-beach",
    name: "Elliot's Beach (Besant Nagar)",
    tamilName: "எலியட்ஸ் கடற்கரை (பெசன்ட் நகர்)",
    category: "Beaches",
    rating: 4.6,
    reviewsCount: 22900,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    area: "Besant Nagar",
    timings: "Open 24 Hours (Lively in evenings)",
    entryFee: "Free Entry",
    description: "Known locally as 'Bessie', this is a cleaner, more relaxed coastal strip favored by youth, families, and morning joggers. Famous for the Karl Schmidt Memorial and seaside cafes.",
    highlights: ["Karl Schmidt Memorial monument", "Buzzing seafront promenade with cafes", "Velankanni Church nearby", "Sunset corn and bajji vendors"],
    tips: "Try freshly roasted spicy corn on the cob while walking down 6th Avenue towards Murugan Idli Shop.",
    nearestMetro: "Indira Nagar MRTS / Kasturba Nagar (2.2 km)",
    audioGuideAvailable: false,
  },
  {
    id: "valluvar-kottam",
    name: "Valluvar Kottam",
    tamilName: "வள்ளுவர் கோட்டம்",
    category: "Historic",
    rating: 4.3,
    reviewsCount: 9700,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80",
    area: "Nungambakkam",
    timings: "8:30 AM – 5:30 PM",
    entryFee: "₹10 (Adults), ₹5 (Children)",
    description: "A monumental 39-meter stone chariot memorial dedicated to the classical Tamil philosopher-poet Thiruvalluvar. The auditorium walls are inscribed with all 1,330 verses of the Thirukkural.",
    highlights: ["Massive 39m tall granite temple car", "Life-size stone statue of Thiruvalluvar", "All 1,330 Thirukkural couplets engraved", "One of Asia's largest pillar-less halls"],
    tips: "Often hosts handicraft exhibitions and handloom expos on the open grounds.",
    nearestMetro: "Ag-DMS Metro Station (1.8 km)",
    audioGuideAvailable: false,
  },
  {
    id: "mahabalipuram-shore-temple",
    name: "Shore Temple & Pancha Rathas (Day Trip)",
    tamilName: "மாமல்லபுரம் கடற்கரை கோவில்",
    category: "Hidden Gem",
    rating: 4.9,
    reviewsCount: 38700,
    image: "https://images.unsplash.com/photo-1600100397608-f010f444f434?auto=format&fit=crop&w=1000&q=80",
    area: "Mahabalipuram (55 km south via scenic ECR)",
    timings: "6:00 AM – 6:00 PM",
    entryFee: "₹40 (Indians), ₹600 (Foreigners)",
    description: "UNESCO World Heritage site dating to the 8th century Pallava Dynasty. Marvel at monolithic stone chariots, rock-cut relief 'Arjuna’s Penance', and the Shore Temple overlooking the pounding surf.",
    highlights: ["UNESCO World Heritage Monument", "Arjuna's Penance giant bas-relief", "Krishna's Butter Ball gravitational wonder", "Scenic drive along East Coast Road"],
    tips: "Take a direct morning AC bus (588 or 599) from CMBT or hire an Uber Intercity. Best visited early morning or late afternoon.",
    nearestMetro: "Accessible via ECR scenic highway",
    audioGuideAvailable: true,
  }
];

export const RESTAURANTS_DATA: Restaurant[] = [
  {
    id: "murugan-idli-shop",
    name: "Murugan Idli Shop",
    cuisine: "Traditional South Indian / Tiffin",
    category: "Veg",
    priceRange: "₹",
    rating: 4.7,
    reviewsCount: 31000,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80",
    area: "T. Nagar & Besant Nagar",
    famousFor: "Soft fluffy idlis with 4 varieties of fresh chutneys and fiery Ghee Podi",
    timings: "7:00 AM – 11:00 PM",
    address: "77/1A, GN Chetty Road, T. Nagar & 6th Ave Besant Nagar",
    features: ["Pure Vegetarian", "Quick Service", "Signature 4 Chutneys", "Jigarthanda Available"],
    menuHighlights: ["Ghee Podi Idli", "Onion Uthappam", "Sweet Pongal", "Madurai Special Jigarthanda"],
  },
  {
    id: "ratna-cafe",
    name: "Triplicane Ratna Cafe",
    cuisine: "Iconic South Indian Breakfast",
    category: "Veg",
    priceRange: "₹",
    rating: 4.6,
    reviewsCount: 18400,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1000&q=80",
    area: "Triplicane (Est. 1948)",
    famousFor: "Legendary unlimited piping hot Sambar ladled generously over crisp Vadas & Idlis",
    timings: "6:30 AM – 10:30 PM",
    address: "255, Triplicane High Road, Triplicane, Chennai",
    features: ["Heritage Brand (1948)", "World-Famous Sambar", "Authentic Brass Filter Coffee"],
    menuHighlights: ["Sambar Idli (floating in bowl)", "Crispy Medu Vada", "Ghee Roast Dosa", "Filter Coffee"],
  },
  {
    id: "buhari-hotel",
    name: "Buhari Hotel (Birthplace of Chicken 65)",
    cuisine: "Mughlai, Biryani & South Indian Non-Veg",
    category: "Non-Veg",
    priceRange: "₹₹",
    rating: 4.5,
    reviewsCount: 22000,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80",
    area: "Anna Salai (Mount Road)",
    famousFor: "Invented the iconic 'Chicken 65' in 1965 by A.M. Buhari",
    timings: "11:00 AM – 11:30 PM",
    address: "83, Anna Salai, Border Thottam, Padupakkam",
    features: ["Historic Culinary Icon (1951)", "Halal Certified", "Family AC Dining", "Signature Biryani"],
    menuHighlights: ["Original Chicken 65", "Buhari Mutton Dum Biryani", "Egg Ceylon Parotta", "Caramel Custard"],
  },
  {
    id: "dindigul-thalappakatti",
    name: "Dindigul Thalappakatti Biryani",
    cuisine: "Authentic Chettinad & Seeraga Samba Biryani",
    category: "Non-Veg",
    priceRange: "₹₹",
    rating: 4.6,
    reviewsCount: 27000,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80",
    area: "T. Nagar, Nungambakkam & Velachery",
    famousFor: "Mouth-watering biryani slow-cooked with aromatic tiny-grain Seeraga Samba rice",
    timings: "11:30 AM – 11:00 PM",
    address: "Pondy Bazaar, T. Nagar, Chennai",
    features: ["Chettinad Spices", "Seeraga Samba Rice", "Traditional Woodfire Dum", "Spicy Starters"],
    menuHighlights: ["Thalappakatti Mutton Biryani", "Pepper Chicken Fry", "Nattu Kozhi Chukka", "Kari Dosa"],
  },
  {
    id: "annalakshmi-restaurant",
    name: "Annalakshmi Restaurant",
    cuisine: "Grand South Indian Royal Feasts",
    category: "Veg",
    priceRange: "₹₹₹",
    rating: 4.8,
    reviewsCount: 8900,
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1000&q=80",
    area: "Mayor Ramanathan Salai, Chetpet",
    famousFor: "Grand royal vegetarian thali in an antique temple-like palatial setting",
    timings: "12:00 PM – 3:00 PM & 7:00 PM – 10:00 PM",
    address: "Mayor Ramanathan Salai, Spur Tank Road, Chetpet",
    features: ["Culinary Art & Heritage", "Silver Service Feasts", "Classical Carnatic Ambience"],
    menuHighlights: ["Preeti Thali Banquet", "Elaneer Payasam (Tender Coconut Dessert)", "Paruppu Vadai", "Curd Rice"],
  },
  {
    id: "nair-mess",
    name: "Nair Mess (Chepauk)",
    cuisine: "Traditional Non-Veg Banana Leaf Meals",
    category: "Seafood",
    priceRange: "₹",
    rating: 4.6,
    reviewsCount: 14500,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    area: "Chepauk (near MA Chidambaram Stadium)",
    famousFor: "Steaming hot meals served on fresh banana leaf with Vanjaram (Seer Fish) fry",
    timings: "11:30 AM – 3:30 PM & 7:00 PM – 10:30 PM",
    address: "22, Mohammed Abdullah Sahib 2nd St, Chepauk",
    features: ["Authentic Mess Culture", "Fresh Bay Fish Catch", "Unlimited Rice & Gravies"],
    menuHighlights: ["Vanjaram Tawa Fish Fry", "Nethili Fry (Anchovies)", "Crab Masala", "Meen Kozhambu"],
  },
  {
    id: "amethyst-wild-garden",
    name: "Amethyst Wild Garden Cafe",
    cuisine: "Continental, Cafe, Bakery & Filter Coffee",
    category: "Cafe",
    priceRange: "₹₹₹",
    rating: 4.7,
    reviewsCount: 11200,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80",
    area: "Whites Road, Royapettah",
    famousFor: "Lush botanical garden cafe set inside a restored colonial heritage bungalow",
    timings: "10:00 AM – 11:30 PM",
    address: "Whites Road, Royapettah, Chennai",
    features: ["Garden Ambience", "Artisanal Coffee", "Heritage Courtyard", "Boutique Bookshop"],
    menuHighlights: ["Artisanal Sourdough Pizzas", "Madras Filter Coffee Tiramisu", "Wild Mushroom Risotto", "Fresh Juices"],
  },
  {
    id: "rayars-mess",
    name: "Rayar's Mess (Mylapore)",
    cuisine: "Historic Tiffin & Filter Coffee",
    category: "Tiffin & Coffee",
    priceRange: "₹",
    rating: 4.8,
    reviewsCount: 9400,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80",
    area: "Arundale Street, Mylapore",
    famousFor: "Tiny 80-year-old traditional mess serving golden hot bondas and steaming filter coffee",
    timings: "7:00 AM – 10:30 AM & 3:00 PM – 6:30 PM",
    address: "31, Arundale St, Mylapore, Chennai",
    features: ["80-Year Legend", "Freshly Fried Batches", "Filter Coffee Connoisseur Pick"],
    menuHighlights: ["Crispy Mysore Bonda", "Rava Pongal", "Adai Avial (Evenings)", "Degree Filter Coffee"],
  }
];

export const SHOPPING_DATA: ShoppingSpot[] = [
  // Medical Supplies
  {
    id: "apollo-pharmacy-greams",
    name: "Apollo Pharmacy 24/7 Flagship & Medical Supplies",
    category: "Medical Supplies",
    area: "Greams Road, Thousand Lights",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1000&q=80",
    description: "Chennai's premier 24-hour mega pharmacy and health supply hub next to Apollo Main Hospital. Stocks all domestic and imported medicines, travel medical kits, oxygen supplies, orthopedic aids, and pediatric care.",
    specialties: ["24/7 Open Service", "Prescription & International Medications", "Travel Vaccine Kits", "Surgical & Wheelchair Rentals"],
    timings: "Open 24 Hours / 7 Days",
    priceLevel: "Moderate",
    address: "21, Greams Lane, Thousand Lights, Chennai",
    bargainFriendly: false,
  },
  {
    id: "kakani-medical-surgical",
    name: "Kakani Medical & Surgical Supplies Hub",
    category: "Medical Supplies",
    area: "Nyniappa Naicken Street, Park Town",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80",
    description: "Located in Chennai's legendary medical wholesale district near Central Station. Offers wholesale rates on medical equipment, diabetes monitoring kits, surgical disposables, first aid kits, and wellness supplements.",
    specialties: ["Wholesale Prices", "Medical & Diagnostic Devices", "First Aid Bundles", "Rehabilitation Supports"],
    timings: "9:30 AM – 8:30 PM (Sundays Closed)",
    priceLevel: "Budget",
    address: "Nyniappa Naicken St, Park Town (Near Chennai Central)",
    bargainFriendly: true,
  },
  {
    id: "medplus-healthcare-tnagar",
    name: "MedPlus 24x7 Healthcare & Baby Care",
    category: "Medical Supplies",
    area: "Usman Road, T. Nagar",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    description: "Fully stocked central pharmacy in the heart of shopping district T. Nagar. Offers quick OTC remedies, travel electrolytes, mosquito repellents, baby care, and rapid prescription fulfillment.",
    specialties: ["Travel Medical Essentials", "Baby & Nutrition Supplies", "Emergency OTC", "Card & Digital Payments"],
    timings: "Open 24 Hours",
    priceLevel: "Budget",
    address: "Opposite Panagal Park, Usman Road, T. Nagar",
    bargainFriendly: false,
  },

  // Men's Wear
  {
    id: "syed-bawkher-menswear",
    name: "Syed Bawkher & Co. (Bespoke Men's Tailoring)",
    category: "Men's Wear",
    area: "Cathedral Road / Mount Road",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
    description: "Founded in 1930, one of Asia's most celebrated master tailors. Famous for bespoke Savile-Row quality suits, hand-finished Italian linen shirts, bandhgalas, and luxury fabrics.",
    specialties: ["Custom Bespoke Suits", "Scabal & Zegna Luxury Fabrics", "Handcrafted Nehru Jackets", "Heritage Tailoring"],
    timings: "10:30 AM – 8:00 PM (Sundays Closed)",
    priceLevel: "Luxury",
    address: "Cathedral Road, Gopalapuram, Chennai",
    bargainFriendly: false,
  },
  {
    id: "pothys-swarna-mahal-men",
    name: "Pothys Men's Grandeur & Silk Dhoti Studio",
    category: "Men's Wear",
    area: "Panagal Park, T. Nagar",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80",
    description: "Four full floors dedicated to men's fashion: from pure Mayilkan pattu (silk) veshtis/dhotis for South Indian weddings to modern linen shirts, festive kurtas, and casual wear.",
    specialties: ["Traditional Silk Dhotis & Angavastrams", "Festive Kurtas & Sherwanis", "Pure Cotton Shirts", "Wedding Collections"],
    timings: "9:00 AM – 9:30 PM (All Days)",
    priceLevel: "Moderate",
    address: "Panagal Park, T. Nagar, Chennai",
    bargainFriendly: false,
  },
  {
    id: "cotton-house-derby",
    name: "Cotton House & Derby Men's Casuals",
    category: "Men's Wear",
    area: "Pondy Bazaar, T. Nagar",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80",
    description: "Popular local hotspot for breathable handloom cotton shirts, polo tees, khakis, and beach linens perfectly suited to Chennai's coastal tropical climate.",
    specialties: ["Breathable Madras Checks Cotton", "Summer Linen Shirts", "Chinos & Cargoes", "Value Pricing"],
    timings: "10:00 AM – 9:00 PM",
    priceLevel: "Budget",
    address: "Pondy Bazaar Pedestrian Plaza, T. Nagar",
    bargainFriendly: true,
  },

  // Women's Wear
  {
    id: "nalli-silks-flagship",
    name: "Nalli Chinnasami Chetty (Est. 1928)",
    category: "Women's Wear",
    area: "Panagal Park, T. Nagar",
    rating: 4.8,
    reviewsCount: 19800,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
    description: "The gold standard of Kanchipuram Silk Sarees since 1928. Generously favored by generations for authentic bridal zari silks, lightweight tussar, temple borders, and festive sarees.",
    specialties: ["Original Kanchipuram Silk Sarees", "Pure Gold & Silver Zari Work", "Handloom Cotton Sarees", "Salwar Suits & Lehengas"],
    timings: "9:00 AM – 9:00 PM (All Days)",
    priceLevel: "Premium",
    address: "9, Nageswaran Road, Panagal Park, T. Nagar",
    bargainFriendly: false,
  },
  {
    id: "rmkv-silks",
    name: "RmKV Silks",
    category: "Women's Wear",
    area: "Panagal Park, T. Nagar",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
    description: "Celebrated for design innovation in handwoven silk sarees, including Guinness-record holder multi-color silks, lightweight wedding brocades, and vibrant casual ethnic ensembles.",
    specialties: ["Theme Concept Silk Sarees", "Reversible Kanchipuram Silks", "Designer Anarkalis", "Festive Kidswear"],
    timings: "9:30 AM – 9:30 PM",
    priceLevel: "Moderate",
    address: "Usman Road, T. Nagar, Chennai",
    bargainFriendly: false,
  },
  {
    id: "sundari-silks-mylapore",
    name: "Sundari Silks (Mylapore Heritage)",
    category: "Women's Wear",
    area: "North Mada Street, Mylapore",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
    description: "An evocative Chettinad-style architectural showroom with wooden pillars and brass lamps. Known for understated elegance, vegetable-dyed Kalamkari, and heirloom handlooms.",
    specialties: ["Chettinad Cotton Sarees", "Kalamkari Hand-block prints", "Temple Jewelry", "Heirloom Silks"],
    timings: "10:00 AM – 8:30 PM",
    priceLevel: "Premium",
    address: "38, North Mada St, Mylapore, Chennai",
    bargainFriendly: false,
  },

  // Shopping Malls
  {
    id: "express-avenue-mall",
    name: "Express Avenue Mall (EA)",
    category: "Shopping Malls",
    area: "Whites Road, Royapettah",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1000&q=80",
    description: "One of South India's largest shopping and entertainment destinations. Houses 200+ global brands, an 8-screen Escape Cinema, gaming zones, and an expansive food court.",
    specialties: ["200+ International Brands", "Escape Multiplex Cinemas", "Massive Food Court", "Hypermarket & Cosmetics"],
    timings: "10:00 AM – 10:00 PM",
    priceLevel: "Moderate",
    address: "Whites Road, Royapettah, Chennai",
    bargainFriendly: false,
  },
  {
    id: "phoenix-marketcity-chennai",
    name: "Phoenix Marketcity & Palladium",
    category: "Shopping Malls",
    area: "Velachery",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1000&q=80",
    description: "Premier luxury lifestyle destination featuring flagship stores of international fashion, IMAX cinema, gourmet dining, and the high-end Palladium luxury wing.",
    specialties: ["Palladium Luxury Wing (Coach, Michael Kors)", "IMAX Cinema Experience", "Multi-Level Basement Parking", "Gourmet Restaurants"],
    timings: "10:30 AM – 10:30 PM",
    priceLevel: "Premium",
    address: "142, Velachery Main Road, Velachery",
    bargainFriendly: false,
  },

  // Street Markets
  {
    id: "pondy-bazaar-pedestrian",
    name: "Pondy Bazaar Pedestrian Plaza",
    category: "Street Markets",
    area: "T. Nagar",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80",
    description: "A wide, European-style pedestrian boulevard lined with roadside kiosks, street fashion stalls, footwear, bangles, bags, and traditional filter coffee stalls. Bargaining heaven!",
    specialties: ["Budget Footwear & Kurtis", "Terracotta & Glass Bangles", "Street Fashion & Accessories", "Tasty Street Snacks (Bajji, Sundal)"],
    timings: "10:00 AM – 10:00 PM (Evenings most lively)",
    priceLevel: "Budget",
    address: "Sir Thyagaraya Road, T. Nagar",
    bargainFriendly: true,
  },
  {
    id: "sowcarpet-mint-street",
    name: "Sowcarpet & Mint Street Market",
    category: "Street Markets",
    area: "Sowcarpet / George Town",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1000&q=80",
    description: "Chennai's bustling 'North Indian' trading district. Centuries-old narrow lanes packed with wholesale textile shops, bridal lehenga bazaars, jewelry, dry fruits, and legendary chaat stalls.",
    specialties: ["Bridal Lehengas & Raw Fabrics", "Wholesale Imitation Jewelry", "Famous Mint Street Street Food (Murukku Sandwich)", "Silver Artifacts"],
    timings: "11:00 AM – 9:00 PM",
    priceLevel: "Budget",
    address: "Mint Street, Sowcarpet, Chennai",
    bargainFriendly: true,
  }
];

export const HOTELS_DATA: Hotel[] = [
  {
    id: "taj-coromandel",
    name: "Taj Coromandel",
    type: "Luxury 5-Star",
    rating: 4.8,
    reviewsCount: 6800,
    pricePerNight: 12500,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    area: "Nungambakkam",
    amenities: ["Outdoor Swimming Pool", "Jiva Spa", "Southern Spice Fine Dining", "24/7 Butler Service", "Free High-Speed Wi-Fi", "Airport Luxury Transfer"],
    distanceToAirport: "15 km (35 mins)",
    distanceToCentral: "6 km (15 mins)",
    description: "A grand icon of South Indian hospitality. Has hosted international royalty, heads of state, and icons. Home to 'Southern Spice', voted one of Asia's finest authentic South Indian restaurants.",
    roomTypes: [
      { name: "Deluxe Heritage King", price: 12500, capacity: "2 Adults, 1 Child" },
      { name: "Luxury Club Room with Lounge", price: 17000, capacity: "2 Adults" },
      { name: "Grand Presidential Suite", price: 42000, capacity: "3 Adults" }
    ]
  },
  {
    id: "itc-grand-chola",
    name: "ITC Grand Chola, a Luxury Collection Hotel",
    type: "Luxury 5-Star",
    rating: 4.9,
    reviewsCount: 12400,
    pricePerNight: 14000,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
    area: "Guindy (Near Airport & Metro)",
    amenities: ["World's Largest LEED Platinum Green Hotel", "Kaya Kalp Royal Spa", "3 Swimming Pools", "Peshawri Restaurant", "Metro Line Direct Access"],
    distanceToAirport: "8 km (15 mins)",
    distanceToCentral: "11 km (25 mins)",
    description: "An awe-inspiring architectural tribute to Southern India's greatest Chola Dynasty. Features majestic carved stone columns, grand sweeping staircases, and 10 world-class culinary venues.",
    roomTypes: [
      { name: "Executive Club Room", price: 14000, capacity: "2 Adults" },
      { name: "The Towers Chola Suite", price: 21000, capacity: "2 Adults, 1 Child" },
      { name: "Karikalan Presidential Suite", price: 65000, capacity: "4 Adults" }
    ]
  },
  {
    id: "the-leela-palace",
    name: "The Leela Palace Chennai",
    type: "Luxury 5-Star",
    rating: 4.9,
    reviewsCount: 8100,
    pricePerNight: 15500,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80",
    area: "MRC Nagar, Adyar Seafront",
    amenities: ["Panoramic Bay of Bengal Views", "Infinity Pool Overlooking Ocean", "ESPA Luxury Wellness", "Spectra Multi-Kitchen Buffet", "Private Balconies"],
    distanceToAirport: "14 km (30 mins)",
    distanceToCentral: "9 km (20 mins)",
    description: "Chennai’s only seafront palace hotel, gracefully overlooking the azure Bay of Bengal where the Adyar river meets the sea. Inspired by the Chettinad architecture of Tamil Nadu.",
    roomTypes: [
      { name: "Deluxe Bay View King Room", price: 15500, capacity: "2 Adults" },
      { name: "Royal Premiere Seafront Club", price: 22000, capacity: "2 Adults, 1 Child" },
      { name: "Royal Palace Ocean Suite", price: 55000, capacity: "3 Adults" }
    ]
  },
  {
    id: "the-residency-towers",
    name: "The Residency Towers",
    type: "Boutique & Mid-Range",
    rating: 4.6,
    reviewsCount: 7500,
    pricePerNight: 6200,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    area: "T. Nagar Shopping District",
    amenities: ["Rooftop Pool & Bar", "Reshma Spa", "Crown Rooftop Restaurant", "Valet Parking", "Free Buffet Breakfast"],
    distanceToAirport: "12 km (25 mins)",
    distanceToCentral: "7 km (18 mins)",
    description: "Perfect base for shoppers and business travelers located in the heart of T. Nagar. Renowned for warm hospitality, plush bedding, and top-rated breakfast spreads.",
    roomTypes: [
      { name: "Standard Executive Room", price: 6200, capacity: "2 Adults" },
      { name: "Club Tower Deluxe Room", price: 8500, capacity: "2 Adults, 1 Child" }
    ]
  },
  {
    id: "broadlands-heritage-guesthouse",
    name: "Broadlands Heritage Guesthouse",
    type: "Heritage",
    rating: 4.4,
    reviewsCount: 3200,
    pricePerNight: 2200,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80",
    area: "Vallabha Agraharam, Triplicane",
    amenities: ["Historic Colonial Courtyards", "Garden Terraces", "Book Exchange Library", "Walk to Marina Beach", "Free Wi-Fi"],
    distanceToAirport: "17 km (40 mins)",
    distanceToCentral: "3 km (10 mins)",
    description: "An authentic, legendary 19th-century colonial heritage mansion with open courtyards, wooden staircases, and birdsong. A favorite of global writers, travelers, and backpackers.",
    roomTypes: [
      { name: "Classic Heritage Room with Verandah", price: 2200, capacity: "2 Adults" },
      { name: "Courtyard Deluxe Room", price: 3400, capacity: "2 Adults, 1 Child" }
    ]
  },
  {
    id: "zostel-chennai",
    name: "Zostel Chennai",
    type: "Budget & Hostel",
    rating: 4.7,
    reviewsCount: 4100,
    pricePerNight: 850,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
    area: "T. Nagar / Nungambakkam Border",
    amenities: ["Air-Conditioned Dorms", "Private Rooms", "Community Lounge & Cafe", "Board Games & Rooftop Events", "Lockers & High-Speed Wi-Fi"],
    distanceToAirport: "13 km (30 mins)",
    distanceToCentral: "5 km (15 mins)",
    description: "Vibrant, design-led boutique hostel ideal for solo travelers, digital nomads, and young explorers. Offers social walking tours, food walks, and lively common spaces.",
    roomTypes: [
      { name: "Mixed 6-Bed AC Dorm (Per Bed)", price: 850, capacity: "1 Person" },
      { name: "Female-Only 4-Bed AC Dorm (Per Bed)", price: 950, capacity: "1 Person" },
      { name: "Private Cozy Ensuite Room", price: 2800, capacity: "2 Adults" }
    ]
  }
];

export const CURATED_ITINERARIES: { id: string; title: string; subtitle: string; days: ItineraryDay[] }[] = [
  {
    id: "1-day-express",
    title: "1-Day Express Chennai Highlights",
    subtitle: "Experience the soulful essence of Madras in 24 hours: ancient temple, breakfast idlis, colonial fort, and sunset at Marina Beach.",
    days: [
      {
        day: 1,
        title: "The Soul of Chennai (Sunrise to Sunset)",
        theme: "Heritage, Flavors & Coastal Twilight",
        activities: [
          {
            time: "6:00 AM – 7:30 AM",
            title: "Kapaleeshwarar Temple Darshan",
            description: "Witness the peaceful morning pooja rituals and admire the 120-foot rainbow Dravidian gopuram in ancient Mylapore.",
            location: "Mylapore",
            type: "visit",
          },
          {
            time: "7:45 AM – 8:45 AM",
            title: "Traditional South Indian Tiffin Breakfast",
            description: "Relish piping hot Ghee Podi Idlis, Medu Vada, and foaming Kumbakonam degree filter coffee at Rayar's Mess or Sangeetha.",
            location: "Mylapore / Triplicane",
            type: "food",
          },
          {
            time: "9:30 AM – 11:30 AM",
            title: "Fort St. George & Colonial History Museum",
            description: "Explore the 1644 British fortress, India's oldest Anglican church (St. Mary's), and colonial artillery.",
            location: "George Town",
            type: "visit",
          },
          {
            time: "12:30 PM – 2:00 PM",
            title: "Authentic Banana Leaf South Indian Lunch",
            description: "Feast on unlimited sambar, rasam, kootu, poriyal, appalam, and payasam served on a fresh plantain leaf at Nair Mess or Annalakshmi.",
            location: "Chepauk / Chetpet",
            type: "food",
          },
          {
            time: "2:30 PM – 4:30 PM",
            title: "Silk Sarees & Souvenir Shopping in T. Nagar",
            description: "Walk the pedestrian plaza of Pondy Bazaar and marvel at world-famous Kanchipuram silks at Nalli or RmKV.",
            location: "T. Nagar",
            type: "shopping",
          },
          {
            time: "5:00 PM – 7:30 PM",
            title: "Marina Beach Promenade & Lighthouse Sunset",
            description: "Take the elevator up the Chennai Lighthouse for 360° coastal panoramas, stroll the shore, and savor roasted corn and spicy beach sundal.",
            location: "Marina Beach",
            type: "visit",
          }
        ]
      }
    ]
  },
  {
    id: "2-day-cultural-coastal",
    title: "2-Day Cultural & Coastal Immersion",
    subtitle: "A balanced weekend journey covering cultural institutions, living village museums, seafood banquets, and beach cafes.",
    days: [
      {
        day: 1,
        title: "Day 1: Historic Heart & Living Arts",
        theme: "Colonial Legacies & Temple Architecture",
        activities: [
          {
            time: "8:00 AM – 9:30 AM",
            title: "Breakfast at Triplicane Ratna Cafe",
            description: "Savor the legendary bubbling sambar idli that has delighted travelers since 1948.",
            location: "Triplicane",
            type: "food"
          },
          {
            time: "10:00 AM – 1:00 PM",
            title: "Government Museum Egmore & Bronze Gallery",
            description: "Behold world-class 10th-century Chola bronzes including the celebrated Nataraja.",
            location: "Egmore",
            type: "visit"
          },
          {
            time: "1:30 PM – 3:00 PM",
            title: "Lunch: Origin of Chicken 65 at Buhari",
            description: "Taste the original recipe created in 1965 along with aromatic mutton dum biryani.",
            location: "Anna Salai",
            type: "food"
          },
          {
            time: "3:30 PM – 5:30 PM",
            title: "San Thome Basilica & Tomb of St. Thomas",
            description: "Step inside the historic Neo-Gothic cathedral built over an Apostle's tomb.",
            location: "Santhome",
            type: "visit"
          },
          {
            time: "6:00 PM – 8:30 PM",
            title: "Elliot's Beach Promenade & Besant Nagar Cafe Dinner",
            description: "Unwind at Bessie beach near the Karl Schmidt Memorial, followed by coastal dinner.",
            location: "Besant Nagar",
            type: "visit"
          }
        ]
      },
      {
        day: 2,
        title: "Day 2: Coastal Road (ECR) & Heritage Villages",
        theme: "Folk Arts, Handicrafts & Seaside Breezes",
        activities: [
          {
            time: "8:30 AM – 9:30 AM",
            title: "Filter Coffee & Crispy Dosas at Murugan Idli",
            description: "Fuel up with 4 kinds of fresh coconut and tomato chutneys.",
            location: "Besant Nagar",
            type: "food"
          },
          {
            time: "10:30 AM – 2:30 PM",
            title: "DakshinaChitra Living Heritage Village",
            description: "Explore 18 authentic heritage houses, watch live potters and silk weavers, and enjoy folk performances.",
            location: "East Coast Road",
            type: "visit"
          },
          {
            time: "3:00 PM – 4:30 PM",
            title: "Coastal Seafood Feast along ECR",
            description: "Fresh catch of tawa-fried seer fish, prawns, and crab curry overlooking the waves.",
            location: "Muttukadu / Kovalam",
            type: "food"
          },
          {
            time: "5:30 PM – 7:30 PM",
            title: "Evening Stroll at Theosophical Society Adyar",
            description: "Walk amidst 250 acres of tranquil gardens and the 450-year-old Great Banyan Tree.",
            location: "Adyar",
            type: "visit"
          }
        ]
      }
    ]
  },
  {
    id: "3-day-unesco-mahabs",
    title: "3-Day Grand Heritage, Food & UNESCO Trail",
    subtitle: "The definitive Chennai experience culminating in the magnificent rock-cut shore temples of Mahabalipuram.",
    days: [
      {
        day: 1,
        title: "Day 1: Classic Madras Landmarks",
        theme: "Temples, Forts & Marina Shores",
        activities: [
          {
            time: "7:00 AM",
            title: "Mylapore Kapaleeshwarar & Flower Market",
            description: "Traditional morning pooja and colorful jasmine flower bazaar walk.",
            location: "Mylapore",
            type: "visit"
          },
          {
            time: "10:30 AM",
            title: "Fort St. George & Museum",
            description: "India's first British outpost and historical artifacts.",
            location: "George Town",
            type: "visit"
          },
          {
            time: "5:00 PM",
            title: "Marina Beach Sunset & Lighthouse",
            description: "Panoramic vistas over Bay of Bengal and evening food stalls.",
            location: "Marina Beach",
            type: "visit"
          }
        ]
      },
      {
        day: 2,
        title: "Day 2: UNESCO Mahabalipuram Coastal Excursion",
        theme: "7th-Century Monolithic Architecture",
        activities: [
          {
            time: "8:00 AM",
            title: "Scenic East Coast Road (ECR) Drive",
            description: "Journey southward past beaches and backwaters.",
            location: "ECR Highway",
            type: "transport"
          },
          {
            time: "10:00 AM",
            title: "Shore Temple & Pancha Rathas Monoliths",
            description: "Inspect 1,300-year-old granite monolithic chariots and ocean-facing shrines.",
            location: "Mahabalipuram",
            type: "visit"
          },
          {
            time: "1:00 PM",
            title: "Fresh Seafood Lunch by the Shore",
            description: "Grilled calamari, lobster, and butter garlic fish at Moonrakers.",
            location: "Mahabalipuram",
            type: "food"
          },
          {
            time: "3:30 PM",
            title: "Krishna's Butter Ball & Arjuna's Penance",
            description: "Admire the giant 250-ton natural balancing boulder and stone carvings.",
            location: "Mahabalipuram",
            type: "visit"
          }
        ]
      },
      {
        day: 3,
        title: "Day 3: Gastronomy & Silk Shopping Finale",
        theme: "Flavors, Spices & World-Renowned Handlooms",
        activities: [
          {
            time: "9:00 AM",
            title: "Sowcarpet Street Food & Fabric Trail",
            description: "Bustling narrow heritage lanes, mint street chaat, and wholesale textiles.",
            location: "Sowcarpet",
            type: "shopping"
          },
          {
            time: "1:00 PM",
            title: "Chettinad Spicy Lunch at Thalappakatti",
            description: "Fragrant seeraga samba mutton biryani with pepper chicken fry.",
            location: "Nungambakkam",
            type: "food"
          },
          {
            time: "3:30 PM",
            title: "Grand Saree Shopping at Nalli & RmKV",
            description: "Pick authentic certified silk sarees and traditional dhotis for gifts.",
            location: "T. Nagar",
            type: "shopping"
          },
          {
            time: "6:30 PM",
            title: "Farewell Dinner at Amethyst Garden Cafe",
            description: "Relax under lush frangipani trees in a colonial courtyard.",
            location: "Royapettah",
            type: "food"
          }
        ]
      }
    ]
  }
];

export const TRANSIT_HUBS = [
  { id: "central", name: "Puratchi Thalaivar Dr. M.G.R. Central Railway Station (MAS)", area: "Park Town", metroLine: "Blue & Green Interchange" },
  { id: "airport", name: "Chennai International Airport (MAA)", area: "Meenambakkam", metroLine: "Blue Line (Direct Terminal Connection)" },
  { id: "marina", name: "Marina Beach / Light House", area: "Triplicane", metroLine: "Nearby: Govt Estate (Blue) / MRTS Light House" },
  { id: "tnagar", name: "T. Nagar / Panagal Park (Shopping Hub)", area: "T. Nagar", metroLine: "Nearby: Nandanam / Teynampet (Blue Line)" },
  { id: "mylapore", name: "Mylapore (Kapaleeshwarar Temple)", area: "Mylapore", metroLine: "Nearby: Thousand Lights / AG-DMS / Thirumayilai MRTS" },
  { id: "cmbt", name: "Puratchi Thalaivar Dr. MGR Bus Terminus (CMBT Koyambedu)", area: "Koyambedu", metroLine: "Green Line (Direct)" },
  { id: "guindy", name: "Guindy (National Park & Industrial Hub)", area: "Guindy", metroLine: "Blue Line (Direct)" },
  { id: "omr", name: "Tidel Park / OMR (IT Expressway)", area: "Tharamani", metroLine: "Suburban MRTS Tidel Park / Future Metro Line" },
  { id: "besant", name: "Besant Nagar (Elliot's Beach)", area: "Besant Nagar", metroLine: "Suburban Kasturba Nagar / Bus 29C / 5B" }
];

export const CHENNAI_WEATHER = {
  temp: 31,
  temperature: "31°C",
  feelsLike: "36°C",
  condition: "Partly Cloudy with Coastal Sea Breeze",
  humidity: "72%",
  wind: "18 km/h ENE (Bay of Bengal breeze)",
  windSpeed: "18 km/h ENE (Bay of Bengal breeze)",
  uvIndex: "7 (High - sunscreen recommended)",
  sunrise: "06:02 AM",
  sunset: "06:14 PM",
  seasonAdvice: "Peak visiting months are November through February when pleasant, dry winds prevail. Stay hydrated and enjoy coastal breezes in late afternoon.",
};

export const LOCAL_CUSTOMS_AND_TIPS = [
  {
    title: "Temple Etiquette & Dress Code",
    desc: "Always remove your footwear at the designated token counter before entering temple precincts. Traditional attire (dhoti, kurta, sarees, or pants covering knees and shoulders) is required. Walk clockwise (pradakshina) around the sanctum sanctorum."
  },
  {
    title: "Madras Filter Coffee Ritual",
    desc: "Locally called 'Filter Kaapi'. Poured back-and-forth between a wide cup (dabarah) and brass tumbler from a height to aerate and cool the drink into a frothy crest. Sip directly from the tumbler or dabarah."
  },
  {
    title: "Greeting with Respect (Vanakkam)",
    desc: "Greet locals with palms pressed together in front of the chest saying 'Vanakkam'. A friendly and polite attitude is warmly reciprocated across Tamil Nadu."
  },
  {
    title: "Bazaar & Street Bargaining",
    desc: "Fixed prices apply in major stores like Nalli or Apollo, but gentle bargaining is expected at open street markets like Pondy Bazaar and Mint Street. Start by offering 20-30% below the quoted price with a smile."
  },
  {
    title: "Tipping Conventions",
    desc: "In traditional tiffin rooms and vegetarian restaurants, leaving 5-10% in cash on the silver plate or bill folder is standard. At luxury hotels, service charges are often included."
  }
];

export const CHENNAI_EVENTS = [
  {
    name: "Margazhi Season (Madras Music & Dance Festival)",
    date: "Mid-December to Mid-January",
    venue: "Music Academy, Narada Gana Sabha & sabhas across Mylapore",
    description: "The world's largest cultural festival featuring 1,000+ classical Carnatic music concerts, Bharatanatyam dance performances, and famous canteen tiffins.",
    tag: "Carnatic Music & Dance"
  },
  {
    name: "Pongal & Tamil New Year Harvest Festivities",
    date: "January 14 – 17",
    venue: "Citywide & Island Grounds / Marina",
    description: "Four days of grand harvest celebrations, sweet jaggery pongal cooking, kolam (rangoli) street competitions, and folk dances.",
    tag: "Cultural Harvest"
  },
  {
    name: "Kapaleeshwarar Panguni Peruvizha (Chariot Festival)",
    date: "March / April (Full Moon)",
    venue: "Mylapore Temple Streets",
    description: "Centuries-old festival where the massive decorated temple wooden car (Ther) is pulled through Mylapore by tens of thousands of devotees.",
    tag: "Grand Temple Carnival"
  },
  {
    name: "Chennai Sangamam & International Kite Festival",
    date: "August & January",
    venue: "Marina Beach & Island Grounds",
    description: "Huge public folk festival with percussionists, Thappattam, martial arts, and colorful illuminated night kites over the Bay.",
    tag: "Open Beach Fair"
  }
];
