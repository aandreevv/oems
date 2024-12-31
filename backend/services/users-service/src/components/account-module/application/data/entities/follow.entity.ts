import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Entity()
export class FollowEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProfileEntity, (profile) => profile.followers, { onDelete: 'CASCADE' })
  follower: ProfileEntity;

  @ManyToOne(() => ProfileEntity, (profile) => profile.followings, { onDelete: 'CASCADE' })
  following: ProfileEntity;
}
