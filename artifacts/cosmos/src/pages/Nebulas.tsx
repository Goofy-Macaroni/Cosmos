import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';

const nebulasData = [
  {
    name: "Orion Nebula (M42)",
    type: "Emission/Reflection",
    distance: "1,344 ly",
    discovery: "1610",
    fact: "A stellar nursery, one of the most studied nebulas.",
    color: "from-blue-400 via-teal-500 to-green-500",
    facts: [
      "Contains the Trapezium cluster of young stars.",
      "Visible to the naked eye as the middle 'star' in Orion's sword.",
      "Spans approximately 24 light-years across."
    ]
  },
  {
    name: "Crab Nebula (M1)",
    type: "Supernova Remnant",
    distance: "6,523 ly",
    discovery: "1054 AD",
    fact: "Result of a supernova observed by Chinese astronomers in 1054 AD.",
    color: "from-orange-500 via-red-500 to-yellow-500",
    facts: [
      "The first object in Charles Messier's catalog.",
      "Expanding at an incredible 1,500 km/s.",
      "Contains a rapidly spinning pulsar at its center (30 times/sec)."
    ]
  },
  {
    name: "Eagle Nebula (M16)",
    type: "Emission",
    distance: "7,000 ly",
    discovery: "1745",
    fact: "Home to the famous 'Pillars of Creation'.",
    color: "from-purple-500 via-pink-500 to-orange-400",
    facts: [
      "An active star formation region.",
      "The Pillars of Creation are 4-5 light-years tall.",
      "First famously imaged by the Hubble Space Telescope in 1995."
    ]
  },
  {
    name: "Helix Nebula (NGC 7293)",
    type: "Planetary",
    distance: "650 ly",
    discovery: "1824",
    fact: "Nicknamed the 'Eye of God', formed by a dying Sun-like star.",
    color: "from-blue-600 via-cyan-400 to-teal-300",
    facts: [
      "One of the closest planetary nebulas to Earth.",
      "Located in the constellation Aquarius.",
      "Has a hot white dwarf star at its center."
    ]
  },
  {
    name: "Ring Nebula (M57)",
    type: "Planetary",
    distance: "2,283 ly",
    discovery: "1779",
    fact: "Formed ~20,000 years ago, resembles a glowing ring.",
    color: "from-blue-500 via-indigo-500 to-yellow-400",
    facts: [
      "Located in the constellation Lyra.",
      "The ring is about 200 times the distance from Earth to the Sun.",
      "Central white dwarf has a surface temperature of 120,000°C."
    ]
  }
];

export default function Nebulas() {
  const [selected, setSelected] = useState<typeof nebulasData[0] | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="min-h-[calc(100vh-4rem)] py-20 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-glow mb-4 tracking-wider text-center">NEBULAS</h1>
        <p className="text-foreground/60 text-center mb-16 max-w-2xl mx-auto">Giant clouds of dust and gas in space. Some come from the gas and dust thrown out by the explosion of a dying star, while others are regions where new stars are beginning to form.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {nebulasData.map((nebula, i) => (
            <motion.div
              key={nebula.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel rounded-2xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelected(nebula)}
              data-testid={`nebula-card-${i}`}
            >
              <div className="h-48 flex items-center justify-center mb-6 overflow-hidden relative rounded-xl bg-black/40">
                <div className={`w-40 h-40 rounded-full bg-gradient-to-tr ${nebula.color} blur-[30px] opacity-60 absolute mix-blend-screen animate-[pulse-glow_4s_ease-in-out_infinite]`} />
                <div className={`w-24 h-24 rounded-full bg-gradient-to-bl ${nebula.color} blur-[20px] opacity-80 absolute mix-blend-screen animate-[spin-slow_12s_linear_infinite]`} />
                <div className="w-10 h-10 bg-white/20 blur-[10px] rounded-full absolute" />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-heading text-xl font-bold text-glow">{nebula.name}</h3>
                <span className="text-xs font-mono px-2 py-1 rounded bg-primary/20 text-primary border border-primary/30">{nebula.type}</span>
              </div>
              <div className="space-y-1 text-sm text-foreground/70 mb-4">
                <p><span className="text-foreground/50">Distance:</span> {nebula.distance}</p>
                <p><span className="text-foreground/50">Discovered:</span> {nebula.discovery}</p>
              </div>
              <p className="text-sm text-primary/80 line-clamp-2">{nebula.fact}</p>
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
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${selected.color} blur-[15px] opacity-80 absolute mix-blend-screen animate-[pulse-glow_3s_ease-in-out_infinite]`} />
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
                  <p className="text-foreground/50 text-xs mb-1">Discovery Year</p>
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
