import {TypeOrmModuleOptions} from '@nestjs/typeorm';
import * as path from 'path';

const config: TypeOrmModuleOptions = {
<<<<<<< HEAD
  type: 'mysql',
  host: 'localhost',
  port: 3309,
  username: 'root',
  password: 'root',
  database: 'hell_ta_bus',
  entities: [path.join(__dirname, 'dist/**/*.entity{.ts,.js}')],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: {
    migrationsDir: '././src/migrations',
  },
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: false,
=======
    type: 'mysql',
    host: 'localhost',
    port: 3309,
    username: 'root',
    password: 'root',
    database: 'hell_ta_bus',
    entities: [path.join(__dirname, 'dist/**/*.entity{.ts,.js}')],
    migrations: ['./' + './src/migrations/*.ts'],
    cli: {
        migrationsDir: './' + './src/migrations',
    },
    autoLoadEntities: true,
    charset: 'utf8mb4',
    synchronize: false,
>>>>>>> 46fbceaa966316e52bc9a7956f8a206fdebf1647
};

export = config;
