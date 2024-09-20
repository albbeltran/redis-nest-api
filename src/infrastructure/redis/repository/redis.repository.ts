import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

import { RedisRepositoryInterface } from '../../../domain/interface/redis.repository.interface';

@Injectable()
export class RedisRepository implements OnModuleDestroy, RedisRepositoryInterface {
    constructor(@Inject('RedisClient') private readonly redisClient: Redis) {}

    onModuleDestroy(): void {
        this.redisClient.disconnect();
    }

    async exists(prefix: string, key: string): Promise<number> {
        return await this.redisClient.exists(`${prefix}:${key}`);
    }

    async get(prefix: string, key: string): Promise<string | null | any> {
        return await this.redisClient.get(`${prefix}:${key}`);
    }

    async hget(prefix: string, key: string, field: string): Promise<string | null | any> {
        return this.redisClient.hget(`${prefix}:${key}`, field);
    }

    async set(prefix: string, key: string, value: string): Promise<void> {
        console.log('seteando modulo...');
        const response = await this.redisClient.set(`${prefix}:${key}`, value);
        console.log(response);
    }

    async hset(prefix: string, key: string, value: string): Promise<void> {
        await this.redisClient.hset(`${prefix}:${key}`, value);
    }

    async delete(prefix: string, key: string): Promise<void> {
        await this.redisClient.del(`${prefix}:${key}`);
    }

    async setWithExpiry(prefix: string, key: string, value: string, expiry: number): Promise<void> {
        await this.redisClient.set(`${prefix}:${key}`, value, 'EX', expiry);
        
    }

    async hsetWithExpiry(prefix: string, key: string, field: string, value: string, expiry: number): Promise<void> {
        await this.redisClient.hset(`${prefix}:${key}`, field, value);
    }
    
    async refreshExpiry(prefix: string, key: string, expiry: number): Promise<void> {
        await this.redisClient.expire(`${prefix}:${key}`, expiry);
    }

    async expireTime(prefix: string, key: string): Promise<number> {
        const data = await this.redisClient.ttl(`${prefix}:${key}`);
        return data;
    }
}