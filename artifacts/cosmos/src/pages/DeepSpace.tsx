import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';

function useMouseParallax() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      setOffset({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return offset;
}

function StarField({ count = 200, speed = 1 }: { count?: number; speed?: number }) {
  const stars = useRef(
    Array.from({ length: count }, (_, i) => ({
      x: Math.random() * 100, y: Math.random() * 100,
      r: Math.random() * 1.8 + 0.3,
      opacity: Math.random() * 0.7 + 0.2,
      delay: Math.random() * 5,
      duration: (Math.random() * 3 + 2) / speed,
    }))
  );
  return (
    <div className="absolute inset-0">
      {stars.current.map((s, i) => (
        <div key={i} className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.r * 2, height: s.r * 2,
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          }} />
      ))}
    </div>
  );
}

function NebulaClouds({ colors }: { colors: string[] }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {colors.map((c, i) => (
        <div key={i} className="absolute rounded-full"
          style={{
            background: `radial-gradient(circle, ${c}22 0%, transparent 70%)`,
            width: `${60 + i * 30}%`, height: `${60 + i * 20}%`,
            left: `${-10 + i * 25}%`, top: `${-20 + i * 15}%`,
            filter: 'blur(40px)',
            animation: `float ${8 + i * 4}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
          }} />
      ))}
    </div>
  );
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 2500, 1);
      setVal(Math.round(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return <>{val.toLocaleString()}{suffix}</>;
}

function Section1({ parallax }: { parallax: { x: number; y: number } }) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#020408]">
        <StarField count={300} />
        <NebulaClouds colors={['#3b82f6', '#8b5cf6', '#06b6d4']} />
      </div>
      {/* Parallax layer */}
      <div className="absolute inset-0" style={{
        transform: `translate(${parallax.x * -20}px, ${parallax.y * -20}px)`,
        transition: 'transform 0.1s ease-out',
      }}>
        <NebulaClouds colors={['#7c3aed', '#0ea5e9']} />
      </div>
      <div className="relative z-10 text-center px-4" style={{
        transform: `translate(${parallax.x * -8}px, ${parallax.y * -8}px)`,
        transition: 'transform 0.1s ease-out',
      }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1.2 }}>
          <p className="text-xs font-mono tracking-[0.4em] text-primary/60 mb-6">SECTION I</p>
          <h2 className="font-heading text-5xl md:text-8xl font-bold text-white mb-6 tracking-widest"
            style={{ textShadow: '0 0 80px rgba(96,165,250,0.3)' }}>
            THE UNIVERSE<br />IS VAST
          </h2>
          <p className="text-foreground/50 text-lg max-w-lg mx-auto leading-relaxed">
            Light takes 93 billion years to cross the observable universe.<br />
            We have explored a fraction of a fraction.
          </p>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/30 text-xs font-mono tracking-widest animate-bounce">
        SCROLL
      </div>
    </section>
  );
}

function Section2() {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTriggered(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden bg-[#05020d]">
      <div className="absolute inset-0">
        <StarField count={150} />
        {/* Animated galaxy */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[120, 100, 80, 60, 40].map((size, i) => (
            <div key={i} className="absolute rounded-full border"
              style={{
                width: size * 3, height: size,
                borderColor: `rgba(167,139,250,${0.08 + i * 0.03})`,
                boxShadow: `0 0 20px rgba(167,139,250,${0.05 + i * 0.02})`,
                transform: `rotate(${i * 36}deg)`,
                animation: `orbit ${12 + i * 4}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
              }} />
          ))}
          <div className="absolute w-8 h-8 rounded-full bg-white"
            style={{ boxShadow: '0 0 40px 10px rgba(255,255,255,0.3)' }} />
        </div>
      </div>
      <div className="relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 1 }}>
          <p className="text-xs font-mono tracking-[0.4em] text-purple-400/60 mb-6">SECTION II</p>
          <h2 className="font-heading text-5xl md:text-8xl font-bold text-white mb-4 tracking-widest"
            style={{ textShadow: '0 0 60px rgba(167,139,250,0.4)' }}>
            {triggered
              ? <CountUp target={200000000000} suffix=" STARS" />
              : 'BILLIONS OF STARS'}
          </h2>
          <p className="text-foreground/50 text-lg max-w-lg mx-auto">
            In the Milky Way alone. Across 2 trillion galaxies,<br />the number of stars exceeds every grain of sand on Earth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Section3() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <StarField count={80} speed={0.3} />
      </div>
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 2 }}>
          <p className="text-xs font-mono tracking-[0.4em] text-foreground/30 mb-12">SECTION III</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-white/80 mb-8 tracking-widest italic leading-relaxed">
            "IN SPACE,<br />NO ONE CAN HEAR<br />THE UNIVERSE BREATHE"
          </h2>
          <p className="text-foreground/30 text-sm tracking-widest font-mono">
            Space is not merely empty — it hums with radiation, fields, and particles.<br />
            Yet in the void between galaxies, the silence is absolute.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Section4() {
  const sizes = [
    { label: 'Earth', size: 12, color: '#3b82f6', note: '12,742 km' },
    { label: 'Sun', size: 48, color: '#fbbf24', note: '1.39M km' },
    { label: 'Betelgeuse', size: 96, color: '#f97316', note: '~1.2B km' },
    { label: 'UY Scuti', size: 140, color: '#ef4444', note: '~2.4B km' },
  ];
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 bg-[#030408]">
      <StarField count={100} />
      <div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-xs font-mono tracking-[0.4em] text-foreground/40 mb-6">SECTION IV</p>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4 tracking-widest">INFINITE SCALE</h2>
          <p className="text-foreground/50 mb-16">Perspective changes everything. Objects to scale.</p>
          <div className="flex items-end justify-center gap-6 md:gap-12 flex-wrap">
            {sizes.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center gap-3">
                <div className="rounded-full"
                  style={{
                    width: s.size, height: s.size,
                    background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.3), ${s.color}88 40%, ${s.color} 100%)`,
                    boxShadow: `0 0 ${s.size / 2}px ${s.color}55`,
                  }} />
                <span className="font-heading text-xs font-bold tracking-widest" style={{ color: s.color }}>{s.label}</span>
                <span className="font-mono text-[10px] text-foreground/40">{s.note}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-foreground/30 text-sm mt-16 font-mono">Not to actual scale — UY Scuti is 1,700x the Sun's radius</p>
        </motion.div>
      </div>
    </section>
  );
}

function Section5() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 bg-[#0a0500]">
      <div className="absolute inset-0">
        <StarField count={200} />
        <NebulaClouds colors={['#d97706', '#b45309', '#92400e']} />
        {/* Particle burst */}
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full"
            style={{
              background: '#fbbf24',
              left: `${40 + Math.cos(i * 18 * Math.PI / 180) * 20}%`,
              top: `${50 + Math.sin(i * 18 * Math.PI / 180) * 20}%`,
              animation: `float ${3 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              opacity: 0.6 + (i % 3) * 0.15,
            }} />
        ))}
      </div>
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 1.2 }}>
          <p className="text-xs font-mono tracking-[0.4em] text-amber-500/60 mb-8">SECTION V</p>
          <h2 className="font-heading text-4xl md:text-7xl font-bold mb-6 tracking-widest"
            style={{ color: '#fbbf24', textShadow: '0 0 60px rgba(251,191,36,0.4)' }}>
            YOU ARE MADE<br />OF STAR STUFF
          </h2>
          <p className="text-foreground/70 text-lg leading-relaxed mb-4">
            Every atom in your body — every carbon, oxygen, and iron — was forged inside a star that
            lived and died billions of years before you were born.
          </p>
          <p className="text-amber-400/60 text-sm font-mono italic mb-12">— Carl Sagan, Cosmos (1980)</p>
          <Link href="/solar-system">
            <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-amber-400/40 text-amber-400 hover:bg-amber-400/10 transition-all font-heading text-sm tracking-widest group"
              data-testid="explore-solar-system-btn">
              EXPLORE THE SOLAR SYSTEM
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function DeepSpace() {
  const parallax = useMouseParallax();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
      className="min-h-screen" style={{ marginTop: '-4rem' }}>
      <Section1 parallax={parallax} />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </motion.div>
  );
}
