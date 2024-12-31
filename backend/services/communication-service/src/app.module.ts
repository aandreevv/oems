import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresConnectionModule } from '@aandreevv/postgres-connection-lib';

import directoriesConfig from './shared-module/secondary-adapters/postgres/directories-config';
import { SharedModule } from './shared-module/shared.module';
import { IdentityModule } from './components/identity-module/identity.module';
import { configuration } from './config/configuration';
import { RoomsModule } from './components/rooms-module/rooms.module';
import { ChatsModule } from './components/chats-module/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    PostgresConnectionModule.register(directoriesConfig),
    SharedModule,
    IdentityModule,
    RoomsModule,
    ChatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
