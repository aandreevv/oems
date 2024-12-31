import { Injectable, NotFoundException } from '@nestjs/common';
import { ConnectionRepositoryPort } from '../../ports/connection-repository.port';
import { ConnectionResponse } from '../data/responses/connection.response';
import { ProfileRepositoryPort } from '../../ports/profile-repository.port';
import { ACCOUNT_IS_NOT_FOUND } from '../../../../exceptions';
import { GetAccountByIdRequest } from '../data/requests/get-account-by-id.request';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class GetUserConnections {
  constructor(
    private readonly connectionRepository: ConnectionRepositoryPort,
    private readonly profileRepository: ProfileRepositoryPort,
  ) {}

  async execute({ id }: GetAccountByIdRequest): Promise<ConnectionResponse[]> {
    const profile = await this.profileRepository.findByAccountId(id);
    if (!profile) throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));
    return this.connectionRepository.findUserConnections(profile);
  }
}
