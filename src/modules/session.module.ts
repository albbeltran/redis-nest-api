import { Module } from '@nestjs/common';

import { SessionService } from 'src/services/session.service';
import { redisClientFactory } from '../infrastructure/redis/redis.client.factory';
import { RedisRepository } from '../infrastructure/redis/repository/redis.repository';

@Module({
    imports: [],
    controllers: [],
    providers: [redisClientFactory, RedisRepository, SessionService],

    exports: [SessionService],
})
export class SessionModule {}