import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunicationIdentity } from '../application/data/entities/communication-identity.entity';
import { Repository } from 'typeorm';
import { CommunicationIdentityRepositoryPort } from '../ports/communication-identity-repository.port';

@Injectable()
export class PostgresCommunicationIdentityRepositoryAdapter
  implements CommunicationIdentityRepositoryPort
{
  constructor(
    @InjectRepository(CommunicationIdentity)
    private readonly communicationIdentityRepository: Repository<CommunicationIdentity>,
  ) {}

  findByAccount(accountId: string): Promise<CommunicationIdentity> {
    return this.communicationIdentityRepository.findOne({
      where: { accountId },
    });
  }

  create(user: CommunicationIdentity): Promise<CommunicationIdentity> {
    return this.communicationIdentityRepository.save(user);
  }
}
