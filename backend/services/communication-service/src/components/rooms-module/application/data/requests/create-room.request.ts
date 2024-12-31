import { IsDate } from 'class-validator';

export class CreateRoomRequest {
  @IsDate()
  date: Date;
}
