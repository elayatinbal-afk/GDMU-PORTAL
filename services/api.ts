import { Report, ReportCategory, MarketGroup, NewsItem } from '../types';
import { MOCK_REPORTS, MOCK_MARKET_DATA, MOCK_NEWS } from '../constants';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
// @ts-ignore - Process env is injected by the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Utility to handle network delay simulation
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class ReportService {
  private reports: Report[] = [...MOCK_REPORTS];

  async getReports(category?: ReportCategory): Promise<Report[]> {
    await delay(500);
    let result = this.reports.filter(r => !r.isArchived);
    if (category) {
      result = result.filter(r => r.category === category);
    }
    return result.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
  }

  async getAllReportsForAdmin(): Promise<Report[]> {
    await delay(500);
    return this.reports.filter(r => !r.isArchived).sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime());
  }

  async searchReports(query: string): Promise<Report[]> {
    await delay(300);
    const q = query.toLowerCase();
    return this.reports.filter(r => 
      !r.isArchived && 
      (r.title.toLowerCase().includes(q) || 
       r.description.toLowerCase().includes(q) ||
       r.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  async uploadReport(report: Omit<Report, 'id' | 'createdAt' | 'updatedAt' | 'uploadedBy' | 'isArchived'>): Promise<Report> {
    await delay(800);
    const newReport: Report = {
      ...report,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      uploadedBy: 'Admin User',
      isArchived: false,
    };
    this.reports.unshift(newReport);
    return newReport;
  }

  async deleteReport(id: string): Promise<void> {
    await delay(400);
    const index = this.reports.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reports[index].isArchived = true;
    }
  }
}

class MarketService {
  /**
   * Fetches REAL-TIME market data using Gemini Search Grounding.
   * Merges live values with the existing data structure (preserving history mock data for UI stability).
   */
  async getMarketOverview(): Promise<MarketGroup[]> {
    try {
      // Create a deep copy of the mock data to start with
      const currentData: MarketGroup[] = JSON.parse(JSON.stringify(MOCK_MARKET_DATA));

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `
          Find the absolute latest real-time market values for the following. 
          Return a strict JSON object (no markdown) where keys are the IDs listed below and values are objects with { "value": number, "change": number, "changePercent": number }.
          
          IDs to find:
          - shahar10y (Israel Govt Bond 10Y Yield)
          - shahar02y (Israel Govt Bond 2Y Yield)
          - galil10y (Israel CPI Linked Bond 10Y Yield)
          - ta35 (TA-35 Index)
          - usdils (USD to ILS Exchange Rate)
          - sp500 (S&P 500 Index)
          - boi_rate (Bank of Israel Interest Rate)
          - inflation (Israel Inflation Rate yearly)
          - cds5y (Israel 5Y CDS)

          Ensure numerical accuracy. If specific change data is unavailable, estimate based on open/close or set to 0.
        `,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      // Extract JSON from response text
      const cleanText = response.text.replace(/```json|```/g, '').trim();
      const liveValues = JSON.parse(cleanText);
      
      // Extract grounding metadata (sources)
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const webSource = chunks.find((c: any) => c.web?.uri)?.web?.uri;

      // Update the dataset
      currentData.forEach(group => {
        group.metrics.forEach(metric => {
          if (liveValues[metric.id]) {
            const live = liveValues[metric.id];
            metric.value = live.value;
            metric.change = live.change;
            metric.changePercent = live.changePercent;
            
            // Recalculate trend
            if (live.change > 0) metric.trend = 'UP';
            else if (live.change < 0) metric.trend = 'DOWN';
            else metric.trend = 'FLAT';

            metric.lastUpdated = new Date().toISOString();
            metric.sourceUrl = webSource || undefined;
            
            // Update history tail to match new head (visual continuity)
            if (metric.history.length > 0) {
              const lastHistory = metric.history[metric.history.length - 1];
              if (Math.abs(lastHistory.value - live.value) > 0.001) {
                  metric.history.push({ 
                    date: (metric.history.length + 1).toString(), 
                    value: live.value 
                  });
                  if(metric.history.length > 10) metric.history.shift();
              }
            }
          }
        });
      });

      return currentData;

    } catch (error) {
        console.warn("Failed to fetch live market data from AI, using fallback snapshot", error);
        return MOCK_MARKET_DATA;
    }
  }

  async getNewsFeed(): Promise<NewsItem[]> {
    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `
            Find 5 very recent financial news headlines (from the last 24 hours) relevant to the Israeli economy, Ministry of Finance, or Global Markets.
            Return a strict JSON array (no markdown) of objects with these properties:
            - id: string (unique)
            - source: string (e.g. "Globes", "Bloomberg", "Reuters")
            - title: string (in Hebrew)
            - time: string (e.g. "10:30" or "לפני שעה")
            - sentiment: "positive" | "negative" | "neutral"
            - url: string (link to article if found)
          `,
          config: {
            tools: [{ googleSearch: {} }],
          },
        });

        const cleanText = response.text.replace(/```json|```/g, '').trim();
        const newsItems = JSON.parse(cleanText);
        
        // Extract URLs from grounding if the model didn't embed them directly in the JSON
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        
        return newsItems.map((item: any, index: number) => {
            // Try to find a relevant grounding URL if missing
            const relevantChunk = chunks[index % chunks.length];
            const fallbackUrl = relevantChunk?.web?.uri;

            return {
                ...item,
                url: item.url || fallbackUrl
            };
        });

    } catch (error) {
        console.warn("Failed to fetch live news feed, using fallback snapshot", error);
        return MOCK_NEWS;
    }
  }

  async syncExternalData(): Promise<void> {
    await delay(1500); 
    console.log("Synced with external providers");
  }
}

export const reportService = new ReportService();
export const marketService = new MarketService();