import React from "react";
import { RecommendationResult } from "../types";
import { motion } from "motion/react";
import { CheckCircle2, MapPin, Calendar, Info, TrendingUp } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ResultDisplayProps {
  result: RecommendationResult | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="bg-white border border-stone-200 rounded-[2.5rem] shadow-2xl shadow-brand-900/5 overflow-hidden">
        {/* Header Section */}
        <div className="bg-brand-900 p-10 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img 
              src="https://www.transparenttextures.com/patterns/natural-paper.png" 
              alt="" 
              className="w-full h-full" 
            />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-800/50 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-300 border border-brand-700">
                <CheckCircle2 className="w-3 h-3" /> Optimal Selection
              </div>
              <h2 className="text-6xl font-bold capitalize tracking-tight">
                {result.crop}
              </h2>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-brand-300 uppercase tracking-widest">Match Confidence</div>
                <div className="text-3xl font-bold">{result.confidence}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-stone-900 font-bold text-sm uppercase tracking-widest">
                <Info className="w-4 h-4 text-brand-600" /> Scientific Reasoning
              </div>
              <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed font-serif text-lg italic">
                <ReactMarkdown>{result.reasoning}</ReactMarkdown>
              </div>
            </div>

            <div className="h-px bg-stone-100" />

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-stone-400 font-bold text-[10px] uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5" /> Best Season
                </div>
                <div className="text-stone-900 font-bold text-sm">
                  {result.seasonalContext}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-stone-400 font-bold text-[10px] uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5" /> Key States
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.stateSuitability.map((state) => (
                    <span
                      key={state}
                      className="px-2 py-0.5 bg-stone-100 rounded text-[10px] font-bold text-stone-600"
                    >
                      {state}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visualization / Image Placeholder */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-brand-50 rounded-[2rem] -z-10 transition-transform group-hover:scale-105" />
            <div className="aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img 
                src={`https://picsum.photos/seed/${result.crop}/800/800`} 
                alt={result.crop} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white text-xs font-medium italic">
                  Visual representation of {result.crop} cultivation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
