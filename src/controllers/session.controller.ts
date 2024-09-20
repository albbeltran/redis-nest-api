import { Body, Controller, Post, Put, Param, Get, Query } from '@nestjs/common';
import { SessionService } from 'src/services/session.service';
import { SessionDTO, GetSessionDTO } from './dto/session.request.dto';

@Controller('session')
export class SessionController {

    constructor(private readonly sessionService: SessionService) { }

    @Get('/:key')
    async getModule(@Param() param: GetSessionDTO): Promise<JSON> {
        return JSON.parse(await this.sessionService.getSession(param.key));
    }

    @Post()
    async saveSession(@Body() sessionDTO: SessionDTO,): Promise<void> {
        await this.sessionService.saveSession(String(sessionDTO.key), sessionDTO);
    }

    @Put('/:key')
    async refreshSession(@Param() param: GetSessionDTO): Promise<void> {
        await this.sessionService.refreshSession(param.key);
    }
}
