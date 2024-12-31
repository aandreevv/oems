import { CommunicationUserType } from '../application/data/types/communication-user.type';
import { CommunicationTokenType } from '../application/data/types/communication-token.type';

export abstract class CommunicationIdentityServicePort {
  abstract createIdentity(): Promise<CommunicationUserType>;
  abstract issueToken(
    communicationUser: CommunicationUserType,
  ): Promise<CommunicationTokenType>;
}
