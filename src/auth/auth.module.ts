import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { UsuarioModule } from '../usuario/usuario.module';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioRepository } from '../usuario/usuario.repository';
import { jwtConstants } from '../constants/constant';

@Module({
    imports : [
        TypeOrmModule.forFeature([Usuario]), 
        UsuarioModule, 
        JwtModule.register({
            secret : jwtConstants.secret,
            signOptions : { expiresIn : '36000s' }
        })
    ],
    providers: [
        AuthService,
        UsuarioService,
        UsuarioRepository
    ],
    controllers: [AuthController]
})
export class AuthModule {}
