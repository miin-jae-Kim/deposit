import { Injectable, NotFoundException } from '@nestjs/common';
import { Wallet } from 'src/entity/wallet.entity';
import { UserRepository } from 'src/repository/user.repository';
import { WalletRepository } from 'src/repository/wallet.repository';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly userRepository: UserRepository,
  ) {}

  // 1. 지갑 생성
  async createWallet(userId: number, balance: number): Promise<Wallet> {
    const wallet = new Wallet();
    wallet.balance = balance;

    const user = await this.userRepository.findOne(userId);
    if (!user) throw new NotFoundException('User not found');
    wallet.user = user;

    return this.walletRepository.create(wallet);
  }

  // 2. 잔액 조회
  async getBalance(userId: number, walletId: string): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne(walletId);
    if (!wallet) throw new NotFoundException('Wallet not found');
    if (wallet.user.id !== userId)
      throw new NotFoundException('Wallet not found');
    return wallet;
  }
}
