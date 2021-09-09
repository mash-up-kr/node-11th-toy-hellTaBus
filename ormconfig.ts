import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3309,
    username: 'root',
    password: 'root',
    database: 'hell_ta_bus',
    entities: [path.join(__dirname, '**/*.entity{.ts,.js}')],
    migrations: [__dirname + '/src/migrations/*.ts'],
    cli: {
        migrationsDir: __dirname + '/src/migrations',
    },
    autoLoadEntities: true,
    charset: 'utf8mb4',
    synchronize: true,
};

export = config;
