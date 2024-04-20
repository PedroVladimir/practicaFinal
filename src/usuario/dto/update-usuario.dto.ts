import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsAlphanumeric, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

    @IsString()
    @IsOptional()
    @MinLength( 5 , {
        message : 'El nombre del usuario debe tener al menos 5 caracteres',
    })
    nombre?: string;

    @IsString()
    @IsOptional()
    @MinLength( 5 , {
        message : 'El nick name del usuario debe tener al menos 5 caracteres',
    })
    @IsAlphanumeric(null, {
        message : 'Solo se permiten numeros y letras',
    })
    nombreUsuario? : string;

    @IsString()
    @IsOptional()
    @IsEmail(null, {
        message : 'Ingresa un email valido',
    })
    email? : string;

    @IsString()
    @IsOptional()
    password? : string;

}
