import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';
import { InviteStatusEnum } from '../enums/invite-status.enum';

@Entity()
export class InviteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  receiverId: string;

  @Column()
  senderId: string;

  @Column({ nullable: true })
  inviteText: string;

  @Column({ nullable: true })
  responseText: string;

  @Column({ enum: InviteStatusEnum, default: InviteStatusEnum.PENDING })
  status: InviteStatusEnum;

  @ManyToOne(() => EventEntity, (event) => event.invites, {
    onDelete: 'CASCADE',
  })
  event: EventEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
