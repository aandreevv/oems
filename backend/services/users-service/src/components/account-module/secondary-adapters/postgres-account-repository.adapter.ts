import { Injectable } from '@nestjs/common';
import { AccountRepositoryPort } from '../ports/account-repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../application/data/entities/account.entity';
import { In, Repository } from 'typeorm';
import { CreateAccountRequest } from '../application/data/requests/create-account.request';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { ProfileRepositoryPort } from '../ports/profile-repository.port';

@Injectable()
export class PostgresAccountRepositoryAdapter implements AccountRepositoryPort {
  constructor(@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>) {}

  findByIds(ids: string[]): Promise<AccountEntity[]> {
    return this.accountRepository.find({ where: { id: In(ids) }, relations: { profile: true } });
  }

  searchUsers(search: string, accountId: string): Promise<AccountEntity[]> {
    return this.accountRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.profile', 'profile')
      .where('(LOWER(profile.username) LIKE :search OR LOWER(profile.fullName) LIKE :search) AND account.id != :accountId', {
        search: `%${search}%`,
        accountId,
      })
      .getMany();
  }

  public async save(createArgs: CreateAccountRequest): Promise<AccountEntity> {
    return this.accountRepository.save(createArgs);
  }

  public async findById(id: string, relations?: FindOptionsRelations<AccountEntity>): Promise<AccountEntity> {
    return this.accountRepository.findOne({ where: { id }, relations: { profile: true, ...relations } });
  }

  public async findByEmail(email: string): Promise<AccountEntity> {
    return this.accountRepository.findOne({ where: { email } });
  }
}
