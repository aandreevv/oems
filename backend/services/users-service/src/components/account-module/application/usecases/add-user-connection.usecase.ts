import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ConnectionRepositoryPort } from '../../ports/connection-repository.port';
import { CreateConnectionRequest } from '../data/requests/create-connection.request';
import { ConnectionResponse } from '../data/responses/connection.response';
import { ProfileRepositoryPort } from '../../ports/profile-repository.port';
import { ACCOUNT_IS_NOT_FOUND, CONNECTION_IS_ALREADY_ADDED } from '../../../../exceptions';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AddUserConnection {
  constructor(
    private readonly connectionRepository: ConnectionRepositoryPort,
    private readonly profileRepository: ProfileRepositoryPort,
  ) {}

  async execute(body: CreateConnectionRequest): Promise<ConnectionResponse[]> {
    const profile = await this.profileRepository.findByAccountId(body.accountId);
    if (!profile) throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));
    const existingConnection = await this.connectionRepository.findUserConnection(body.type, profile);
    if (existingConnection) throw new RpcException(new ConflictException(CONNECTION_IS_ALREADY_ADDED));
    await this.connectionRepository.create(body, profile);
    return this.connectionRepository.findUserConnections(profile);
  }
}
