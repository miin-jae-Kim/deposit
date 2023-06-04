import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Wallet } from './entity/wallet.entity';
import { TransferModule } from './transfer/transfer.module';
import { TransferHistory } from './entity/transfer-history.entity';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    TransferModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [User, Wallet, TransferHistory],
      synchronize: true,
    }),
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
