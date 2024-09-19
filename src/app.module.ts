import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './infrastructure/redis/redis.module';
import { OrdsmoduleController } from './controllers/ordsmodule.controller';
import { OrdsmoduleService } from './services/ordsmodule.service';
import { SessionController } from './controllers/session.controller';

@Module({
  imports: [RedisModule],
  controllers: [AppController, OrdsmoduleController, SessionController],
  providers: [AppService, OrdsmoduleService],
})
export class AppModule { }
