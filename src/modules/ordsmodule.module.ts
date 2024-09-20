import { Module } from '@nestjs/common';

import { OrdsModuleService } from 'src/services/ordsmodule.service';
import { redisClientFactory } from '../infrastructure/redis/redis.client.factory';
import { RedisRepository } from '../infrastructure/redis/repository/redis.repository';
import { ExistsUtils } from 'src/utils/exists.utils';

@Module({
    imports: [],
    controllers: [],
    providers: [redisClientFactory, RedisRepository, OrdsModuleService, ExistsUtils],

    exports: [OrdsModuleService],
})
export class OrdsModuleModule {}