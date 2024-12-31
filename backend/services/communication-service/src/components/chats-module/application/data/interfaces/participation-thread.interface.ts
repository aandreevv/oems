import { CommunicationIdentity } from '../../../../identity-module/application/data/entities/communication-identity.entity';
import { GetChatClientInterface } from './get-chat-client.interface';

export interface ParticipationThreadInterface extends GetChatClientInterface {
  threadId: string;
  participant: CommunicationIdentity;
}
