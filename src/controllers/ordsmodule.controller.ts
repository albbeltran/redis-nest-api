import { Body, Controller, Post, Put, Param, Get,UseInterceptors } from '@nestjs/common';
import { OrdsModuleService } from 'src/services/ordsmodule.service';
import { OrdsModuleDTO, GetOrdsModuleDTO } from './dto/ordsmodule.request.dto';
import { TransformInterceptor } from 'src/interceptors/response.interceptor';

@Controller('ordsmodule')
@UseInterceptors(TransformInterceptor)
export class OrdsModuleController {
    constructor(private readonly ordsModuleService: OrdsModuleService) { }

    @Get('')
    async getAllModules() {
        const result = await this.ordsModuleService.getAllModules();
        return {message: 'Módulos obtenidos exitosamente', result}
    }

    @Get('/:name')
    async getModule(@Param() param: GetOrdsModuleDTO) {
        const result = JSON.parse(await this.ordsModuleService.getModule(param.name));
        return {message: 'Módulo obtenido exitosamente', result}
    }
    
    @Get('/token/:name')
    async getToken(@Param() param: GetOrdsModuleDTO) {
        const result = JSON.parse(await this.ordsModuleService.getModuleToken(param.name));
        return {message: 'Token obtenido exitosamente', result}
    }

    @Get('/expiretime/:name')
    async expireTime(@Param() param: GetOrdsModuleDTO) {
        const result = await this.ordsModuleService.expireTimeModule(param.name);
        return {message: 'Tiempo de expiración obtenido exitosamente', result}
    }

    @Post()
    async saveModule(@Body() ordsModuleDTO: OrdsModuleDTO) {
        await this.ordsModuleService.saveModule(ordsModuleDTO.name, ordsModuleDTO);
        return {message: 'Módulo guardado exitosamente'}
    }

    @Put('/:name')
    async refreshModule(@Param() param: GetOrdsModuleDTO) {
        await this.ordsModuleService.refreshModule(param.name);
        return {message: 'Tiempo de expiración actualizado exitosamente'}
    }
}