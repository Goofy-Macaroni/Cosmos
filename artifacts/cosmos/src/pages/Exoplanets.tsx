import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Thermometer, Ruler, Calendar, Orbit } from 'lucide-react';

interface Exoplanet {
  id: string; name: string; distance: string; radius: string; star: string;
  discovered: string; temp: string; yearLength: string; type: string;
  habitability: 'Possible' | 'Uncertain' | 'No'; habitabilityReason: string;
  facts: string[]; gradient: string; hasRings: boolean;
}

const EXOPLANETS: Exoplanet[] = [
  {
    id: 'proxima-b', name: 'Proxima Centauri b', distance: '4.24 ly', radius: '~1.07 Earth radii',
    star: 'Proxima Centauri', discovered: '2016', temp: '-39°C (avg)', yearLength: '11.2 Earth days',
    type: 'Rocky / Super-Earth', habitability: 'Possible',
    habitabilityReason: 'Orbits within habitable zone of its star, similar size to Earth. However, intense stellar flares from its red dwarf host may strip away its atmosphere.',
    gradient: 'from-blue-600 via-teal-500 to-blue-800', hasRings: false,
    facts: ['Closest known exoplanet to Earth.', 'Tidally locked — one side always faces its star.', 'Target of the Breakthrough Starshot project aiming to send a probe there within decades.'],
  },
  {
    id: 'kepler-452b', name: 'Kepler-452b', distance: '1,400 ly', radius: '1.6 Earth radii',
    star: 'Kepler-452', discovered: '2015', temp: 'Similar to Earth', yearLength: '385 Earth days',
    type: 'Super-Earth', habitability: 'Uncertain',
    habitabilityReason: "Orbits a Sun-like star at nearly Earth's orbital distance. Nicknamed 'Earth\'s Cousin'. Its larger size may mean a thicker atmosphere and stronger volcanism.",
    gradient: 'from-green-700 via-emerald-500 to-green-900', hasRings: false,
    facts: ["Nicknamed \"Earth's Cousin\" by NASA.", 'Its star is 1.5 billion years older than our Sun.', 'First potentially Earth-like planet found in the habitable zone of a Sun-like star.'],
  },
  {
    id: 'trappist-1e', name: 'TRAPPIST-1e', distance: '39 ly', radius: '0.92 Earth radii',
    star: 'TRAPPIST-1', discovered: '2017', temp: '-22°C (estimated)', yearLength: '6.1 Earth days',
    type: 'Rocky (Earth-like)', habitability: 'Possible',
    habitabilityReason: 'Most Earth-like planet in the TRAPPIST-1 system in terms of size and habitability. Receives similar energy from its star as Earth does from the Sun.',
    gradient: 'from-purple-600 via-violet-500 to-purple-900', hasRings: false,
    facts: ['Part of a system of 7 rocky planets orbiting TRAPPIST-1.', 'All 7 planets could fit within Mercury\'s orbit around our Sun.', 'Three of the seven planets — e, f, and g — orbit in the habitable zone.'],
  },
  {
    id: '55-cancri-e', name: '55 Cancri e', distance: '41 ly', radius: '1.92 Earth radii',
    star: '55 Cancri A (Copernicus)', discovered: '2004', temp: '~2,300°C', yearLength: '18 Earth hours',
    type: 'Super-Earth (Lava World)', habitability: 'No',
    habitabilityReason: 'Surface temperature exceeds 2,000°C, likely covered in a global ocean of molten lava. The surface may be partially composed of carbon in the form of graphite and diamond.',
    gradient: 'from-red-600 via-orange-500 to-red-900', hasRings: false,
    facts: ['May have surface oceans of molten lava visible from its star-facing side.', 'One theory suggests it could be a giant carbon world with diamond layers.', 'Completes a full orbit in just 18 hours — one of the shortest years known.'],
  },
  {
    id: 'hd-209458-b', name: 'HD 209458 b (Osiris)', distance: '159 ly', radius: '1.38 Jupiter radii',
    star: 'HD 209458', discovered: '1999', temp: '~1,000°C', yearLength: '3.5 Earth days',
    type: 'Hot Jupiter', habitability: 'No',
    habitabilityReason: 'A gas giant far too hot and massive to support life. Its atmosphere is being actively evaporated away by its host star — one of the first exoplanet atmospheres ever detected.',
    gradient: 'from-amber-600 via-yellow-500 to-amber-900', hasRings: true,
    facts: ['First exoplanet detected with an atmosphere (2001).', 'First exoplanet where water vapor was detected in the atmosphere.', 'Its atmosphere is being blown away at ~10,000 tons per second.'],
  },
  {
    id: 'kepler-22b', name: 'Kepler-22b', distance: '620 ly', radius: '2.4 Earth radii',
    star: 'Kepler-22', discovered: '2011', temp: '~22°C (estimated)', yearLength: '290 Earth days',
    type: 'Super-Earth', habitability: 'Uncertain',
    habitabilityReason: 'First planet confirmed in the habitable zone of a Sun-like star by Kepler. Its exact composition (rocky, ocean, or gaseous) is unknown — it may be a water world.',
    gradient: 'from-cyan-600 via-blue-500 to-cyan-900', hasRings: false,
    facts: ['First confirmed planet in the habitable zone of a Sun-like star by NASA\'s Kepler mission.', 'If it has a rocky surface, temperatures could be comfortable for liquid water.', 'Its year is 290 days, surprisingly close to Earth\'s 365-day year.'],
  },
];

const HABITABILITY_COLORS = { Possible: '#34d399', Uncertain: '#fbbf24', No: '#f87171' };
const HABITABILITY_BG = { Possible: '#34d39918', Uncertain: '#fbbf2418', No: '#f8717118' };

function PlanetVisual({ p, size = 80 }: { p: Exoplanet; size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size + 40, height: size + 40 }}>
      {p.hasRings && (
        <div className="absolute rounded-full border-4 opacity-60"
          style={{ width: size * 2.2, height: size * 0.5, borderColor: 'rgba(251,191,36,0.5)', transform: 'rotateX(70deg)' }} />
      )}
      <div className="rounded-full shadow-2xl" style={{
        width: size, height: size,
        background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.25), transparent 60%), ${
          `linear-gradient(135deg, ${p.gradient.split(' ').filter(s => s.startsWith('from-') || s.startsWith('via-') || s.startsWith('to-')).join(', ').replace(/from-|via-|to-/g, '')})`
        }`,
        backgroundImage: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.2) 0%, transparent 60%), conic-gradient(from 0deg, var(--tw-gradient-stops))`,
        boxShadow: `0 0 ${size / 2}px 4px rgba(96,165,250,0.15)`,
        backgroundSize: '100% 100%',
      }}>
        <div className="w-full h-full rounded-full" style={{
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 55%), radial-gradient(ellipse at bottom, rgba(0,0,0,0.4), transparent)`
        }} />
      </div>
    </div>
  );
}

export default function Exoplanets() {
  const [selected, setSelected] = useState<Exoplanet | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className="min-h-[calc(100vh-4rem)] py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-glow mb-4 tracking-wider">EXOPLANETS</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Over 5,600 confirmed worlds beyond our solar system. Could any of them harbor life?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {EXOPLANETS.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}
              className="glass-panel rounded-2xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              onClick={() => setSelected(p)} data-testid={`exoplanet-${p.id}`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono px-2 py-1 rounded-full border"
                  style={{ borderColor: `${HABITABILITY_COLORS[p.habitability]}50`, color: HABITABILITY_COLORS[p.habitability], background: HABITABILITY_BG[p.habitability] }}>
                  {p.habitability === 'Possible' ? 'Life Possible' : p.habitability === 'Uncertain' ? 'Uncertain' : 'Not Habitable'}
                </span>
                <span className="text-xs text-foreground/40 font-mono">{p.type}</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <PlanetVisual p={p} size={64} />
                <div>
                  <h2 className="font-heading text-base font-bold tracking-wider text-foreground/95 leading-tight">{p.name}</h2>
                  <p className="text-xs text-foreground/50 mt-1">{p.star}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[['Distance', p.distance], ['Radius', p.radius], ['Discovered', p.discovered], ['Temp', p.temp]].map(([k, v]) => (
                  <div key={k} className="glass-panel p-2 rounded-lg">
                    <span className="block text-foreground/40 mb-0.5">{k}</span>
                    <span className="font-mono text-foreground/90">{v}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]" onClick={() => setSelected(null)} />
            <motion.div
              initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[520px] glass border-l border-white/10 z-[101] overflow-y-auto"
              data-testid="exoplanet-panel">
              <div className="p-8 pt-16">
                <button onClick={() => setSelected(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  data-testid="close-exoplanet-panel"><X className="w-5 h-5" /></button>

                <div className="flex items-center gap-6 mb-6">
                  <PlanetVisual p={selected} size={90} />
                  <div>
                    <h2 className="font-heading text-2xl font-bold tracking-wider leading-tight">{selected.name}</h2>
                    <p className="text-foreground/50 text-sm mt-1">{selected.star}</p>
                    <span className="inline-block mt-2 text-xs font-mono px-2 py-0.5 rounded-full border"
                      style={{ borderColor: `${HABITABILITY_COLORS[selected.habitability]}50`, color: HABITABILITY_COLORS[selected.habitability], background: HABITABILITY_BG[selected.habitability] }}>
                      {selected.type}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: <Ruler className="w-3.5 h-3.5" />, label: 'Distance', val: selected.distance },
                    { icon: <Calendar className="w-3.5 h-3.5" />, label: 'Discovered', val: selected.discovered },
                    { icon: <Thermometer className="w-3.5 h-3.5" />, label: 'Temperature', val: selected.temp },
                    { icon: <Orbit className="w-3.5 h-3.5" />, label: 'Year Length', val: selected.yearLength },
                    { icon: null, label: 'Radius', val: selected.radius },
                  ].map(({ label, val, icon }) => (
                    <div key={label} className="glass-panel p-3 rounded-xl border border-white/5">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-foreground/50 mb-1">
                        {icon}{label}
                      </div>
                      <span className="font-mono text-sm font-bold">{val}</span>
                    </div>
                  ))}
                </div>

                {/* Habitability section */}
                <div className="rounded-xl p-4 mb-6 border" style={{ borderColor: `${HABITABILITY_COLORS[selected.habitability]}30`, background: HABITABILITY_BG[selected.habitability] }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-heading text-xs font-bold tracking-widest uppercase" style={{ color: HABITABILITY_COLORS[selected.habitability] }}>
                      Could Life Exist? — {selected.habitability}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{selected.habitabilityReason}</p>
                </div>

                <h3 className="text-xs uppercase tracking-widest text-foreground/50 mb-3">Key Facts</h3>
                <ul className="space-y-3">
                  {selected.facts.map((f, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground/80 items-start">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
