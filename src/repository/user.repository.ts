import { Wallet } from 'src/entity/wallet.entity';
import { IBaseRespository } from './base.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from 'src/entity/user.entity';

@Injectable()
export class UserRepository implements IBaseRespository<User, number> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  create(entity: User): Promise<User> {
    throw new Error('Method not implemented.');
  }

  update(entity: User, ...data: any): Promise<UpdateResult> {
    throw new Error('Method not implemented.');
  }

  remove(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
