import React from "react";
import { SoilData } from "../types";
import { cn } from "../lib/utils";
import { Sprout, Thermometer, Droplets, FlaskConical, CloudRain, Beaker } from "lucide-react";

interface CropFormProps {
  onSubmit: (data: SoilData) => void;
  isLoading: boolean;
}

export const CropForm: React.FC<CropFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<SoilData>({
    n: 90,
    p: 42,
    k: 43,
    temperature: 20.8,
    humidity: 82.0,
    ph: 6.5,
    rainfall: 202.9,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-10 rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-400 via-brand-600 to-brand-800" />
      
      <div className="space-y-8">
        {/* NPK Inputs */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
              <Beaker className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-stone-800 uppercase tracking-[0.15em]">
              Soil Nutrients
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <InputField label="Nitrogen" name="n" value={formData.n} onChange={handleChange} min={0} max={140} unit="mg/kg" />
            <InputField label="Phosphorus" name="p" value={formData.p} onChange={handleChange} min={5} max={145} unit="mg/kg" />
            <InputField label="Potassium" name="k" value={formData.k} onChange={handleChange} min={5} max={205} unit="mg/kg" />
          </div>
        </div>

        <div className="h-px bg-stone-100" />

        {/* Climate Inputs */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-50 rounded-lg text-brand-600">
              <CloudRain className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-stone-800 uppercase tracking-[0.15em]">
              Climate Factors
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InputField label="Temperature" name="temperature" value={formData.temperature} onChange={handleChange} icon={<Thermometer className="w-3.5 h-3.5" />} unit="°C" />
            <InputField label="Humidity" name="humidity" value={formData.humidity} onChange={handleChange} icon={<Droplets className="w-3.5 h-3.5" />} unit="%" />
            <InputField label="pH Level" name="ph" value={formData.ph} onChange={handleChange} icon={<FlaskConical className="w-3.5 h-3.5" />} unit="pH" />
            <InputField label="Rainfall" name="rainfall" value={formData.rainfall} onChange={handleChange} icon={<CloudRain className="w-3.5 h-3.5" />} unit="mm" />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full py-5 px-8 rounded-2xl font-bold text-sm uppercase tracking-widest text-white transition-all transform active:scale-[0.98]",
          "bg-stone-900 hover:bg-brand-700 shadow-xl shadow-stone-200",
          "disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        )}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Analyzing Data...</span>
          </>
        ) : (
          <>
            <Sprout className="w-5 h-5" />
            Generate Recommendation
          </>
        )}
      </button>
    </form>
  );
};

const InputField: React.FC<{
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  icon?: React.ReactNode;
  unit?: string;
}> = ({ label, name, value, onChange, min, max, icon, unit }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
        {icon} {label}
      </label>
      {unit && <span className="text-[10px] font-bold text-stone-300">{unit}</span>}
    </div>
    <div className="relative group">
      <input
        type="number"
        step="0.1"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold text-stone-900 focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all group-hover:border-stone-300"
      />
    </div>
  </div>
);

