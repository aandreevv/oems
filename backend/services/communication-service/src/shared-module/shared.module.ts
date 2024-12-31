import { Module } from '@nestjs/common';
import { MicroserviceConnectionModule } from '@aandreevv/microservice-connection-lib';
import { USERS_SERVICE } from '../constants/constants';
import { UsersService } from './secondary-adapters/services/users.service';

@Module({
  exports: [UsersService],
  imports: [MicroserviceConnectionModule.register(USERS_SERVICE)],
  providers: [UsersService],
  controllers: [],
})
export class SharedModule {}
