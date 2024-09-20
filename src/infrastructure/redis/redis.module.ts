import { Module } from '@nestjs/common';

import { redisClientFactory } from './redis.client.factory';
import { RedisRepository } from './repository/redis.repository';

@Module({
    imports: [],
    controllers: [],
    providers: [redisClientFactory, RedisRepository],

    exports: [],
})
export class RedisModule {}