import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Layout from "@/components/layout/Layout";
import LoadingScreen from "@/components/effects/LoadingScreen";
import Home from "@/pages/Home";
import SolarSystem from "@/pages/SolarSystem";
import BlackHoles from "@/pages/BlackHoles";
import Facts from "@/pages/Facts";
import Quiz from "@/pages/Quiz";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/solar-system" component={SolarSystem} />
        <Route path="/black-holes" component={BlackHoles} />
        <Route path="/facts" component={Facts} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  // Fallback to clear loading screen after 5 seconds just in case
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
          
          {/* Main App Content - visually hidden until loading is done for smooth transition */}
          <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 min-h-screen'}`}>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
          </div>
          
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
