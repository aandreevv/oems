import { EventResponse } from '../../../../events-module/application/data/responses/event.response';
import { ApiProperty } from '@nestjs/swagger';

export class PastAndFutureEventsResponse {
  @ApiProperty({ isArray: true, type: EventResponse })
  pastEvents: EventResponse[];

  @ApiProperty({ isArray: true, type: EventResponse })
  futureEvents: EventResponse[];
}
