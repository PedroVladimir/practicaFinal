import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CredencialesDto {
    
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    nombreUsuario : string;

    @IsString()
    @IsNotEmpty()
    @MinLength( 5 , {
        message : 'La contraseña no debe ser menor a 5 caracteres',
    })
    password : string;
}