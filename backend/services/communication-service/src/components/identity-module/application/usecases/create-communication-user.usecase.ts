import { Injectable } from '@nestjs/common';
import { CommunicationIdentityRepositoryPort } from '../../ports/communication-identity-repository.port';
import { CommunicationIdentityServicePort } from '../../ports/communication-identity-service.port';
import { GetCommunicationUserRequest } from '../data/requests/get-communication-user.request';
import { CommunicationIdentityMapper } from '../data/mappers/communication-identity.mapper';

@Injectable()
export class CreateCommunicationUser {
  constructor(
    private readonly communicationIdentityRepository: CommunicationIdentityRepositoryPort,
    private readonly communicationIdentityService: CommunicationIdentityServicePort,
  ) {}

  async execute({
    accountId,
    displayName,
  }: GetCommunicationUserRequest): Promise<void> {
    const { communicationUserId } =
      await this.communicationIdentityService.createIdentity();
    await this.communicationIdentityRepository.create(
      CommunicationIdentityMapper.requestToEntity({
        accountId,
        communicationUserId,
        displayName,
      }),
    );
  }
}
