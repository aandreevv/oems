import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

const generateConfig = (): TypeOrmModuleOptions => {
  const dbConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    username: process.env.POSTGRES_USER ?? 'admin',
    password: process.env.POSTGRES_PASSWORD ?? '',
    database: process.env.POSTGRES_DATABASE ?? 'users',
  };
  return {
    ...dbConfig,
    cache: {
      duration: parseInt(process.env.ORM_CACHE_DURATION ?? '60000'),
    },
    synchronize: false,
    logging: true,
    migrationsRun: true,
    poolSize: process.env.NODE_ENV === 'production' ? 200 : 20,
    ssl: process.env.NODE_ENV === 'production',
  };
};

export default generateConfig();
