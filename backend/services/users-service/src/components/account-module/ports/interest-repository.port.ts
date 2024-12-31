import { ProfileEntity } from '../application/data/entities/profile.entity';
import { InterestEntity } from '../application/data/entities/interest.entity';
import { CreateInterestRequest } from '../application/data/requests/create-interest.request';
import { InterestEnum } from '../application/data/enums/interest.enum';

export abstract class InterestRepositoryPort {
  abstract create(createArgs: CreateInterestRequest, profile: ProfileEntity): Promise<InterestEntity[]>;
  abstract delete(interest: InterestEntity): Promise<InterestEntity>;
  abstract findUserInterests(profile: ProfileEntity): Promise<InterestEntity[]>;
  abstract findById(id: string): Promise<InterestEntity>;
  abstract findUserInterest(type: InterestEnum, profile: ProfileEntity): Promise<InterestEntity>;
}
