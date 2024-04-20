import {  IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @IsNumber()
    @IsNotEmpty()
    id : number

    @IsString()
    @IsNotEmpty()
    @MinLength( 5 , {
        message : 'El nombre del usuario debe tener al menos 5 caracteres',
    })
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @MinLength( 5 , {
        message : 'El nick name del usuario debe tener al menos 5 caracteres',
    })
    @IsAlphanumeric(null, {
        message : 'Solo se permiten numeros y letras',
    })
    nombreUsuario : string;

    @IsString()
    @IsNotEmpty()
    @IsEmail(null, {
        message : 'Ingresa un email valido',
    })
    email : string;

    @IsString()
    @IsNotEmpty()
    password : string;
}
