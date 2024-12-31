import { FollowEntity } from '../application/data/entities/follow.entity';
import { ProfileEntity } from '../application/data/entities/profile.entity';

export abstract class FollowRepositoryPort {
  abstract create(follower: ProfileEntity, following: ProfileEntity): Promise<FollowEntity>;
  abstract delete(entity: FollowEntity): Promise<FollowEntity>;
  abstract findUserFollowers(user: ProfileEntity): Promise<FollowEntity[]>;
  abstract findUserFollowings(user: ProfileEntity): Promise<FollowEntity[]>;
  abstract findFollow(follower: ProfileEntity, following: ProfileEntity): Promise<FollowEntity>;
  abstract countFollowings(user: ProfileEntity): Promise<number>;
  abstract countFollowers(user: ProfileEntity): Promise<number>;
}
