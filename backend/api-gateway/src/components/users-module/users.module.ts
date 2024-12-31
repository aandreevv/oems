import { forwardRef, Module } from '@nestjs/common';
import { USERS_SERVICE } from '../../constants/services';
import { FollowService } from './secondary-adapters/follow.service';
import { SharedModule } from '../../shared-module/shared-module';
import { UsersController } from './primary-adapters/users.controller';
import { AuthModule } from '../auth-module/auth.module';
import { MicroserviceConnectionModule } from '@aandreevv/microservice-connection-lib';

@Module({
  controllers: [UsersController],
  providers: [FollowService],
  exports: [],
  imports: [MicroserviceConnectionModule.register(USERS_SERVICE), forwardRef(() => SharedModule), AuthModule],
})
export class UsersModule {}
