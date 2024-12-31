import { TokenRepositoryPort } from '../ports/token-repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from '../application/data/entities/token.entity';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../account-module/application/data/entities/account.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ACCOUNT_IS_NOT_FOUND } from '../../../exceptions';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class PostgresTokenRepositoryAdapter implements TokenRepositoryPort {
  constructor(@InjectRepository(TokenEntity) private readonly tokenRepository: Repository<TokenEntity>) {}

  public async delete(token: string, account: AccountEntity): Promise<void> {
    const existingToken = await this.tokenRepository.findOne({ where: { token, account } });
    if (!existingToken) throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));
    await this.tokenRepository.delete(existingToken);
  }

  public async save(token: string, account: AccountEntity): Promise<void> {
    await this.tokenRepository.save({ token, account });
  }
}
