import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { RequestLoggerMiddleware } from './shared-module/primary-adapters/middlewares/request-logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { ErrorHandlingMiddleware } from './shared-module/primary-adapters/middlewares/error-handling.middleware';
import { AuthModule } from './components/auth-module/auth.module';
import { CommunicationModule } from './components/communication-module/communication.module';
import { UsersModule } from './components/users-module/users.module';
import { SharedModule } from './shared-module/shared-module';
import { EventsModule } from './components/events-module/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    SharedModule,
    AuthModule,
    CommunicationModule,
    UsersModule,
    EventsModule,
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: ErrorHandlingMiddleware }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
