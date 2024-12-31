import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateChatRequest {
  @IsString()
  @IsOptional()
  image?: string;

  @IsUUID()
  @IsNotEmpty()
  accountId: string;

  @IsString()
  @IsNotEmpty()
  topic: string;
}
