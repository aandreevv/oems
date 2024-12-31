import { GetChatClientInterface } from './get-chat-client.interface';

export interface CreateThread extends GetChatClientInterface {
  topic: string;
}
