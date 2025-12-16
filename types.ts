// Domain Types

export enum ReportCategory {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  DAILY = 'DAILY',
  THEMATIC = 'THEMATIC'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'ANALYST' | 'ADMIN';
  department: string;
}

export interface Report {
  id: string;
  title: string;
  category: ReportCategory;
  subCategory?: string; // e.g., "Inflation", "Funding"
  publicationDate: string; // ISO Date
  description: string;
  textContent?: string; // Plain text fallback
  htmlContent?: string; // Rich layout content to mimic PDF
  fileUrl: string;
  tags: string[];
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}

export interface MarketMetric {
  id: string;
  label: string;
  value: number;
  unit: string; // '%', 'bps', 'M', 'B'
  change: number; // Absolute change
  changePercent: number;
  trend: 'UP' | 'DOWN' | 'FLAT';
  history: { date: string; value: number }[]; // For sparklines
  lastUpdated: string;
  source: string; // E.g. "Bloomberg", "BOI", "TASE"
  sourceUrl?: string;
}

export interface MarketGroup {
  groupName: string;
  metrics: MarketMetric[];
}

export interface FilterState {
  search: string;
  dateFrom: string;
  dateTo: string;
  subCategory: string;
}

export interface NewsItem {
  id: string;
  source: string; // 'Globes', 'Bizportal', 'BOI'
  title: string;
  time: string;
  url?: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}