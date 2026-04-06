import React from "react";
import { motion } from "motion/react";
import { BookOpen, BarChart3, ShieldCheck, Zap, Info, ArrowRight, Code2, Database } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const FEATURE_IMPORTANCE = [
  { name: "Rainfall", value: 0.28 },
  { name: "Humidity", value: 0.22 },
  { name: "Potassium (K)", value: 0.18 },
  { name: "Phosphorus (P)", value: 0.12 },
  { name: "Temperature", value: 0.08 },
  { name: "Nitrogen (N)", value: 0.07 },
  { name: "pH", value: 0.05 },
];

const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#bbf7d0", "#dcfce7", "#f0fdf4"];

export const VivaPrep: React.FC = () => {
  return (
    <div className="space-y-16 mt-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-stone-200 pb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-brand-100 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-brand-700 border border-brand-200">
            <BookOpen className="w-4 h-4" /> Technical Documentation
          </div>
          <h2 className="text-5xl font-black text-stone-900 tracking-tighter">ML Pipeline & Viva Prep</h2>
          <p className="text-stone-500 max-w-2xl text-lg leading-relaxed font-medium">
            Deep dive into the architecture, feature engineering, and model selection criteria used for the KisanAI recommendation engine.
          </p>
        </div>
        <div className="flex gap-6">
          <button className="px-8 py-4 bg-stone-900 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-stone-800 transition-all flex items-center gap-3 shadow-xl shadow-stone-200">
            <Code2 className="w-5 h-5" /> View Source
          </button>
          <button className="px-8 py-4 bg-white border border-stone-200 text-stone-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-stone-50 transition-all flex items-center gap-3">
            <Database className="w-5 h-5" /> Dataset Info
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Feature Importance Chart */}
        <div className="lg:col-span-8 bento-card p-12 space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
            <BarChart3 className="w-80 h-80" />
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-stone-900 flex items-center gap-4 tracking-tighter">
                <BarChart3 className="w-6 h-6 text-brand-600" /> Feature Importance
              </h3>
              <p className="text-[10px] text-stone-400 font-black uppercase tracking-[0.2em]">Random Forest Gini Importance</p>
            </div>
            <div className="px-4 py-1.5 bg-stone-50 border border-stone-100 rounded-xl text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">
              N=2200 Samples
            </div>
          </div>
          
          <div className="h-96 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FEATURE_IMPORTANCE} layout="vertical" margin={{ left: 20, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 800, textAnchor: "end" }}
                  width={120}
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{ borderRadius: "24px", border: "none", boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.1)", padding: "16px 24px" }}
                />
                <Bar dataKey="value" radius={[0, 12, 12, 0]} barSize={40}>
                  {FEATURE_IMPORTANCE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-brand-50 p-8 rounded-3xl border border-brand-100 text-brand-900 leading-relaxed relative z-10">
            <div className="flex items-start gap-6">
              <div className="p-3 bg-white rounded-2xl text-brand-600 shadow-xl shadow-brand-900/5">
                <Zap className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h4 className="font-black text-brand-900 uppercase tracking-widest text-xs">Why Random Forest?</h4>
                <p className="text-brand-800/80 italic font-serif text-lg leading-relaxed">
                  "Random Forest is an ensemble learning method that constructs a multitude of decision trees at training time. It effectively handles non-linear relationships and is robust against outliers in soil data."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Viva Quick Tips */}
        <div className="lg:col-span-4 space-y-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2.5 bg-accent-100 rounded-xl text-accent-600">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-black text-stone-900 uppercase tracking-[0.2em] text-xs">Viva Quick Reference</h3>
          </div>
          
          <div className="space-y-6">
            <VivaCard
              icon={<ShieldCheck className="w-6 h-6 text-blue-600" />}
              title="Bias-Variance Tradeoff"
              content="Random Forest reduces variance by averaging multiple trees, making it highly robust against overfitting compared to a single Decision Tree."
              tag="Concept"
            />
            <VivaCard
              icon={<Info className="w-6 h-6 text-accent-600" />}
              title="Evaluation Metrics"
              content="We prioritize Macro-F1 score to ensure balanced performance across all 22 crop classes, accounting for potential class imbalances."
              tag="Evaluation"
            />
            <VivaCard
              icon={<BarChart3 className="w-6 h-6 text-purple-600" />}
              title="Feature Scaling"
              content="While Random Forest is scale-invariant, we normalize climate data to ensure consistent feature importance interpretation."
              tag="Preprocessing"
            />
          </div>

          <button className="w-full py-6 bg-stone-100 border border-stone-200 rounded-[2rem] text-stone-600 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-stone-200 transition-all flex items-center justify-center gap-3 group">
            Download Full PPT <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

const VivaCard: React.FC<{ icon: React.ReactNode; title: string; content: string; tag: string }> = ({ icon, title, content, tag }) => (
  <motion.div
    whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.1)" }}
    className="p-8 bg-white border border-stone-200 rounded-[2.5rem] shadow-sm space-y-6 transition-all duration-500"
  >
    <div className="flex items-center justify-between">
      <div className="p-3 bg-stone-50 rounded-2xl text-stone-600 shadow-inner">
        {icon}
      </div>
      <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em]">{tag}</span>
    </div>
    <div className="space-y-3">
      <h4 className="font-black text-stone-900 text-sm uppercase tracking-tight">{title}</h4>
      <p className="text-xs text-stone-500 leading-relaxed font-medium">{content}</p>
    </div>
  </motion.div>
);
