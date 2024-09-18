import { Controller, Get } from '@nestjs/common';

@Controller('session')
export class SessionController {

    @Get()
    get(): String {
        return 'Get a session';
    }

}
