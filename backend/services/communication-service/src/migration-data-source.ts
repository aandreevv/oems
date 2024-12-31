import { DataSource, DataSourceOptions } from 'typeorm';
import postgresConfiguration from '@aandreevv/postgres-connection-lib/dist/postgres/postgres.configuration';
import directoriesConfig from './shared-module/secondary-adapters/postgres/directories-config';

export default new DataSource({
  ...directoriesConfig,
  ...postgresConfiguration,
} as DataSourceOptions);
