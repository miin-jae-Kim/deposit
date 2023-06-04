import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransferHistory } from 'src/entity/transfer-history.entity';
import { Wallet } from 'src/entity/wallet.entity';
import { TRANSFER_STATUS } from 'src/enum/transfer-status.enum';
import { TRANSFER_TYPE } from 'src/enum/transfer-type.enum';
import { TransferHistoryRepository } from 'src/repository/transfer-history.repository';
import { WalletRepository } from 'src/repository/wallet.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class TransferService {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly transferHistoryRepository: TransferHistoryRepository,
    private readonly dataScource: DataSource,
  ) {}
  // 2. 입출금 엔드포인트
  async transfer(
    userId: number,
    walletId: string,
    balance: number,
    transferType: TRANSFER_TYPE,
  ): Promise<TransferHistory> {
    const wallet: Wallet = await this.walletRepository.findOne(walletId);
    if (!wallet) throw new NotFoundException('Cannot found wallet');
    if (wallet.user.id !== userId)
      throw new NotFoundException('Cannot find wallet');

    const transferHistory = new TransferHistory();
    transferHistory.walletId = wallet.id;
    transferHistory.balance = balance;
    transferHistory.transferType = transferType;

    return transferType === TRANSFER_TYPE.DEPOSIT
      ? this.deposit(wallet, balance, transferType)
      : this.withdraw(wallet, balance, transferType);
  }

  // 3. 거래(입출금) 처리 엔드포인트
  async commitTransfer(): Promise<number> {
    const querryRunner = this.dataScource.createQueryRunner();
    await querryRunner.connect();
    await querryRunner.startTransaction();
    let completedTransactionCount = 0;

    try {
      const unCompletedTransactions =
        await this.transferHistoryRepository.findAll({
          transferStatus: TRANSFER_STATUS.IN_PROGRESS,
        });

      console.log(111111, unCompletedTransactions);

      for (let i = 0; i < unCompletedTransactions.length; i++) {
        const unCompletedTransaction = unCompletedTransactions[i];
        const wallet = await this.walletRepository.findOne(
          unCompletedTransaction.walletId,
        );
        unCompletedTransaction.transferType === TRANSFER_TYPE.DEPOSIT
          ? await this.walletRepository.update(wallet, {
              balance: wallet.balance + unCompletedTransaction.balance,
            })
          : await this.walletRepository.update(wallet, {
              balance: wallet.balance - unCompletedTransaction.balance,
            });

        await this.transferHistoryRepository.update(unCompletedTransaction, {
          transferStatus: TRANSFER_STATUS.COMPLETED,
        });
        completedTransactionCount++;
        console.log('completed transaction count', completedTransactionCount);
      }

      querryRunner.commitTransaction();
      return completedTransactionCount;
    } catch (error) {
      console.error(error);
      await querryRunner.rollbackTransaction();
    } finally {
      await querryRunner.release();
    }
  }

  // 5. 거래(입출금) 내역 리스트 조회 엔드포인트
  async getHistories(
    userId: number,
    walletId: string,
    startIndex: number,
    maxCount: number,
  ): Promise<TransferHistory[]> {
    const wallet = await this.walletRepository.findOne(walletId);
    if (!wallet) throw new NotFoundException('Cannot found wallet');
    if (wallet.user.id !== userId)
      throw new NotFoundException('Cannot find wallet');

    return this.transferHistoryRepository.findAll(
      { walletId },
      startIndex,
      maxCount,
    );
  }

  private deposit(
    wallet: Wallet,
    balance: number,
    transferType: TRANSFER_TYPE,
  ): Promise<TransferHistory> {
    const transferHistory = new TransferHistory();
    transferHistory.walletId = wallet.id;
    transferHistory.balance = balance;
    transferHistory.transferType = transferType;

    return this.transferHistoryRepository.create(transferHistory);
  }

  private withdraw(
    wallet: Wallet,
    balance: number,
    transferType: TRANSFER_TYPE,
  ): Promise<TransferHistory> {
    const transferHistory = new TransferHistory();
    transferHistory.walletId = wallet.id;
    transferHistory.balance = balance;
    transferHistory.transferType = transferType;

    if (wallet.balance < balance)
      throw new ForbiddenException('Cannot withdraw over than wallet balance');

    return this.transferHistoryRepository.create(transferHistory);
  }
}
