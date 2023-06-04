import { Wallet } from 'src/entity/wallet.entity';
import { IBaseRespository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class WalletRepository implements IBaseRespository<Wallet, string> {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}
  async findAll(): Promise<Wallet[]> {
    return this.walletRepository.find();
  }

  async findOne(id: string): Promise<Wallet> {
    return this.walletRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async create(entity: Wallet): Promise<Wallet> {
    return this.walletRepository.save(entity);
  }

  async update(entity: Wallet, data: any): Promise<UpdateResult> {
    return this.walletRepository.update(entity, data);
  }

  async remove(id: string): Promise<void> {
    await this.walletRepository.delete(id);
  }
}
