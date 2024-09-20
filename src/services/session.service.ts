import { Inject, Injectable } from '@nestjs/common';

import { RedisPrefixEnum } from '../domain/enum/redis-prefix-enum';
import { SessionInterface } from 'src/domain/interface/session.interface';
import { RedisRepository } from '../infrastructure/redis/repository/redis.repository';

const oneDayInSeconds = 60 * 60 * 24;
const oneHourInSeconds = 60 * 60 * 1;
const tenMinutesInSeconds = 60 * 10;

@Injectable()
export class SessionService {
    constructor(@Inject(RedisRepository) private readonly redisRepository: RedisRepository) { }

    async getSession(sessionKey: string): Promise<string> {
        const data = await this.redisRepository.hget(
            RedisPrefixEnum.SESSION,
            sessionKey,
            'permisos'
        )

        if (data) return data;

        return JSON.stringify({
            "message": "Permisos no encontrados en Redis!"
        })
    }

    async saveSession(sessionKey: string, sessionData: SessionInterface): Promise<void> {
        await this.redisRepository.hsetWithExpiry(
            RedisPrefixEnum.SESSION,
            sessionKey,
            'permisos',
            JSON.stringify(sessionData.permisos),
            oneDayInSeconds,
        );
    }

    async refreshSession(sessionKey: string): Promise<void> {
        await this.redisRepository.refreshExpiry(
            RedisPrefixEnum.SESSION,
            sessionKey,
            oneDayInSeconds,
        );
    }

    async expireTimeSession(sessionKey: string): Promise<number> {
        return await this.redisRepository.expireTime(
            RedisPrefixEnum.SESSION,
            sessionKey,
        );
    }
}