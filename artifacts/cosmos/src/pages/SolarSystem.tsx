import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { planets } from '@/lib/data';
import { X, Navigation, Thermometer, Info, Sparkles } from 'lucide-react';

// SVG visual config — separate from the data layer
const PLANET_VIS = [
  { id: 'mercury', orbitR: 90,  r: 5,  speed: 8,   gFrom: '#d4d4d4', gTo: '#787878', startDeg: 40 },
  { id: 'venus',   orbitR: 138, r: 8,  speed: 14,  gFrom: '#f5e098', gTo: '#c8943a', startDeg: 160 },
  { id: 'earth',   orbitR: 186, r: 9,  speed: 20,  gFrom: '#6dbbf5', gTo: '#2a5a3e', startDeg: 280 },
  { id: 'mars',    orbitR: 238, r: 7,  speed: 32,  gFrom: '#e06030', gTo: '#8b2500', startDeg: 60 },
  { id: 'jupiter', orbitR: 328, r: 22, speed: 65,  gFrom: '#e8c090', gTo: '#c07840', startDeg: 200 },
  { id: 'saturn',  orbitR: 430, r: 18, speed: 130, gFrom: '#f0e0b0', gTo: '#c8a060', startDeg: 320, hasRings: true },
  { id: 'uranus',  orbitR: 518, r: 13, speed: 220, gFrom: '#80e8e8', gTo: '#38a0b8', startDeg: 110 },
  { id: 'neptune', orbitR: 610, r: 12, speed: 320, gFrom: '#5080f0', gTo: '#1830a0', startDeg: 230 },
] as const;

// Deterministic asteroid belt between Mars (238) and Jupiter (328) orbits
const ASTEROIDS = Array.from({ length: 110 }, (_, i) => {
  const angle = (i / 110) * Math.PI * 2;
  const r = 275 + (Math.sin(i * 7.3 + 1.2) * 0.5 + 0.5) * 38;
  return { x: Math.cos(angle) * r, y: Math.sin(angle) * r, s: 0.4 + (Math.sin(i * 13.7) * 0.5 + 0.5) * 1.0 };
});

type PlanetData = typeof planets[0];

const SUN_DATA: PlanetData = {
  id: 'sun',
  name: 'The Sun',
  description: 'The star at the center of our Solar System — a nearly perfect sphere of hot plasma held together by its own gravity. It is by far the largest object in the solar system.',
  distance: '0 km',
  gravity: '274 m/s²',
  temp: '5,500°C surface / 15M°C core',
  moons: 0,
  facts: [
    'Accounts for 99.86% of the entire solar system\'s mass.',
    'About 1.3 million Earths could fit inside the Sun.',
    'Its light takes 8 minutes and 20 seconds to reach Earth.',
  ],
  color: '#f59e0b',
  size: 4,
  orbitRadius: 0,
  orbitSpeed: 0,
};

export default function SolarSystem() {
  const [selected, setSelected] = useState<PlanetData | null>(null);

  function handleClick(id: string) {
    if (id === 'sun') { setSelected(SUN_DATA); return; }
    const p = planets.find(pl => pl.id === id);
    if (p) setSelected(p);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] relative flex items-center justify-center overflow-hidden">
      {/* Ambient sun glow behind everything */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/8 blur-[120px] rounded-full pointer-events-none" />

      {/* SVG Solar System */}
      <svg
        viewBox="-660 -660 1320 1320"
        className="w-full h-[calc(100vh-4rem)]"
        style={{ maxWidth: 900, maxHeight: 900, overflow: 'visible' }}
        aria-label="Interactive solar system diagram"
      >
        <defs>
          {/* Sun gradient */}
          <radialGradient id="grad-sun" cx="35%" cy="35%">
            <stop offset="0%"   stopColor="#fffacc" />
            <stop offset="45%"  stopColor="#f5b030" />
            <stop offset="100%" stopColor="#e05010" />
          </radialGradient>

          {/* Planet gradients */}
          {PLANET_VIS.map(p => (
            <radialGradient key={p.id} id={`grad-${p.id}`} cx="35%" cy="35%">
              <stop offset="0%"   stopColor={p.gFrom} />
              <stop offset="100%" stopColor={p.gTo} />
            </radialGradient>
          ))}

          {/* Jupiter band overlay */}
          <linearGradient id="grad-jupiter-bands" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(180,120,60,0.4)" />
            <stop offset="30%"  stopColor="rgba(220,170,100,0.0)" />
            <stop offset="50%"  stopColor="rgba(160,90,40,0.35)" />
            <stop offset="70%"  stopColor="rgba(220,170,100,0.0)" />
            <stop offset="100%" stopColor="rgba(180,120,60,0.3)" />
          </linearGradient>

          {/* Glow filters */}
          <filter id="f-sun" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="f-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/*
            Ring clip paths using objectBoundingBox so they work in any coordinate position.
            "back" = bottom half of ellipse (y > bbox_center_y) — drawn behind planet sphere
            "front" = top half of ellipse (y < bbox_center_y) — drawn in front of planet sphere
          */}
          <clipPath id="clip-ring-back" clipPathUnits="objectBoundingBox">
            <rect x="0" y="0.5" width="1" height="0.5" />
          </clipPath>
          <clipPath id="clip-ring-front" clipPathUnits="objectBoundingBox">
            <rect x="0" y="0" width="1" height="0.5" />
          </clipPath>
        </defs>

        {/* Orbit path rings */}
        {PLANET_VIS.map(p => (
          <circle key={`orbit-${p.id}`} cx="0" cy="0" r={p.orbitR}
            fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="1" />
        ))}

        {/* Asteroid belt (static dots) */}
        {ASTEROIDS.map((a, i) => (
          <circle key={i} cx={a.x} cy={a.y} r={a.s}
            fill="rgba(210,200,175,0.22)" />
        ))}

        {/* Planets */}
        {PLANET_VIS.map(pv => {
          const pd = planets.find(p => p.id === pv.id);
          // Negative delay offsets the animation start so each planet begins at a unique orbital angle
          const delay = `${-((pv.startDeg / 360) * pv.speed).toFixed(2)}s`;

          return (
            <g key={pv.id}
              style={{
                animation: `orbit ${pv.speed}s linear infinite`,
                transformOrigin: '0px 0px',
                animationDelay: delay,
              }}
            >
              <g transform={`translate(${pv.orbitR}, 0)`}>

                {/* ── Saturn back ring (drawn BEFORE planet so planet sits on top) ── */}
                {pv.hasRings && (
                  <g style={{
                    /*
                     * Counter-rotation: cancels the parent orbit rotation so the rings
                     * stay oriented horizontally in the viewport at all times.
                     * transform-box:fill-box + transform-origin:center makes it rotate
                     * around the ellipse's own center (the planet center).
                     */
                    animation: `orbit ${pv.speed}s linear infinite reverse`,
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                    animationDelay: delay,
                  } as React.CSSProperties}>
                    {/* Outer ring — back half */}
                    <ellipse cx="0" cy="0" rx={pv.r * 2.15} ry={pv.r * 0.55}
                      fill="rgba(150,120,60,0.12)"
                      stroke="rgba(230,195,120,0.55)" strokeWidth="5.5"
                      clipPath="url(#clip-ring-back)"
                      style={{ pointerEvents: 'none' }} />
                    {/* Cassini division — back half */}
                    <ellipse cx="0" cy="0" rx={pv.r * 1.65} ry={pv.r * 0.42}
                      fill="none"
                      stroke="rgba(140,110,55,0.3)" strokeWidth="4"
                      clipPath="url(#clip-ring-back)"
                      style={{ pointerEvents: 'none' }} />
                    {/* Inner ring — back half */}
                    <ellipse cx="0" cy="0" rx={pv.r * 1.32} ry={pv.r * 0.33}
                      fill="none"
                      stroke="rgba(210,180,105,0.35)" strokeWidth="3"
                      clipPath="url(#clip-ring-back)"
                      style={{ pointerEvents: 'none' }} />
                  </g>
                )}

                {/* ── Planet sphere ── */}
                <g filter="url(#f-glow)">
                  <circle r={pv.r}
                    fill={`url(#grad-${pv.id})`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleClick(pv.id)}
                    data-testid={`planet-${pv.id}`}
                  >
                    <title>{pd?.name}</title>
                  </circle>
                  {/* Jupiter bands overlay */}
                  {pv.id === 'jupiter' && (
                    <circle r={pv.r} fill="url(#grad-jupiter-bands)"
                      style={{ pointerEvents: 'none' }} />
                  )}
                  {/* Earth highlight specular */}
                  {pv.id === 'earth' && (
                    <circle r={pv.r * 0.55} cx={-pv.r * 0.2} cy={-pv.r * 0.25}
                      fill="rgba(160,220,255,0.18)" style={{ pointerEvents: 'none' }} />
                  )}
                </g>

                {/* ── Saturn front ring (drawn AFTER planet so it overlaps the front) ── */}
                {pv.hasRings && (
                  <g style={{
                    animation: `orbit ${pv.speed}s linear infinite reverse`,
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                    animationDelay: delay,
                  } as React.CSSProperties}>
                    {/* Outer ring — front half */}
                    <ellipse cx="0" cy="0" rx={pv.r * 2.15} ry={pv.r * 0.55}
                      fill="rgba(150,120,60,0.12)"
                      stroke="rgba(230,195,120,0.55)" strokeWidth="5.5"
                      clipPath="url(#clip-ring-front)"
                      style={{ pointerEvents: 'none' }} />
                    {/* Cassini division — front half */}
                    <ellipse cx="0" cy="0" rx={pv.r * 1.65} ry={pv.r * 0.42}
                      fill="none"
                      stroke="rgba(140,110,55,0.3)" strokeWidth="4"
                      clipPath="url(#clip-ring-front)"
                      style={{ pointerEvents: 'none' }} />
                    {/* Inner ring — front half */}
                    <ellipse cx="0" cy="0" rx={pv.r * 1.32} ry={pv.r * 0.33}
                      fill="none"
                      stroke="rgba(210,180,105,0.35)" strokeWidth="3"
                      clipPath="url(#clip-ring-front)"
                      style={{ pointerEvents: 'none' }} />
                  </g>
                )}

                {/* ── Planet label — counter-rotates to stay upright ── */}
                <g style={{
                  animation: `orbit ${pv.speed}s linear infinite reverse`,
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  animationDelay: delay,
                } as React.CSSProperties}>
                  <text
                    x="0" y={pv.r + (pv.hasRings ? pv.r * 0.8 : 0) + 13}
                    textAnchor="middle"
                    fill={pd?.color ?? '#ffffff'}
                    fontSize="9"
                    fontFamily="Orbitron, monospace"
                    fontWeight="500"
                    style={{ pointerEvents: 'none', opacity: 0.75, letterSpacing: '0.08em' }}
                  >
                    {pd?.name?.toUpperCase()}
                  </text>
                </g>
              </g>
            </g>
          );
        })}

        {/* Sun — rendered last so it's always on top */}
        <g filter="url(#f-sun)">
          <circle cx="0" cy="0" r="42"
            fill="url(#grad-sun)"
            style={{ cursor: 'pointer' }}
            onClick={() => handleClick('sun')}
            data-testid="planet-sun"
          >
            <title>The Sun</title>
          </circle>
        </g>
        {/* Sun corona halos */}
        <circle cx="0" cy="0" r="56"  fill="none" stroke="rgba(245,158,11,0.13)" strokeWidth="14" style={{ pointerEvents: 'none' }} />
        <circle cx="0" cy="0" r="72"  fill="none" stroke="rgba(245,158,11,0.07)" strokeWidth="16" style={{ pointerEvents: 'none' }} />
        <circle cx="0" cy="0" r="90"  fill="none" stroke="rgba(245,158,11,0.03)" strokeWidth="18" style={{ pointerEvents: 'none' }} />
        {/* SUN label */}
        <text x="0" y="60" textAnchor="middle"
          fill="#f59e0b" fontSize="9" fontFamily="Orbitron, monospace" fontWeight="600"
          style={{ pointerEvents: 'none', opacity: 0.8, letterSpacing: '0.1em' }}>
          SUN
        </text>
      </svg>

      {/* ── Planet detail panel ── */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setSelected(null)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] glass border-l border-white/10 z-[101] overflow-y-auto"
              data-testid="planet-panel"
            >
              <div className="p-6 md:p-8 pt-20 md:pt-8 min-h-full flex flex-col">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                  data-testid="close-planet-panel"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Planet / Sun visual */}
                <div className="flex justify-center mb-8 relative">
                  <div className="absolute inset-0 blur-[60px] rounded-full"
                    style={{ backgroundColor: `${selected.color}25` }} />
                  <div className="relative z-10 w-40 h-40 animate-[float_6s_ease-in-out_infinite]">
                    <div className="w-full h-full rounded-full"
                      style={{
                        backgroundColor: selected.color,
                        boxShadow: `0 0 60px ${selected.color}50, inset -18px -18px 40px rgba(0,0,0,0.7)`,
                      }}
                    />
                    {/* Saturn rings in panel */}
                    {selected.id === 'saturn' && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div style={{ transform: 'rotate(-22deg)', position: 'absolute', width: '250px', height: '250px' }}>
                          <div className="absolute inset-0 rounded-full border-[13px] border-amber-200/35" />
                          <div className="absolute inset-3 rounded-full border-[8px] border-amber-300/20" />
                          <div className="absolute inset-6 rounded-full border-[5px] border-amber-200/15" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <h2 className="font-heading text-4xl font-bold mb-2 tracking-wider"
                  style={{ color: selected.color, textShadow: `0 0 20px ${selected.color}80` }}>
                  {selected.name}
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-8">{selected.description}</p>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { Icon: Navigation, label: 'Distance',    val: selected.distance },
                    { Icon: Thermometer, label: 'Temperature', val: selected.temp },
                    { Icon: Info,        label: 'Gravity',     val: selected.gravity },
                    { Icon: Sparkles,    label: 'Moons',       val: String(selected.moons) },
                  ].map(({ Icon, label, val }) => (
                    <div key={label} className="glass-panel p-4 rounded-xl">
                      <Icon className="w-5 h-5 mb-2 opacity-70" style={{ color: selected.color }} />
                      <span className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-1">{label}</span>
                      <span className="font-mono text-sm font-bold">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Facts */}
                <div className="mt-auto">
                  <h3 className="text-xs uppercase tracking-widest text-foreground/50 mb-4">Key Facts</h3>
                  <ul className="space-y-3">
                    {selected.facts.map((fact, i) => (
                      <li key={i} className="flex gap-3 text-sm text-foreground/80 items-start">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: selected.color }} />
                        <span className="leading-relaxed">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="absolute bottom-6 text-center w-full pointer-events-none text-foreground/30 text-xs font-mono tracking-widest">
        CLICK ANY CELESTIAL BODY TO INSPECT
      </div>
    </div>
  );
}
