import { Injectable } from '@nestjs/common';
import { InterestRepositoryPort } from '../ports/interest-repository.port';
import { InterestEntity } from '../application/data/entities/interest.entity';
import { ProfileEntity } from '../application/data/entities/profile.entity';
import { CreateInterestRequest } from '../application/data/requests/create-interest.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterestEnum } from '../application/data/enums/interest.enum';

@Injectable()
export class PostgresInterestRepositoryAdapter implements InterestRepositoryPort {
  constructor(@InjectRepository(InterestEntity) private readonly interestRepository: Repository<InterestEntity>) {}

  findUserInterest(type: InterestEnum, profile: ProfileEntity): Promise<InterestEntity> {
    return this.interestRepository.findOne({ where: { type, profile } });
  }

  async create(createArgs: CreateInterestRequest, profile: ProfileEntity): Promise<InterestEntity[]> {
    const { types } = createArgs;
    const userInterests = await this.findUserInterests(profile);
    const newInterests = types
      .filter((type) => !userInterests.find((interest) => interest.type === type))
      .map((item) => ({ type: item, profile }) as InterestEntity);
    return this.interestRepository.save(newInterests);
  }

  delete(interest: InterestEntity): Promise<InterestEntity> {
    return this.interestRepository.remove(interest);
  }

  findUserInterests(profile: ProfileEntity): Promise<InterestEntity[]> {
    return this.interestRepository.find({ where: { profile } });
  }

  findById(id: string): Promise<InterestEntity> {
    return this.interestRepository.findOne({ where: { id }, relations: { profile: true } });
  }
}
