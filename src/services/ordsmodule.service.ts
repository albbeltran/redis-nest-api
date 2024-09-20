import { Inject, Injectable } from '@nestjs/common';

import { RedisPrefixEnum } from '../domain/enum/redis-prefix-enum';
import { SessionInterface } from 'src/domain/interface/session.interface';
import { OrdsModuleInterface } from 'src/domain/interface/ordsmodule.interface';
import { RedisRepository } from '../infrastructure/redis/repository/redis.repository';

const oneDayInSeconds = 60 * 60 * 24;
const oneHourInSeconds = 60 * 60 * 1;
const tenMinutesInSeconds = 60 * 10;

@Injectable()
export class OrdsModuleService {
    constructor(@Inject(RedisRepository) private readonly redisRepository: RedisRepository) { }

    async getModule(moduleName: string): Promise<string> {
        const data = await this.redisRepository.get(
            RedisPrefixEnum.MODULE,
            moduleName
        )

        if (data) return data;

        return JSON.stringify({
            "message": "Módulo no encontrado en Redis!"
        })
    }

    async getModuleToken(moduleName: string): Promise<string> {
        const data = await this.redisRepository.get(
            RedisPrefixEnum.MODULE,
            moduleName
        )

        if (data) return JSON.stringify({ "token": JSON.parse(data).token });

        return JSON.stringify({
            "message": "Token no encontrado en Redis!"
        })
    }

    async saveModule(moduleName: string, moduleData: OrdsModuleInterface): Promise<void> {
        await this.redisRepository.setWithExpiry(
            RedisPrefixEnum.MODULE,
            moduleName,
            JSON.stringify(moduleData),
            oneHourInSeconds,
        );
    }

    async expireTimeModule(sessionKey: string): Promise<number> {
        return await this.redisRepository.expireTime(
            RedisPrefixEnum.MODULE,
            sessionKey,
        );
    }

    async refreshModule(moduleName: string): Promise<void> {
        await this.redisRepository.refreshExpiry(
            RedisPrefixEnum.MODULE,
            moduleName,
            oneHourInSeconds,
        );
    }
}