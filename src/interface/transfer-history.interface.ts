import { TransferHistory } from 'src/entity/transfer-history.entity';

export interface TransferHistoryRequest {
  walletId: string;
  startIndex: number;
  maxCount: number;
}

export interface TransferHistoryResponse {
  histories: TransferHistory[];
}
