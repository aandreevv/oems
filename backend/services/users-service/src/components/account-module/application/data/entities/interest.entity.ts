import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { InterestEnum } from '../enums/interest.enum';

@Entity()
export class InterestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProfileEntity, (profile) => profile.interests, { onDelete: 'CASCADE' })
  profile: ProfileEntity;

  @Column({ enum: InterestEnum })
  type: InterestEnum;
}
