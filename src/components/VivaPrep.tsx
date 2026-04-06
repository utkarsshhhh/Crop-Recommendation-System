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
    <div className="space-y-12 mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-700 border border-brand-200">
            <BookOpen className="w-3 h-3" /> Technical Documentation
          </div>
          <h2 className="text-4xl font-bold text-stone-900 tracking-tight">ML Pipeline & Viva Preparation</h2>
          <p className="text-stone-500 max-w-2xl text-sm leading-relaxed">
            Deep dive into the architecture, feature engineering, and model selection criteria used for the KisanAI recommendation engine.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-5 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-all flex items-center gap-2">
            <Code2 className="w-4 h-4" /> View Source
          </button>
          <button className="px-5 py-2.5 bg-white border border-stone-200 text-stone-600 text-xs font-bold rounded-xl hover:bg-stone-50 transition-all flex items-center gap-2">
            <Database className="w-4 h-4" /> Dataset Info
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Feature Importance Chart */}
        <div className="lg:col-span-8 bg-white p-10 rounded-[2.5rem] border border-stone-200 shadow-xl shadow-stone-200/50 space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
            <BarChart3 className="w-64 h-64" />
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-stone-900 flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-brand-600" /> Feature Importance Analysis
              </h3>
              <p className="text-xs text-stone-400 font-medium uppercase tracking-widest">Random Forest Gini Importance</p>
            </div>
            <div className="px-3 py-1 bg-stone-50 border border-stone-100 rounded-lg text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              N=2200 Samples
            </div>
          </div>
          
          <div className="h-80 w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FEATURE_IMPORTANCE} layout="vertical" margin={{ left: 20, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b", fontWeight: 600 }}
                  width={120}
                />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)", padding: "12px 16px" }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={32}>
                  {FEATURE_IMPORTANCE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100 text-sm text-brand-900 leading-relaxed relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-white rounded-xl text-brand-600 shadow-sm">
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-brand-900">Why Random Forest?</h4>
                <p className="text-brand-800/80 italic font-serif">
                  "Random Forest is an ensemble learning method that constructs a multitude of decision trees at training time. It effectively handles non-linear relationships and is robust against outliers in soil data."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Viva Quick Tips */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-stone-900 uppercase tracking-widest text-xs">Viva Quick Reference</h3>
          </div>
          
          <div className="space-y-4">
            <VivaCard
              icon={<ShieldCheck className="w-5 h-5 text-blue-600" />}
              title="Bias-Variance Tradeoff"
              content="Random Forest reduces variance by averaging multiple trees, making it highly robust against overfitting compared to a single Decision Tree."
              tag="Concept"
            />
            <VivaCard
              icon={<Info className="w-5 h-5 text-amber-600" />}
              title="Evaluation Metrics"
              content="We prioritize Macro-F1 score to ensure balanced performance across all 22 crop classes, accounting for potential class imbalances."
              tag="Evaluation"
            />
            <VivaCard
              icon={<BarChart3 className="w-5 h-5 text-purple-600" />}
              title="Feature Scaling"
              content="While Random Forest is scale-invariant, we normalize climate data to ensure consistent feature importance interpretation."
              tag="Preprocessing"
            />
          </div>

          <button className="w-full py-4 bg-stone-100 border border-stone-200 rounded-2xl text-stone-600 text-xs font-bold uppercase tracking-widest hover:bg-stone-200 transition-all flex items-center justify-center gap-2 group">
            Download Full PPT <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const VivaCard: React.FC<{ icon: React.ReactNode; title: string; content: string; tag: string }> = ({ icon, title, content, tag }) => (
  <motion.div
    whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
    className="p-6 bg-white border border-stone-200 rounded-[2rem] shadow-sm space-y-4 transition-all"
  >
    <div className="flex items-center justify-between">
      <div className="p-2.5 bg-stone-50 rounded-xl text-stone-600 shadow-inner">
        {icon}
      </div>
      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">{tag}</span>
    </div>
    <div className="space-y-2">
      <h4 className="font-bold text-stone-900 text-sm">{title}</h4>
      <p className="text-xs text-stone-500 leading-relaxed">{content}</p>
    </div>
  </motion.div>
);
