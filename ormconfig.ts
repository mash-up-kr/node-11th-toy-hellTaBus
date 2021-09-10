import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
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
};

export = config;
