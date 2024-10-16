import { TokenStatusEnum } from "@/core/constants/general";

export interface TokenDetail {
  id: number;
  token_no: string;
  service: string;
  priority: string;
  reset: boolean;
  reset_type: string;
  description: string;
  status: TokenStatus;
}

export type TokenStatus = TokenStatusEnum;

export type TokenStatusParam = Exclude<TokenStatus, TokenStatusEnum.OPEN>;

export interface TokenPayload {
  department: number;
  service?: null | string;
  priority: number | string;
  description: string;
}

export interface PriorityDetail {
  id: string;
  priority_type: string;
  priority_score: string;
}

export interface PreviousCurrentNextToken {
  department_name: string;
  previous_token: TokenDetail | null;
  current_token: TokenDetail | null;
  next_token: TokenDetail | null;
}

export interface TokenFilterParam {
  department?: number | null;
  priority?: string | null;
  status?: string | null;
}

export interface TokenReferPayload {
  current_token_id: number | null;
  description: string;
  token_detail: {
    counter_id: number;
    description: string;
  };
}

export interface TokenCountDetail {
  total_open_tokens_count: number;
  total_closed_tokens_count: number;
  total_no_show_tokens_count: number;
  total_canceled_tokens_count: number;
  total_in_progress_tokens_count: number;
  total_tokens_count: number;
}
