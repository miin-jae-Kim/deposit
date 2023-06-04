import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/entity/wallet.entity';
import { User } from 'src/entity/user.entity';
import { UserRepository } from 'src/repository/user.repository';
import { WalletRepository } from 'src/repository/wallet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wallet])],
  controllers: [WalletController],
  providers: [WalletService, UserRepository, WalletRepository],
})
export class WalletModule {}
