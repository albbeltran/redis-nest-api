import { Inject, Injectable } from '@nestjs/common';

import { RedisPrefixEnum } from '../domain/enum/redis-prefix-enum';
import { SessionInterface } from 'src/domain/interface/session.interface';
import { RedisRepository } from '../infrastructure/redis/repository/redis.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { ExistsUtils } from 'src/utils/exists.utils';

const oneDayInSeconds = 60 * 60 * 24;
const oneHourInSeconds = 60 * 60 * 1;
const tenMinutesInSeconds = 60 * 10;

@Injectable()
export class SessionService {
    constructor(
        @Inject(RedisRepository) private readonly redisRepository: RedisRepository,
        @Inject(ExistsUtils) private readonly existsUtils: ExistsUtils
    ) { }

    async getSession(key: string): Promise<string> {
        try {
            await this.existsUtils.ensureElementExists(RedisPrefixEnum.SESSION, key);
            const data = await this.redisRepository.hget(
                RedisPrefixEnum.SESSION,
                key,
                'permisos'
            )

            if (!data) throw new NotFoundException("Sesión no encontrada en Redis");
            return data;
        } catch (error) {
            this.handleUnknownError(error);
        }
    }

    async saveSession(key: string, sessionData: SessionInterface): Promise<void> {
        try {
            const exists = await this.existsUtils.elementExists(RedisPrefixEnum.MODULE, key);
            if (exists) throw new BadRequestException('La sesión ya existe en Redis');

            await this.redisRepository.hsetWithExpiry(
                RedisPrefixEnum.SESSION,
                key,
                'permisos',
                JSON.stringify(sessionData.permisos),
                oneDayInSeconds,
            );
        } catch (error) {
            this.handleUnknownError(error);
        }
    }

    async refreshSession(key: string): Promise<void> {
        try {
            await this.existsUtils.ensureElementExists(RedisPrefixEnum.SESSION, key);
            await this.redisRepository.refreshExpiry(
                RedisPrefixEnum.SESSION,
                key,
                oneDayInSeconds,
            );
        } catch (error) {
            this.handleUnknownError(error);
        }
    }

    async expireTimeSession(key: string): Promise<number> {
        try {
            await this.existsUtils.ensureElementExists(RedisPrefixEnum.SESSION, key);
            return await this.redisRepository.expireTime(
                RedisPrefixEnum.SESSION,
                key,
            );
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