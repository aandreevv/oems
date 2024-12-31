import { IsNotEmpty, IsString } from 'class-validator';

export class SearchUsersRequest {
  @IsString()
  @IsNotEmpty()
  search: string;

  @IsString()
  @IsNotEmpty()
  accountId: string;
}
