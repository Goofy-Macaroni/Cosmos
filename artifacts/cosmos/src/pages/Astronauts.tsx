import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Award, Calendar } from 'lucide-react';

interface Astronaut {
  id: string; name: string; nationality: string; birth: string;
  missions: string[]; achievement: string; quote: string;
  facts: string[]; initials: string; accentColor: string; bgGradient: string;
}

const ASTRONAUTS: Astronaut[] = [
  {
    id: 'armstrong', name: 'Neil Armstrong', nationality: 'American', birth: 'August 5, 1930',
    initials: 'NA', accentColor: '#60a5fa', bgGradient: 'from-blue-700/40 to-red-700/20',
    missions: ['Gemini 8 (1966)', 'Apollo 11 (1969)'],
    achievement: 'First human to walk on the Moon — July 20, 1969.',
    quote: "That's one small step for man, one giant leap for mankind.",
    facts: ['Was a naval aviator and test pilot before joining NASA.', 'Spent 2 hours 31 minutes walking on the lunar surface.', 'Flew 78 combat missions in the Korean War before becoming an astronaut.'],
  },
  {
    id: 'gagarin', name: 'Yuri Gagarin', nationality: 'Soviet / Russian', birth: 'March 9, 1934',
    initials: 'YG', accentColor: '#f87171', bgGradient: 'from-red-700/40 to-red-900/20',
    missions: ['Vostok 1 (1961)'],
    achievement: 'First human in space — April 12, 1961. Completed one orbit around Earth.',
    quote: 'The Earth is blue. How wonderful. It is amazing.',
    facts: ['His 108-minute spaceflight changed history forever.', 'He ejected from the capsule and parachuted separately — standard for Soviet missions.', 'April 12 is celebrated as "Cosmonautics Day" in Russia.'],
  },
  {
    id: 'chawla', name: 'Kalpana Chawla', nationality: 'Indian-American', birth: 'March 17, 1962',
    initials: 'KC', accentColor: '#fb923c', bgGradient: 'from-orange-600/40 to-green-700/20',
    missions: ['STS-87 (1997)', 'STS-107 (2003)'],
    achievement: 'First woman of Indian origin in space.',
    quote: 'The path from dreams to success does exist. May you have the vision to find it, the courage to get on to that path and the perseverance to follow it.',
    facts: ['Logged 30 days, 14 hours, 54 minutes in space over two missions.', 'Tragically lost in the Space Shuttle Columbia disaster on February 1, 2003.', 'Several awards, scholarships, and institutions in India bear her name.'],
  },
  {
    id: 'williams', name: 'Sunita Williams', nationality: 'Indian-American', birth: 'September 19, 1965',
    initials: 'SW', accentColor: '#34d399', bgGradient: 'from-green-700/40 to-orange-700/20',
    missions: ['STS-116 (2006)', 'Expedition 14/15 (2007)', 'Expedition 32/33 (2012)', 'Boeing Crew Flight Test (2024)'],
    achievement: 'Held the record for most spacewalk time by a woman — 50 hours 40 minutes.',
    quote: 'Space is really infinite. The universe has no end.',
    facts: ['Ran the Boston Marathon from the treadmill on the ISS in 2007.', 'Holds a Masters in Engineering Management from Florida Institute of Technology.', 'Has logged over 322 days in space across multiple missions.'],
  },
  {
    id: 'aldrin', name: 'Buzz Aldrin', nationality: 'American', birth: 'January 20, 1930',
    initials: 'BA', accentColor: '#c084fc', bgGradient: 'from-blue-700/40 to-purple-700/20',
    missions: ['Gemini 12 (1966)', 'Apollo 11 (1969)'],
    achievement: 'Second human to walk on the Moon. Pioneered spacewalk techniques.',
    quote: 'Exploration is not a choice, it\'s an imperative.',
    facts: ['Holds a Doctorate in Astronautics from MIT focused on orbital mechanics.', 'He and Armstrong spent 2.5 hours on the lunar surface together.', 'Unofficially holds the record as the first person to receive communion on the Moon.'],
  },
];

export default function Astronauts() {
  const [selected, setSelected] = useState<Astronaut | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className="min-h-[calc(100vh-4rem)] py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-glow mb-4 tracking-wider">ASTRONAUTS</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Pioneers who left the cradle of Earth and reached for the stars. Their courage changed history.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ASTRONAUTS.map((a, i) => (
            <motion.div key={a.id}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              onClick={() => setSelected(a)} data-testid={`astronaut-${a.id}`}>
              {/* Top accent bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${a.bgGradient}`} style={{ background: `linear-gradient(90deg, ${a.accentColor}88, ${a.accentColor}22)` }} />
              <div className="p-6">
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-heading font-bold border-2 flex-shrink-0"
                    style={{ borderColor: a.accentColor, color: a.accentColor, backgroundColor: `${a.accentColor}18` }}>
                    {a.initials}
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-bold tracking-wider leading-tight" style={{ color: a.accentColor }}>{a.name}</h2>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-1">
                      <Globe className="w-3 h-3" />
                      <span>{a.nationality}</span>
                    </div>
                  </div>
                </div>
                <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{a.achievement}</p>
                <blockquote className="italic text-xs text-foreground/50 border-l-2 pl-3 line-clamp-2"
                  style={{ borderColor: a.accentColor }}>
                  "{a.quote}"
                </blockquote>
                <div className="mt-4 flex items-center gap-2 text-xs text-foreground/40">
                  <Award className="w-3 h-3" />
                  <span>{a.missions.length} mission{a.missions.length !== 1 ? 's' : ''}</span>
                </div>
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
              className="fixed top-0 right-0 bottom-0 w-full md:w-[500px] glass border-l border-white/10 z-[101] overflow-y-auto"
              data-testid="astronaut-panel">
              <div className="p-8 pt-16">
                <button onClick={() => setSelected(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  data-testid="close-astronaut-panel"><X className="w-5 h-5" /></button>

                <div className="h-1 w-full rounded mb-8" style={{ background: `linear-gradient(90deg, ${selected.accentColor}, transparent)` }} />

                <div className="flex items-center gap-5 mb-6">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-heading font-bold border-2 flex-shrink-0"
                    style={{ borderColor: selected.accentColor, color: selected.accentColor, backgroundColor: `${selected.accentColor}20` }}>
                    {selected.initials}
                  </div>
                  <div>
                    <h2 className="font-heading text-2xl font-bold tracking-wider" style={{ color: selected.accentColor }}>{selected.name}</h2>
                    <div className="flex items-center gap-1.5 text-sm text-foreground/60 mt-1"><Globe className="w-4 h-4" />{selected.nationality}</div>
                    <div className="flex items-center gap-1.5 text-sm text-foreground/60 mt-0.5"><Calendar className="w-4 h-4" />Born {selected.birth}</div>
                  </div>
                </div>

                <div className="glass-panel rounded-xl p-4 mb-6 border border-white/5">
                  <p className="text-sm text-foreground/70 font-medium">{selected.achievement}</p>
                </div>

                <blockquote className="italic text-foreground/70 border-l-2 pl-4 mb-6 leading-relaxed"
                  style={{ borderColor: selected.accentColor }}>
                  "{selected.quote}"
                </blockquote>

                <h3 className="text-xs uppercase tracking-widest text-foreground/50 mb-3">Missions</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selected.missions.map(m => (
                    <span key={m} className="px-3 py-1 rounded-full text-xs font-mono border"
                      style={{ borderColor: `${selected.accentColor}50`, color: selected.accentColor, background: `${selected.accentColor}12` }}>
                      {m}
                    </span>
                  ))}
                </div>

                <h3 className="text-xs uppercase tracking-widest text-foreground/50 mb-3">Key Facts</h3>
                <ul className="space-y-3">
                  {selected.facts.map((f, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground/80 items-start">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: selected.accentColor }} />
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
