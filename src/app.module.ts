import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './infrastructure/redis/redis.module';
import { SessionModule } from './modules/session.module';
import { OrdsModuleModule } from './modules/ordsmodule.module';
import { SessionController } from './controllers/session.controller';
import { OrdsModuleController } from './controllers/ordsmodule.controller';

@Module({
  imports: [RedisModule, SessionModule, OrdsModuleModule],
  controllers: [AppController, SessionController, OrdsModuleController],
  providers: [AppService],
})
export class AppModule { }
