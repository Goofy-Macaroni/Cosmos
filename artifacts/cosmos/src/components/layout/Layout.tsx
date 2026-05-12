import React from 'react';
import Navbar from './Navbar';
import Starfield from '../effects/Starfield';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative selection:bg-primary/30 selection:text-white">
      <Starfield />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-[-1]" />
      <Navbar />
      <main className="flex-1 pt-16 relative">
        {children}
      </main>
    </div>
  );
}
