import { IsNotEmpty, IsString, isNotEmpty } from "class-validator";

export class OrdsModuleDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    token: string;
}

export class GetOrdsModuleDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
}