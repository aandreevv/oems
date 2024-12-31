import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared-module/shared.module';
import { PostgresConnectionModule } from '@aandreevv/postgres-connection-lib';
import configuration from './config/configuration';
import { APP_FILTER } from '@nestjs/core';
import { ErrorHandlingMiddleware } from './shared-module/primary-adapters/middlewares/error-handling.middleware';
import { RequestLoggerMiddleware } from './shared-module/primary-adapters/middlewares/request-logger.middleware';
import { AccountModule } from './components/account-module/account.module';
import { AuthModule } from './components/auth-module/auth.module';
import directoriesConfig from './shared-module/secondary-adapters/postgres/directories-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    SharedModule,
    PostgresConnectionModule.register(directoriesConfig),
    AccountModule,
    AuthModule,
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: ErrorHandlingMiddleware }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
