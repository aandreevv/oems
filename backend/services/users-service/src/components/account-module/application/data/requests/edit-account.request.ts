import { IsNotEmpty, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { EditProfileRequest } from './edit-profile.request';

export class EditAccountRequest {
  @IsOptional()
  email?: string;

  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @ValidateNested()
  profile: EditProfileRequest;
}
