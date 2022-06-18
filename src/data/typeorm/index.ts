import { DataSource, DataSourceOptions } from 'typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import path from 'path';
import env from 'dotenv';

env.config();

const getDbOptionsByEnv = () =>
  process.env.NODE_ENV === 'test'
    ? {
        type: 'sqlite',
        database: path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'test',
          'data',
          'db.test.sqlite'
        ),
      }
    : {
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
      };

export const AppDataSource = new DataSource({
  ...getDbOptionsByEnv(),
  name: process.env.NODE_ENV,
  migrations: [`${__dirname}/migrations/*.ts`],
  entities: [`${__dirname}/entities/*.ts`],
  synchronize: false,
  migrationsRun: true,
  logging: process.env.NODE_ENV === 'dev',
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTableName: 'migrations',
} as DataSourceOptions);
