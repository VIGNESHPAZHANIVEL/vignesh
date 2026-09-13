import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Coffee,
  RotateCcw,
  MapPin,
  Train,
  ShoppingBag,
} from "lucide-react";
import { ChatMessage } from "../types";

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: "வணக்கம்! (Vanakkam!) I am your Chennai AI Travel Companion. Ask me anything about local metro routes, Marina Beach timings, top filter coffee spots, authentic silk shops, or customized trip plans!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState(initialPrompt || "");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || loading) return;

    const userMessage: ChatMessage = {
      role: "user",
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      const apiHistory = newHistory.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: promptText, history: apiHistory.slice(0, -1) }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const modelReply: ChatMessage = {
        role: "model",
        text: data.reply || "Sorry, I couldn't fetch a response right now. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, modelReply]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "I experienced a brief connection hiccup. Chennai's best spots like Marina Beach, Kapaleeshwarar Temple, and Saravana Bhavan are open! Please ask again or select one of the suggested questions.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "Where is the best filter coffee in Mylapore?",
    "How to reach Airport from Central via Metro?",
    "Best silk saree shops in T. Nagar with price range",
    "Suggest a 1-day itinerary for Marina & temples",
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-stone-900 border border-stone-700 rounded-2xl w-full max-w-2xl h-[600px] max-h-[90vh] flex flex-col text-stone-100 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95">
        {/* Modal Top Header */}
        <div className="px-5 py-4 border-b border-stone-800 bg-stone-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white font-serif flex items-center gap-2">
                <span>Chennai Local AI Travel Companion</span>
              </h3>
              <span className="text-[11px] text-amber-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Specialized in Chennai heritage, transit & dining
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setMessages([
                  {
                    role: "model",
                    text: "வணக்கம்! (Vanakkam!) How can I help you navigate Chennai today?",
                    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                  },
                ])
              }
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat message stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "model" && (
                <div className="w-7 h-7 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-amber-600 text-stone-950 font-medium rounded-tr-xs shadow"
                    : "bg-stone-950 border border-stone-800 text-stone-200 rounded-tl-xs"
                }`}
              >
                <div>{msg.text}</div>
                <div
                  className={`text-[9px] mt-1 text-right ${
                    msg.role === "user" ? "text-stone-800 font-normal" : "text-stone-500"
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-lg bg-stone-700 text-stone-200 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-7 h-7 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="bg-stone-950 border border-stone-800 rounded-2xl p-3 text-stone-400 text-xs flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Consulting Chennai city records...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt suggestions */}
        <div className="px-4 py-2 border-t border-stone-800/80 bg-stone-950/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] text-stone-400 uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-[11px] whitespace-nowrap border border-stone-700 transition-colors shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-stone-800 bg-stone-950">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Chennai metro, filter coffee, silk shops, Marina beach..."
              className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-4 py-2.5 text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-stone-500"
              id="ai-chat-input-box"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-stone-950 font-bold transition-all shrink-0"
              id="send-ai-message-btn"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
