import { ReferrerData, SalesData, MonthlyData, User } from './types';

export const USERS: User[] = [
  { id: '1', name: 'Armin A.', avatar: 'https://picsum.photos/seed/armin/40/40', initials: 'AA' },
  { id: '2', name: 'Eren Y.', avatar: 'https://picsum.photos/seed/eren/40/40', initials: 'EY' },
  { id: '3', name: 'Mikasa A.', avatar: 'https://picsum.photos/seed/mikasa/40/40', initials: 'MA' },
  { id: '4', name: 'Jean K.', avatar: 'https://picsum.photos/seed/jean/40/40', initials: 'JK' },
];

export const REFERRERS: ReferrerData[] = [
  { name: 'Dribbble', amount: 227459, percentage: 43, icon: 'dribbble', color: '#ea4c89' },
  { name: 'Instagram', amount: 142823, percentage: 27, icon: 'instagram', color: '#e1306c' },
  { name: 'Behance', amount: 89935, percentage: 11, icon: 'behance', color: '#1769ff' },
  { name: 'Google', amount: 37028, percentage: 7, icon: 'google', color: '#ea4335' },
];

export const SALES_TEAM: SalesData[] = [
  { user: USERS[0], revenue: 209633, leads: 118, kpi: 41, winLoss: 0.84, winRate: 31, trend: 'up' },
  { user: USERS[2], revenue: 156841, leads: 103, kpi: 54, winLoss: 0.89, winRate: 39, trend: 'down' },
];

export const MONTHLY_REVENUE: MonthlyData[] = [
  { name: 'Sep', value: 6901, revenue: 18552, leads: 373 },
  { name: 'Oct', value: 11035, revenue: 22100, leads: 410 },
  { name: 'Nov', value: 9288, revenue: 19400, leads: 390 },
];

export const CHART_DATA_DYNAMIC = [
  { name: 'W1', value: 4000 },
  { name: 'W2', value: 3000 },
  { name: 'W3', value: 2000 },
  { name: 'W4', value: 2780 },
  { name: 'W5', value: 1890 },
  { name: 'W6', value: 2390 },
  { name: 'W7', value: 3490 },
  { name: 'W8', value: 2000 },
  { name: 'W9', value: 2780 },
  { name: 'W10', value: 1890 },
  { name: 'W11', value: 3900 },
];

export const CHART_DATA_REFERRERS = [
  { name: 'Behance', value: 89935, fill: '#1769ff' },
  { name: 'Google', value: 37028, fill: '#ea4335' },
  { name: 'Instagram', value: 142823, fill: '#e1306c' },
  { name: 'Dribbble', value: 227459, fill: '#ea4c89' },
];
