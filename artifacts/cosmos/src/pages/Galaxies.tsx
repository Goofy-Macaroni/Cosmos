import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';

const galaxiesData = [
  {
    name: "Milky Way",
    type: "Spiral",
    distance: "26,000 ly (from center)",
    stars: "~250 billion",
    fact: "Our home galaxy, contains a central black hole Sagittarius A*.",
    color: "from-blue-600 via-purple-600 to-transparent",
    facts: [
      "Home galaxy to the Solar System.",
      "Central supermassive black hole is 4 million solar masses.",
      "Contains up to 400 billion stars by some estimates."
    ],
    discovery: "Prehistoric",
    size: "100,000 ly"
  },
  {
    name: "Andromeda (M31)",
    type: "Spiral",
    distance: "2.537M ly",
    stars: "~1 trillion",
    fact: "On a collision course with the Milky Way in ~4.5B years.",
    color: "from-cyan-500 via-blue-500 to-transparent",
    facts: [
      "Largest galaxy in the Local Group.",
      "Will merge with the Milky Way in about 4.5 billion years.",
      "Visible to the naked eye under dark skies."
    ],
    discovery: "964 AD",
    size: "220,000 ly"
  },
  {
    name: "Whirlpool (M51)",
    type: "Spiral",
    distance: "23M ly",
    stars: "~100 billion",
    fact: "First galaxy where spiral structure was observed.",
    color: "from-pink-500 via-red-500 to-transparent",
    facts: [
      "Discovered by Charles Messier in 1773.",
      "Interacting strongly with a smaller companion galaxy, NGC 5195.",
      "A classic grand-design spiral galaxy."
    ],
    discovery: "1773",
    size: "60,000 ly"
  },
  {
    name: "Sombrero (M104)",
    type: "Lenticular/Spiral",
    distance: "29.3M ly",
    stars: "~800 billion",
    fact: "Has a prominent dust lane and bright nucleus, resembling a hat.",
    color: "from-orange-500 via-yellow-500 to-transparent",
    facts: [
      "Resembles a Mexican hat.",
      "Has a massive central black hole of about 1 billion solar masses.",
      "A very bright source of infrared radiation."
    ],
    discovery: "1781",
    size: "50,000 ly"
  },
  {
    name: "Black Eye (M64)",
    type: "Spiral",
    distance: "24M ly",
    stars: "~100 billion",
    fact: "Inner and outer regions rotate in opposite directions.",
    color: "from-indigo-600 via-purple-800 to-transparent",
    facts: [
      "Has a spectacular dark band of absorbing dust in front of the bright nucleus.",
      "Outer gas disk rotates in the opposite direction from the inner disk.",
      "Unique collision history is believed to be the cause of the counter-rotation."
    ],
    discovery: "1779",
    size: "51,000 ly"
  }
];

export default function Galaxies() {
  const [selected, setSelected] = useState<typeof galaxiesData[0] | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="min-h-[calc(100vh-4rem)] py-20 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-glow mb-4 tracking-wider text-center">GALAXIES</h1>
        <p className="text-foreground/60 text-center mb-16 max-w-2xl mx-auto">Vast cosmic islands containing billions of stars, gas, dust, and dark matter.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galaxiesData.map((galaxy, i) => (
            <motion.div
              key={galaxy.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel rounded-2xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelected(galaxy)}
              data-testid={`galaxy-card-${i}`}
            >
              <div className="h-48 flex items-center justify-center mb-6 overflow-hidden relative rounded-xl bg-black/20">
                <div className={`w-32 h-8 rounded-[100%] bg-gradient-to-r ${galaxy.color} blur-[10px] absolute animate-[spin-slow_10s_linear_infinite]`} />
                <div className={`w-32 h-8 rounded-[100%] bg-gradient-to-r ${galaxy.color} blur-[20px] absolute animate-[spin-slow_15s_linear_infinite_reverse] opacity-70`} />
                <div className="w-8 h-8 bg-white/40 blur-[5px] rounded-full absolute" />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-heading text-2xl font-bold text-glow">{galaxy.name}</h3>
                <span className="text-xs font-mono px-2 py-1 rounded bg-primary/20 text-primary border border-primary/30">{galaxy.type}</span>
              </div>
              <div className="space-y-1 text-sm text-foreground/70 mb-4">
                <p><span className="text-foreground/50">Distance:</span> {galaxy.distance}</p>
                <p><span className="text-foreground/50">Stars:</span> {galaxy.stars}</p>
              </div>
              <p className="text-sm text-primary/80 line-clamp-2">{galaxy.fact}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass-panel w-full max-w-2xl p-8 rounded-3xl relative z-10 border border-primary/30 shadow-[0_0_50px_rgba(var(--primary),0.15)] max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
                data-testid="close-modal"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 relative flex items-center justify-center">
                  <div className={`w-12 h-3 rounded-[100%] bg-gradient-to-r ${selected.color} blur-[4px] absolute animate-[spin-slow_5s_linear_infinite]`} />
                  <div className="w-3 h-3 bg-white/60 blur-[2px] rounded-full absolute" />
                </div>
                <div>
                  <h2 className="font-heading text-3xl font-bold text-glow">{selected.name}</h2>
                  <span className="text-sm font-mono text-primary px-2 py-0.5 rounded bg-primary/10 inline-block mt-1">{selected.type}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                  <p className="text-foreground/50 text-xs mb-1">Distance</p>
                  <p className="font-mono">{selected.distance}</p>
                </div>
                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                  <p className="text-foreground/50 text-xs mb-1">Size (Diameter)</p>
                  <p className="font-mono">{selected.size}</p>
                </div>
                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                  <p className="text-foreground/50 text-xs mb-1">Star Count</p>
                  <p className="font-mono">{selected.stars}</p>
                </div>
                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                  <p className="text-foreground/50 text-xs mb-1">Discovery</p>
                  <p className="font-mono">{selected.discovery}</p>
                </div>
              </div>

              <h3 className="font-heading text-xl mb-4 text-primary">Key Facts</h3>
              <ul className="space-y-3">
                {selected.facts.map((fact, i) => (
                  <li key={i} className="flex gap-3 text-foreground/80">
                    <ChevronRight className="w-5 h-5 text-primary shrink-0" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
