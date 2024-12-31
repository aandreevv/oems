import { Injectable, NotFoundException } from '@nestjs/common';
import { ConnectionRepositoryPort } from '../../ports/connection-repository.port';
import { GetConnectionRequest } from '../data/requests/get-connection.request';
import { ConnectionResponse } from '../data/responses/connection.response';
import { CONNECTION_IS_NOT_FOUND } from '../../../../exceptions';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RemoveUserConnection {
  constructor(private readonly connectionRepository: ConnectionRepositoryPort) {}

  async execute(body: GetConnectionRequest): Promise<ConnectionResponse[]> {
    const connection = await this.connectionRepository.findById(body.connectionId);
    if (!connection) throw new RpcException(new NotFoundException(CONNECTION_IS_NOT_FOUND));
    await this.connectionRepository.delete(connection);
    return this.connectionRepository.findUserConnections(connection.profile);
  }
}
