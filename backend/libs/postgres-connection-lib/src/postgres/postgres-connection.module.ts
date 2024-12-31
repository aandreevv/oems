import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import postgresConfiguration from './postgres.configuration';
import { ConfigModule } from '@nestjs/config';
import { IPostgresDirectoriesConfig } from './postgres-directories-config.interface';

@Global()
@Module({})
export class PostgresConnectionModule {
  static register(directoriesConfig: IPostgresDirectoriesConfig): DynamicModule {
    return {
      module: PostgresConnectionModule,
      exports: [TypeOrmModule],
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            ...postgresConfiguration,
            entities: directoriesConfig.entities,
            migrations: directoriesConfig.migrations
          }),
        })
      ]
    }
  }
}
