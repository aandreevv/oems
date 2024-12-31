import { Injectable } from '@nestjs/common';
import { FollowRepositoryPort } from '../ports/follow-repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowEntity } from '../application/data/entities/follow.entity';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../application/data/entities/profile.entity';

@Injectable()
export class PostgresFollowRepositoryAdapter implements FollowRepositoryPort {
  constructor(@InjectRepository(FollowEntity) private readonly followEntityRepository: Repository<FollowEntity>) {}

  countFollowings(user: ProfileEntity): Promise<number> {
    return this.followEntityRepository.count({ where: { follower: user } });
  }

  countFollowers(user: ProfileEntity): Promise<number> {
    return this.followEntityRepository.count({ where: { following: user } });
  }

  findFollow(follower: ProfileEntity, following: ProfileEntity): Promise<FollowEntity> {
    return this.followEntityRepository.findOne({
      where: {
        following,
        follower,
      },
      relations: {
        follower: { account: true },
        following: { account: true },
      },
    });
  }

  findUserFollowers(user: ProfileEntity): Promise<FollowEntity[]> {
    return this.followEntityRepository.find({
      where: {
        following: user,
      },
      relations: {
        follower: {
          account: true,
        },
      },
    });
  }

  findUserFollowings(user: ProfileEntity): Promise<FollowEntity[]> {
    return this.followEntityRepository.find({
      where: {
        follower: user,
      },
      relations: {
        following: {
          account: true,
        },
      },
    });
  }

  delete(entity: FollowEntity): Promise<FollowEntity> {
    return this.followEntityRepository.remove(entity);
  }

  create(follower: ProfileEntity, following: ProfileEntity): Promise<FollowEntity> {
    return this.followEntityRepository.save({ follower, following });
  }
}
