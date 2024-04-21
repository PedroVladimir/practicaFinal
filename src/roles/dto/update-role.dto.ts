import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateRoleDto {

    @IsString()
    @IsNotEmpty()
    @MinLength( 5 , {
        message : 'El nombre del rol debe ser mayor a 5 caracteres',
    })
    nombre : string;

}