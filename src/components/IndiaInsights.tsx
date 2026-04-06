import React from "react";
import { motion } from "motion/react";
import { Map, CloudSun, Droplets, Thermometer, Wind, ArrowRight } from "lucide-react";

const REGIONAL_DATA = [
  { region: "North India", crops: ["Wheat", "Mustard", "Sugarcane"], soil: "Alluvial", rainfall: "Moderate", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=400&auto=format&fit=crop" },
  { region: "South India", crops: ["Rice", "Coconut", "Coffee"], soil: "Red/Laterite", rainfall: "High", img: "https://images.unsplash.com/photo-1590005354167-6da97870c91d?q=80&w=400&auto=format&fit=crop" },
  { region: "East India", crops: ["Rice", "Jute", "Tea"], soil: "Alluvial/Red", rainfall: "Very High", img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=400&auto=format&fit=crop" },
  { region: "West India", crops: ["Cotton", "Groundnut", "Bajra"], soil: "Black/Sandy", rainfall: "Low", img: "https://images.unsplash.com/photo-1594913785162-e6785b493bd2?q=80&w=400&auto=format&fit=crop" },
  { region: "Central India", crops: ["Soybean", "Pulses", "Wheat"], soil: "Black", rainfall: "Moderate", img: "https://images.unsplash.com/photo-1592919016381-99f393241caf?q=80&w=400&auto=format&fit=crop" },
];

export const IndiaInsights: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-stone-500 border border-stone-200">
            <Map className="w-3 h-3" /> Geographical Context
          </div>
          <h2 className="text-3xl font-bold text-stone-900">Regional Agricultural Insights</h2>
          <p className="text-stone-500 max-w-xl text-sm leading-relaxed">
            India's diverse climate zones and soil types create unique conditions for various crops. Explore the regional characteristics that drive our ML model.
          </p>
        </div>
        <button className="flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors group">
          View Detailed Map <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {REGIONAL_DATA.map((item, index) => (
          <motion.div
            key={item.region}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white border border-stone-200 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="aspect-[4/5] relative overflow-hidden">
              <img 
                src={item.img} 
                alt={item.region} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                <h4 className="text-lg font-bold mb-1">{item.region}</h4>
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-4">{item.soil} Soil</div>
                
                <div className="space-y-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex flex-wrap gap-1.5">
                    {item.crops.map(crop => (
                      <span key={crop} className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] font-bold">
                        {crop}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-brand-300">
                    <Droplets className="w-3 h-3" /> {item.rainfall} Rainfall
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weather Widget Simulation */}
      <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700" />
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src="https://www.transparenttextures.com/patterns/cubes.png" alt="" className="w-full h-full" />
        </div>
        
        <div className="relative z-10 p-10 flex flex-col lg:flex-row items-center justify-between gap-10 text-white">
          <div className="space-y-4 max-w-md text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
              <CloudSun className="w-3 h-3" /> Live Context
            </div>
            <h4 className="text-3xl font-bold leading-tight">Current Seasonal Trends</h4>
            <p className="text-blue-100 text-sm leading-relaxed">
              Our model incorporates real-time weather data to adjust recommendations based on current monsoon patterns and temperature shifts.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8 md:gap-16">
            <WeatherStat icon={<Thermometer className="w-6 h-6" />} label="Avg Temp" value="28.4°C" />
            <WeatherStat icon={<Droplets className="w-6 h-6" />} label="Humidity" value="64%" />
            <WeatherStat icon={<Wind className="w-6 h-6" />} label="Wind Speed" value="12 km/h" />
          </div>
        </div>
      </div>
    </div>
  );
};

const WeatherStat: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex flex-col items-center gap-3">
    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
      {icon}
    </div>
    <div className="text-center">
      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200 mb-1">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  </div>
);
