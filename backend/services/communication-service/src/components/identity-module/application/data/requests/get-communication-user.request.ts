import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetCommunicationUserRequest {
  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsString()
  @IsOptional()
  displayName: string;
}
