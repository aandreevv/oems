import { Module } from '@nestjs/common';
import { SharedModule } from '../../shared-module/shared-module';
import { EventsController } from './primary-adapters/events.controller';
import { AuthModule } from '../auth-module/auth.module';

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [EventsController],
})
export class EventsModule {}
