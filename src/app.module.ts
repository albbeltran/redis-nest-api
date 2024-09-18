import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './infrastructure/redis/redis.module';
import { OrdsmoduleController } from './controllers/ordsmodule.controller';
import { OrdsmoduleService } from './services/ordsmodule.service';

@Module({
  imports: [RedisModule],
  controllers: [AppController, OrdsmoduleController],
  providers: [AppService, OrdsmoduleService],
})
export class AppModule { }
