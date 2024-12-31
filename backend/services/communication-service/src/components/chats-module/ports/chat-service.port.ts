import { CreateThread } from '../application/data/interfaces/create-thread.interface';
import { ChatThreadProperties } from '@azure/communication-chat';
import { ParticipationThreadInterface } from '../application/data/interfaces/participation-thread.interface';

export abstract class ChatServicePort {
  abstract createThread(args: CreateThread): Promise<ChatThreadProperties>;
  abstract joinThread(args: ParticipationThreadInterface): Promise<void>;
  abstract removeFromThread(args: ParticipationThreadInterface): Promise<void>;
}
