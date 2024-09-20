import { Inject, Injectable } from '@nestjs/common';
import { RedisRepository } from '../infrastructure/redis/repository/redis.repository';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ExistsUtils {
    constructor(@Inject(RedisRepository) private readonly redisRepository: RedisRepository) { }
    async elementExists(prefix: string, key: string): Promise<boolean> {
        try {
            const exists = await this.redisRepository.exists(prefix, key);
            return exists === 1;
        } catch (error) {
            console.error("Error desconocido:", error);
            throw new InternalServerErrorException('Error desconocido. Por favor, contacte a soporte.');
        }
    }

    async ensureElementExists(prefix: string, key: string): Promise<void> {
        const exists = await this.elementExists(prefix, key);
        if (!exists) {
            throw new NotFoundException('Elemento no encontrado en Redis');
        }
    }
}