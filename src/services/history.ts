import { SoilData, RecommendationResult } from "../types";

export interface HistoryItem {
  id: number;
  timestamp: string;
  input: SoilData;
  result: RecommendationResult;
}

export async function getHistory(): Promise<HistoryItem[]> {
  try {
    const response = await fetch("/api/history");
    if (!response.ok) throw new Error("Failed to fetch history");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function saveToHistory(input: SoilData, result: RecommendationResult): Promise<void> {
  try {
    await fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input, result }),
    });
  } catch (error) {
    console.error("Failed to save to history:", error);
  }
}
