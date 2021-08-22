import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MySqlConfigModule} from 'src/config/dbconfig.module';
import {MySqlConfigService} from 'src/config/dbconfig.service';
import {UserModule} from '../user/user.module';
import {AppController} from './app.controller';
import {AppService} from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [MySqlConfigModule],
      useClass: MySqlConfigService,
      inject: [MySqlConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
