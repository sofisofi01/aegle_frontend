import api from "./api";

export interface AIAnalysis {
  summary: string;
  detailed_analysis: string;
  recommendations: string[];
  status: string;
}

export const aiService = {
  getAnalysis: async (): Promise<AIAnalysis> => {
    const response = await api.get<AIAnalysis>("/ai-assistant/analysis/");
    return response.data;
  },
};
