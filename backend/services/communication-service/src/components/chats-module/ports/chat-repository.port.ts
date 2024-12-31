import { ChatEntity } from '../application/data/entities/chat.entity';

export abstract class ChatRepositoryPort {
  abstract create(
    threadId: string,
    topic: string,
    image?: string,
  ): Promise<ChatEntity>;

  abstract findByThreadId(threadId: string): Promise<ChatEntity>;

  abstract findById(id: string): Promise<ChatEntity>;
}
