import React from "react";
import { HistoryItem } from "../services/history";
import { motion } from "motion/react";
import { History, Clock, ChevronRight, Sprout } from "lucide-react";

interface HistoryListProps {
  items: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ items, onSelect }) => {
  if (items.length === 0) return null;

  return (
    <div className="space-y-8 mt-16">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-stone-200" />
        <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.4em] flex items-center gap-3">
          <History className="w-3 h-3" /> Recent History
        </h3>
        <div className="h-px flex-1 bg-stone-200" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ y: -4 }}
            onClick={() => onSelect(item)}
            className="p-6 bg-white border border-stone-200 rounded-3xl text-left hover:shadow-xl hover:shadow-stone-200/50 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                <Sprout className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5 text-[8px] font-black text-stone-400 uppercase tracking-widest">
                <Clock className="w-3 h-3" />
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            
            <div className="space-y-1">
              <h4 className="text-lg font-black text-stone-900 capitalize tracking-tight group-hover:text-brand-700 transition-colors">
                {item.result.crop}
              </h4>
              <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                {item.result.confidence}% Confidence
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-50 flex items-center justify-between text-[8px] font-black text-stone-400 uppercase tracking-widest group-hover:text-brand-600 transition-colors">
              View Analysis
              <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
