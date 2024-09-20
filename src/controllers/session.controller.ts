import { Body, Controller, Post, Put, Param, Get, UseInterceptors } from '@nestjs/common';
import { SessionService } from 'src/services/session.service';
import { SessionDTO, GetSessionDTO } from './dto/session.request.dto';
import { TransformInterceptor } from 'src/interceptors/response.interceptor';

@Controller('session')
@UseInterceptors(TransformInterceptor)
export class SessionController {
    constructor(private readonly sessionService: SessionService) { }

    @Get('')
    async getAllModules() {
        const result = await this.sessionService.getAllSessions();
        return {message: 'Sesiones obtenidass exitosamente', result}
    }

    @Get('/:key')
    async getSession(@Param() param: GetSessionDTO) {
        const result = JSON.parse(await this.sessionService.getSession(param.key));
        return { message: 'Sesión obtenida exitosamente', result }
    }

    @Get('/expiretime/:key')
    async expireTime(@Param() param: GetSessionDTO) {
        const result = await this.sessionService.expireTimeSession(param.key);
        return {message: 'Tiempo de expiración obtenido exitosamente', result}
    }    

    @Post()
    async saveSession(@Body() sessionDTO: SessionDTO,) {
        await this.sessionService.saveSession(String(sessionDTO.key), sessionDTO);
        return { message: 'Sesión guardada exitosamente' }
    }

    @Put('/:key')
    async refreshSession(@Param() param: GetSessionDTO) {
        await this.sessionService.refreshSession(param.key);
        return { message: 'Tiempo de expiración de sesión actualizado exitosamente' }
    }
}
