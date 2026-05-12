import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Satellite, Radio, Telescope, Shield, ChevronDown, ChevronUp, X } from 'lucide-react';

interface TechItem { name: string; specs: Record<string, string>; fact: string; }
interface TechCategory {
  id: string; name: string; icon: React.ReactNode; description: string;
  color: string; items: TechItem[];
}

const CATEGORIES: TechCategory[] = [
  {
    id: 'rockets', name: 'Rockets', color: '#f97316',
    icon: <Rocket className="w-6 h-6" />,
    description: 'The engineering marvels that break Earth\'s gravitational grip and carry humanity to orbit and beyond.',
    items: [
      { name: 'SpaceX Falcon 9', specs: { 'Thrust (sea level)': '7,607 kN', 'Payload to LEO': '22,800 kg', 'Height': '70 m', 'Reusable': 'Yes (booster)', 'First Flight': '2010' }, fact: 'First orbital rocket to successfully land and reuse its first-stage booster.' },
      { name: 'SpaceX Starship', specs: { 'Thrust': '~74,000 kN', 'Payload to orbit': '100,000+ kg', 'Height': '121 m', 'Reusable': 'Fully', 'First Flight': '2023' }, fact: 'Tallest and most powerful rocket ever built, designed for full rapid reusability.' },
      { name: 'NASA SLS Block 1', specs: { 'Thrust': '39,144 kN', 'Payload to TLI': '27,000 kg', 'Height': '98 m', 'Reusable': 'No', 'First Flight': '2022' }, fact: 'Evolved from Space Shuttle components, designed for the Artemis Moon program.' },
      { name: 'Ariane 5', specs: { 'Thrust': '11,808 kN', 'Payload to GTO': '10,865 kg', 'Height': '53 m', 'Reusable': 'No', 'First Flight': '1996' }, fact: 'Launched the James Webb Space Telescope on Christmas Day 2021.' },
    ],
  },
  {
    id: 'satellites', name: 'Satellites', color: '#60a5fa',
    icon: <Satellite className="w-6 h-6" />,
    description: 'Artificial moons that enable GPS navigation, weather forecasting, global communications, and Earth observation.',
    items: [
      { name: 'GPS Constellation', specs: { 'Satellites': '31 active', 'Orbit': 'MEO ~20,200 km', 'Accuracy': '~3 m civilian', 'Coverage': 'Global', 'Operated by': 'US Space Force' }, fact: 'Each GPS satellite carries atomic clocks accurate to 20-30 nanoseconds.' },
      { name: 'Hubble Space Telescope', specs: { 'Orbit': 'LEO 547 km', 'Mirror': '2.4 m diameter', 'Mass': '11,110 kg', 'Wavelengths': 'UV, Visible, NIR', 'Launch': '1990' }, fact: 'Has made over 1.5 million observations and helped determine the age of the universe.' },
      { name: 'Starlink Constellation', specs: { 'Satellites': '5,000+ active', 'Orbit': 'LEO 540-570 km', 'Latency': '~20 ms', 'Speed': 'Up to 200 Mbps', 'Operator': 'SpaceX' }, fact: 'Largest satellite constellation ever deployed, providing global broadband internet.' },
      { name: 'Landsat 9', specs: { 'Orbit': 'SSO 705 km', 'Resolution': '15-30 m', 'Revisit': 'Every 16 days', 'Launch': '2021', 'Operator': 'NASA/USGS' }, fact: 'Part of the longest continuous Earth observation program, running since 1972.' },
    ],
  },
  {
    id: 'stations', name: 'Space Stations', color: '#a78bfa',
    icon: <Radio className="w-6 h-6" />,
    description: 'Orbital laboratories where humans live and work in microgravity, advancing science and preparing for deep space.',
    items: [
      { name: 'ISS', specs: { 'Altitude': '~408 km', 'Speed': '27,600 km/h', 'Mass': '420,000 kg', 'Crew': '7 (nominal)', 'In orbit since': '1998' }, fact: 'As large as an American football field, the ISS is the most expensive structure ever built (~$150B).' },
      { name: 'Tiangong', specs: { 'Altitude': '~390 km', 'Mass': '70,000 kg', 'Crew': '3 (nominal)', 'Modules': '3 core + docking', 'Launch': '2021' }, fact: "China's permanent space station — the only one operated by a single nation." },
      { name: 'Mir (1986–2001)', specs: { 'Altitude': '~354 km', 'Mass': '124,340 kg', 'Crew': '3 max', 'Lifetime': '15 years', 'Deorbit': '2001' }, fact: 'First continuously crewed long-term research station. Cosmonaut Valery Polyakov spent 437 days aboard.' },
    ],
  },
  {
    id: 'telescopes', name: 'Telescopes', color: '#34d399',
    icon: <Telescope className="w-6 h-6" />,
    description: 'Eyes on the cosmos — from optical mirrors to X-ray detectors — these instruments reveal the universe\'s deepest secrets.',
    items: [
      { name: 'James Webb ST', specs: { 'Mirror': '6.5 m (18 segments)', 'Orbit': 'L2 point 1.5M km', 'Wavelength': 'IR (0.6–28 μm)', 'Mass': '6,500 kg', 'Launch': 'Dec 2021' }, fact: 'Can detect a bumblebee at the Moon\'s distance. Has peered back to 13.6 billion years ago.' },
      { name: 'Chandra X-ray', specs: { 'Orbit': 'Highly elliptical', 'Resolution': '0.5 arcsec', 'Energy range': '0.1–10 keV', 'Mass': '4,800 kg', 'Launch': '1999' }, fact: 'Studies violent, high-energy phenomena like black holes, supernovae, and galaxy clusters.' },
      { name: 'VLT (Very Large Telescope)', specs: { 'Mirrors': '4 × 8.2 m', 'Location': 'Atacama, Chile', 'Altitude': '2,635 m', 'Wavelengths': 'UV to MIR', 'Operated by': 'ESO' }, fact: 'One of the most productive ground-based observatories, with over 10,000 papers published.' },
      { name: 'Spitzer (1983–2020)', specs: { 'Mirror': '0.85 m', 'Wavelength': 'IR (3–180 μm)', 'Orbit': 'Heliocentric', 'Mass': '950 kg', 'Lifetime': '16 years' }, fact: 'First telescope to detect light from exoplanets and mapped the TRAPPIST-1 system.' },
    ],
  },
  {
    id: 'spacesuits', name: 'Space Suits', color: '#f472b6',
    icon: <Shield className="w-6 h-6" />,
    description: 'Personal spacecraft — each suit is a self-contained life support system protecting astronauts against the void.',
    items: [
      { name: 'EMU (NASA Shuttle/ISS)', specs: { 'Layers': '14', 'Weight': '127 kg', 'Pressure': '4.3 psi (29.7 kPa)', 'O2 supply': '7 hours', 'Temperature range': '-157°C to +121°C' }, fact: 'Used for ISS spacewalks. Each suit costs approximately $12 million to produce.' },
      { name: 'xEMU (Artemis)', specs: { 'Layers': 'Multi-layer enhanced', 'Pressure': '8.3 psi (57.2 kPa)', 'O2 supply': '8+ hours', 'Mobility': 'Full shoulder rotation', 'Target': 'Lunar surface' }, fact: 'Designed for lunar south pole operations with improved mobility and thermal performance.' },
      { name: 'Sokol Launch Suit', specs: { 'Use': 'Launch/re-entry only', 'Weight': '10 kg', 'Pressure': '40 kPa', 'Cooling': 'Ventilation system', 'Operator': 'Roscosmos' }, fact: "Worn in Russia's Soyuz spacecraft. Saved cosmonauts' lives in the 1983 Soyuz T-10 launch pad abort." },
    ],
  },
];

export default function Technology() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<TechItem | null>(null);
  const [selectedColor, setSelectedColor] = useState('#60a5fa');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className="min-h-[calc(100vh-4rem)] py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-glow mb-4 tracking-wider">SPACE TECHNOLOGY</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            The tools and machines that make space exploration possible. Engineering at the frontier of human capability.
          </p>
        </div>

        <div className="space-y-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <div
                className="glass-panel rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden cursor-pointer"
                data-testid={`tech-category-${cat.id}`}
                onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}>
                {/* Header */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center border"
                      style={{ color: cat.color, borderColor: `${cat.color}40`, backgroundColor: `${cat.color}12` }}>
                      {cat.icon}
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-bold tracking-wider" style={{ color: cat.color }}>{cat.name}</h2>
                      <p className="text-foreground/60 text-sm mt-0.5 max-w-md">{cat.description}</p>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    {expanded === cat.id
                      ? <ChevronUp className="w-5 h-5 text-foreground/50" />
                      : <ChevronDown className="w-5 h-5 text-foreground/50" />}
                  </div>
                </div>

                {/* Items */}
                <AnimatePresence>
                  {expanded === cat.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-white/5 pt-4">
                        {cat.items.map(item => (
                          <div key={item.name}
                            className="glass-panel rounded-xl p-4 border border-white/5 hover:border-primary/30 transition-all cursor-pointer group"
                            onClick={e => { e.stopPropagation(); setSelectedItem(item); setSelectedColor(cat.color); }}
                            data-testid={`tech-item-${item.name.replace(/\s+/g, '-').toLowerCase()}`}>
                            <h3 className="font-heading text-sm font-bold tracking-wider mb-2" style={{ color: cat.color }}>{item.name}</h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3">
                              {Object.entries(item.specs).slice(0, 4).map(([k, v]) => (
                                <div key={k} className="text-[11px]">
                                  <span className="text-foreground/40">{k}: </span>
                                  <span className="text-foreground/80 font-mono">{v}</span>
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-foreground/50 italic line-clamp-2">{item.fact}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]" onClick={() => setSelectedItem(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }} transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[500px] glass rounded-2xl border border-white/10 z-[101] p-8"
              data-testid="tech-detail-modal">
              <button onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center"
                data-testid="close-tech-modal"><X className="w-4 h-4" /></button>
              {/* Blueprint grid background */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-5"
                style={{ backgroundImage: 'repeating-linear-gradient(0deg,#60a5fa,#60a5fa 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#60a5fa,#60a5fa 1px,transparent 1px,transparent 40px)' }} />
              <h2 className="font-heading text-xl font-bold tracking-wider mb-6" style={{ color: selectedColor }}>{selectedItem.name}</h2>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {Object.entries(selectedItem.specs).map(([k, v]) => (
                  <div key={k} className="glass-panel p-3 rounded-xl border border-white/5">
                    <span className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-1">{k}</span>
                    <span className="font-mono text-sm font-bold text-foreground/90">{v}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-foreground/70 italic">{selectedItem.fact}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
