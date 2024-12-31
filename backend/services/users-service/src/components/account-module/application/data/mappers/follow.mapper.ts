import { FollowEntity } from '../entities/follow.entity';
import { FollowResponse } from '../responses/follow.response';
import { AccountMapper } from './account.mapper';

export class FollowMapper {
  static requestToGetResponse(entity: FollowEntity): FollowResponse {
    const followerAccount = entity.follower.account;
    const followingAccount = entity.following.account;

    return {
      follower: AccountMapper.requestToGetResponse({ ...followerAccount, profile: entity.follower }),
      following: AccountMapper.requestToGetResponse({ ...followingAccount, profile: entity.following }),
    };
  }
}
