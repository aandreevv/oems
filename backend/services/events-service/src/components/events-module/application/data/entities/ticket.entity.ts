import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';

@Entity()
export class TicketEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => EventEntity, (event) => event.tickets, {
    onDelete: 'CASCADE',
  })
  event: EventEntity;

  @CreateDateColumn()
  createdAt: Date;
}
