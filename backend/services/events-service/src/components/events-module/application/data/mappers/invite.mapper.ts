import { InviteEntity } from '../entities/invite.entity';
import { AccountInterface } from '../../../../../shared-module/application/data/interfaces/account.interface';
import { EventInviteResponse } from '../responses/event-invite.response';
import { EventMapper } from './event.mapper';

export class InviteMapper {
  static requestToGetResponse(
    invite: InviteEntity,
    sender: AccountInterface,
    receiver?: AccountInterface,
  ): EventInviteResponse {
    return {
      id: invite.id,
      receiver,
      sender,
      inviteText: invite.inviteText,
      responseText: invite.responseText,
      status: invite.status,
      createdAt: invite.createdAt,
      updatedAt: invite.updatedAt,
      event: EventMapper.requestToGetResponse(invite.event, sender),
    };
  }
}
