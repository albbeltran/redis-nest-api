import { FactoryProvider } from '@nestjs/common';
import { Redis } from 'ioredis';

export const redisClientFactory: FactoryProvider<Redis> = {
    provide: 'RedisClient',
    useFactory: () => {
        const redisInstance = new Redis({
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD
        });

        redisInstance.on('error', e => {
            throw new Error(`Redis connection failed: ${e}`);
        });

        return redisInstance;
    },
    inject: [],
};