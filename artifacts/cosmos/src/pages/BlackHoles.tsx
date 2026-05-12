import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function BlackHoles() {
  const [hoveredConcept, setHoveredConcept] = useState<number | null>(null);

  const concepts = [
    {
      title: "Event Horizon",
      desc: "The boundary around a black hole beyond which nothing, not even light, can escape the gravitational pull.",
      fact: "Also known as the 'point of no return'."
    },
    {
      title: "Singularity",
      desc: "The very center of a black hole where matter is crushed to infinite density and zero volume.",
      fact: "Our current laws of physics break down here."
    },
    {
      title: "Time Dilation",
      desc: "Due to intense gravity, time passes much slower near a black hole compared to further away.",
      fact: "1 hour near the event horizon could equal 7 years on Earth."
    },
    {
      title: "Hawking Radiation",
      desc: "Theoretical radiation predicted by Stephen Hawking that allows black holes to slowly evaporate over trillions of years.",
      fact: "Means black holes are not completely 'black'."
    }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center py-12 md:py-24 px-4 overflow-hidden relative">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,10,30,0.5)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              Anomaly Detected
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-7xl font-black tracking-widest mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-200 to-indigo-800"
          >
            THE SINGULARITY
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-foreground/60 max-w-2xl mx-auto font-light text-lg"
          >
            Regions of spacetime where gravity is so strong that nothing, no particles or even electromagnetic radiation such as light, can escape from it.
          </motion.p>
        </div>

        {/* Black Hole Visualization */}
        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center mb-32 perspective-[1000px]">
          {/* Background Lensing Effect */}
          <div className="absolute inset-0 flex items-center justify-center opacity-60">
             <div className="w-[150%] h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-md" />
             <div className="w-1 h-[150%] absolute bg-gradient-to-b from-transparent via-blue-500/30 to-transparent blur-md transform rotate-45" />
             <div className="w-1 h-[150%] absolute bg-gradient-to-b from-transparent via-blue-500/30 to-transparent blur-md transform -rotate-45" />
          </div>

          {/* Accretion Disk - Back part */}
          <motion.div 
            animate={{ rotateZ: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border-[40px] border-t-purple-600/30 border-r-orange-500/20 border-b-blue-600/10 border-l-transparent blur-[15px]"
            style={{ transform: "rotateX(75deg)" }}
          />

          {/* The Void (Singularity/Event Horizon) */}
          <div className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-black shadow-[0_0_50px_rgba(0,0,0,1),inset_0_0_20px_rgba(0,0,0,1)] z-20 overflow-hidden ring-1 ring-purple-900/50">
             {/* Swirling edge inside event horizon */}
             <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(168,85,247,0.3)] animate-pulse-glow" />
          </div>

          {/* Gravitational Lensing Ring (Photon Ring) */}
          <div className="absolute w-40 h-40 md:w-56 md:h-56 rounded-full border-[2px] border-orange-200/80 shadow-[0_0_20px_rgba(251,146,60,0.8)] z-10 animate-pulse" />
          <div className="absolute w-36 h-36 md:w-52 md:h-52 rounded-full border border-purple-300/60 shadow-[0_0_15px_rgba(216,180,254,0.6)] z-30" />

          {/* Accretion Disk - Front part (crosses in front of black hole) */}
          <motion.div 
            animate={{ rotateZ: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-[380px] h-[380px] md:w-[580px] md:h-[580px] rounded-full border-[20px] border-t-transparent border-r-transparent border-b-orange-400/60 border-l-purple-500/60 blur-[8px] z-40"
            style={{ transform: "rotateX(75deg)" }}
          />
          <motion.div 
            animate={{ rotateZ: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-[420px] h-[420px] md:w-[620px] md:h-[620px] rounded-full border-[10px] border-t-transparent border-r-transparent border-b-white/40 border-l-orange-300/40 blur-[4px] z-40"
            style={{ transform: "rotateX(75deg)" }}
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
        </div>

        {/* Concepts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-50">
          {concepts.map((concept, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredConcept(i)}
              onMouseLeave={() => setHoveredConcept(null)}
              className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all duration-500 relative overflow-hidden group cursor-crosshair"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full -z-10 transition-transform duration-500 ${hoveredConcept === i ? 'scale-150' : 'scale-100'}`} />
              
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-heading text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {concept.title}
                </h3>
                <span className="font-mono text-xs text-purple-500/50">0{i+1}</span>
              </div>
              
              <p className="text-foreground/70 mb-6 min-h-[3rem]">
                {concept.desc}
              </p>
              
              <div className="mt-auto border-t border-white/10 pt-4 flex items-start gap-3">
                <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span className="text-sm font-mono text-purple-200/80">{concept.fact}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spaghettification CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="glass-panel max-w-2xl mx-auto p-12 rounded-3xl border border-red-500/20 shadow-[0_0_30px_rgba(220,38,38,0.1)] hover:shadow-[0_0_50px_rgba(220,38,38,0.2)] transition-shadow duration-700">
            <h2 className="font-heading text-3xl font-bold mb-4 text-white">What happens if you fall in?</h2>
            <p className="text-foreground/70 mb-8 leading-relaxed">
              As you approach the event horizon, the gravity at your feet becomes vastly stronger than at your head. You would be stretched into a long, thin noodle in a process scientists actually call <strong className="text-red-400 font-mono">spaghettification</strong>.
            </p>
            <button className="h-12 px-8 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 font-mono text-sm tracking-widest transition-colors inline-flex items-center gap-2">
              INITIATE SIMULATION <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-foreground/40 mt-4 uppercase tracking-widest">(Simulation offline for your safety)</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
