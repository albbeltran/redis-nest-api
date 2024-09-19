import { Body, Controller, Post, Param, Get, Query } from '@nestjs/common';
import { RedisService } from 'src/services/redis.service';
import { SessionDTO, GetSessionDTO } from './dto/session.request.dto';

@Controller('session')
export class SessionController {

    constructor(private readonly redisService: RedisService) { }

    @Get('/:key')
    async getModule(@Param() param: GetSessionDTO): Promise<JSON> {
        return JSON.parse(await this.redisService.getSession(Number(param.key)));
    }

    @Post()
    async saveModule(@Body() sessionDTO: SessionDTO,): Promise<void> {
        await this.redisService.saveSession(sessionDTO.key, sessionDTO);
    }
}
