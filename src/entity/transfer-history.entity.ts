import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TRANSFER_STATUS } from 'src/enum/transfer-status.enum';
import { TRANSFER_TYPE } from 'src/enum/transfer-type.enum';

@Entity()
export class TransferHistory {
  @PrimaryGeneratedColumn()
  id: number;

  // 이체 진행 상태
  @Column({
    nullable: false,
    default: TRANSFER_STATUS.IN_PROGRESS,
  })
  transferStatus: TRANSFER_STATUS;

  // 이체 유형 (입금, 출금)
  @Column()
  transferType: TRANSFER_TYPE;

  @Column()
  balance: number;

  @Column({
    nullable: false,
  })
  walletId: string;

  @CreateDateColumn()
  createdAt: Date;
}
