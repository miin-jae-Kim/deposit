import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Wallet } from 'src/entity/wallet.entity';
import { WalletRepository } from 'src/repository/wallet.repository';
import { UserRepository } from 'src/repository/user.repository';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { TransferHistoryRepository } from 'src/repository/transfer-history.repository';
import { TransferHistory } from 'src/entity/transfer-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wallet, TransferHistory])],
  controllers: [TransferController],
  providers: [
    TransferService,
    UserRepository,
    WalletRepository,
    TransferHistoryRepository,
  ],
})
export class TransferModule {}
