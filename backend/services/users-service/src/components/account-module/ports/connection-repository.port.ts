import { CreateConnectionRequest } from '../application/data/requests/create-connection.request';
import { ProfileEntity } from '../application/data/entities/profile.entity';
import { ConnectionEntity } from '../application/data/entities/connection.entity';
import { ConnectionEnum } from '../application/data/enums/connection.enum';

export abstract class ConnectionRepositoryPort {
  abstract create(createArgs: CreateConnectionRequest, profile: ProfileEntity): Promise<ConnectionEntity>;
  abstract delete(connection: ConnectionEntity): Promise<ConnectionEntity>;
  abstract findUserConnections(profile: ProfileEntity): Promise<ConnectionEntity[]>;
  abstract findById(id: string): Promise<ConnectionEntity>;
  abstract findUserConnection(type: ConnectionEnum, profile: ProfileEntity): Promise<ConnectionEntity>;
}
