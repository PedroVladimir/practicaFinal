import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async findAll() : Promise<Usuario[]> {
    const usuarios = await this.usuarioRepository.listar();
    return usuarios;
  }

  async findOne(id: number) : Promise<Usuario>{
    const usuario = await this.usuarioRepository.buscarPorId(id);
    if (!usuario){
      throw new Error(`El usuario con el  ${id} no esta registrado`)
    }
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.buscarPorId(id);
    if (!usuario){
      throw new Error(`Usuario con el id ${id} no encontrado`);
    }
    return this.usuarioRepository.actualizar(id, updateUsuarioDto);
  }

  async remove(id: number) : Promise<void> {
    const usuario = await this.usuarioRepository.buscarPorId(id);
    if (!usuario) {
      throw new NotFoundException (`El usuario con el ${id} no existe`);

    }
    await this.usuarioRepository.eliminar(id);
  }


}
