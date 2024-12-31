import { Module } from '@nestjs/common';
import { MicroserviceConnectionModule } from '@aandreevv/microservice-connection-lib';
import { COMMUNICATION_SERVICE, USERS_SERVICE } from '../constants/services';
import { CommunicationService } from './secondary-adapters/services/communication.service';
import { UsersService } from './secondary-adapters/services/users.service';

@Module({
  exports: [CommunicationService, UsersService],
  providers: [CommunicationService, UsersService],
  imports: [
    MicroserviceConnectionModule.register(USERS_SERVICE),
    MicroserviceConnectionModule.register(COMMUNICATION_SERVICE),
  ],
})
export class SharedModule {}
