import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full glass-panel rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
      >
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 mb-8 mx-auto box-glow">
            <div className="w-6 h-6 bg-primary rounded-full animate-pulse-glow" />
          </div>
          
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-center mb-6 tracking-wider text-glow">
            ABOUT COSMOS
          </h1>
          
          <div className="space-y-6 text-foreground/80 font-light leading-relaxed text-center md:text-left">
            <p>
              Cosmos is an interactive educational experience designed to inspire awe and curiosity about our universe. Built with modern web technologies, it aims to recreate the feeling of a late-night visit to a futuristic planetarium.
            </p>
            <p>
              Every pixel, animation, and interaction was crafted to evoke the vastness, mystery, and beauty of deep space. No backend databases, no complex APIs — just pure front-end magic rendering the stars in your browser.
            </p>
            <p>
              Created as a demonstration of responsive design, CSS animations, and immersive UI/UX principles.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex justify-center gap-6">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground/60 hover:text-white hover:bg-white/10 hover:scale-110 transition-all border border-white/5">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground/60 hover:text-white hover:bg-white/10 hover:scale-110 transition-all border border-white/5">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-foreground/60 hover:text-white hover:bg-white/10 hover:scale-110 transition-all border border-white/5">
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <div className="mt-8 text-center text-xs font-mono text-foreground/40 tracking-widest">
            SYSTEM VERSION 1.0.0
          </div>
        </div>
      </motion.div>
    </div>
  );
}
