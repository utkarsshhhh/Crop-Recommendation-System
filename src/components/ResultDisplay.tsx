import React from "react";
import { RecommendationResult } from "../types";
import { motion } from "motion/react";
import { CheckCircle2, MapPin, Calendar, Info, TrendingUp, Download, Bug, Sprout, Layers } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ResultDisplayProps {
  result: RecommendationResult | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) return null;

  const handleDownloadReport = () => {
    if (!result) return;

    const reportContent = `
KISAN AI - CROP RECOMMENDATION REPORT
======================================
Generated on: ${new Date().toLocaleString()}

CROP DETAILS
------------
Recommended Crop: ${result.crop.toUpperCase()}
Match Confidence: ${result.confidence}%

SCIENTIFIC REASONING
--------------------
${result.reasoning}

SEASONAL CONTEXT
----------------
${result.seasonalContext}

STATE SUITABILITY
-----------------
${result.stateSuitability.join(", ")}

AVERAGE YIELD
-------------
${result.averageYield}

COMMON PESTS & DISEASES
-----------------------
${result.commonPests.join(", ")}

OPTIMAL SOIL TYPES
------------------
${result.optimalSoilTypes.join(", ")}

--------------------------------------
Precision Intelligence by KisanAI
    `.trim();

    const blob = new Blob([reportContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `KisanAI_Report_${result.crop}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-end">
        <button
          onClick={handleDownloadReport}
          className="flex items-center gap-3 px-6 py-3 bg-white border border-stone-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-stone-600 hover:bg-stone-50 hover:text-brand-600 transition-all shadow-sm group"
        >
          <Download className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Result Card */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bento-card overflow-hidden group">
            <div className="bg-brand-900 p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <img 
                src="https://www.transparenttextures.com/patterns/natural-paper.png" 
                alt="" 
                className="w-full h-full" 
              />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-brand-800/50 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-brand-300 border border-brand-700">
                  <CheckCircle2 className="w-4 h-4" /> Optimal Selection
                </div>
                <h2 className="text-7xl md:text-8xl font-black capitalize tracking-tighter leading-none">
                  {result.crop}
                </h2>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/10 flex items-center gap-8 shadow-2xl">
                <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-xl shadow-brand-500/20 rotate-6">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-brand-300 uppercase tracking-[0.2em] mb-1">Match Confidence</div>
                  <div className="text-4xl font-black">{result.confidence}%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-stone-900 font-black text-xs uppercase tracking-[0.2em]">
                  <Info className="w-5 h-5 text-brand-600" /> Scientific Reasoning
                </div>
                <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed font-serif text-xl italic">
                  <ReactMarkdown>{result.reasoning}</ReactMarkdown>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-stone-400 font-black text-[10px] uppercase tracking-[0.2em]">
                    <Calendar className="w-4 h-4" /> Best Season
                  </div>
                  <div className="text-stone-900 font-black text-lg">
                    {result.seasonalContext}
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-stone-400 font-black text-[10px] uppercase tracking-[0.2em]">
                    <MapPin className="w-4 h-4" /> Key States
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.stateSuitability.map((state) => (
                      <span
                        key={state}
                        className="px-4 py-1.5 bg-stone-100 rounded-xl text-[10px] font-black text-stone-600 uppercase tracking-widest border border-stone-200"
                      >
                        {state}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bento-card p-8 space-y-4">
              <div className="flex items-center gap-3 text-stone-400 font-black text-[10px] uppercase tracking-[0.2em]">
                <Sprout className="w-4 h-4 text-brand-600" /> Average Yield
              </div>
              <div className="text-stone-900 font-black text-xl leading-tight">
                {result.averageYield}
              </div>
            </div>

            <div className="bento-card p-8 space-y-4">
              <div className="flex items-center gap-3 text-stone-400 font-black text-[10px] uppercase tracking-[0.2em]">
                <Bug className="w-4 h-4 text-red-500" /> Pests & Diseases
              </div>
              <div className="flex flex-wrap gap-2">
                {result.commonPests.map((pest) => (
                  <span key={pest} className="text-stone-900 font-black text-sm">
                    • {pest}
                  </span>
                ))}
              </div>
            </div>

            <div className="bento-card p-8 space-y-4">
              <div className="flex items-center gap-3 text-stone-400 font-black text-[10px] uppercase tracking-[0.2em]">
                <Layers className="w-4 h-4 text-amber-600" /> Optimal Soil
              </div>
              <div className="flex flex-wrap gap-2">
                {result.optimalSoilTypes.map((soil) => (
                  <span key={soil} className="text-stone-900 font-black text-sm">
                    • {soil}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Card */}
        <div className="lg:col-span-4 bento-card overflow-hidden relative group">
          <img 
            src={`https://picsum.photos/seed/${result.crop}/1000/1500`} 
            alt={result.crop} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-0 left-0 p-10 text-white space-y-2">
            <h4 className="text-2xl font-black tracking-tighter uppercase">{result.crop}</h4>
            <p className="text-xs font-medium text-stone-300 italic">Visual representation of cultivation</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

