import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, BookOpen, BrainCircuit, Orbit } from 'lucide-react';
import { planets } from '@/lib/data';

export default function Home() {
  const currentDayIndex = new Date().getDay();
  const featuredPlanet = planets[currentDayIndex % planets.length];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 py-12 md:py-24">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto mb-20"
      >
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black tracking-wider mb-6 text-glow">
          EXPLORE THE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-pulse">
            UNKNOWN
          </span>
        </h1>
        <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Embark on an interactive journey through the cosmos. Discover the wonders of our solar system, uncover the mysteries of black holes, and test your knowledge of the universe.
        </p>
        <Link href="/solar-system" className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-primary/20 text-primary font-heading tracking-widest border border-primary/50 hover:bg-primary/30 hover:box-glow transition-all duration-300 group">
          START EXPLORING
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl mx-auto mb-20">
        {[
          { href: '/solar-system', icon: Orbit, title: 'Solar System', desc: 'Interactive orbital map', color: 'text-blue-400' },
          { href: '/black-holes', icon: Compass, title: 'Black Holes', desc: 'Journey to the singularity', color: 'text-purple-400' },
          { href: '/facts', icon: BookOpen, title: 'Space Facts', desc: 'Mind-bending trivia', color: 'text-green-400' },
          { href: '/quiz', icon: BrainCircuit, title: 'Cosmic Quiz', desc: 'Test your knowledge', color: 'text-amber-400' },
        ].map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 + 0.5 }}
          >
            <Link href={feature.href} className="block group h-full">
              <div className="glass-panel p-6 rounded-2xl h-full border border-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 ${feature.color} group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-2 group-hover:text-glow-accent transition-all">{feature.title}</h3>
                <p className="text-foreground/60 text-sm">{feature.desc}</p>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Featured Planet */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="w-full max-w-4xl mx-auto glass-panel rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-16 border border-white/10 relative overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex-1 z-10 text-center md:text-left">
          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-primary mb-4 tracking-widest uppercase">
            Planet of the Day
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">{featuredPlanet.name}</h2>
          <p className="text-foreground/70 mb-6 leading-relaxed">{featuredPlanet.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div className="bg-black/20 p-3 rounded-lg border border-white/5">
              <span className="block text-foreground/50 text-xs mb-1 uppercase tracking-wider">Distance</span>
              <span className="font-mono text-primary">{featuredPlanet.distance}</span>
            </div>
            <div className="bg-black/20 p-3 rounded-lg border border-white/5">
              <span className="block text-foreground/50 text-xs mb-1 uppercase tracking-wider">Temp</span>
              <span className="font-mono text-primary">{featuredPlanet.temp}</span>
            </div>
          </div>
          <Link href="/solar-system" className="text-sm font-heading tracking-widest text-primary hover:text-accent transition-colors flex items-center justify-center md:justify-start gap-2">
            VIEW IN SOLAR SYSTEM <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="w-48 h-48 md:w-64 md:h-64 relative z-10 flex-shrink-0">
          <div 
            className="absolute inset-0 rounded-full shadow-[inset_-20px_-20px_40px_rgba(0,0,0,0.8)]"
            style={{ 
              backgroundColor: featuredPlanet.color,
              boxShadow: `0 0 40px ${featuredPlanet.color}40, inset -20px -20px 40px rgba(0,0,0,0.8)`
            }} 
          />
          {featuredPlanet.hasRings && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[40%] rounded-[100%] border-[12px] border-white/20" style={{ transform: 'translate(-50%, -50%) rotate(20deg)' }} />
          )}
        </div>
      </motion.div>
    </div>
  );
}
