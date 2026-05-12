import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { planets } from '@/lib/data';
import { X, Info, Thermometer, Orbit as OrbitIcon, Navigation, Sparkles } from 'lucide-react';

export default function SolarSystem() {
  const [selectedPlanet, setSelectedPlanet] = useState<typeof planets[0] | null>(null);
  
  // Center is Sun
  const centerX = 50;
  const centerY = 50;

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden flex items-center justify-center bg-black/40">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Solar System Container */}
      <div className="relative w-[1000px] h-[1000px] md:w-[1200px] md:h-[1200px] transform scale-50 sm:scale-75 md:scale-100 transition-transform duration-500 origin-center">
        
        {/* Sun */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200 via-amber-500 to-orange-600 shadow-[0_0_100px_rgba(245,158,11,0.6)] cursor-pointer z-50 flex items-center justify-center group"
          onClick={() => setSelectedPlanet({
            id: 'sun',
            name: 'The Sun',
            description: 'The star at the center of the Solar System. It is a nearly perfect sphere of hot plasma.',
            distance: '0 km',
            gravity: '274 m/s²',
            temp: '5,500°C surface',
            moons: 0,
            facts: ['Accounts for 99.86% of the mass in the solar system.', 'Takes 27 days to rotate on its axis.'],
            color: '#f59e0b',
            size: 4,
            orbitRadius: 0,
            orbitSpeed: 0
          })}
        >
          <div className="absolute inset-0 rounded-full animate-pulse-glow opacity-50" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-8 text-xs font-mono font-bold tracking-widest text-amber-400">SUN</span>
        </div>

        {/* Orbits & Planets */}
        {planets.map((planet, index) => {
          // Calculate orbital path size based on index for spacing
          const orbitSize = (index + 1) * 110 + 100;
          
          return (
            <div key={planet.id} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: `${orbitSize}px`, height: `${orbitSize}px` }}>
              
              {/* Orbit Ring */}
              <div className="absolute inset-0 rounded-full border border-white/10" />
              
              {/* Rotating Container */}
              <div 
                className="absolute inset-0 rounded-full animate-[spin-slow_linear_infinite]"
                style={{ animationDuration: `${planet.orbitSpeed}s` }}
              >
                {/* The Planet itself positioned on the edge of the ring */}
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-40"
                  onClick={() => setSelectedPlanet(planet)}
                >
                  {/* Interaction hitbox area */}
                  <div className="absolute -inset-4 rounded-full" />
                  
                  {/* Visual Planet */}
                  <div 
                    className="rounded-full shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.8)] relative hover:scale-125 transition-transform duration-300"
                    style={{ 
                      width: `${planet.size * 16 + 8}px`, 
                      height: `${planet.size * 16 + 8}px`,
                      backgroundColor: planet.color,
                      boxShadow: `0 0 20px ${planet.color}40, inset -4px -4px 10px rgba(0,0,0,0.8)`
                    }}
                  >
                    {planet.hasRings && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[40%] rounded-[100%] border-[3px] md:border-[4px] border-white/30" style={{ transform: 'translate(-50%, -50%) rotate(20deg)' }} />
                    )}
                  </div>
                  
                  {/* Label (counter-rotating to stay upright) */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span 
                      className="block px-2 py-0.5 rounded bg-black/60 backdrop-blur text-[10px] md:text-xs font-mono font-bold tracking-widest whitespace-nowrap animate-[spin-slow_linear_infinite_reverse]"
                      style={{ 
                        animationDuration: `${planet.orbitSpeed}s`,
                        color: planet.color 
                      }}
                    >
                      {planet.name.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Panel Overlay */}
      <AnimatePresence>
        {selectedPlanet && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              onClick={() => setSelectedPlanet(null)}
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] glass border-l border-white/10 z-[101] overflow-y-auto"
            >
              <div className="p-6 md:p-8 pt-20 md:pt-8 min-h-full flex flex-col">
                <button 
                  onClick={() => setSelectedPlanet(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header Image */}
                <div className="flex justify-center mb-8 relative">
                  <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full" style={{ backgroundColor: `${selectedPlanet.color}20` }} />
                  <div 
                    className="w-40 h-40 rounded-full shadow-[inset_-20px_-20px_40px_rgba(0,0,0,0.8)] relative z-10 animate-[float_6s_ease-in-out_infinite]"
                    style={{ 
                      backgroundColor: selectedPlanet.color,
                      boxShadow: `0 0 50px ${selectedPlanet.color}50, inset -20px -20px 40px rgba(0,0,0,0.8)`
                    }}
                  >
                    {selectedPlanet.hasRings && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[40%] rounded-[100%] border-[12px] border-white/20" style={{ transform: 'translate(-50%, -50%) rotate(20deg)' }} />
                    )}
                  </div>
                </div>

                <h2 className="font-heading text-4xl font-bold mb-2 tracking-wider" style={{ color: selectedPlanet.color, textShadow: `0 0 20px ${selectedPlanet.color}80` }}>
                  {selectedPlanet.name}
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-8">
                  {selectedPlanet.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="glass-panel p-4 rounded-xl">
                    <Navigation className="w-5 h-5 mb-2 text-primary opacity-70" />
                    <span className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-1">Distance</span>
                    <span className="font-mono text-sm font-bold">{selectedPlanet.distance}</span>
                  </div>
                  <div className="glass-panel p-4 rounded-xl">
                    <Thermometer className="w-5 h-5 mb-2 text-primary opacity-70" />
                    <span className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-1">Temperature</span>
                    <span className="font-mono text-sm font-bold">{selectedPlanet.temp}</span>
                  </div>
                  <div className="glass-panel p-4 rounded-xl">
                    <OrbitIcon className="w-5 h-5 mb-2 text-primary opacity-70" />
                    <span className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-1">Gravity</span>
                    <span className="font-mono text-sm font-bold">{selectedPlanet.gravity}</span>
                  </div>
                  <div className="glass-panel p-4 rounded-xl">
                    <Info className="w-5 h-5 mb-2 text-primary opacity-70" />
                    <span className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-1">Moons</span>
                    <span className="font-mono text-sm font-bold">{selectedPlanet.moons}</span>
                  </div>
                </div>

                {/* Facts List */}
                <div className="mt-auto">
                  <h3 className="text-xs uppercase tracking-widest text-foreground/50 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" /> Key Facts
                  </h3>
                  <ul className="space-y-3">
                    {selectedPlanet.facts.map((fact, i) => (
                      <li key={i} className="flex gap-3 text-sm text-foreground/80 items-start">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: selectedPlanet.color }} />
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

      <div className="absolute bottom-8 text-center w-full pointer-events-none text-foreground/40 text-xs font-mono tracking-widest">
        SCROLL TO ZOOM / DRAG TO PAN / CLICK TO INSPECT
      </div>
    </div>
  );
}
