import { BadRequestException, Injectable } from '@nestjs/common';
import { FollowRepositoryPort } from '../../ports/follow-repository.port';
import { FollowRequest } from '../data/requests/follow.request';
import { ProfileRepositoryPort } from '../../ports/profile-repository.port';
import { FollowMapper } from '../data/mappers/follow.mapper';
import { FollowResponse } from '../data/responses/follow.response';
import { USER_IS_NOT_FOLLOWED } from '../../../../exceptions';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UnfollowUser {
  constructor(
    private readonly followRepository: FollowRepositoryPort,
    private readonly profileRepositoryPort: ProfileRepositoryPort,
  ) {}

  async execute(followArgs: FollowRequest): Promise<FollowResponse> {
    const follower = await this.profileRepositoryPort.findByAccountId(followArgs.followerId);
    const following = await this.profileRepositoryPort.findByAccountId(followArgs.followingId);
    const follow = await this.followRepository.findFollow(follower, following);
    if (!follow) throw new RpcException(new BadRequestException(USER_IS_NOT_FOLLOWED));
    await this.followRepository.delete(follow);
    return FollowMapper.requestToGetResponse(follow);
  }
}
