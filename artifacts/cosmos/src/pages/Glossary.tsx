import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

interface Term {
  term: string; short: string; full: string; category: string;
}

const TERMS: Term[] = [
  { term: 'Supernova', category: 'Star', short: 'Explosive death of a massive star.', full: 'A supernova is one of the most energetic explosions in the universe, occurring at the end of a massive star\'s life. It can briefly outshine an entire galaxy and release more energy than our Sun will emit over its entire lifetime. The remnant expands to form a nebula, and may leave behind a neutron star or black hole.' },
  { term: 'Pulsar', category: 'Star', short: 'Rapidly rotating neutron star emitting radio beams.', full: 'A pulsar is a highly magnetized rotating neutron star that emits beams of electromagnetic radiation from its magnetic poles. Because of the star\'s rotation, these beams sweep across the sky like a lighthouse, appearing as regular pulses when detected from Earth. The fastest pulsars spin hundreds of times per second.' },
  { term: 'Quasar', category: 'Galaxy', short: 'Luminous active galactic nucleus powered by a black hole.', full: 'Quasars are the most luminous objects in the observable universe — active galactic nuclei where a supermassive black hole is actively consuming matter. As material falls into the black hole, it heats up and emits intense radiation visible across billions of light-years. The name comes from "quasi-stellar radio source".' },
  { term: 'Event Horizon', category: 'Black Hole', short: 'Boundary of a black hole from which nothing can escape.', full: 'The event horizon is the boundary surrounding a black hole beyond which gravity is so strong that not even light can escape. Once any object crosses the event horizon, it is forever cut off from the rest of the universe. The radius of the event horizon is called the Schwarzschild radius, proportional to the black hole\'s mass.' },
  { term: 'Light Year', category: 'Cosmology', short: 'Distance light travels in one year — 9.461 trillion km.', full: 'A light-year is the distance that light travels in one Julian year in vacuum — approximately 9.461 trillion kilometers (5.879 trillion miles). It is used to express distances on cosmic scales. The nearest star to our Sun, Proxima Centauri, is about 4.24 light-years away.' },
  { term: 'Dark Matter', category: 'Cosmology', short: 'Invisible mass that exerts gravitational effects.', full: 'Dark matter is a hypothetical form of matter that does not interact with the electromagnetic force but would still have gravitational effects on visible matter. Its existence is inferred from gravitational effects such as galaxy rotation curves and gravitational lensing. It makes up roughly 27% of the total mass-energy content of the universe.' },
  { term: 'Dark Energy', category: 'Cosmology', short: 'Mysterious force accelerating the universe\'s expansion.', full: 'Dark energy is an unknown form of energy that permeates all of space and is the leading explanation for the observed accelerating expansion of the universe. First proposed after supernova observations in 1998 revealed the universe is expanding faster over time. It comprises approximately 68% of the total energy in the observable universe.' },
  { term: 'Neutron Star', category: 'Star', short: 'Dense stellar remnant composed of neutrons, ~10 km wide.', full: 'A neutron star is the collapsed core of a massive supergiant star that exploded as a supernova. They are the smallest and densest stellar objects known, with a radius of about 10 km but a mass of 1.4–2.1 solar masses. A teaspoon of neutron star material would weigh billions of tons on Earth.' },
  { term: 'Red Giant', category: 'Star', short: 'Late-stage star with expanded, cooled outer layers.', full: 'A red giant is a luminous giant star of low or intermediate mass in a late phase of stellar evolution. When a star like our Sun exhausts its hydrogen fuel, the core contracts while the outer layers expand dramatically — potentially swallowing inner planets. Our Sun will become a red giant in about 5 billion years.' },
  { term: 'White Dwarf', category: 'Star', short: 'Dense remnant of a low-mass star after shell loss.', full: 'A white dwarf is what remains after a low or medium-mass star (like our Sun) sheds its outer layers and the core contracts. It is extremely dense — roughly Earth-sized but with a mass comparable to the Sun. Without nuclear fusion, it slowly cools over billions of years. Most stars in the universe will end as white dwarfs.' },
  { term: 'Black Hole', category: 'Black Hole', short: 'Region where gravity is so strong nothing can escape.', full: 'A black hole is a region of spacetime where gravity is so strong that nothing — not even light or other electromagnetic waves — can escape. They form when massive stars collapse at the end of their lives, or through other high-density conditions. Supermassive black holes, millions to billions of times the Sun\'s mass, reside at the centers of most large galaxies.' },
  { term: 'Accretion Disk', category: 'Black Hole', short: 'Rotating disk of material spiraling into a massive object.', full: 'An accretion disk is a structure formed by diffuse material in orbital motion around a central body. As material spirals inward, gravitational potential energy converts to heat, causing the disk to glow intensely. Accretion disks around black holes and neutron stars are among the most luminous objects in the universe.' },
  { term: 'Nebula', category: 'Galaxy', short: 'Cloud of gas and dust in space — birthplace or remnant of stars.', full: 'A nebula is an interstellar cloud of dust, hydrogen, helium, and other ionized gases. Nebulae are regions where new stars form (emission nebulae) or the remnants of dead stars (supernova remnants, planetary nebulae). The word comes from the Latin for "mist" or "cloud".' },
  { term: 'Galaxy', category: 'Galaxy', short: 'System of stars, gas, dust, and dark matter bound by gravity.', full: 'A galaxy is a gravitationally bound system of stars, stellar remnants, interstellar gas, dust, and dark matter. There are estimated to be over 2 trillion galaxies in the observable universe, ranging from dwarfs with a few hundred million stars to giants with one hundred trillion stars.' },
  { term: 'Parsec', category: 'Cosmology', short: 'Unit of distance equal to ~3.26 light-years.', full: 'A parsec (pc) is a unit of length used to measure large distances in astronomical objects outside the Solar System. One parsec equals approximately 3.26 light-years or 30.86 trillion kilometers. It is defined as the distance at which 1 AU subtends an angle of one arcsecond. Kiloparsecs and megaparsecs are used for galactic and extragalactic distances.' },
  { term: 'Redshift', category: 'Cosmology', short: 'Increase in light wavelength from objects moving away from us.', full: 'Redshift occurs when the wavelength of electromagnetic radiation is lengthened, shifting toward the red end of the spectrum. In astronomy, cosmological redshift occurs because the universe is expanding — light from distant galaxies is stretched as it travels. The greater a galaxy\'s redshift, the faster it is receding and the farther away it is.' },
  { term: 'Solar Wind', category: 'Star', short: 'Stream of charged particles flowing from the Sun\'s corona.', full: 'The solar wind is a stream of charged particles (mostly electrons and protons) released from the upper atmosphere of the Sun at speeds between 300–800 km/s. It fills interplanetary space, influences planetary magnetospheres, and causes phenomena like auroras. The boundary where the solar wind weakens is called the heliopause.' },
  { term: 'Exoplanet', category: 'Planets', short: 'Planet orbiting a star other than our Sun.', full: 'An exoplanet (extrasolar planet) is a planet outside the Solar System. The first confirmed exoplanet discovery was in 1992. As of 2025, over 5,600 exoplanets have been confirmed, in more than 4,100 systems. They range from rocky Earth-sized worlds to super-Jupiters larger than any planet in our solar system.' },
  { term: 'Binary Star', category: 'Star', short: 'Two stars orbiting a common center of mass.', full: 'A binary star is a system of two stars gravitationally bound to and in orbit around their common center of mass. Binary stars are very common — about half of all star systems are binary or multi-star systems. Some binary systems transfer mass between stars, leading to nova explosions. Type Ia supernovae may result from white dwarf binaries.' },
  { term: 'Magnetar', category: 'Star', short: 'Neutron star with an extraordinarily powerful magnetic field.', full: 'A magnetar is a type of neutron star believed to have an extremely powerful magnetic field — about 1,000 times stronger than a typical neutron star and a quadrillion times stronger than Earth\'s. They produce bursts of X-ray and gamma radiation. Their magnetic fields decay over thousands of years, eventually transforming into ordinary pulsars.' },
];

const CATEGORIES = ['All', 'Star', 'Galaxy', 'Black Hole', 'Cosmology', 'Planets'];
const CATEGORY_COLORS: Record<string, string> = {
  Star: '#fbbf24', Galaxy: '#a78bfa', 'Black Hole': '#f87171',
  Cosmology: '#60a5fa', Planets: '#34d399',
};

export default function Glossary() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() =>
    TERMS.filter(t =>
      (category === 'All' || t.category === category) &&
      (t.term.toLowerCase().includes(query.toLowerCase()) || t.short.toLowerCase().includes(query.toLowerCase()))
    ), [query, category]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className="min-h-[calc(100vh-4rem)] py-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-glow mb-4 tracking-wider">SPACE GLOSSARY</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            The language of the cosmos. From accretion disks to white dwarfs — every term defined.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <input
            type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search terms..."
            className="w-full glass-panel rounded-2xl pl-11 pr-4 py-4 border border-primary/20 focus:border-primary/60 outline-none bg-transparent text-foreground placeholder:text-foreground/40 transition-colors"
            data-testid="glossary-search"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button key={cat}
              onClick={() => setCategory(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-mono border transition-all"
              style={category === cat
                ? { borderColor: CATEGORY_COLORS[cat] ?? '#60a5fa', color: CATEGORY_COLORS[cat] ?? '#60a5fa', background: `${CATEGORY_COLORS[cat] ?? '#60a5fa'}18` }
                : { borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
              data-testid={`filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}>
              {cat}
            </button>
          ))}
        </div>

        <p className="text-xs text-foreground/40 font-mono mb-6">{filtered.length} term{filtered.length !== 1 ? 's' : ''} found</p>

        {/* Terms */}
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.map((t, i) => (
              <motion.div key={t.term}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ delay: i * 0.03 }}
                className="glass-panel rounded-2xl border border-primary/20 hover:border-primary/40 transition-all overflow-hidden"
                data-testid={`term-${t.term.replace(/\s+/g, '-').toLowerCase()}`}>
                <button
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                  onClick={() => setExpanded(expanded === t.term ? null : t.term)}>
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border flex-shrink-0"
                      style={{ borderColor: `${CATEGORY_COLORS[t.category] ?? '#60a5fa'}50`, color: CATEGORY_COLORS[t.category] ?? '#60a5fa', background: `${CATEGORY_COLORS[t.category] ?? '#60a5fa'}12` }}>
                      {t.category}
                    </span>
                    <div className="min-w-0">
                      <span className="font-heading font-bold tracking-wider">{t.term}</span>
                      <p className="text-foreground/60 text-sm mt-0.5 truncate">{t.short}</p>
                    </div>
                  </div>
                  {expanded === t.term
                    ? <ChevronUp className="w-4 h-4 text-foreground/40 flex-shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-foreground/40 flex-shrink-0" />}
                </button>
                <AnimatePresence>
                  {expanded === t.term && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <div className="px-5 pb-5 border-t border-white/5 pt-4">
                        <p className="text-foreground/80 text-sm leading-relaxed">{t.full}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-foreground/40 font-mono text-sm">
              No terms match your search.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
