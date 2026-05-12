import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Moon, Sun, Menu, X, Volume2, VolumeX, ChevronDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const CORE_NAV = [
  { href: '/',            label: 'Home' },
  { href: '/solar-system',label: 'Solar System' },
  { href: '/black-holes', label: 'Black Holes' },
  { href: '/facts',       label: 'Space Facts' },
  { href: '/quiz',        label: 'Quiz' },
];

const EXPLORE_NAV = [
  { href: '/galaxies',      label: 'Galaxies' },
  { href: '/nebulas',       label: 'Nebulas' },
  { href: '/missions',      label: 'Space Missions' },
  { href: '/constellations',label: 'Constellations' },
  { href: '/astronauts',    label: 'Astronauts' },
  { href: '/technology',    label: 'Space Tech' },
  { href: '/exoplanets',    label: 'Exoplanets' },
  { href: '/live',          label: 'Live Data' },
  { href: '/glossary',      label: 'Glossary' },
  { href: '/deep-space',    label: 'Deep Space' },
  { href: '/about',         label: 'About' },
];

export default function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [time, setTime] = useState(new Date());
  const exploreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close explore dropdown when clicking outside
  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
        setExploreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const isExploreActive = EXPLORE_NAV.some(l => l.href === location);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 group-hover:box-glow transition-all duration-500">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse-glow" />
            </div>
            <span className="font-heading font-bold text-xl tracking-wider text-glow">COSMOS</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {CORE_NAV.map(link => (
              <Link key={link.href} href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary hover:text-glow-accent whitespace-nowrap ${
                  location === link.href ? 'text-primary text-glow-accent' : 'text-foreground/80'
                }`}>
                {link.label}
              </Link>
            ))}

            {/* Explore dropdown */}
            <div ref={exploreRef} className="relative">
              <button
                onClick={() => setExploreOpen(v => !v)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary hover:text-glow-accent ${
                  isExploreActive ? 'text-primary text-glow-accent' : 'text-foreground/80'
                }`}
                data-testid="explore-menu-btn"
              >
                Explore
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} />
              </button>

              {exploreOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 glass border border-primary/20 rounded-xl shadow-xl overflow-hidden z-50">
                  <div className="py-1">
                    {EXPLORE_NAV.map(link => (
                      <Link key={link.href} href={link.href}
                        onClick={() => setExploreOpen(false)}
                        className={`block px-4 py-2.5 text-sm transition-colors hover:bg-primary/10 hover:text-primary ${
                          location === link.href ? 'bg-primary/15 text-primary' : 'text-foreground/80'
                        }`}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            <div className="text-sm font-mono text-primary/80 tracking-widest hidden lg:block">
              {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSoundEnabled(!soundEnabled)} className="text-foreground/80 hover:text-primary">
              {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="text-foreground/80 hover:text-primary">
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-panel border-t border-primary/20 max-h-[80vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {[...CORE_NAV, ...EXPLORE_NAV].map(link => (
              <Link key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location === link.href ? 'bg-primary/20 text-primary text-glow-accent' : 'text-foreground/80 hover:bg-white/5'
                }`}>
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between px-3 py-2 mt-4 border-t border-white/10">
              <span className="text-sm font-mono text-primary/80">
                {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => setSoundEnabled(!soundEnabled)}>
                  {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
