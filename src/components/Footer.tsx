import React from "react";
import {
  MapPin,
  Heart,
  PhoneCall,
  Train,
  Shield,
  ExternalLink,
} from "lucide-react";
import { ActiveTab } from "../types";

interface FooterProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand & Intro */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-stone-950 font-bold font-serif text-base">
                ச
              </div>
              <span className="font-bold text-white text-base font-serif">
                Chennai Tourist Guide
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Your comprehensive digital travel companion for discovering the culture, heritage,
              cuisine, coastal treasures, and transit network of Tamil Nadu&apos;s vibrant capital city.
            </p>
            <div className="mt-4 text-[11px] text-amber-400 font-medium">
              வணக்கம் தமிழ்நாடு • Welcome to Tamil Nadu
            </div>
          </div>

          {/* Quick Sections */}
          <div>
            <h4 className="font-bold text-stone-100 uppercase tracking-wider text-[11px] mb-3">
              Guide Sections
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab("transport")}
                  className="hover:text-amber-400 transition-colors"
                >
                  Local Transport & Metro Routes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("parking")}
                  className="hover:text-amber-400 transition-colors"
                >
                  Live Smart Parking Spaces
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("places")}
                  className="hover:text-amber-400 transition-colors"
                >
                  Top Places & Sightseeing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("restaurants")}
                  className="hover:text-amber-400 transition-colors"
                >
                  Restaurant Guide & Table Booking
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("shopping")}
                  className="hover:text-amber-400 transition-colors"
                >
                  Shopping Hubs & Medical Stores
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab("hotels")}
                  className="hover:text-amber-400 transition-colors"
                >
                  Accommodations & Hotels
                </button>
              </li>
            </ul>
          </div>

          {/* Essential Travel Hubs */}
          <div>
            <h4 className="font-bold text-stone-100 uppercase tracking-wider text-[11px] mb-3">
              Essential Transit Gates
            </h4>
            <div className="space-y-2 text-stone-400">
              <div>
                <strong className="text-stone-300 block">Puratchi Thalaivar Dr. M.G.R Central:</strong>
                <span>Direct Blue Line Metro connection & All-India Trains</span>
              </div>
              <div>
                <strong className="text-stone-300 block">Chennai International Airport (MAA):</strong>
                <span>Terminals T1, T2 & T4 with connected underground Metro</span>
              </div>
              <div>
                <strong className="text-stone-300 block">CMBT Koyambedu:</strong>
                <span>Green Line Metro & Interstate Express Buses</span>
              </div>
            </div>
          </div>

          {/* Tourist Emergency Helplines */}
          <div>
            <h4 className="font-bold text-stone-100 uppercase tracking-wider text-[11px] mb-3">
              Helplines & Assistance
            </h4>
            <div className="space-y-2 text-stone-300">
              <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-[10px] text-stone-500 block">TOURIST POLICE</span>
                <span className="text-amber-400 font-bold">044-25384520 / 100</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-[10px] text-stone-500 block">AMBULANCE & MEDICAL</span>
                <span className="text-amber-400 font-bold">108</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-800">
                <span className="text-[10px] text-stone-500 block">TAMIL NADU TOURISM (TTDC)</span>
                <span className="text-amber-400 font-bold">1800-4253-1111</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500">
          <div>
            © {new Date().getFullYear()} Chennai Tourist Guide. Crafted with cultural pride for travellers visiting Chennai.
          </div>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Discover Chennai with pride</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
