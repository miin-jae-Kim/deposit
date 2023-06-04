import { Injectable } from '@nestjs/common';
import { IBaseRespository } from './base.repository';
import { TransferHistory } from 'src/entity/transfer-history.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TRANSFER_STATUS } from 'src/enum/transfer-status.enum';

@Injectable()
export class TransferHistoryRepository
  implements IBaseRespository<TransferHistory, number>
{
  constructor(
    @InjectRepository(TransferHistory)
    private transferHistoryRepository: Repository<TransferHistory>,
  ) {}

  async findAll(
    where: object,
    startIndex?: number,
    maxCount?: number,
  ): Promise<TransferHistory[]> {
    return this.transferHistoryRepository.find({
      where,
      skip: startIndex,
      take: maxCount,
    });
  }
  findOne(id: number): Promise<TransferHistory> {
    throw new Error('Method not implemented.');
  }
  async create(entity: TransferHistory): Promise<TransferHistory> {
    return this.transferHistoryRepository.save(entity);
  }
  async update(entity: TransferHistory, data: any): Promise<UpdateResult> {
    return this.transferHistoryRepository.update(entity, data);
  }
  remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
