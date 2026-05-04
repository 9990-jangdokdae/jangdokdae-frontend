export type StockDirection = "up" | "down" | "flat";

export interface StockItem {
  name: string;
  price?: string;
  change: string;
  logo: string;
  direction: StockDirection;
}

export interface IssueCard {
  title: string;
  image: string;
}

export interface StrategyCard {
  title: string;
  description: string;
  stocks: StockItem[];
}

export interface InsightCard {
  title: string;
  date: string;
  image: string;
}
