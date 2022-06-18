import { AppDataSource } from '../data/typeorm/index';

AppDataSource.initialize()
  .then(() => console.log('Database connected!'))
  .catch(() => console.log('Error to connect with database'));
