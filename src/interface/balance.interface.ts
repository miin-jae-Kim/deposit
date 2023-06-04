export interface BalanceRequest {
  walletId: string;
}

export interface BalanceResponse {
  walletId: string;
  balance: number;
}
