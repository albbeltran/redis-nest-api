import { Module } from '@nestjs/common';

import { redisClientFactory } from './redis.client.factory';
import { RedisRepository } from './repository/redis.repository';
import { ExistsUtils } from '../../utils/exists.utils';

@Module({
    imports: [],
    controllers: [],
    providers: [redisClientFactory, RedisRepository, ExistsUtils],

    exports: [],
})
export class RedisModule {}