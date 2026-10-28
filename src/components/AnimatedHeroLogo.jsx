import React from 'react';

export const AnimatedHeroLogo = () => {
  return (
    <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] md:w-[620px] h-[320px] sm:h-[500px] md:h-[620px] pointer-events-none select-none -z-10 opacity-22 sm:opacity-28 transition-all duration-700">
      <svg
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_0_80px_rgba(56,189,248,0.3)]"
      >
        <defs>
          {/* Top Layer Gradient (Vibrant Sky to Purple) */}
          <linearGradient id="heroTopPlateGrad" x1="10" y1="6" x2="118" y2="66" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>

          {/* Mid Layer Gradient (Deep Sky to Blue) */}
          <linearGradient id="heroMidPlateGrad" x1="10" y1="30" x2="118" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          {/* Bottom Layer Gradient (Indigo to Violet) */}
          <linearGradient id="heroBotPlateGrad" x1="10" y1="54" x2="118" y2="114" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          {/* Illuminated Core Filter */}
          <filter id="heroGlowCore" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Atmospheric Layer Shadow */}
          <filter id="heroLayerShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* Ambient Radial Energy Ring behind Logo */}
        <circle cx="64" cy="64" r="56" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="64" cy="64" r="44" stroke="rgba(129, 140, 248, 0.12)" strokeWidth="0.8" />

        {/* BOTTOM LAYER (Layer 3 - Floating with offset cadence) */}
        <g className="animate-plate-bot" filter="url(#heroLayerShadow)">
          {/* 3D Extrusion Side Faces */}
          <polygon points="10,84 64,114 64,122 10,92" fill="#312e81" opacity="0.9" />
          <polygon points="64,114 118,84 118,92 64,122" fill="#4c1d95" opacity="0.9" />
          {/* Top Face */}
          <polygon points="64,54 118,84 64,114 10,84" fill="url(#heroBotPlateGrad)" />
          {/* Glossy Border Outline */}
          <polygon points="64,54 118,84 64,114 10,84" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2" />
          {/* Neon Light Sweep */}
          <polygon points="64,54 118,84 64,114 10,84" className="animate-edge-sweep" stroke="#c084fc" strokeWidth="1.5" fill="none" />
        </g>

        {/* MIDDLE LAYER (Layer 2 - Floating with offset cadence) */}
        <g className="animate-plate-mid" filter="url(#heroLayerShadow)">
          {/* 3D Extrusion Side Faces */}
          <polygon points="10,60 64,90 64,98 10,68" fill="#0369a1" opacity="0.9" />
          <polygon points="64,90 118,60 118,68 64,98" fill="#1d4ed8" opacity="0.9" />
          {/* Top Face */}
          <polygon points="64,30 118,60 64,90 10,60" fill="url(#heroMidPlateGrad)" />
          {/* Glossy Border Outline */}
          <polygon points="64,30 118,60 64,90 10,60" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
          {/* Neon Light Sweep */}
          <polygon points="64,30 118,60 64,90 10,60" className="animate-edge-sweep" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
        </g>

        {/* TOP LAYER (Layer 1 - Floating with highest amplitude & pulsing gem) */}
        <g className="animate-plate-top" filter="url(#heroLayerShadow)">
          {/* 3D Extrusion Side Faces */}
          <polygon points="10,36 64,66 64,74 10,44" fill="#0284c7" opacity="0.9" />
          <polygon points="64,66 118,36 118,44 64,74" fill="#6366f1" opacity="0.9" />
          {/* Top Face */}
          <polygon points="64,6 118,36 64,66 10,36" fill="url(#heroTopPlateGrad)" />
          {/* Glossy Border Outline */}
          <polygon points="64,6 118,36 64,66 10,36" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" />
          {/* Neon Light Sweep */}
          <polygon points="64,6 118,36 64,66 10,36" className="animate-edge-sweep" stroke="#ffffff" strokeWidth="1.6" fill="none" />

          {/* Central Glowing Spark Core */}
          <g className="animate-core-glow">
            <circle cx="64" cy="36" r="6" fill="#ffffff" filter="url(#heroGlowCore)" opacity="0.9" />
            <circle cx="64" cy="36" r="2.5" fill="#e0f2fe" />
          </g>
        </g>
      </svg>
    </div>
  );
};
