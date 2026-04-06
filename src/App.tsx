import React from "react";
import { CropForm } from "./components/CropForm";
import { ResultDisplay } from "./components/ResultDisplay";
import { VivaPrep } from "./components/VivaPrep";
import { getCropRecommendation } from "./services/gemini";
import { SoilData, RecommendationResult } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { Sprout, Info, AlertCircle, Map, CloudSun, Github } from "lucide-react";

import { IndiaInsights } from "./components/IndiaInsights";

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<RecommendationResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleRecommend = async (data: SoilData) => {
    setIsLoading(true);
    setError(null);
    try {
      const recommendation = await getCropRecommendation(data);
      setResult(recommendation);
    } catch (err) {
      setError("Failed to get recommendation. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-brand-100 selection:text-brand-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-200">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-stone-900 tracking-tight leading-none">KisanAI</h1>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-0.5">Agriculture Intelligence</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-8 text-sm font-semibold text-stone-600">
                <a href="#" className="hover:text-brand-600 transition-colors">Dashboard</a>
                <a href="#" className="hover:text-brand-600 transition-colors">Insights</a>
                <a href="#" className="hover:text-brand-600 transition-colors">About</a>
              </nav>
              <div className="h-4 w-px bg-stone-200" />
              <div className="flex items-center gap-4">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-900 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <button className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-lg hover:bg-stone-800 transition-colors">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532&auto=format&fit=crop" 
              alt="Lush green farm" 
              className="w-full h-full object-cover opacity-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-50/0 via-stone-50/50 to-stone-50" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-100/50 backdrop-blur-sm border border-brand-200 text-brand-700 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]"
              >
                <Map className="w-3 h-3" /> India-Focused ML Model
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold text-stone-900 leading-[1.1] tracking-tight text-balance"
              >
                Empowering Farmers with <span className="text-brand-600 italic font-serif font-normal">Precision</span> Agriculture
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed"
              >
                Harnessing the power of Machine Learning to provide scientifically-backed crop recommendations tailored for Indian soil variability.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Input Form */}
            <div className="lg:col-span-5 space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-stone-900 flex items-center gap-2 text-lg">
                  <Info className="w-5 h-5 text-brand-600" /> Soil Parameters
                </h3>
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
                  Live Analysis
                </div>
              </div>
              <CropForm onSubmit={handleRecommend} isLoading={isLoading} />
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-700 text-sm shadow-sm"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="font-medium">{error}</div>
                </motion.div>
              )}

              <div className="bg-stone-100/50 p-6 rounded-2xl border border-stone-200/50 space-y-4">
                <h4 className="text-xs font-bold text-stone-500 uppercase tracking-widest">Quick Tip</h4>
                <p className="text-sm text-stone-600 leading-relaxed italic font-serif">
                  "Soil pH is critical for nutrient availability. Most crops thrive in a pH range of 6.0 to 7.5."
                </p>
              </div>
            </div>

            {/* Right: Results & Insights */}
            <div className="lg:col-span-7 space-y-12">
              <AnimatePresence mode="wait">
                {result ? (
                  <ResultDisplay key="result" result={result} />
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full min-h-[500px] bg-white border border-stone-200 rounded-[2rem] flex flex-col items-center justify-center p-12 text-center space-y-6 shadow-sm relative overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                      <img src="https://www.transparenttextures.com/patterns/cubes.png" alt="" className="w-full h-full" />
                    </div>
                    <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center text-brand-600 shadow-inner">
                      <Sprout className="w-10 h-10" />
                    </div>
                    <div className="space-y-2 max-w-xs">
                      <h4 className="text-xl font-bold text-stone-900">Ready for Analysis</h4>
                      <p className="text-sm text-stone-500 leading-relaxed">
                        Fill out the soil parameters to generate a scientifically-backed crop recommendation.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-2 h-2 bg-stone-200 rounded-full" />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* India Insights Section */}
          <div className="mt-24">
            <IndiaInsights />
          </div>

          {/* Technical Section */}
          <div className="mt-24">
            <VivaPrep />
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-stone-900 text-stone-400 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white">
                    <Sprout className="w-6 h-6" />
                  </div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">KisanAI</h1>
                </div>
                <p className="text-sm leading-relaxed max-w-sm">
                  Bridging the gap between traditional farming and modern data science to ensure food security and farmer prosperity across India.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-brand-400 transition-colors">Soil Health Card</a></li>
                  <li><a href="#" className="hover:text-brand-400 transition-colors">Weather Forecast</a></li>
                  <li><a href="#" className="hover:text-brand-400 transition-colors">Market Prices</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-white font-bold text-sm uppercase tracking-widest">Project</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-brand-400 transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-brand-400 transition-colors">ML Pipeline</a></li>
                  <li><a href="#" className="hover:text-brand-400 transition-colors">GitHub</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6 text-xs">
              <p>© 2026 KisanAI Project. Built with passion for Indian Agriculture.</p>
              <div className="flex items-center gap-8">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

