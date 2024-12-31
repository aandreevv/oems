import { Injectable } from '@nestjs/common';
import { CommunicationIdentityServicePort } from '../ports/communication-identity-service.port';
import { CommunicationIdentityClient } from '@azure/communication-identity';
import { ConfigService } from '@nestjs/config';
import { CommunicationUserType } from '../application/data/types/communication-user.type';
import { CommunicationTokenType } from '../application/data/types/communication-token.type';

@Injectable()
export class AzureCommunicationIdentityServiceAdapter
  implements CommunicationIdentityServicePort
{
  private readonly identityClient: CommunicationIdentityClient;

  constructor(private readonly configService: ConfigService) {
    this.identityClient = new CommunicationIdentityClient(
      this.configService.get<string>('azureCommunicationConnectionString'),
    );
  }

  async createIdentity(): Promise<CommunicationUserType> {
    return this.identityClient.createUser();
  }

  async issueToken(
    communicationUser: CommunicationUserType,
  ): Promise<CommunicationTokenType> {
    const token = await this.identityClient.getToken(communicationUser, [
      'voip',
      'chat',
    ]);
    return { ...token, identityId: communicationUser.communicationUserId };
  }
}
