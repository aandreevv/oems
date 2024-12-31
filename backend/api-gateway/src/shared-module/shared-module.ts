import { forwardRef, Module } from '@nestjs/common';
import { MicroserviceConnectionModule } from '@aandreevv/microservice-connection-lib';
import { COMMUNICATION_SERVICE, EVENTS_SERVICE, UPLOADS_SERVICE, USERS_SERVICE } from '../constants/services';
import { EventsService } from './secondary-adapters/microservices/events.service';
import { UploadsService } from './secondary-adapters/microservices/uploads.service';
import { CommunicationService } from './secondary-adapters/microservices/communication.service';
import { UsersService } from './secondary-adapters/microservices/users.service';
import { AuthModule } from '../components/auth-module/auth.module';

@Module({
  providers: [EventsService, UploadsService, CommunicationService, UsersService],
  exports: [EventsService, UploadsService, CommunicationService, UsersService],
  imports: [
    MicroserviceConnectionModule.register(EVENTS_SERVICE),
    MicroserviceConnectionModule.register(UPLOADS_SERVICE),
    MicroserviceConnectionModule.register(COMMUNICATION_SERVICE),
    MicroserviceConnectionModule.register(USERS_SERVICE),
    forwardRef(() => AuthModule),
  ],
})
export class SharedModule {}
