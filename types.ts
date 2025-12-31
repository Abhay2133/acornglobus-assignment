export interface User {
  id: string;
  name: string;
  avatar: string;
  initials: string;
}

export interface ReferrerData {
  name: string;
  amount: number;
  percentage: number;
  icon: string;
  color: string;
}

export interface SalesData {
  user: User;
  revenue: number;
  leads: number;
  kpi: number;
  winLoss: number;
  winRate: number;
  trend: 'up' | 'down';
}

export interface MonthlyData {
  name: string;
  value: number;
  revenue?: number;
  leads?: number;
}

export type TimeframeOption = 'this-quarter' | 'last-quarter' | 'year-to-date';

export type SortOption = 'amount-desc' | 'amount-asc' | 'name';
