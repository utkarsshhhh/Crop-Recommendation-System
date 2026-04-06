import React from "react";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { Activity, Target, Cpu, Layers, Zap } from "lucide-react";

const MODEL_DATA = [
  { name: "Random Forest", accuracy: 99.2, f1: 99.1, latency: 45 },
  { name: "Decision Tree", accuracy: 98.4, f1: 98.2, latency: 12 },
  { name: "SVM", accuracy: 97.8, f1: 97.5, latency: 85 },
  { name: "Logistic Regression", accuracy: 95.6, f1: 95.2, latency: 8 },
  { name: "Naive Bayes", accuracy: 94.2, f1: 93.8, latency: 5 },
];

const COLORS = ["#4d885f", "#60a5fa", "#a855f7", "#f59e0b", "#ef4444"];

export const ModelPerformance: React.FC = () => {
  return (
    <div id="performance" className="space-y-16 mt-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-stone-200 pb-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-brand-100 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-brand-700 border border-brand-200">
            <Activity className="w-4 h-4" /> Algorithmic Precision
          </div>
          <h2 className="text-5xl font-black text-stone-900 tracking-tighter">Model Performance Analysis</h2>
          <p className="text-stone-500 max-w-2xl text-lg leading-relaxed font-medium">
            Comparative evaluation of 5 machine learning models for high-accuracy crop recommendation. We prioritize precision and robustness across diverse soil conditions.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="px-6 py-3 bg-stone-50 border border-stone-200 rounded-2xl flex items-center gap-3">
            <Target className="w-5 h-5 text-brand-600" />
            <div>
              <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Top Accuracy</div>
              <div className="text-sm font-black text-stone-900">99.2% (RF)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Accuracy Comparison Chart */}
        <div className="lg:col-span-8 bento-card p-12 space-y-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-stone-900 flex items-center gap-4 tracking-tighter">
                <Target className="w-6 h-6 text-brand-600" /> Accuracy & F1-Score
              </h3>
              <p className="text-[10px] text-stone-400 font-black uppercase tracking-[0.2em]">Cross-Validated Performance Metrics</p>
            </div>
          </div>

          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MODEL_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 800 }}
                />
                <YAxis 
                  domain={[90, 100]} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 800 }}
                />
                <Tooltip 
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{ borderRadius: "24px", border: "none", boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.1)", padding: "16px 24px" }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em" }} />
                <Bar name="Accuracy %" dataKey="accuracy" radius={[10, 10, 0, 0]} barSize={40}>
                  {MODEL_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
                <Bar name="F1-Score %" dataKey="f1" fill="#cbd5e1" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Technical Insights */}
        <div className="lg:col-span-4 space-y-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2.5 bg-brand-100 rounded-xl text-brand-600">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-black text-stone-900 uppercase tracking-[0.2em] text-xs">Model Insights</h3>
          </div>

          <div className="space-y-6">
            <InsightCard 
              icon={<Layers className="w-5 h-5 text-brand-600" />}
              title="Ensemble Advantage"
              desc="Random Forest outperforms single-tree models by reducing variance through bagging and feature randomness."
            />
            <InsightCard 
              icon={<Zap className="w-5 h-5 text-amber-600" />}
              title="Inference Latency"
              desc="Logistic Regression and Naive Bayes offer sub-10ms latency, ideal for real-time edge deployment."
            />
            <InsightCard 
              icon={<Activity className="w-5 h-5 text-blue-600" />}
              title="Robustness"
              desc="SVM shows high stability in high-dimensional soil feature spaces but requires more computational resources."
            />
          </div>

          <div className="p-8 bg-stone-900 rounded-[2.5rem] text-white space-y-4">
            <div className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Final Selection</div>
            <h4 className="text-xl font-black tracking-tight">Random Forest Classifier</h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Selected as the primary engine for KisanAI due to its superior handling of multi-class classification and non-linear soil-crop relationships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InsightCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ x: 10 }}
    className="p-6 bg-white border border-stone-200 rounded-3xl flex gap-6 items-start transition-all"
  >
    <div className="p-3 bg-stone-50 rounded-2xl shrink-0">
      {icon}
    </div>
    <div className="space-y-1">
      <h4 className="font-black text-stone-900 text-sm uppercase tracking-tight">{title}</h4>
      <p className="text-xs text-stone-500 leading-relaxed font-medium">{desc}</p>
    </div>
  </motion.div>
);
