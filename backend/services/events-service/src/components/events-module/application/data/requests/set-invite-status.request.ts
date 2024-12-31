import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { InviteStatusEnum } from '../enums/invite-status.enum';
import { AccountInterface } from '../../../../../shared-module/application/data/interfaces/account.interface';

export class SetInviteStatusRequest {
  @IsUUID()
  @IsNotEmpty()
  inviteId: string;

  @IsEnum(InviteStatusEnum)
  @IsNotEmpty()
  status: InviteStatusEnum;

  @IsUUID()
  @IsNotEmpty()
  account: AccountInterface;

  @IsString()
  @IsOptional()
  responseText?: string;
}
