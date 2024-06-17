import { Test, TestingModule } from "@nestjs/testing";
import { UsuarioRepository } from "./usuario.repository";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./entities/usuario.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { ConflictException, NotFoundException } from "@nestjs/common";


describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository : UsuarioRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        UsuarioRepository,
        {
          provide: getRepositoryToken(Usuario),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<UsuarioRepository>(UsuarioRepository);
  });



  it('Definir Instancias del Servicio y Repository ', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  
  it('Usuario Service Crear - Nombre del Usuario no Existe', async () => {
    const createUsuario : CreateUsuarioDto = {'id' : 1, 'nombre' : "Administrador", 'nombreUsuario' : 'pflores', 'email' : 'pvfloresrios@gmail.com', 'password' : 'pass123'}
    //se verifica si el nombre de usuario existe, en caso de prueba retorna null
    jest.spyOn(repository, 'buscarPorNombre').mockResolvedValue(null);
    //crea un registro del create usuario
    jest.spyOn(repository, 'crear').mockResolvedValue(createUsuario);

    const result = await service.create(createUsuario);

    //expresiones de prueba
    expect(result).toEqual(createUsuario);
    expect(repository.crear).toHaveBeenCalledWith(createUsuario);
  })

  it('Usuario Service Crear - Lanzar exception cuando el nombre de Usuario Existe', async() => {
    const createUsuario : CreateUsuarioDto = {'id' : 1, 'nombre' : "Administrador", 'nombreUsuario' : 'pflores', 'email' : 'pvfloresrios@gmail.com', 'password' : 'pass123'}
    //se verifica si el nombre de usuario existe, en caso de prueba retorna null
    jest.spyOn(repository, 'buscarPorNombre').mockResolvedValue(createUsuario);
    //simular metodo crear del repository
    const repositoryCrear = jest.spyOn(repository, 'crear').mockResolvedValue(createUsuario);
    //establecer conflicto al momento de crear el nombre del usuario
    await expect(service.create(createUsuario)).rejects.toThrow(ConflictException);
    //verificar spyOn de buscarnombre
    expect(repository.buscarPorNombre).toHaveBeenCalledWith(createUsuario.nombreUsuario);
    // verificar exception para no llamar al repository
    expect(repositoryCrear).not.toHaveBeenCalled();
  })

  it('Usuario Service Listar getAll Usuarios', async () => {
    const createUsuario : CreateUsuarioDto[] = [
      {'id' : 1, 'nombre' : "Administrador", 'nombreUsuario' : 'pflores', 'email' : 'pvfloresrios@gmail.com', 'password' : 'pass123'},
      {'id' : 2, 'nombre' : "Administrador", 'nombreUsuario' : 'vflores', 'email' : 'vpfloresrios@gmail.com', 'password' : 'pass123'},
    ]
    //llamar a listar del repository
    jest.spyOn(repository, 'listar').mockResolvedValue(createUsuario);

    const result = await service.findAll();
    //verificamos que el resul sea igual al vector
    expect(result).toEqual(createUsuario);
    //los usuarios del resultado debe ser mayor a 0
    expect(result.length).toBeGreaterThan(0);
    //los usuarios del resultado deben ser 2
    expect(result.length).toBe(2);
    //verifica que el resultado contenga las propiedades de un Usuario
    result.forEach(usuario => {
      expect(usuario).toHaveProperty('id');
      expect(usuario).toHaveProperty('nombreUsuario');
    });
  })

  it('Usuario Service Listar/ID', async () => {
    const createUsuario : CreateUsuarioDto = {'id' : 1, 'nombre' : "Administrador", 'nombreUsuario' : 'pflores', 'email' : 'pvfloresrios@gmail.com', 'password' : 'pass123'}
  
    jest.spyOn(repository, 'buscarPorId').mockResolvedValue(createUsuario);

    const result = await service.findOne(1);

    expect(repository.buscarPorId).toHaveBeenCalledWith(1);
  })

  it('Usuario Service Eliminar ID - Registro Existe', async() => {
    const usuarioId : number = 1;
    const createUsuario : CreateUsuarioDto = {'id' : usuarioId, 'nombre' : "Administrador", 'nombreUsuario' : 'pflores', 'email' : 'pvfloresrios@gmail.com', 'password' : 'pass123'}

    // Configuración del mock de buscarPorId
    jest.spyOn(repository, 'buscarPorId').mockResolvedValue(createUsuario);
    jest.spyOn(repository, 'eliminar').mockResolvedValue(null);
    await service.remove(usuarioId);

    expect(repository.buscarPorId).toHaveBeenCalledWith(usuarioId);
    expect(repository.eliminar).toHaveBeenCalledWith(usuarioId);
  })

  it('Usuario Service Eliminar ID - Exception Usuario no Existe ', async() => {
    const usuarioId : number = 1;

    jest.spyOn(repository, 'buscarPorId').mockResolvedValue(null);
    const repositoryEliminar = jest.spyOn(repository, 'eliminar').mockResolvedValue({ raw : []});

    await expect(service.remove(usuarioId)).rejects.toThrow(NotFoundException);
    //verificar spyOn de buscarporID
    expect(repository.buscarPorId).toHaveBeenCalledWith(usuarioId);
    // verificar exception para no llamar al repository
    expect(repositoryEliminar).not.toHaveBeenCalled();
  })



});
