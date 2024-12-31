import { RoomRepositoryPort } from '../ports/room-repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from '../application/data/entities/room.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostgresRoomRepositoryAdapter implements RoomRepositoryPort {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  findByRoomId(roomId: string): Promise<RoomEntity> {
    return this.roomRepository.findOne({ where: { roomId } });
  }

  findById(id: string): Promise<RoomEntity> {
    return this.roomRepository.findOne({ where: { id } });
  }

  create(entity: RoomEntity): Promise<RoomEntity> {
    return this.roomRepository.save(entity);
  }
}
