import React from "react";
import { CropForm } from "./components/CropForm";
import { ResultDisplay } from "./components/ResultDisplay";
import { VivaPrep } from "./components/VivaPrep";
import { getCropRecommendation } from "./services/gemini";
import { SoilData, RecommendationResult } from "./types";
import { getHistory, saveToHistory, HistoryItem } from "./services/history";
import { motion, AnimatePresence } from "motion/react";
import { Sprout, Info, AlertCircle, Map, CloudSun, Github, Zap, ShieldCheck, History } from "lucide-react";

import { ModelPerformance } from "./components/ModelPerformance";
import { Navbar } from "./components/Navbar";
import { HistoryList } from "./components/HistoryList";

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<RecommendationResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [history, setHistory] = React.useState<HistoryItem[]>([]);

  React.useEffect(() => {
    const fetchHistory = async () => {
      const data = await getHistory();
      setHistory(data);
    };
    fetchHistory();
  }, []);

  const handleRecommend = async (data: SoilData) => {
    setIsLoading(true);
    setError(null);
    try {
      const recommendation = await getCropRecommendation(data);
      setResult(recommendation);
      await saveToHistory(data, recommendation);
      const updatedHistory = await getHistory();
      setHistory(updatedHistory);
    } catch (err: any) {
      const errMsg = err.message || "";
      
      if (errMsg.includes("API_KEY_MISSING") || errMsg.includes("Requested entity was not found") || errMsg.includes("INVALID_KEY")) {
        setError("AI Configuration Required: Please ensure your Gemini API key is correctly configured in the Secrets panel.");
      } else if (errMsg.includes("RATE_LIMIT")) {
        setError("System Overloaded: We've hit the Gemini API rate limit. Please wait a moment and try your request again.");
      } else if (errMsg.includes("LOCATION_NOT_SUPPORTED")) {
        setError("Region Not Supported: The Gemini API service is not available in your current geographic region.");
      } else if (errMsg.includes("SERVER_ERROR")) {
        setError("Service Unavailable: Google's AI service is having temporary issues. Please try again in a few minutes.");
      } else if (errMsg.includes("PARSE_ERROR")) {
        setError("Analysis Failed: The AI provided a recommendation in an unexpected format. Please try one more time.");
      } else if (errMsg.includes("AI_ERROR")) {
        // Strip the prefix and show the raw message
        setError(errMsg.replace("AI_ERROR: ", ""));
      } else {
        setError("Recommendation Failed: An unexpected error occurred. Please check your connection and try again.");
      }
      console.error("Recommendation Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setResult(item.result);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-brand-100 selection:text-brand-900">
      <Navbar />

      <main className="relative">
        {/* Hero Section */}
        <section id="dashboard" className="relative pt-48 pb-32 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(77,136,95,0.08)_0%,transparent_70%)]" />
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532&auto=format&fit=crop" 
              alt="Lush green farm" 
              className="w-full h-full object-cover opacity-[0.03] grayscale"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10 text-left">
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-stone-200 rounded-2xl shadow-sm"
                  >
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-stone-200 overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Trusted by 10k+ Farmers</span>
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-8xl font-black text-stone-900 leading-[0.9] tracking-tighter"
                  >
                    Cultivate <br />
                    <span className="text-brand-600 italic font-serif font-normal">Success</span> <br />
                    with AI.
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-stone-500 max-w-lg leading-relaxed font-medium"
                  >
                    Advanced machine learning models trained on 20+ years of Indian agricultural data to maximize your yield.
                  </motion.p>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-12"
                >
                  <HeroStat label="Accuracy" value="98.4%" />
                  <HeroStat label="Crops" value="22+" />
                  <HeroStat label="States" value="28" />
                </motion.div>
              </div>

              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="relative z-10"
                >
                  <div className="absolute -inset-4 bg-brand-600/5 blur-3xl rounded-full" />
                  <CropForm onSubmit={handleRecommend} isLoading={isLoading} />
                </motion.div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent-100 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-100 rounded-full blur-3xl opacity-50" />
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-8 p-6 bg-red-50 border border-red-100 rounded-[2rem] flex items-center gap-4 text-red-800"
              >
                <AlertCircle className="w-6 h-6 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-bold">{error}</p>
                </div>
              </motion.div>
            )}

            {result ? (
              <div className="space-y-16">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-stone-200" />
                  <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.4em]">Analysis Result</h3>
                  <div className="h-px flex-1 bg-stone-200" />
                </div>
                <ResultDisplay result={result} />
                
                {/* History List */}
                <div id="history">
                  <HistoryList items={history} onSelect={handleSelectHistory} />
                </div>
              </div>
            ) : (
              <div className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FeatureCard 
                    icon={<Zap className="w-6 h-6" />} 
                    title="Instant Analysis" 
                    desc="Get results in seconds using our optimized inference engine."
                  />
                  <FeatureCard 
                    icon={<ShieldCheck className="w-6 h-6" />} 
                    title="Data Privacy" 
                    desc="Your soil data is encrypted and used only for recommendation."
                  />
                  <FeatureCard 
                    icon={<Map className="w-6 h-6" />} 
                    title="Regional Context" 
                    desc="Tailored for specific Indian soil variability and climate zones."
                  />
                </div>
                
                {/* History List */}
                <div id="history">
                  <HistoryList items={history} onSelect={handleSelectHistory} />
                </div>
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* Technical Analysis - Open Layout */}
        <section className="bg-white border-y border-stone-200 py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
            <div id="performance">
              <ModelPerformance />
            </div>
            <div id="research">
              <VivaPrep />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-stone-950 text-stone-500 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
              <div className="md:col-span-5 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-900/20">
                    <Sprout className="w-7 h-7" />
                  </div>
                  <h1 className="text-3xl font-black text-white tracking-tighter">Crop Recommendation System</h1>
                </div>
                <p className="text-lg leading-relaxed max-w-md font-medium text-stone-400">
                  Revolutionizing Indian agriculture through data-driven precision. Join the movement towards sustainable farming.
                </p>
                <div className="flex gap-4">
                  <SocialLink icon={<Github className="w-5 h-5" />} />
                  <SocialLink icon={<CloudSun className="w-5 h-5" />} />
                </div>
              </div>
              
              <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
                <FooterGroup title="Platform" links={[
                  { label: "Dashboard", href: "#dashboard" },
                  { label: "ML Models", href: "#performance" },
                  { label: "Research", href: "#research" }
                ]} />
                <FooterGroup title="Resources" links={[
                  { label: "Documentation", href: "#research" },
                  { label: "Soil Health", href: "#dashboard" },
                  { label: "ML Pipeline", href: "#performance" }
                ]} />
                <FooterGroup title="Company" links={[
                  { label: "About Us", href: "#" },
                  { label: "Contact", href: "#" },
                  { label: "Privacy", href: "#" }
                ]} />
              </div>
            </div>
            
            <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-widest">
              <p>© 2026 Crop Recommendation System. All rights reserved.</p>
              <div className="flex items-center gap-10">
                <a href="#" className="hover:text-white transition-colors">Security</a>
                <a href="#" className="hover:text-white transition-colors">Status</a>
                <a href="#" className="hover:text-white transition-colors">Compliance</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

const HeroStat = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <div className="text-3xl font-black text-stone-900 tracking-tighter">{value}</div>
    <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{label}</div>
  </div>
);

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="p-10 bg-white border border-stone-200 rounded-[2.5rem] space-y-6 hover:shadow-2xl hover:shadow-stone-200/50 transition-all duration-500 group">
    <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 group-hover:bg-brand-600 group-hover:text-white transition-all duration-500 shadow-inner">
      {icon}
    </div>
    <div className="space-y-2">
      <h4 className="text-xl font-bold text-stone-900 tracking-tight">{title}</h4>
      <p className="text-sm text-stone-500 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

const FooterGroup = ({ title, links }: { title: string; links: { label: string; href: string }[] }) => (
  <div className="space-y-6">
    <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">{title}</h4>
    <ul className="space-y-3">
      {links.map(link => (
        <li key={link.label}>
          <a href={link.href} className="text-sm font-medium hover:text-brand-400 transition-colors">{link.label}</a>
        </li>
      ))}
    </ul>
  </div>
);

const SocialLink = ({ icon }: { icon: React.ReactNode }) => (
  <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 hover:bg-brand-600 hover:text-white transition-all">
    {icon}
  </button>
);


