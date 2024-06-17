import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { AuthService } from './auth.service';
import { CredencialesDto } from '../usuario/dto/credenciales-usuario.dto';


@Controller('auth')
export class AuthController {

    constructor(
        private usuarioService : UsuarioService, 
        private authService : AuthService)
    {}

    @Post('/login')
    async login(@Body() credencialesDto : CredencialesDto ) {
        const usuario = await this.usuarioService.validarUsuario(credencialesDto.nombreUsuario, credencialesDto.password)
        return this.authService.login(usuario);
    }

}
 