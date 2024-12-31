import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventEntity } from './event.entity';

@Entity()
export class AttendeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accountId: string;

  @ManyToOne(() => EventEntity, (event) => event.attendees, {
    onDelete: 'CASCADE',
  })
  event: EventEntity;
}
