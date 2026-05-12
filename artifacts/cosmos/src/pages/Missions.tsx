import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Activity, CheckCircle2, ChevronRight, Info } from 'lucide-react';

const missionsData = [
  {
    id: "apollo11",
    name: "Apollo 11",
    launchDate: "Jul 16, 1969",
    status: "Completed",
    goals: "Land humans on the Moon and return them safely to Earth.",
    description: "The spaceflight that first landed humans on the Moon. Commander Neil Armstrong and lunar module pilot Buzz Aldrin formed the American crew that landed the Apollo Lunar Module Eagle.",
    achievements: [
      "Neil Armstrong and Buzz Aldrin walked on the Moon.",
      "Collected 21.5 kg of lunar material for return to Earth.",
      "Spent 21.5 hours on the lunar surface."
    ]
  },
  {
    id: "voyager1",
    name: "Voyager 1",
    launchDate: "Sep 5, 1977",
    status: "Active",
    location: "23B km from Earth",
    goals: "Study the outer solar system and interstellar space.",
    description: "A space probe launched by NASA to study the outer Solar System and beyond. It crossed the heliopause and entered interstellar space in 2012.",
    achievements: [
      "First human-made object to reach interstellar space (2012).",
      "Discovered active volcanoes on Jupiter's moon Io.",
      "Still transmitting data back to Earth."
    ]
  },
  {
    id: "voyager2",
    name: "Voyager 2",
    launchDate: "Aug 20, 1977",
    status: "Active",
    location: "Interstellar space",
    goals: "Study all four outer planets (Jupiter, Saturn, Uranus, Neptune).",
    description: "The only spacecraft to have visited either of the ice giants. It successfully flew by Jupiter, Saturn, Uranus, and Neptune.",
    achievements: [
      "Only spacecraft to visit Uranus and Neptune.",
      "Discovered 11 new moons at Uranus and 6 at Neptune.",
      "Entered interstellar space in 2018."
    ]
  },
  {
    id: "curiosity",
    name: "Curiosity Rover",
    launchDate: "Nov 26, 2011",
    status: "Active",
    location: "Gale Crater, Mars",
    goals: "Assess Mars habitability and study its climate and geology.",
    description: "A car-sized Mars rover designed to explore the Gale crater on Mars as part of NASA's Mars Science Laboratory mission.",
    achievements: [
      "Confirmed Mars once had liquid water and a habitable environment.",
      "Found organic molecules in Martian rocks.",
      "Measured radiation levels to aid future human missions."
    ]
  },
  {
    id: "perseverance",
    name: "Perseverance Rover",
    launchDate: "Jul 30, 2020",
    status: "Active",
    location: "Jezero Crater, Mars",
    goals: "Search for signs of ancient life and collect rock samples.",
    description: "A car-sized Mars rover designed to explore the Jezero crater on Mars. It carries the Ingenuity helicopter.",
    achievements: [
      "First powered flight on another planet (Ingenuity helicopter).",
      "Successfully produced oxygen from Martian atmosphere (MOXIE).",
      "Collected 23 rock and regolith samples so far."
    ]
  },
  {
    id: "jwst",
    name: "James Webb Space Telescope",
    launchDate: "Dec 25, 2021",
    status: "Active",
    location: "Sun-Earth L2 Point",
    goals: "Observe the most distant objects and study exoplanet atmospheres.",
    description: "The largest optical telescope in space, equipped with high-resolution and highly sensitive instruments, allowing it to view objects too old, distant, or faint for the Hubble Space Telescope.",
    achievements: [
      "Captured the deepest and sharpest infrared image of the universe.",
      "Detected water vapor and carbon dioxide in exoplanet atmospheres.",
      "Observed the earliest known galaxies."
    ]
  }
];

export default function Missions() {
  const [selectedId, setSelectedId] = useState(missionsData[0].id);
  const selectedMission = missionsData.find(m => m.id === selectedId) || missionsData[0];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="min-h-[calc(100vh-4rem)] py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="font-heading text-4xl md:text-6xl font-bold text-glow mb-4 tracking-wider">SPACE MISSIONS</h1>
      <p className="text-foreground/60 mb-12 max-w-3xl">Humanity's greatest achievements in exploring the cosmos, from the first steps on the Moon to observing the dawn of the universe.</p>

      {/* Timeline Scroll */}
      <div className="flex overflow-x-auto pb-8 mb-12 gap-4 snap-x hide-scrollbar">
        {missionsData.map((mission) => (
          <div
            key={mission.id}
            onClick={() => setSelectedId(mission.id)}
            data-testid={`mission-tab-${mission.id}`}
            className={`min-w-[280px] sm:min-w-[320px] snap-start cursor-pointer transition-all duration-300 ${selectedId === mission.id ? 'scale-100 opacity-100' : 'scale-95 opacity-60 hover:opacity-100'}`}
          >
            <div className={`glass-panel p-5 rounded-2xl h-full border ${selectedId === mission.id ? 'border-primary shadow-[0_0_20px_rgba(var(--primary),0.2)]' : 'border-white/10'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-foreground/50">{mission.launchDate}</span>
                {mission.status === 'Active' ? (
                  <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded border border-green-400/20">
                    <Activity className="w-3 h-3 animate-pulse" /> Active
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded border border-blue-400/20">
                    <CheckCircle2 className="w-3 h-3" /> Completed
                  </div>
                )}
              </div>
              <h3 className="font-heading text-xl font-bold mb-1 text-glow">{mission.name}</h3>
              <p className="text-sm text-foreground/70 line-clamp-2">{mission.goals}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Mission Details */}
      <motion.div
        key={selectedMission.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel rounded-3xl p-6 md:p-10 border border-primary/20 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          <div className="md:col-span-2">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-glow">{selectedMission.name}</h2>
              {selectedMission.status === 'Active' ? (
                <div className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/30 font-mono">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                  STATUS: ACTIVE
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/30 font-mono">
                  <CheckCircle2 className="w-4 h-4" />
                  STATUS: COMPLETED
                </div>
              )}
            </div>

            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              {selectedMission.description}
            </p>

            <h3 className="text-xl font-heading mb-4 text-primary flex items-center gap-2">
              <Rocket className="w-5 h-5" /> Mission Achievements
            </h3>
            <ul className="space-y-4">
              {selectedMission.achievements.map((achievement, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="flex gap-3 text-foreground/80 bg-black/20 p-4 rounded-xl border border-white/5"
                >
                  <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-black/30 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <h4 className="font-mono text-xs text-foreground/50 mb-2 uppercase tracking-wider flex items-center gap-2">
                <Info className="w-4 h-4" /> Mission Data
              </h4>
              <div className="space-y-4 mt-4">
                <div>
                  <p className="text-xs text-primary mb-1 font-mono">LAUNCH DATE</p>
                  <p className="font-medium text-lg">{selectedMission.launchDate}</p>
                </div>
                <div>
                  <p className="text-xs text-primary mb-1 font-mono">PRIMARY GOAL</p>
                  <p className="font-medium text-sm">{selectedMission.goals}</p>
                </div>
                {selectedMission.location && (
                  <div>
                    <p className="text-xs text-primary mb-1 font-mono">CURRENT LOCATION</p>
                    <p className="font-medium">{selectedMission.location}</p>
                  </div>
                )}
              </div>
            </div>

            {selectedMission.status === 'Active' && (
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col items-center justify-center text-center h-40">
                <div className="relative w-12 h-12 flex items-center justify-center mb-4">
                  <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping" />
                  <div className="absolute inset-2 rounded-full border border-primary/60 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
                </div>
                <p className="text-xs font-mono text-primary/80 uppercase tracking-widest">Receiving Signal...</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
