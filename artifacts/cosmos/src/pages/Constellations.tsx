import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';

interface StarPoint { x: number; y: number; r: number; label?: string; color?: string; }
interface ConstellationLine { x1: number; y1: number; x2: number; y2: number; }
interface Constellation {
  id: string; name: string; mythology: string; bestMonth: string;
  brightestStar: string; magnitude: string; facts: string[];
  stars: StarPoint[]; lines: ConstellationLine[]; accentColor: string;
}

const CONSTELLATIONS: Constellation[] = [
  {
    id: 'orion', name: 'Orion', accentColor: '#60a5fa',
    mythology: 'In Greek mythology, Orion was a giant huntsman placed among the stars by Zeus. He is depicted with a club, shield, and belt of three stars — the most recognizable pattern in the night sky. Some myths say he was stung by a scorpion sent by Gaia.',
    bestMonth: 'January', brightestStar: 'Rigel', magnitude: '0.13',
    facts: ['Contains 7 main stars forming a distinctive hunter shape.', 'The Orion Nebula (M42) lies within the sword region, visible to the naked eye.', 'Betelgeuse is a red supergiant roughly 700 times wider than the Sun — it may soon go supernova.'],
    stars: [
      { x: 85, y: 45, r: 6, label: 'Betelgeuse', color: '#f97316' },
      { x: 185, y: 38, r: 4, label: 'Bellatrix', color: '#a78bfa' },
      { x: 105, y: 125, r: 3, label: 'Mintaka' },
      { x: 135, y: 133, r: 3, label: 'Alnilam' },
      { x: 163, y: 142, r: 3, label: 'Alnitak' },
      { x: 80, y: 220, r: 4, label: 'Saiph' },
      { x: 188, y: 228, r: 6, label: 'Rigel', color: '#93c5fd' },
    ],
    lines: [
      { x1: 85, y1: 45, x2: 185, y2: 38 }, { x1: 85, y1: 45, x2: 105, y2: 125 },
      { x1: 185, y1: 38, x2: 163, y2: 142 }, { x1: 105, y1: 125, x2: 135, y2: 133 },
      { x1: 135, y1: 133, x2: 163, y2: 142 }, { x1: 105, y1: 125, x2: 80, y2: 220 },
      { x1: 163, y1: 142, x2: 188, y2: 228 },
    ],
  },
  {
    id: 'ursamajor', name: 'Ursa Major', accentColor: '#a78bfa',
    mythology: "Callisto, a nymph beloved by Zeus, was transformed into a bear by the jealous Hera. Zeus placed her in the sky as the Great Bear to protect her. The Big Dipper — its most famous asterism — has guided navigators for millennia.",
    bestMonth: 'April', brightestStar: 'Alioth', magnitude: '1.77',
    facts: ['Contains the famous Big Dipper asterism used for navigation.', 'Two stars (Merak and Dubhe) point directly to Polaris, the North Star.', 'Third-largest constellation in the entire sky.'],
    stars: [
      { x: 52, y: 180, r: 4, label: 'Alkaid' }, { x: 92, y: 150, r: 4, label: 'Mizar' },
      { x: 132, y: 130, r: 5, label: 'Alioth', color: '#c4b5fd' }, { x: 165, y: 118, r: 4, label: 'Megrez' },
      { x: 165, y: 80, r: 4, label: 'Phad' }, { x: 215, y: 70, r: 4, label: 'Merak' },
      { x: 210, y: 112, r: 4, label: 'Dubhe' },
    ],
    lines: [
      { x1: 52, y1: 180, x2: 92, y2: 150 }, { x1: 92, y1: 150, x2: 132, y2: 130 },
      { x1: 132, y1: 130, x2: 165, y2: 118 }, { x1: 165, y1: 118, x2: 165, y2: 80 },
      { x1: 165, y1: 80, x2: 215, y2: 70 }, { x1: 215, y1: 70, x2: 210, y2: 112 },
      { x1: 210, y1: 112, x2: 165, y2: 118 },
    ],
  },
  {
    id: 'cassiopeia', name: 'Cassiopeia', accentColor: '#f472b6',
    mythology: "Queen Cassiopeia of Ethiopia was so vain she boasted her beauty rivaled the sea nymphs. Poseidon punished her by placing her on a throne in the sky, spinning endlessly around the North Pole — sometimes right-side up, sometimes upside down.",
    bestMonth: 'November', brightestStar: 'Schedar', magnitude: '2.24',
    facts: ['Forms a distinctive W or M shape depending on orientation.', 'Circumpolar — visible year-round from northern latitudes without setting.', 'A supernova remnant in Cassiopeia (Cas A) is one of the strongest radio sources in the sky.'],
    stars: [
      { x: 42, y: 162, r: 4, label: 'Caph' }, { x: 92, y: 102, r: 5, label: 'Schedar', color: '#fbbf24' },
      { x: 152, y: 140, r: 4, label: 'Gamma Cas' }, { x: 210, y: 100, r: 4, label: 'Ruchbah' },
      { x: 258, y: 148, r: 4, label: 'Segin' },
    ],
    lines: [
      { x1: 42, y1: 162, x2: 92, y2: 102 }, { x1: 92, y1: 102, x2: 152, y2: 140 },
      { x1: 152, y1: 140, x2: 210, y2: 100 }, { x1: 210, y1: 100, x2: 258, y2: 148 },
    ],
  },
  {
    id: 'leo', name: 'Leo', accentColor: '#fbbf24',
    mythology: 'Leo represents the Nemean Lion slain by Hercules as the first of his twelve labors. The lion was invulnerable to mortal weapons, so Hercules strangled it bare-handed. Zeus honored it by placing it among the stars.',
    bestMonth: 'April', brightestStar: 'Regulus', magnitude: '1.36',
    facts: ['The Sun passes through Leo between August and September.', 'Contains the radiant point of the annual Leonid meteor shower.', 'Regulus is actually a four-star system located about 79 light-years away.'],
    stars: [
      { x: 228, y: 72, r: 3, label: 'Denebola' }, { x: 175, y: 100, r: 3, label: 'Zosma' },
      { x: 148, y: 140, r: 4, label: 'Chertan' }, { x: 100, y: 100, r: 3, label: 'Algieba' },
      { x: 82, y: 72, r: 3, label: 'Adhafera' }, { x: 60, y: 100, r: 3, label: 'Eta Leo' },
      { x: 55, y: 162, r: 6, label: 'Regulus', color: '#93c5fd' }, { x: 104, y: 180, r: 3, label: 'Eta2' },
    ],
    lines: [
      { x1: 228, y1: 72, x2: 175, y2: 100 }, { x1: 175, y1: 100, x2: 148, y2: 140 },
      { x1: 148, y1: 140, x2: 100, y2: 100 }, { x1: 100, y1: 100, x2: 82, y2: 72 },
      { x1: 82, y1: 72, x2: 60, y2: 100 }, { x1: 60, y1: 100, x2: 55, y2: 162 },
      { x1: 55, y1: 162, x2: 104, y2: 180 }, { x1: 148, y1: 140, x2: 104, y2: 180 },
    ],
  },
  {
    id: 'scorpius', name: 'Scorpius', accentColor: '#f87171',
    mythology: 'Scorpius is the scorpion sent by Gaia to kill Orion after he boasted he would hunt all the animals on Earth. Zeus placed both in opposite ends of the sky, so when Scorpius rises, Orion flees below the horizon.',
    bestMonth: 'July', brightestStar: 'Antares', magnitude: '0.96',
    facts: ['Antares is a red supergiant roughly 700 times the diameter of the Sun.', 'Contains several open clusters and the bright globular cluster M4.', 'Located in the direction of the galactic center, rich with stars.'],
    stars: [
      { x: 132, y: 32, r: 3, label: 'Graffias' }, { x: 152, y: 62, r: 3, label: 'Dschubba' },
      { x: 132, y: 92, r: 3, label: 'Pi Sco' }, { x: 102, y: 112, r: 7, label: 'Antares', color: '#ef4444' },
      { x: 90, y: 148, r: 3, label: 'Tau Sco' }, { x: 80, y: 178, r: 3, label: 'Epsilon Sco' },
      { x: 90, y: 208, r: 3, label: 'Mu Sco' }, { x: 122, y: 228, r: 3, label: 'Zeta Sco' },
      { x: 155, y: 238, r: 3, label: 'Eta Sco' }, { x: 185, y: 222, r: 5, label: 'Shaula', color: '#fca5a5' },
      { x: 196, y: 202, r: 3, label: 'Lesath' },
    ],
    lines: [
      { x1: 132, y1: 32, x2: 152, y2: 62 }, { x1: 152, y1: 62, x2: 132, y2: 92 },
      { x1: 132, y1: 92, x2: 102, y2: 112 }, { x1: 102, y1: 112, x2: 90, y2: 148 },
      { x1: 90, y1: 148, x2: 80, y2: 178 }, { x1: 80, y1: 178, x2: 90, y2: 208 },
      { x1: 90, y1: 208, x2: 122, y2: 228 }, { x1: 122, y1: 228, x2: 155, y2: 238 },
      { x1: 155, y1: 238, x2: 185, y2: 222 }, { x1: 185, y1: 222, x2: 196, y2: 202 },
    ],
  },
];

function ConstellationSVG({ c, large = false }: { c: Constellation; large?: boolean }) {
  return (
    <svg viewBox="0 0 280 270" className={`w-full ${large ? 'h-64' : 'h-44'}`}>
      {Array.from({ length: large ? 50 : 30 }, (_, k) => (
        <circle key={k} cx={(k * 73 + 17) % 280} cy={(k * 53 + 23) % 270}
          r={0.6} fill="rgba(255,255,255,0.2)" />
      ))}
      {c.lines.map((l, i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke={c.accentColor} strokeWidth={large ? 1.5 : 1} strokeOpacity={large ? 0.7 : 0.5} />
      ))}
      {c.stars.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={s.r + 4} fill={s.color ?? c.accentColor} opacity="0.15" />
          <circle cx={s.x} cy={s.y} r={s.r} fill={s.color ?? '#ffffff'} opacity="0.95"
            style={{ filter: `drop-shadow(0 0 ${s.r + 2}px ${s.color ?? c.accentColor})` }} />
          {large && s.label && (
            <text x={s.x + s.r + 4} y={s.y + 4} fontSize="7" fill="rgba(255,255,255,0.55)"
              fontFamily="Orbitron, monospace">{s.label}</text>
          )}
        </g>
      ))}
    </svg>
  );
}

export default function Constellations() {
  const [selected, setSelected] = useState<Constellation | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className="min-h-[calc(100vh-4rem)] py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-glow mb-4 tracking-wider">CONSTELLATIONS</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Ancient star maps written in light. Myths and legends preserved across millennia in the night sky.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {CONSTELLATIONS.map((c, i) => (
            <motion.div key={c.id}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel rounded-2xl p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300 cursor-pointer group hover:-translate-y-1"
              onClick={() => setSelected(c)} data-testid={`constellation-${c.id}`}>
              <div className="mb-4 rounded-xl overflow-hidden bg-black/40 border border-white/5">
                <ConstellationSVG c={c} />
              </div>
              <div className="flex items-start justify-between mb-2">
                <h2 className="font-heading text-xl font-bold tracking-wider" style={{ color: c.accentColor }}>{c.name}</h2>
                <Star className="w-4 h-4 opacity-40 group-hover:opacity-80 transition-opacity mt-1" style={{ color: c.accentColor }} />
              </div>
              <p className="text-foreground/60 text-sm mb-4 line-clamp-2">{c.mythology.substring(0, 110)}…</p>
              <div className="flex gap-4 text-xs font-mono text-foreground/50">
                <span>Best: <span className="text-foreground/80">{c.bestMonth}</span></span>
                <span>Brightest: <span className="text-foreground/80">{c.brightestStar}</span></span>
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
              data-testid="constellation-panel">
              <div className="p-8 pt-16">
                <button onClick={() => setSelected(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  data-testid="close-panel"><X className="w-5 h-5" /></button>
                <div className="mb-6 rounded-2xl overflow-hidden bg-black/50 border border-white/10">
                  <ConstellationSVG c={selected} large />
                </div>
                <h2 className="font-heading text-3xl font-bold mb-4 tracking-wider" style={{ color: selected.accentColor }}>{selected.name}</h2>
                <p className="text-foreground/80 leading-relaxed mb-6">{selected.mythology}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[['Best Month', selected.bestMonth], ['Brightest Star', selected.brightestStar], ['Magnitude', selected.magnitude], ['Named Stars', String(selected.stars.length)]].map(([label, val]) => (
                    <div key={label} className="glass-panel p-3 rounded-xl">
                      <span className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-1">{label}</span>
                      <span className="font-mono text-sm font-bold">{val}</span>
                    </div>
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
