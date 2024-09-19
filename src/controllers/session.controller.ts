import { Body, Controller, Post, Put, Param, Get, Query } from '@nestjs/common';
import { RedisService } from 'src/services/redis.service';
import { SessionDTO, GetSessionDTO } from './dto/session.request.dto';

@Controller('session')
export class SessionController {

    constructor(private readonly redisService: RedisService) { }

    @Get('/:key')
    async getModule(@Param() param: GetSessionDTO): Promise<JSON> {
        return JSON.parse(await this.redisService.getSession(param.key));
    }

    @Post()
    async saveSession(@Body() sessionDTO: SessionDTO,): Promise<void> {
        await this.redisService.saveSession(String(sessionDTO.key), sessionDTO);
    }

    @Put('/:key')
    async refreshSession(@Param() param: GetSessionDTO): Promise<void> {
        await this.redisService.refreshSession(param.key);
    }
}
