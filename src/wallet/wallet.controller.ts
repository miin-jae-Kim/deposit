import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';
import {
  WalletCreateRequest,
  WalletCreateResponse,
} from 'src/interface/wallet.interface';
import {
  BalanceRequest,
  BalanceResponse,
} from 'src/interface/balance.interface';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // 1. 지갑 생성 엔드포인트
  @Post()
  async createWallet(
    @Body() walletCreateRequest: WalletCreateRequest,
  ): Promise<WalletCreateResponse> {
    const { balance } = walletCreateRequest;

    const wallet = await this.walletService.createWallet(1, balance);

    const response: WalletCreateResponse = {
      id: wallet.id,
      balance: wallet.balance,
    };

    return response;
  }

  // 4. 잔액 조회 엔드포인트
  @Get('/balance')
  async getBalance(
    @Query() balanceRequest: BalanceRequest,
  ): Promise<BalanceResponse> {
    const { walletId } = balanceRequest;
    const wallet = await this.walletService.getBalance(1, walletId);

    const response: BalanceResponse = {
      walletId: wallet.id,
      balance: wallet.balance,
    };

    return response;
  }
}
