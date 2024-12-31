import { Controller } from '@nestjs/common';
import { CreateCommunicationUser } from '../application/usecases/create-communication-user.usecase';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { GetCommunicationUserRequest } from '../application/data/requests/get-communication-user.request';
import { GetCommunicationTokens } from '../application/usecases/get-communication-tokens.usecase';
import { CommunicationTokenType } from '../application/data/types/communication-token.type';

@Controller('identities')
export class IdentityController {
  constructor(
    private readonly createCommunicationUser: CreateCommunicationUser,
    private readonly getCommunicationTokens: GetCommunicationTokens,
  ) {}

  @EventPattern('account_created')
  createCommunicationUserRequest(
    @Payload() payload: GetCommunicationUserRequest,
  ): Promise<void> {
    return this.createCommunicationUser.execute(payload);
  }

  @MessagePattern('get-communication-token')
  getCommunicationTokensRequest(
    @Payload() payload: GetCommunicationUserRequest,
  ): Promise<CommunicationTokenType> {
    return this.getCommunicationTokens.execute(payload);
  }
}
