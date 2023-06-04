import { TRANSFER_STATUS } from 'src/enum/transfer-status.enum';
import { TRANSFER_TYPE } from 'src/enum/transfer-type.enum';

export interface TransferRequest {
  walletId: string;
  transferType: TRANSFER_TYPE;
  balance: number;
}

export interface TransferResponse {
  id: number;
  transferStatus: TRANSFER_STATUS;
  transferType: TRANSFER_TYPE;
  walletId: string;
}
