import { Injectable } from '@nestjs/common';
import { ChatServicePort } from '../ports/chat-service.port';
import { ChatClient, ChatThreadProperties } from '@azure/communication-chat';
import { ConfigService } from '@nestjs/config';
import { CreateThread } from '../application/data/interfaces/create-thread.interface';
import { CommunicationIdentityServicePort } from '../../identity-module/ports/communication-identity-service.port';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { GetChatClientInterface } from '../application/data/interfaces/get-chat-client.interface';
import { ParticipationThreadInterface } from '../application/data/interfaces/participation-thread.interface';

@Injectable()
export class AzureChatServiceAdapter implements ChatServicePort {
  constructor(
    private readonly configService: ConfigService,
    private readonly communicationIdentityServicePort: CommunicationIdentityServicePort,
  ) {}

  private async getChatClient({
    identity,
  }: GetChatClientInterface): Promise<ChatClient> {
    const { token } = await this.communicationIdentityServicePort.issueToken({
      communicationUserId: identity.identityId,
    });
    console.log(new AzureCommunicationTokenCredential(token));
    return new ChatClient(
      this.configService.get('azureCommunicationEndpoint'),
      new AzureCommunicationTokenCredential(token),
    );
  }

  async createThread({
    identity,
    topic,
  }: CreateThread): Promise<ChatThreadProperties> {
    const chatClient = await this.getChatClient({ identity });
    const { chatThread } = await chatClient.createChatThread(
      { topic },
      {
        participants: [
          {
            id: { communicationUserId: identity.identityId },
            displayName: identity.displayName,
          },
        ],
      },
    );

    return chatThread;
  }

  async joinThread({
    threadId,
    participant,
    identity,
  }: ParticipationThreadInterface): Promise<void> {
    const chatClient = await this.getChatClient({ identity });
    const chatThreadClient = chatClient.getChatThreadClient(threadId);

    await chatThreadClient.addParticipants({
      participants: [
        {
          id: { communicationUserId: participant.identityId },
          displayName: participant.displayName,
        },
      ],
    });
  }

  async removeFromThread({
    threadId,
    participant,
    identity,
  }: ParticipationThreadInterface): Promise<void> {
    const chatClient = await this.getChatClient({ identity });
    const chatThreadClient = chatClient.getChatThreadClient(threadId);

    await chatThreadClient.removeParticipant({
      communicationUserId: participant.identityId,
    });
  }
}
