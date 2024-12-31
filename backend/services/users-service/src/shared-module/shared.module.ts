import { Module } from '@nestjs/common';
import { EVENTS_SERVICE, UPLOADS_SERVICE } from '../constants/services';
import { MicroserviceConnectionModule } from '@aandreevv/microservice-connection-lib';
import { UploadsService } from './secondary-adapters/microservices/uploads.service';
import { EventsService } from './secondary-adapters/microservices/events.service';

@Module({
  imports: [MicroserviceConnectionModule.register(UPLOADS_SERVICE), MicroserviceConnectionModule.register(EVENTS_SERVICE)],
  providers: [UploadsService, EventsService],
  exports: [UploadsService, EventsService],
})
export class SharedModule {}
