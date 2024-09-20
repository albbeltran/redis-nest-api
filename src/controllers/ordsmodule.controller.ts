import { Body, Controller, Post, Put, Param, Get, Query } from '@nestjs/common';
import { OrdsModuleService } from 'src/services/ordsmodule.service';
import { OrdsModuleDTO, GetOrdsModuleDTO } from './dto/ordsmodule.request.dto';

@Controller('ordsmodule')
export class OrdsmoduleController {
    constructor(private readonly ordsModuleService: OrdsModuleService) { }

    @Get('/token/:name')
    async getToken(@Param() param: GetOrdsModuleDTO): Promise<JSON> {
        return JSON.parse(await this.ordsModuleService.getModuleToken(param.name));
    }

    @Get('/:name')
    async getModule(@Param() param: GetOrdsModuleDTO): Promise<JSON> {
        return JSON.parse(await this.ordsModuleService.getModule(param.name));
    }

    @Get('/expiretime/:name')
    async expireTime(@Param() param: GetOrdsModuleDTO): Promise<number> {
        return await this.ordsModuleService.expireTimeModule(param.name);
    }

    @Post()
    async saveModule(@Body() ordsModuleDTO: OrdsModuleDTO,): Promise<void> {
        await this.ordsModuleService.saveModule(ordsModuleDTO.name, ordsModuleDTO);
    }

    @Put('/:name')
    async refreshModule(@Param() param: GetOrdsModuleDTO): Promise<void> {
        await this.ordsModuleService.refreshModule(param.name);
    }
}