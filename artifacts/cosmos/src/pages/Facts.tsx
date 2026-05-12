import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Sparkles, Share2 } from 'lucide-react';
import { facts } from '@/lib/data';
import { Button } from '@/components/ui/button';

export default function Facts() {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [history, setHistory] = useState<number[]>([0]);

  const generateNewFact = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * facts.length);
    } while (newIndex === currentFactIndex && facts.length > 1);
    
    setHistory([...history, newIndex]);
    setCurrentFactIndex(newIndex);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(facts[currentFactIndex] + " - Discovered on Cosmos");
      // Could add a toast here if we imported useToast, but keeping it simple
      alert("Fact copied to clipboard!");
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-3xl w-full text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-wider mb-4 text-glow">
            COSMIC TRIVIA
          </h1>
          <p className="text-foreground/60 font-mono tracking-widest uppercase text-sm">
            Fact #{currentFactIndex + 1} of {facts.length}
          </p>
        </motion.div>

        <div className="relative h-[300px] md:h-[250px] w-full mb-12">
          <AnimatePresence mode="wait" onExitComplete={() => setIsAnimating(false)}>
            <motion.div
              key={currentFactIndex}
              initial={{ opacity: 0, x: 50, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -50, rotateY: -10 }}
              transition={{ duration: 0.5, type: 'spring', damping: 20 }}
              className="absolute inset-0"
            >
              <div className="glass-panel w-full h-full rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center border border-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.1)] relative overflow-hidden group">
                <Sparkles className="absolute top-6 left-6 w-6 h-6 text-green-400/40" />
                <Sparkles className="absolute bottom-6 right-6 w-4 h-4 text-green-400/40" />
                
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-white text-center">
                  "{facts[currentFactIndex]}"
                </h2>
                
                <div className="absolute inset-0 bg-gradient-to-tr from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg"
            onClick={generateNewFact}
            disabled={isAnimating}
            className="rounded-full px-8 h-14 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-green-500/50 hover:box-glow transition-all duration-300 font-heading tracking-widest w-full sm:w-auto"
          >
            <RefreshCw className={`w-5 h-5 mr-3 ${isAnimating ? 'animate-spin' : ''}`} />
            DISCOVER NEW FACT
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleShare}
            className="rounded-full px-6 h-14 bg-transparent hover:bg-white/5 border-white/10 text-foreground/70 hover:text-white w-full sm:w-auto"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap gap-2 justify-center max-w-md mx-auto opacity-50">
          {Array.from({ length: Math.min(10, history.length) }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-500" style={{ opacity: 1 - (i * 0.1) }} />
          ))}
        </div>
      </div>
    </div>
  );
}
