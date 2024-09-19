import { Body, Controller, Post, Put, Param, Get, Query } from '@nestjs/common';
import { OrdsmoduleService } from 'src/services/ordsmodule.service';
import { RedisService } from 'src/services/redis.service';
import { OrdsModuleDTO, GetOrdsModuleDTO } from './dto/ordsmodule.request.dto';

@Controller('ordsmodule')
export class OrdsmoduleController {
    constructor(private readonly ordsModuleService: OrdsmoduleService, private readonly redisService: RedisService) { }

    @Get('/token/:name')
    async getToken(@Param() param: GetOrdsModuleDTO): Promise<JSON> {
        return JSON.parse(await this.redisService.getToken(param.name));
    }

    @Get('/module/:name')
    async getModule(@Param() param: GetOrdsModuleDTO): Promise<JSON> {
        return JSON.parse(await this.redisService.getModule(param.name));
    }

    @Post()
    async saveModule(@Body() ordsModuleDTO: OrdsModuleDTO,): Promise<void> {
        await this.redisService.saveModule(ordsModuleDTO.name, ordsModuleDTO);
    }

    @Put('/module/:name')
    async refreshModule(@Param() param: GetOrdsModuleDTO): Promise<void> {
        await this.redisService.refreshModule(param.name);
    }
}