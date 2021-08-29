import {Module} from '@nestjs/common';
import {MySqlConfigService} from './dbconfig.service';

@Module({
  providers: [MySqlConfigService],
})
export class MySqlConfigModule {}
