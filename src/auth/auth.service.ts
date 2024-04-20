import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class AuthService {

    constructor(private jwtService : JwtService){}

    async login(usuario : Usuario) {
        const payload = { nombreUsuario : usuario.nombreUsuario, sub : usuario.id}
        return {
            acces_token : this.jwtService.sign(payload)
        }
    }
}
