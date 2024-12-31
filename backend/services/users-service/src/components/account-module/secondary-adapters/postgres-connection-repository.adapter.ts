import { Injectable } from '@nestjs/common';
import { ConnectionRepositoryPort } from '../ports/connection-repository.port';
import { ProfileEntity } from '../application/data/entities/profile.entity';
import { CreateConnectionRequest } from '../application/data/requests/create-connection.request';
import { InjectRepository } from '@nestjs/typeorm';
import { ConnectionEntity } from '../application/data/entities/connection.entity';
import { Repository } from 'typeorm';
import { ConnectionEnum } from '../application/data/enums/connection.enum';

@Injectable()
export class PostgresConnectionRepositoryAdapter implements ConnectionRepositoryPort {
  constructor(@InjectRepository(ConnectionEntity) private readonly connectionRepository: Repository<ConnectionEntity>) {}

  findUserConnection(type: ConnectionEnum, profile: ProfileEntity): Promise<ConnectionEntity> {
    return this.connectionRepository.findOne({ where: { type, profile } });
  }

  findById(id: string): Promise<ConnectionEntity> {
    return this.connectionRepository.findOne({ where: { id }, relations: { profile: true } });
  }

  findUserConnections(profile: ProfileEntity): Promise<ConnectionEntity[]> {
    return this.connectionRepository.find({ where: { profile } });
  }

  create(createArgs: CreateConnectionRequest, profile: ProfileEntity): Promise<ConnectionEntity> {
    return this.connectionRepository.save({ ...createArgs, profile });
  }

  delete(connection: ConnectionEntity): Promise<ConnectionEntity> {
    return this.connectionRepository.remove(connection);
  }
}
