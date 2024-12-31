import { Injectable } from '@nestjs/common';
import { CommunicationIdentityServicePort } from '../../ports/communication-identity-service.port';
import { CommunicationIdentityRepositoryPort } from '../../ports/communication-identity-repository.port';
import { GetCommunicationUserRequest } from '../data/requests/get-communication-user.request';
import { CommunicationTokenType } from '../data/types/communication-token.type';

@Injectable()
export class GetCommunicationTokens {
  constructor(
    private readonly communicationIdentityService: CommunicationIdentityServicePort,
    private readonly communicationIdentityRepository: CommunicationIdentityRepositoryPort,
  ) {}

  async execute({
    accountId,
  }: GetCommunicationUserRequest): Promise<CommunicationTokenType> {
    const { identityId } =
      await this.communicationIdentityRepository.findByAccount(accountId);
    return this.communicationIdentityService.issueToken({
      communicationUserId: identityId,
    });
  }
}
