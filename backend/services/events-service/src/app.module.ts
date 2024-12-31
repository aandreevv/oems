import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import directoriesConfig from './shared-module/secondary-adapters/postgres/directories-config';
import { PostgresConnectionModule } from '@aandreevv/postgres-connection-lib';
import { EventsModule } from './components/events-module/events.module';
import { SharedModule } from './shared-module/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PostgresConnectionModule.register(directoriesConfig),
    SharedModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
