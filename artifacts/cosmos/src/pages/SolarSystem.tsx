import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { planets } from '@/lib/data';
import { X, Navigation, Thermometer, Info, Sparkles, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

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

// Deterministic asteroid belt between Mars and Jupiter orbits
const ASTEROIDS = Array.from({ length: 110 }, (_, i) => {
  const angle = (i / 110) * Math.PI * 2;
  const r = 275 + (Math.sin(i * 7.3 + 1.2) * 0.5 + 0.5) * 38;
  return { x: Math.cos(angle) * r, y: Math.sin(angle) * r, s: 0.4 + (Math.sin(i * 13.7) * 0.5 + 0.5) };
});

const MIN_SCALE = 0.3;
const MAX_SCALE = 10;
const ZOOM_STEP = 1.2;

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

type PlanetData = typeof planets[0];

const SUN_DATA: PlanetData = {
  id: 'sun', name: 'The Sun',
  description: 'The star at the center of our Solar System — a nearly perfect sphere of hot plasma held together by its own gravity. It is by far the largest object in the solar system.',
  distance: '0 km', gravity: '274 m/s²', temp: '5,500°C surface / 15M°C core', moons: 0,
  facts: [
    "Accounts for 99.86% of the entire solar system's mass.",
    'About 1.3 million Earths could fit inside the Sun.',
    'Its light takes 8 minutes and 20 seconds to reach Earth.',
  ],
  color: '#f59e0b', size: 4, orbitRadius: 0, orbitSpeed: 0,
};

export default function SolarSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom/pan state — keep refs in sync so event handlers always see fresh values
  const scaleRef = useRef(1);
  const txRef    = useRef(0);
  const tyRef    = useRef(0);
  const [scale, setScaleState] = useState(1);
  const [tx, setTxState]       = useState(0);
  const [ty, setTyState]       = useState(0);

  function setView(s: number, x: number, y: number) {
    scaleRef.current = s; txRef.current = x; tyRef.current = y;
    setScaleState(s); setTxState(x); setTyState(y);
  }

  // Drag tracking
  const drag = useRef({ active: false, x: 0, y: 0, moved: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Pinch tracking
  const pinchDist = useRef(0);

  // Planet info panel
  const [selected, setSelected] = useState<PlanetData | null>(null);

  // ── Wheel zoom (must be non-passive to call preventDefault) ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const rect = el!.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      // Cursor offset from container center (the transform-origin)
      const dx = e.clientX - rect.left - cx;
      const dy = e.clientY - rect.top  - cy;

      const factor    = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
      const newScale  = clamp(scaleRef.current * factor, MIN_SCALE, MAX_SCALE);
      const ratio     = newScale / scaleRef.current;
      // Keep the point under the cursor fixed after scaling
      const newTx = dx * (1 - ratio) + txRef.current * ratio;
      const newTy = dy * (1 - ratio) + tyRef.current * ratio;
      setView(newScale, newTx, newTy);
    }

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // ── Mouse pan ──
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    drag.current = { active: true, x: e.clientX, y: e.clientY, moved: 0 };
    setIsDragging(true);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    drag.current.moved += Math.abs(dx) + Math.abs(dy);
    drag.current.x = e.clientX;
    drag.current.y = e.clientY;
    setView(scaleRef.current, txRef.current + dx, tyRef.current + dy);
  }, []);

  const onMouseUp = useCallback(() => {
    drag.current.active = false;
    setIsDragging(false);
  }, []);

  // ── Touch pan + pinch zoom ──
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const t = e.touches[0];
      drag.current = { active: true, x: t.clientX, y: t.clientY, moved: 0 };
    } else if (e.touches.length === 2) {
      drag.current.active = false;
      const a = e.touches[0], b = e.touches[1];
      pinchDist.current = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
    }
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 1 && drag.current.active) {
      const t = e.touches[0];
      const dx = t.clientX - drag.current.x;
      const dy = t.clientY - drag.current.y;
      drag.current.moved += Math.abs(dx) + Math.abs(dy);
      drag.current.x = t.clientX;
      drag.current.y = t.clientY;
      setView(scaleRef.current, txRef.current + dx, tyRef.current + dy);
    } else if (e.touches.length === 2) {
      const a = e.touches[0], b = e.touches[1];
      const dist   = Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
      const factor = dist / pinchDist.current;
      pinchDist.current = dist;

      const rect = containerRef.current!.getBoundingClientRect();
      const cx = rect.width / 2, cy = rect.height / 2;
      const midX = (a.clientX + b.clientX) / 2 - rect.left - cx;
      const midY = (a.clientY + b.clientY) / 2 - rect.top  - cy;

      const newScale = clamp(scaleRef.current * factor, MIN_SCALE, MAX_SCALE);
      const ratio    = newScale / scaleRef.current;
      setView(newScale, midX * (1 - ratio) + txRef.current * ratio, midY * (1 - ratio) + tyRef.current * ratio);
    }
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) drag.current.active = e.touches.length === 1;
  }, []);

  // ── Planet click (only if not dragging) ──
  function handleBodyClick(id: string) {
    if (drag.current.moved > 6) return;
    if (id === 'sun') { setSelected(SUN_DATA); return; }
    const p = planets.find(pl => pl.id === id);
    if (p) setSelected(p);
  }

  // ── Zoom controls ──
  function zoomBy(factor: number) {
    const newScale = clamp(scaleRef.current * factor, MIN_SCALE, MAX_SCALE);
    const ratio    = newScale / scaleRef.current;
    setView(newScale, txRef.current * ratio, tyRef.current * ratio);
  }

  function resetView() { setView(1, 0, 0); }

  const zoomPct = Math.round(scale * 100);

  return (
    <div className="min-h-[calc(100vh-4rem)] relative flex items-center justify-center overflow-hidden">

      {/* Zoom / pan canvas */}
      <div
        ref={containerRef}
        className="w-full h-[calc(100vh-4rem)] relative overflow-hidden select-none"
        style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Ambient sun glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/8 blur-[120px] rounded-full pointer-events-none" />

        {/* Zoomable / pannable layer — transform-origin is the container center */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        >
          <svg
            viewBox="-660 -660 1320 1320"
            className="w-full h-full"
            style={{ maxWidth: 900, maxHeight: 900, overflow: 'visible', pointerEvents: 'none' }}
            aria-label="Interactive solar system diagram"
          >
            <defs>
              <radialGradient id="grad-sun" cx="35%" cy="35%">
                <stop offset="0%"   stopColor="#fffacc" />
                <stop offset="45%"  stopColor="#f5b030" />
                <stop offset="100%" stopColor="#e05010" />
              </radialGradient>
              {PLANET_VIS.map(p => (
                <radialGradient key={p.id} id={`grad-${p.id}`} cx="35%" cy="35%">
                  <stop offset="0%"   stopColor={p.gFrom} />
                  <stop offset="100%" stopColor={p.gTo} />
                </radialGradient>
              ))}
              <linearGradient id="grad-jupiter-bands" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="rgba(180,120,60,0.4)" />
                <stop offset="30%"  stopColor="rgba(220,170,100,0.0)" />
                <stop offset="50%"  stopColor="rgba(160,90,40,0.35)" />
                <stop offset="70%"  stopColor="rgba(220,170,100,0.0)" />
                <stop offset="100%" stopColor="rgba(180,120,60,0.3)" />
              </linearGradient>
              <filter id="f-sun" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="f-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              {/* Ring clip paths — objectBoundingBox keeps them relative to the ellipse */}
              <clipPath id="clip-ring-back" clipPathUnits="objectBoundingBox">
                <rect x="0" y="0.5" width="1" height="0.5" />
              </clipPath>
              <clipPath id="clip-ring-front" clipPathUnits="objectBoundingBox">
                <rect x="0" y="0" width="1" height="0.5" />
              </clipPath>
            </defs>

            {/* Orbit rings */}
            {PLANET_VIS.map(p => (
              <circle key={`o-${p.id}`} cx="0" cy="0" r={p.orbitR}
                fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="1" />
            ))}

            {/* Asteroid belt */}
            {ASTEROIDS.map((a, i) => (
              <circle key={i} cx={a.x} cy={a.y} r={a.s} fill="rgba(210,200,175,0.22)" />
            ))}

            {/* Planets */}
            {PLANET_VIS.map(pv => {
              const pd = planets.find(p => p.id === pv.id);
              const delay = `${-((pv.startDeg / 360) * pv.speed).toFixed(2)}s`;
              const ringStyle: React.CSSProperties = {
                animation: `orbit ${pv.speed}s linear infinite reverse`,
                transformBox: 'fill-box',
                transformOrigin: 'center',
                animationDelay: delay,
              };

              return (
                <g key={pv.id} style={{ animation: `orbit ${pv.speed}s linear infinite`, transformOrigin: '0px 0px', animationDelay: delay }}>
                  <g transform={`translate(${pv.orbitR}, 0)`}>

                    {/* Click target (invisible, large enough to click) */}
                    <circle r={Math.max(pv.r + 8, 14)} fill="transparent"
                      style={{ cursor: 'pointer', pointerEvents: 'all' }}
                      onClick={() => handleBodyClick(pv.id)} />

                    {/* Back rings */}
                    {pv.hasRings && (
                      <g style={ringStyle}>
                        <ellipse cx="0" cy="0" rx={pv.r * 2.15} ry={pv.r * 0.55}
                          fill="rgba(150,120,60,0.12)" stroke="rgba(230,195,120,0.55)" strokeWidth="5.5"
                          clipPath="url(#clip-ring-back)" style={{ pointerEvents: 'none' }} />
                        <ellipse cx="0" cy="0" rx={pv.r * 1.65} ry={pv.r * 0.42}
                          fill="none" stroke="rgba(140,110,55,0.3)" strokeWidth="4"
                          clipPath="url(#clip-ring-back)" style={{ pointerEvents: 'none' }} />
                        <ellipse cx="0" cy="0" rx={pv.r * 1.32} ry={pv.r * 0.33}
                          fill="none" stroke="rgba(210,180,105,0.35)" strokeWidth="3"
                          clipPath="url(#clip-ring-back)" style={{ pointerEvents: 'none' }} />
                      </g>
                    )}

                    {/* Planet sphere */}
                    <g filter="url(#f-glow)">
                      <circle r={pv.r} fill={`url(#grad-${pv.id})`} style={{ pointerEvents: 'none' }}>
                        <title>{pd?.name}</title>
                      </circle>
                      {pv.id === 'jupiter' && (
                        <circle r={pv.r} fill="url(#grad-jupiter-bands)" style={{ pointerEvents: 'none' }} />
                      )}
                      {pv.id === 'earth' && (
                        <circle r={pv.r * 0.55} cx={-pv.r * 0.2} cy={-pv.r * 0.25}
                          fill="rgba(160,220,255,0.18)" style={{ pointerEvents: 'none' }} />
                      )}
                    </g>

                    {/* Front rings */}
                    {pv.hasRings && (
                      <g style={ringStyle}>
                        <ellipse cx="0" cy="0" rx={pv.r * 2.15} ry={pv.r * 0.55}
                          fill="rgba(150,120,60,0.12)" stroke="rgba(230,195,120,0.55)" strokeWidth="5.5"
                          clipPath="url(#clip-ring-front)" style={{ pointerEvents: 'none' }} />
                        <ellipse cx="0" cy="0" rx={pv.r * 1.65} ry={pv.r * 0.42}
                          fill="none" stroke="rgba(140,110,55,0.3)" strokeWidth="4"
                          clipPath="url(#clip-ring-front)" style={{ pointerEvents: 'none' }} />
                        <ellipse cx="0" cy="0" rx={pv.r * 1.32} ry={pv.r * 0.33}
                          fill="none" stroke="rgba(210,180,105,0.35)" strokeWidth="3"
                          clipPath="url(#clip-ring-front)" style={{ pointerEvents: 'none' }} />
                      </g>
                    )}

                    {/* Counter-rotating label */}
                    <g style={ringStyle}>
                      <text x="0" y={pv.r + (pv.hasRings ? pv.r * 0.8 : 0) + 13}
                        textAnchor="middle"
                        fill={pd?.color ?? '#fff'}
                        fontSize="9" fontFamily="Orbitron, monospace" fontWeight="500"
                        style={{ pointerEvents: 'none', opacity: 0.75, letterSpacing: '0.08em' }}>
                        {pd?.name?.toUpperCase()}
                      </text>
                    </g>
                  </g>
                </g>
              );
            })}

            {/* Sun */}
            <g filter="url(#f-sun)">
              <circle cx="0" cy="0" r="42" fill="url(#grad-sun)"
                style={{ cursor: 'pointer', pointerEvents: 'all' }}
                onClick={() => handleBodyClick('sun')}
                data-testid="planet-sun">
                <title>The Sun</title>
              </circle>
            </g>
            <circle cx="0" cy="0" r="56"  fill="none" stroke="rgba(245,158,11,0.13)" strokeWidth="14" style={{ pointerEvents: 'none' }} />
            <circle cx="0" cy="0" r="72"  fill="none" stroke="rgba(245,158,11,0.07)" strokeWidth="16" style={{ pointerEvents: 'none' }} />
            <circle cx="0" cy="0" r="90"  fill="none" stroke="rgba(245,158,11,0.03)" strokeWidth="18" style={{ pointerEvents: 'none' }} />
            <text x="0" y="60" textAnchor="middle"
              fill="#f59e0b" fontSize="9" fontFamily="Orbitron, monospace" fontWeight="600"
              style={{ pointerEvents: 'none', opacity: 0.8, letterSpacing: '0.1em' }}>
              SUN
            </text>
          </svg>
        </div>
      </div>

      {/* ── Zoom controls (bottom-left) ── */}
      <div className="absolute bottom-8 left-6 flex flex-col gap-2 z-30" data-testid="zoom-controls">
        <button
          onClick={() => zoomBy(ZOOM_STEP)}
          className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
          title="Zoom in"
          data-testid="zoom-in"
        >
          <ZoomIn className="w-4 h-4 text-foreground/70" />
        </button>
        <button
          onClick={() => zoomBy(1 / ZOOM_STEP)}
          className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
          title="Zoom out"
          data-testid="zoom-out"
        >
          <ZoomOut className="w-4 h-4 text-foreground/70" />
        </button>
        <button
          onClick={resetView}
          className="w-9 h-9 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"
          title="Reset view"
          data-testid="zoom-reset"
        >
          <RotateCcw className="w-4 h-4 text-foreground/70" />
        </button>
        {/* Zoom percentage */}
        <div className="text-[10px] font-mono text-foreground/40 text-center tabular-nums">{zoomPct}%</div>
      </div>

      {/* ── Bottom hint ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none text-foreground/30 text-xs font-mono tracking-widest whitespace-nowrap">
        SCROLL TO ZOOM · DRAG TO PAN · CLICK TO INSPECT
      </div>

      {/* ── Planet detail panel ── */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setSelected(null)}
            />
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

                {/* Planet visual */}
                <div className="flex justify-center mb-8 relative">
                  <div className="absolute inset-0 blur-[60px] rounded-full" style={{ backgroundColor: `${selected.color}25` }} />
                  <div className="relative z-10 w-40 h-40 animate-[float_6s_ease-in-out_infinite]">
                    <div className="w-full h-full rounded-full"
                      style={{ backgroundColor: selected.color, boxShadow: `0 0 60px ${selected.color}50, inset -18px -18px 40px rgba(0,0,0,0.7)` }} />
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

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { Icon: Navigation,  label: 'Distance',    val: selected.distance },
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

                <div className="mt-auto">
                  <h3 className="text-xs uppercase tracking-widest text-foreground/50 mb-4">Key Facts</h3>
                  <ul className="space-y-3">
                    {selected.facts.map((fact, i) => (
                      <li key={i} className="flex gap-3 text-sm text-foreground/80 items-start">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: selected.color }} />
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
    </div>
  );
}
