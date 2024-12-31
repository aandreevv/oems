import { Injectable } from '@nestjs/common';
import { ChatRepositoryPort } from '../ports/chat-repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatEntity } from '../application/data/entities/chat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostgresChatRepositoryAdapter implements ChatRepositoryPort {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatEntityRepository: Repository<ChatEntity>,
  ) {}

  findById(id: string): Promise<ChatEntity> {
    return this.chatEntityRepository.findOne({ where: { id } });
  }

  findByThreadId(threadId: string): Promise<ChatEntity> {
    return this.chatEntityRepository.findOne({ where: { threadId } });
  }

  create(threadId: string, topic: string, image?: string): Promise<ChatEntity> {
    return this.chatEntityRepository.save({ threadId, image, topic });
  }
}
