import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class SessionDTO {
    @IsNumber()
    @IsNotEmpty()
    key: number;

    @IsString()
    @IsNotEmpty()
    permisos: string;
}

export class GetSessionDTO {
    @IsString()
    @IsNotEmpty()
    key: string;
}