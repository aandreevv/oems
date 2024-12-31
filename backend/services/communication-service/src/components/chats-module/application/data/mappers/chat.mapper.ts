import { ChatEntity } from '../entities/chat.entity';
import { ChatResponse } from '../responses/chat.response';

export class ChatMapper {
  static requestToGetResponse(entity: ChatEntity): ChatResponse {
    return {
      id: entity.id,
      threadId: entity.threadId,
      image: entity.image,
      topic: entity.topic,
      createdAt: entity.createdAt,
    };
  }
}
