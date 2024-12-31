import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventAccessEnum } from '../enums/event-access.enum';
import { AttendeeEntity } from './attendee.entity';
import { InviteEntity } from './invite.entity';
import { EventTypeEnum } from '../enums/event-type.enum';
import { TicketEntity } from './ticket.entity';

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  date: Date;

  @Column({ enum: EventAccessEnum })
  access: EventAccessEnum;

  @Column()
  ownerId: string;

  @Column()
  paid: boolean;

  @Column({ nullable: true })
  price?: number;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  roomId: string;

  @Column({ nullable: true })
  chatId: string;

  @Column('text', { array: true, default: {} })
  categories: string[];

  @Column({ enum: EventTypeEnum })
  type: EventTypeEnum;

  @OneToMany(() => AttendeeEntity, (attendee) => attendee.event)
  attendees: AttendeeEntity[];

  @OneToMany(() => InviteEntity, (invite) => invite.event)
  invites: InviteEntity[];

  @OneToMany(() => TicketEntity, (ticket) => ticket.event)
  tickets: TicketEntity[];
}
