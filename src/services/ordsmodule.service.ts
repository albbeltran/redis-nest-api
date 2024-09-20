import { Inject, Injectable } from '@nestjs/common';

import { RedisPrefixEnum } from '../domain/enum/redis-prefix-enum';
import { OrdsModuleInterface } from 'src/domain/interface/ordsmodule.interface';
import { RedisRepository } from '../infrastructure/redis/repository/redis.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { ExistsUtils } from 'src/utils/exists.utils';

const oneDayInSeconds = 60 * 60 * 24;
const oneHourInSeconds = 60 * 60 * 1;
const tenMinutesInSeconds = 60 * 10;

@Injectable()
export class OrdsModuleService {
    constructor(
        @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
        @Inject(ExistsUtils) private readonly existsUtils: ExistsUtils
    ) { }

    async getModule(name: string): Promise<string> {
        try {
            await this.existsUtils.ensureElementExists(RedisPrefixEnum.MODULE, name);
            return await this.redisRepository.get(RedisPrefixEnum.MODULE, name);
        } catch (error) {
            this.handleUnknownError(error);
        }
    }

    async getModuleToken(name: string): Promise<string> {
        try {
            await this.existsUtils.ensureElementExists(RedisPrefixEnum.MODULE, name);
            const data = await this.redisRepository.get(RedisPrefixEnum.MODULE, name);
            const parsedData = JSON.parse(data);
            return JSON.stringify({ token: parsedData.token });
        } catch (error) {
            this.handleUnknownError(error);
        }
    }

    async saveModule(name: string, moduleData: OrdsModuleInterface): Promise<void> {
        try {
            const exists = await this.existsUtils.elementExists(RedisPrefixEnum.MODULE, name);
            if (exists) throw new BadRequestException('El módulo ya existe en Redis');

            await this.redisRepository.setWithExpiry(
                RedisPrefixEnum.MODULE,
                name,
                JSON.stringify(moduleData),
                oneHourInSeconds,
            );
        } catch (error) {
            this.handleUnknownError(error);
        }
    }

    async expireTimeModule(name: string): Promise<number> {
        try {
            await this.existsUtils.ensureElementExists(RedisPrefixEnum.MODULE, name);
            return await this.redisRepository.expireTime(RedisPrefixEnum.MODULE, name);
        } catch (error) {
            this.handleUnknownError(error);
        }
    }

    async refreshModule(name: string): Promise<void> {
        try {
            await this.existsUtils.ensureElementExists(RedisPrefixEnum.MODULE, name);
            await this.redisRepository.refreshExpiry(RedisPrefixEnum.MODULE, name, oneHourInSeconds);
        } catch (error) {
            this.handleUnknownError(error);
        }
    }

    async getAllModules(): Promise<any[]> {
        try {
            const data = await this.redisRepository.scanSet(RedisPrefixEnum.MODULE);
            const keys = [];

            data.forEach(async(module) => keys.push(module));
            const values = await this.redisRepository.mget(keys);

            return keys.map((key, index) => ({ [key]: JSON.parse(values[index]) }));
        } catch (error) {
            this.handleUnknownError(error);
        }
    }

    private handleUnknownError(error: any): void {
        if (error instanceof NotFoundException || error instanceof BadRequestException) {
            throw error;
        }
        console.error("Error desconocido:", error);
        throw new InternalServerErrorException('Error desconocido. Por favor, contacte a soporte.');
    }
}
