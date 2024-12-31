import { CommunicationIdentity } from '../application/data/entities/communication-identity.entity';

export abstract class CommunicationIdentityRepositoryPort {
  abstract create(user: CommunicationIdentity): Promise<CommunicationIdentity>;
  abstract findByAccount(accountId: string): Promise<CommunicationIdentity>;
}
