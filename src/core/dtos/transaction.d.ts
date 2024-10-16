import type { TransactionType } from "../constants/general";

export type TransactionPaginated = {
  transaction_date: string;
  day: string;
  total_amount: number;
  absolute_amount: number;
  transactions: TransactionDetailPaginated[];
  transaction_type: TransactionType;
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

