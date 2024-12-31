import { IsNotEmpty, IsString } from 'class-validator';

export class SearchEventsRequest {
  @IsString()
  @IsNotEmpty()
  search: string;
}
