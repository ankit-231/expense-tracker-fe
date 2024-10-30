import type { TransactionType } from "../constants/general";

export type TransactionPaginated = {
  transaction_date: string;
  day: string;
  total_amount: number;
  absolute_amount: number;
  transactions: TransactionDetail[];
  transaction_type: TransactionType;
};

export type TransactionDetail = {
  id: number;
  wallet: number;
  transaction_date: string;
  transaction_time: string;
  transaction_type: TransactionType;
  amount: string | number;
  description: string;
  category: string;
  note: string;
  image: string;
  wallet_icon: string;
};

export type TransactionDetailPaginated = {
  id: number;
  wallet: number;
  wallet_icon: string;
  transaction_time: string;
  transaction_type: TransactionType;
  amount: string;
  description: string;
};

export type TransactionPayload = {
  wallet: number;
  transaction_date: string;
  transaction_time: string;
  transaction_type: TransactionType;
  category: number;
  amount: string;
  description: string;
  note: string;
};

export type TransactionCategoryDetail = {
  id: number;
  name: string;
  category_type: TransactionType;
  icon_class: string;
  icon: string;
};

export type MonthlyStatisticsDetail = {
  labels: string[];
  datasets: Array<{
    label: string[];
    backgroundColor: string;
    borderColor: string;
    fill: boolean;
    data: number[];
  }>;
};

export type TransactionCategoryCreatePayload = {
  name: string;
  category_type: TransactionType;
  icon: string;
};

export type TransactionCategoryUpdatePayload = {
  name: string;
  icon: number;
};

export type TransactionFetchParams = {
  start_date?: string;
  end_date?: string;
};
