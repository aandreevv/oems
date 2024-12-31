import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { ConnectionEnum } from '../enums/connection.enum';

@Entity()
export class ConnectionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProfileEntity, (profile) => profile.connections, { onDelete: 'CASCADE' })
  profile: ProfileEntity;

  @Column({ enum: ConnectionEnum })
  type: ConnectionEnum;

  @Column()
  url: string;
}
