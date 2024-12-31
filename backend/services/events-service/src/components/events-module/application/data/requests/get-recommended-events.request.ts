import { IsArray, IsString } from 'class-validator';

export class GetRecommendedEventsRequest {
  @IsArray()
  @IsString({ each: true })
  interests: [];
}
