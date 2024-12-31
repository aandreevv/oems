import { Module } from '@nestjs/common';
import { COMMUNICATION_SERVICE } from '../../constants/services';
import { CommunicationController } from './primary-adapters/communication.controller';
import { AuthModule } from '../auth-module/auth.module';
import { MicroserviceConnectionModule } from '@aandreevv/microservice-connection-lib';
import { SharedModule } from '../../shared-module/shared-module';

@Module({
  exports: [],
  imports: [MicroserviceConnectionModule.register(COMMUNICATION_SERVICE), AuthModule, SharedModule],
  providers: [],
  controllers: [CommunicationController],
})
export class CommunicationModule {}
