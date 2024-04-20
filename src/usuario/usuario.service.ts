import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

import { UsuarioRepository } from './usuario.repository';
import { Usuario } from './entities/usuario.entity';


@Injectable()
export class UsuarioService {

  constructor(private readonly usuarioRepository : UsuarioRepository)
  {}

  async create(createUsuarioDto: CreateUsuarioDto) : Promise<Usuario> {
    const usuarioExistente = await this.usuarioRepository.buscarPorNombre(createUsuarioDto.nombreUsuario);
    if(usuarioExistente) {
      throw new ConflictException('Usuario Existente')
    }
    return this.usuarioRepository.crear(createUsuarioDto);
  }

  async validarUsuario(nombreUsuario : string, password : string) : Promise<Usuario> {
    const usuarioExistente = await this.usuarioRepository.buscarPorNombre(nombreUsuario);
    if( !usuarioExistente || (usuarioExistente.password !== password)) {
      throw new UnauthorizedException ('Nombre de Usuario o contraseña incorrectos',)
    }
    return usuarioExistente;
  }

  findAll() {
    return this.usuarioRepository.listar();
  }

  findOne(id: number) : Promise<Usuario>{
    return this.usuarioRepository.buscarPorId(id);
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = this.usuarioRepository.buscarPorId(id);
    if (!usuario){
      throw new Error(`Usuari con el id ${id} no encontrado`);
    }
    return this.usuarioRepository.actualizar(id, updateUsuarioDto);
  }

  remove(id: number) {
    return this.usuarioRepository.eliminar(id);
  }


}
