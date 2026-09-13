import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", city: "Chennai", timestamp: new Date().toISOString() });
});

// Dynamic simulated live parking status
const parkingLots = [
  { id: "pk-1", name: "Pondy Bazaar Multi-Level Parking (MLCP)", area: "T. Nagar", totalSlots4W: 240, occupied4W: 195, totalSlots2W: 500, occupied2W: 380, ratePerHour: 20, type: "Automated MLCP", distanceKm: 0.4 },
  { id: "pk-2", name: "Chennai Central Railway Station MLCP", area: "Park Town / Central", totalSlots4W: 350, occupied4W: 290, totalSlots2W: 600, occupied2W: 440, ratePerHour: 30, type: "Multi-level covered", distanceKm: 1.2 },
  { id: "pk-3", name: "Marina Beach Promenade Parking", area: "Kamarajar Salai", totalSlots4W: 400, occupied4W: 320, totalSlots2W: 800, occupied2W: 610, ratePerHour: 15, type: "Open Beachfront Bay", distanceKm: 0.2 },
  { id: "pk-4", name: "Phoenix Marketcity Basement P1-P4", area: "Velachery", totalSlots4W: 1200, occupied4W: 940, totalSlots2W: 1500, occupied2W: 1100, ratePerHour: 40, type: "Mall Underground", distanceKm: 3.5 },
  { id: "pk-5", name: "Kapaleeshwarar South Mada Street Parking", area: "Mylapore", totalSlots4W: 60, occupied4W: 55, totalSlots2W: 180, occupied2W: 165, ratePerHour: 20, type: "Designated Temple Bay", distanceKm: 0.1 },
  { id: "pk-6", name: "Besant Nagar (Elliot's Beach) 6th Avenue", area: "Besant Nagar", totalSlots4W: 150, occupied4W: 110, totalSlots2W: 350, occupied2W: 260, ratePerHour: 20, type: "Civic Open Lot", distanceKm: 0.5 },
  { id: "pk-7", name: "CMBT Koyambedu Bus Terminal Parking", area: "Koyambedu", totalSlots4W: 450, occupied4W: 310, totalSlots2W: 900, occupied2W: 720, ratePerHour: 25, type: "Transit Terminal Hub", distanceKm: 4.8 },
  { id: "pk-8", name: "Express Avenue Mall Parking (Gate 2 & 3)", area: "Royapettah", totalSlots4W: 800, occupied4W: 620, totalSlots2W: 1000, occupied2W: 780, ratePerHour: 35, type: "Mall Basement", distanceKm: 1.8 }
];

app.get("/api/parking/live", (req, res) => {
  // Add slight natural fluctuations to show live telemetry
  const updatedLots = parkingLots.map((lot) => {
    const delta4W = Math.floor(Math.random() * 7) - 3;
    const delta2W = Math.floor(Math.random() * 11) - 5;
    const occupied4W = Math.max(10, Math.min(lot.totalSlots4W - 2, lot.occupied4W + delta4W));
    const occupied2W = Math.max(20, Math.min(lot.totalSlots2W - 5, lot.occupied2W + delta2W));
    const available4W = lot.totalSlots4W - occupied4W;
    const available2W = lot.totalSlots2W - occupied2W;
    const occupancyPercent = Math.round((occupied4W / lot.totalSlots4W) * 100);

    let status = "Available";
    if (occupancyPercent > 88) status = "Filling Fast";
    if (occupancyPercent >= 96) status = "Almost Full";

    return {
      ...lot,
      occupied4W,
      available4W,
      occupied2W,
      available2W,
      occupancyPercent,
      status,
      lastUpdated: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };
  });

  res.json({ success: true, lots: updatedLots, timestamp: new Date().toISOString() });
});

// AI Travel Guide Chatbot Endpoint
app.post("/api/gemini/chat", async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const ai = getGenAI();
  if (!ai) {
    // Graceful fallback with rich curated Chennai knowledge if API key is not yet set
    const fallbackAnswer = generateChennaiFallbackResponse(message);
    return res.json({ text: fallbackAnswer, source: "curated_guide" });
  }

  try {
    const systemPrompt = `You are "Vanakkam Chennai", an expert, warm, and highly knowledgeable local tourist guide for Chennai (formerly Madras), Tamil Nadu, India.
You provide authentic, culturally rich, and practical advice on:
- Sightseeing (Marina Beach, Kapaleeshwarar Temple, Fort St. George, San Thome, Mahabalipuram, etc.)
- Transport (Chennai Metro Blue & Green lines, MTC buses, Suburban trains, Auto-rickshaws meter rules and bargaining tips)
- Food & Dining (Filter coffee hubs, Murugan Idli, Ratna Cafe sambar, Buhari Chicken 65, banana leaf meals, Chettinad feasts)
- Shopping (Silk sarees in T. Nagar like Nalli/RmKV, Sowcarpet street shopping, Pondy Bazaar, 24x7 Apollo medical supplies)
- Parking tips, weather advisory (tropical coastal climate, sea breeze, monsoon), and Tamil polite greetings (Vanakkam, Romba Nandri).
Keep responses clear, helpful, structured with bullet points where appropriate, and enthusiastic.`;

    const chatMessages: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const h of history.slice(-6)) {
        chatMessages.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }],
        });
      }
    }
    chatMessages.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: chatMessages,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text || "Vanakkam! How else can I assist your trip in Chennai?", source: "gemini" });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    const fallback = generateChennaiFallbackResponse(message);
    return res.json({ text: fallback, source: "curated_fallback" });
  }
});

function generateChennaiFallbackResponse(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("auto") || q.includes("transport") || q.includes("cab") || q.includes("taxi")) {
    return "🚗 **Getting Around Chennai Tip**: For hassle-free travel, Chennai Metro is clean, air-conditioned, and connects Central Railway Station directly to Chennai International Airport. For auto-rickshaws, rideshare apps (Ola/Uber/Rapido) offer upfront fixed pricing to avoid meter disputes. MTC buses also connect every corner (e.g., 21G, 102 to ECR).";
  }
  if (q.includes("food") || q.includes("restaurant") || q.includes("eat") || q.includes("coffee") || q.includes("idli")) {
    return "☕ **Must-Eat in Chennai**: Don't leave without tasting authentic Kumbakonam Degree Filter Coffee in Mylapore, crispy Ghee Podi Idli at Murugan Idli Shop, iconic steaming Sambar Idli at Ratna Cafe (Triplicane), and authentic fiery Chettinad biryani at Thalappakatti or Buhari!";
  }
  if (q.includes("temple") || q.includes("dress") || q.includes("kapaleeshwarar")) {
    return "🛕 **Temple Etiquette**: When visiting Kapaleeshwarar Temple (Mylapore) or Parthasarathy Temple (Triplicane), dress conservatively covering shoulders and knees (traditional dhotis/kurtas or sarees/salwars are welcomed). Footwear must be deposited at designated stalls outside the Gopuram gates.";
  }
  if (q.includes("saree") || q.includes("shop") || q.includes("t nagar") || q.includes("cloth")) {
    return "🛍️ **Shopping Master Guide**: Head straight to Usman Road & Pondy Bazaar in T. Nagar! For pure Kanchipuram Silk Sarees, visit Nalli Chinnasami Chetty, RmKV, or Kumaran Silks. For trendy budget casuals, stroll the pedestrian plaza of Pondy Bazaar.";
  }
  if (q.includes("weather") || q.includes("best time") || q.includes("season")) {
    return "☀️ **Chennai Weather & Timing**: Chennai has three seasons: 'Hot, Hotter, and Hottest'! The best time to visit is November to February when temperatures hover between 22°C and 30°C with refreshing sea breezes. Marina Beach is best enjoyed between 4:30 PM and 7:30 PM.";
  }
  return "Vanakkam! Welcome to Chennai, the cultural capital of South India! You can ask me about top attractions like Marina Beach and Kapaleeshwarar Temple, Metro transit routes, live parking in T. Nagar, authentic filter coffee spots, or saree shopping.";
}

// Start Server with Vite
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Chennai Tourist Guide Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
