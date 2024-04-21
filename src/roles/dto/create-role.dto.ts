import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateRoleDto {

    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    @MinLength( 5 , {
        message : 'El nombre del rol debe ser mayor a 5 caracteres',
    })
    nombre : string;

}