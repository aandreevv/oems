import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { FollowRepositoryPort } from '../../ports/follow-repository.port';
import { FollowRequest } from '../data/requests/follow.request';
import { ProfileRepositoryPort } from '../../ports/profile-repository.port';
import { FollowMapper } from '../data/mappers/follow.mapper';
import { FollowResponse } from '../data/responses/follow.response';
import { CAN_NOT_FOLLOW_OURSELF, USER_IS_ALREADY_FOLLOWED } from '../../../../exceptions';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class FollowUser {
  constructor(
    private readonly followRepository: FollowRepositoryPort,
    private readonly profileRepositoryPort: ProfileRepositoryPort,
  ) {}

  async execute(followArgs: FollowRequest): Promise<FollowResponse> {
    if (followArgs.followerId === followArgs.followingId) throw new RpcException(new BadRequestException(CAN_NOT_FOLLOW_OURSELF));
    const follower = await this.profileRepositoryPort.findByAccountId(followArgs.followerId);
    const following = await this.profileRepositoryPort.findByAccountId(followArgs.followingId);
    const followExists = await this.followRepository.findFollow(follower, following);
    if (followExists) throw new RpcException(new ConflictException(USER_IS_ALREADY_FOLLOWED));
    const follow = await this.followRepository.create(follower, following);
    return FollowMapper.requestToGetResponse(follow);
  }
}
