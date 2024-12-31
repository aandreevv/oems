import { join } from 'node:path';

const directoriesConfig = () => ({
  entities: [join(__dirname, '../../../components/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './migrations/*{.ts,.js}')],
});

export default directoriesConfig();
