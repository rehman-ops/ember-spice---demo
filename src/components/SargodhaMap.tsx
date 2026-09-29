import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Car, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface SargodhaMapProps {
  compact?: boolean;
}

const LANDMARKS = [
  {
    id: 'uni-road',
    name: 'University Road Chowk',
    distance: '1.8 km',
    driveTime: '5 mins drive',
    directions: 'Head east toward Main Boulevard, pass Queens Road intersection; Ember & Spice is on the left beside the central boulevard palms.',
  },
  {
    id: 'satellite-town',
    name: 'Satellite Town (Block A)',
    distance: '2.4 km',
    driveTime: '7 mins drive',
    directions: 'Take Main Satellite Town Road straight onto Main Boulevard Commercial Zone. Dedicated valet & family parking at entrance.',
  },
  {
    id: 'cantt-paf',
    name: 'Cantonment & PAF Road',
    distance: '3.9 km',
    driveTime: '10 mins drive',
    directions: 'Via Khushab Road / Club Road link onto Main Boulevard Sargodha.',
  },
];

export const SargodhaMap: React.FC<SargodhaMapProps> = ({ compact = false }) => {
  const [selectedLandmark, setSelectedLandmark] = useState(LANDMARKS[0]);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText(RESTAURANT_INFO.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <div className="rounded-xl border border-[#FAF7F2]/12 bg-[#181715] overflow-hidden">
      {/* Visual Architectural Map Canvas */}
      <div className={`relative ${compact ? 'h-64 sm:h-72' : 'h-72 sm:h-80'} w-full bg-[#131210] overflow-hidden select-none`}>
        <svg
          viewBox="0 0 800 420"
          className="w-full h-full object-cover"
          role="img"
          aria-label="Map illustration showing Ember & Spice on Main Boulevard, Sargodha, Punjab"
        >
          <defs>
            <pattern id="sargodha-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(250, 247, 242, 0.04)"
                strokeWidth="1"
              />
            </pattern>
            <radialGradient id="ember-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(217, 83, 38, 0.32)" />
              <stop offset="70%" stopColor="rgba(217, 83, 38, 0.06)" />
              <stop offset="100%" stopColor="rgba(217, 83, 38, 0)" />
            </radialGradient>
          </defs>

          {/* Base Grid */}
          <rect width="800" height="420" fill="#141311" />
          <rect width="800" height="420" fill="url(#sargodha-grid)" />

          {/* Urban Blocks */}
          <rect x="40" y="30" width="210" height="110" rx="6" fill="#1B1917" stroke="rgba(250,247,242,0.05)" />
          <rect x="290" y="30" width="240" height="110" rx="6" fill="#1B1917" stroke="rgba(250,247,242,0.05)" />
          <rect x="570" y="30" width="190" height="110" rx="6" fill="#1B1917" stroke="rgba(250,247,242,0.05)" />
          <rect x="40" y="240" width="210" height="140" rx="6" fill="#1B1917" stroke="rgba(250,247,242,0.05)" />
          <rect x="290" y="240" width="240" height="140" rx="6" fill="#1B1917" stroke="rgba(250,247,242,0.05)" />
          <rect x="570" y="240" width="190" height="140" rx="6" fill="#1B1917" stroke="rgba(250,247,242,0.05)" />

          {/* Secondary Arteries (Queens Road & University Road Link) */}
          <path
            d="M 270 0 L 270 420"
            stroke="#252320"
            strokeWidth="22"
          />
          <path
            d="M 550 0 L 550 420"
            stroke="#252320"
            strokeWidth="20"
          />

          {/* Main Boulevard Sargodha (Primary Horizontal Artery) */}
          <path
            d="M 0 190 L 800 190"
            stroke="#2D2A26"
            strokeWidth="36"
          />
          <path
            d="M 0 190 L 800 190"
            stroke="#C5A059"
            strokeWidth="1.5"
            strokeDasharray="10 10"
            opacity="0.45"
          />

          {/* Active Route Highlight */}
          <path
            d="M 120 190 L 420 190"
            stroke="#D95326"
            strokeWidth="4"
            strokeDasharray="6 4"
          />

          {/* Road Labels */}
          <text x="55" y="183" fill="#FAF7F2" opacity="0.55" fontSize="11" fontFamily="Plus Jakarta Sans" letterSpacing="1.5">
            MAIN BOULEVARD · SARGODHA
          </text>
          <text x="280" y="75" fill="#FAF7F2" opacity="0.4" fontSize="10" fontFamily="Plus Jakarta Sans">
            QUEENS ROAD LINK
          </text>
          <text x="562" y="320" fill="#FAF7F2" opacity="0.4" fontSize="10" fontFamily="Plus Jakarta Sans">
            SATELLITE TOWN RD
          </text>
          <text x="65" y="95" fill="#C5A059" opacity="0.65" fontSize="11" fontFamily="Plus Jakarta Sans">
            University Rd Chowk (1.8 km)
          </text>
          <text x="585" y="95" fill="#C5A059" opacity="0.65" fontSize="11" fontFamily="Plus Jakarta Sans">
            Satellite Town Block A
          </text>

          {/* Ember & Spice Pin Glow */}
          <circle cx="420" cy="190" r="75" fill="url(#ember-glow)" />
          <circle cx="420" cy="190" r="18" fill="#D95326" opacity="0.25" />
          <circle cx="420" cy="190" r="9" fill="#D95326" stroke="#FAF7F2" strokeWidth="2.5" />

          {/* Pin Callout Card in SVG */}
          <g transform="translate(310, 102)">
            <rect
              x="0"
              y="0"
              width="220"
              height="62"
              rx="8"
              fill="#111110"
              stroke="#C5A059"
              strokeWidth="1.2"
            />
            <text x="16" y="25" fill="#FAF7F2" fontSize="14" fontWeight="700" fontFamily="Cormorant Garamond">
              EMBER &amp; SPICE SARGODHA
            </text>
            <text x="16" y="44" fill="#C5A059" fontSize="11" fontFamily="Plus Jakarta Sans">
              Main Boulevard · Free Family Parking
            </text>
          </g>
        </svg>

        {/* Top-left badge */}
        <div className="absolute top-3 left-3 bg-[#111110]/90 backdrop-blur-sm border border-[#FAF7F2]/10 rounded-lg px-3 py-1.5 text-xs text-[#FAF7F2]/80 flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#D95326] shrink-0" />
          <span>Main Boulevard Commercial Zone · Sargodha</span>
        </div>
      </div>

      {/* Interactive Landmark & Directions Bar */}
      <div className="p-4 sm:p-5 bg-[#181715] border-t border-[#FAF7F2]/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#FAF7F2]/10">
          <div>
            <p className="text-xs text-[#C5A059] font-medium">
              Check Drive Time From Sargodha Landmarks
            </p>
            <p className="text-sm text-[#FAF7F2]/80 mt-0.5">
              Select a starting point for quick route notes &amp; parking details
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {LANDMARKS.map((landmark) => {
              const active = selectedLandmark.id === landmark.id;
              return (
                <button
                  key={landmark.id}
                  type="button"
                  onClick={() => setSelectedLandmark(landmark)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 whitespace-nowrap ${
                    active
                      ? 'bg-[#D95326] text-white'
                      : 'bg-[#111110] text-[#FAF7F2]/75 hover:text-[#FAF7F2] border border-[#FAF7F2]/10'
                  }`}
                >
                  {landmark.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-xs text-[#C5A059] font-mono-num">
              <span className="inline-flex items-center gap-1">
                <Car className="w-3.5 h-3.5" />
                {selectedLandmark.driveTime} ({selectedLandmark.distance})
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Valet &amp; Dedicated Parking Available
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed">
              {selectedLandmark.directions}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleCopyAddress}
              className="px-3.5 py-2 rounded-lg border border-[#FAF7F2]/15 hover:border-[#C5A059] text-xs font-medium text-[#FAF7F2] transition-colors duration-150 inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Address Copied</span>
                </>
              ) : (
                <span>Copy Address</span>
              )}
            </button>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                'Main Boulevard Sargodha Punjab Pakistan'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#FAF7F2] text-[#111110] hover:bg-[#C5A059] hover:text-[#111110] text-xs font-semibold transition-colors duration-150 inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
