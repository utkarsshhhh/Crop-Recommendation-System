import React from "react";
import { SoilData } from "../types";
import { Sprout, Thermometer, Droplets, FlaskConical, CloudRain, Beaker, Wind, Zap } from "lucide-react";

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

  const [errors, setErrors] = React.useState<Partial<Record<keyof SoilData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    setFormData((prev) => ({ ...prev, [name]: isNaN(numValue) ? 0 : numValue }));
    
    // Clear error when user starts typing
    if (errors[name as keyof SoilData]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof SoilData];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof SoilData, string>> = {};
    
    if (formData.n < 0 || formData.n > 140) newErrors.n = "Must be between 0-140";
    if (formData.p < 5 || formData.p > 145) newErrors.p = "Must be between 5-145";
    if (formData.k < 5 || formData.k > 205) newErrors.k = "Must be between 5-205";
    if (formData.temperature < 10 || formData.temperature > 50) newErrors.temperature = "Must be between 10-50";
    if (formData.humidity < 10 || formData.humidity > 100) newErrors.humidity = "Must be between 10-100";
    if (formData.ph < 3 || formData.ph > 10) newErrors.ph = "Must be between 3-10";
    if (formData.rainfall < 20 || formData.rainfall > 300) newErrors.rainfall = "Must be between 20-300";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const loadSampleData = () => {
    setFormData({
      n: 70,
      p: 50,
      k: 40,
      temperature: 25.5,
      humidity: 71.2,
      ph: 6.8,
      rainfall: 150.5,
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-stone-200 p-10 rounded-[2.5rem] shadow-2xl shadow-stone-200/50 space-y-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-400 via-brand-600 to-accent-400" />
      
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-black text-stone-900 tracking-tight">Soil & Climate Data</h3>
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Enter parameters for analysis</p>
        </div>
        <button 
          type="button"
          onClick={loadSampleData}
          className="px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-stone-500 hover:bg-stone-100 transition-colors"
        >
          Load Sample
        </button>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputGroup
            label="Nitrogen (N)"
            name="n"
            value={formData.n}
            onChange={handleChange}
            unit="mg/kg"
            icon={<Beaker className="w-4 h-4" />}
            min={0}
            max={140}
            error={errors.n}
          />
          <InputGroup
            label="Phosphorus (P)"
            name="p"
            value={formData.p}
            onChange={handleChange}
            unit="mg/kg"
            icon={<FlaskConical className="w-4 h-4" />}
            min={5}
            max={145}
            error={errors.p}
          />
          <InputGroup
            label="Potassium (K)"
            name="k"
            value={formData.k}
            onChange={handleChange}
            unit="mg/kg"
            icon={<Zap className="w-4 h-4" />}
            min={5}
            max={205}
            error={errors.k}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup
            label="Temperature"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            unit="°C"
            icon={<Thermometer className="w-4 h-4" />}
            min={10}
            max={50}
            error={errors.temperature}
          />
          <InputGroup
            label="Humidity"
            name="humidity"
            value={formData.humidity}
            onChange={handleChange}
            unit="%"
            icon={<Droplets className="w-4 h-4" />}
            min={10}
            max={100}
            error={errors.humidity}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup
            label="Soil pH"
            name="ph"
            value={formData.ph}
            onChange={handleChange}
            unit="pH"
            icon={<FlaskConical className="w-4 h-4" />}
            min={3}
            max={10}
            error={errors.ph}
          />
          <InputGroup
            label="Rainfall"
            name="rainfall"
            value={formData.rainfall}
            onChange={handleChange}
            unit="mm"
            icon={<CloudRain className="w-4 h-4" />}
            min={20}
            max={300}
            error={errors.rainfall}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-5 bg-stone-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-stone-200 flex items-center justify-center gap-3 group"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Analyzing Data...
          </>
        ) : (
          <>
            <Sprout className="w-5 h-5" />
            Generate Recommendation
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
};

const InputGroup: React.FC<{
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  unit: string;
  icon: React.ReactNode;
  step?: string | number;
  min?: number;
  max?: number;
  error?: string;
}> = ({ label, name, value, onChange, unit, icon, step = "any", min, max, error }) => (
  <div className="space-y-2 group">
    <div className="flex justify-between items-end">
      <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-brand-600 transition-colors">
        {icon} {label}
      </label>
      {error ? (
        <span className="text-[8px] font-bold text-red-500 uppercase tracking-tighter animate-pulse">
          {error}
        </span>
      ) : (
        min !== undefined && max !== undefined && (
          <span className="text-[8px] font-bold text-stone-300 uppercase tracking-tighter">
            Range: {min}-{max}
          </span>
        )
      )}
    </div>
    <div className="relative">
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        step={step}
        min={min}
        max={max}
        required
        className={`w-full px-5 py-4 bg-stone-50 border rounded-2xl text-stone-900 font-bold text-sm focus:outline-none focus:ring-2 transition-all ${
          error 
            ? "border-red-200 focus:ring-red-500/20 focus:border-red-500" 
            : "border-stone-200 focus:ring-brand-500/20 focus:border-brand-500"
        }`}
      />
      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-stone-300 uppercase tracking-widest pointer-events-none">
        {unit}
      </span>
    </div>
  </div>
);

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
