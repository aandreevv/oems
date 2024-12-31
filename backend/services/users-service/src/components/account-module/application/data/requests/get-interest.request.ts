import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetInterestRequest {
  @IsUUID()
  @IsNotEmpty()
  interestId: string;
}
