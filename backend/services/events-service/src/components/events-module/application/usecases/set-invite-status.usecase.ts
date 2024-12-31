import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InviteRepositoryPort } from '../../ports/invite-repository.port';
import { SetInviteStatusRequest } from '../data/requests/set-invite-status.request';
import { UsersService } from '../../../../shared-module/secondary-adapters/services/users.service';
import { RpcException } from '@nestjs/microservices';
import {
  INVITE_IS_NOT_FOUND,
  YOU_ARE_NOT_THE_RECEIVER_OF_THIS_INVITE,
} from '../../../../constants/exceptions';
import { InviteMapper } from '../data/mappers/invite.mapper';
import { EventInviteResponse } from '../data/responses/event-invite.response';
import { firstValueFrom } from 'rxjs';
import { AppendAttendedUsers } from './append-attended-users.usecase';
import { InviteStatusEnum } from '../data/enums/invite-status.enum';

@Injectable()
export class SetInviteStatus {
  constructor(
    private readonly inviteRepository: InviteRepositoryPort,
    private readonly usersService: UsersService,
    private readonly appendAttendedUsers: AppendAttendedUsers,
  ) {}

  async execute(request: SetInviteStatusRequest): Promise<EventInviteResponse> {
    const invite = await this.inviteRepository.findById(request.inviteId, {
      event: true,
    });
    if (!invite)
      throw new RpcException(new NotFoundException(INVITE_IS_NOT_FOUND));

    if (invite.receiverId !== request.account.id)
      throw new RpcException(
        new ForbiddenException(YOU_ARE_NOT_THE_RECEIVER_OF_THIS_INVITE),
      );

    const updatedInvite = await this.inviteRepository.save({
      ...invite,
      status: request.status,
      responseText: request.responseText,
    });

    const sender = await firstValueFrom(
      this.usersService.getAccountById(updatedInvite.senderId),
    );

    if (request.status === InviteStatusEnum.ACCEPTED)
      await this.appendAttendedUsers.execute(request.account, invite.event);

    return InviteMapper.requestToGetResponse(updatedInvite, sender);
  }
}
