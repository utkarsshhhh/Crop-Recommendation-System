export interface SoilData {
  n: number;
  p: number;
  k: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export interface RecommendationResult {
  crop: string;
  confidence: number;
  reasoning: string;
  seasonalContext: string;
  stateSuitability: string[];
  averageYield: string;
  commonPests: string[];
  optimalSoilTypes: string[];
}

export interface MLMetric {
  name: string;
  value: number;
  description: string;
}

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}
