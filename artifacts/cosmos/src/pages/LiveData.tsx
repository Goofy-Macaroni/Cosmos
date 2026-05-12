import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Satellite, Globe, Zap, RefreshCw } from 'lucide-react';
import { facts as spaceFacts } from '@/lib/data';

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function useCountUp(target: number, duration = 2000) {
  const [val, setVal] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.round(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return val;
}

function CountCard({ label, target, suffix = '', color }: { label: string; target: number; suffix?: string; color: string }) {
  const val = useCountUp(target, 2500);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-2xl p-6 border border-primary/20 text-center">
      <div className="font-heading text-3xl md:text-4xl font-bold mb-2" style={{ color, textShadow: `0 0 20px ${color}66` }}>
        {val.toLocaleString()}{suffix}
      </div>
      <p className="text-foreground/60 text-sm tracking-wide">{label}</p>
    </motion.div>
  );
}

function ISSOrbit() {
  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40 mx-auto">
      <circle cx="100" cy="100" r="40" fill="#1d4ed8" opacity="0.6"
        style={{ filter: 'drop-shadow(0 0 8px #3b82f6)' }} />
      <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"
        strokeDasharray="3 3" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="rgba(96,165,250,0.25)" strokeWidth="1" />
      <g style={{ transformOrigin: '100px 100px', animation: 'orbit 4s linear infinite' }}>
        <circle cx="170" cy="100" r="5" fill="#fbbf24"
          style={{ filter: 'drop-shadow(0 0 6px #fbbf24)' }} />
      </g>
      <text x="100" y="104" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.7)"
        fontFamily="Orbitron, monospace">EARTH</text>
    </svg>
  );
}

function EarthRotation() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-24 h-24 rounded-full"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.2), transparent 60%), linear-gradient(135deg, #1d4ed8, #0284c7, #065f46)',
          boxShadow: '0 0 30px rgba(96,165,250,0.3)',
          animation: 'spin-slow 10s linear infinite',
        }}>
        <div className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 50%)' }} />
      </div>
    </div>
  );
}

export default function LiveData() {
  const now = useClock();
  const [factIndex, setFactIndex] = useState(0);
  const [factVisible, setFactVisible] = useState(true);

  const telemetry = {
    solarWind: 421 + Math.round(Math.sin(now.getTime() / 8000) * 15),
    protonDensity: +(4.2 + Math.sin(now.getTime() / 5000) * 0.4).toFixed(1),
    kpIndex: 2,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFactVisible(false);
      setTimeout(() => {
        setFactIndex(i => (i + 1) % spaceFacts.length);
        setFactVisible(true);
      }, 500);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const utcDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
  const utcTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'UTC' });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
      className="min-h-[calc(100vh-4rem)] py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-glow mb-4 tracking-wider">LIVE SPACE DATA</h1>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
            Real-time mission control dashboard. Data streams from across the solar system.
          </p>
        </div>

        {/* UTC Clock */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="glass-panel rounded-2xl p-8 border border-primary/20 text-center mb-8">
          <div className="text-xs uppercase tracking-widest text-foreground/50 mb-2">Mission Time — Coordinated Universal Time</div>
          <div className="font-heading text-5xl md:text-7xl font-bold text-primary mb-2 tracking-widest tabular-nums"
            style={{ textShadow: '0 0 40px rgba(96,165,250,0.4)' }}>
            {utcTime}
          </div>
          <div className="text-foreground/60 font-mono text-sm tracking-widest">{utcDate}</div>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <CountCard label="Satellites in Orbit" target={8377} color="#60a5fa" />
          <CountCard label="Active Astronauts in Space" target={7} color="#34d399" />
          <CountCard label="Countries with Space Programs" target={72} color="#a78bfa" />
          <CountCard label="Known Exoplanets" target={5600} suffix="+" color="#fbbf24" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* ISS Tracker */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-panel rounded-2xl p-6 border border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <Satellite className="w-5 h-5 text-primary" />
              <h2 className="font-heading text-lg font-bold tracking-wider">ISS TRACKER</h2>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />LIVE
              </span>
            </div>
            <ISSOrbit />
            <div className="grid grid-cols-2 gap-3 mt-6">
              {[['Altitude', '408 km'], ['Speed', '27,600 km/h'], ['Orbital Period', '92.68 min'], ['Crew', '7 persons']].map(([k, v]) => (
                <div key={k} className="glass-panel p-3 rounded-xl border border-white/5">
                  <span className="block text-[10px] uppercase tracking-widest text-foreground/50 mb-0.5">{k}</span>
                  <span className="font-mono text-sm font-bold text-primary">{v}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Earth Rotation + Solar Activity */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="glass-panel rounded-2xl p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-blue-400" />
                <h2 className="font-heading text-sm font-bold tracking-wider">EARTH ROTATION</h2>
              </div>
              <div className="flex items-center gap-6">
                <EarthRotation />
                <div>
                  <p className="text-foreground/70 text-sm leading-relaxed">Earth completes one full rotation every <span className="text-primary font-mono font-bold">23h 56m 4s</span> (sidereal day).</p>
                  <p className="text-foreground/50 text-xs mt-2">Surface speed at equator: <span className="font-mono">1,670 km/h</span></p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="glass-panel rounded-2xl p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h2 className="font-heading text-sm font-bold tracking-wider">SOLAR ACTIVITY</h2>
                <span className="ml-auto flex items-center gap-1.5 text-xs text-yellow-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />STREAMING
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Solar Wind Speed', value: `${telemetry.solarWind} km/s`, pct: (telemetry.solarWind / 800) * 100, color: '#fbbf24' },
                  { label: 'Proton Density', value: `${telemetry.protonDensity} /cm³`, pct: (telemetry.protonDensity / 20) * 100, color: '#f97316' },
                  { label: 'Geomagnetic Kp Index', value: `Kp ${telemetry.kpIndex} — Quiet`, pct: (telemetry.kpIndex / 9) * 100, color: '#34d399' },
                ].map(({ label, value, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground/50">{label}</span>
                      <span className="font-mono" style={{ color }}>{value}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Daily Space Fact */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="glass-panel rounded-2xl p-8 border border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-sm font-bold tracking-wider flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-primary" />ROTATING SPACE FACT
            </h2>
            <span className="text-xs text-foreground/40 font-mono">Refreshes every 30s</span>
          </div>
          <motion.p
            key={factIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: factVisible ? 1 : 0, y: factVisible ? 0 : -8 }}
            transition={{ duration: 0.4 }}
            className="text-foreground/80 text-lg leading-relaxed text-center italic">
            "{spaceFacts[factIndex] ?? 'The universe is vast beyond imagination.'}"
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
