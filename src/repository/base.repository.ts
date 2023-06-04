import { UpdateResult } from 'typeorm';

export interface IBaseRespository<T, D> {
  findAll(...data): Promise<T[]>;

  findOne(id: D): Promise<T | null>;

  create(entity: T): Promise<T>;

  update(entity: T, data: any): Promise<UpdateResult>;

  remove(id: D): Promise<void>;
}
