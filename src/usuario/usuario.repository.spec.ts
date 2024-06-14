import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioRepository } from './usuario.repository';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

describe('UsuarioRepository', () => {
  let usuarioRepository: UsuarioRepository;
  let usuario: Usuario;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioRepository],
    }).compile();

    usuarioRepository = module.get<UsuarioRepository>(UsuarioRepository);
  });

  it('should be defined', () => {
    expect(usuarioRepository).toBeDefined();
  });

//   it('should create a new user', async () => {
//     const createUsuarioDto = new CreateUsuarioDto();
//     createUsuarioDto.nombreUsuario = 'Prueba';
//     createUsuarioDto.correo = 'prueba@example.com';
//     createUsuarioDto.password = 'prueba';

//     const result = await usuarioRepository.crear(createUsuarioDto);
//     expect(result).toBeDefined();
//   });

  it('should find a user by name', async () => {
    const result = await usuarioRepository.buscarPorNombre('Prueba');
    expect(result).toBeDefined();
  });

  it('should find all users', async () => {
    const result = await usuarioRepository.listar();
    expect(result).toBeDefined();
  });

  it('should find a user by id', async () => {
    const result = await usuarioRepository.buscarPorId(1);
    expect(result).toBeDefined();
  });

  it('should update a user', async () => {
    const updateUsuarioDto = new UpdateUsuarioDto();
    updateUsuarioDto.nombreUsuario = 'Prueba Actualizado';
    const result = await usuarioRepository.actualizar(1, updateUsuarioDto);
    expect(result).toBeDefined();
  });

//   it('should delete a user', async () => {
//     await usuarioRepository.eliminar(1);
//   });
});