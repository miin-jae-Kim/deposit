import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import {
  WalletCreateRequest,
  WalletCreateResponse,
} from 'src/interface/wallet.interface';
import { TransferService } from './transfer.service';
import {
  TransferRequest,
  TransferResponse,
} from 'src/interface/transfer.interface';
import {
  TransferHistoryRequest,
  TransferHistoryResponse,
} from 'src/interface/transfer-history.interface';
import { TransferCommitResponse } from 'src/interface/transfer-commit.interface';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  // 2. 입출금 엔드포인트
  @Post()
  async createTransfer(
    @Body() transferRequest: TransferRequest,
  ): Promise<TransferResponse> {
    const { walletId, balance, transferType } = transferRequest;
    const transferHistory = await this.transferService.transfer(
      1,
      walletId,
      balance,
      transferType,
    );

    const response: TransferResponse = {
      id: transferHistory.id,
      transferStatus: transferHistory.transferStatus,
      transferType: transferHistory.transferType,
      walletId: transferHistory.walletId,
    };

    return response;
  }

  // 3. 거래 처리 엔드포트
  @Patch('/commit')
  async commitTransfer(): Promise<TransferCommitResponse> {
    const changedTransferCount = await this.transferService.commitTransfer();
    console.log('changedTransferCount : ' + changedTransferCount);
    const response: TransferCommitResponse = { changedTransferCount };
    return response;
  }

  // 5. 거래 리스트 조회 엔드포인트
  @Get('/history')
  async getTransferHistory(
    @Query() balanceRequest: TransferHistoryRequest,
  ): Promise<TransferHistoryResponse> {
    const { walletId, startIndex, maxCount } = balanceRequest;
    const histories = await this.transferService.getHistories(
      1,
      walletId,
      startIndex,
      maxCount,
    );

    const reponse: TransferHistoryResponse = { histories };

    return reponse;
  }
}
