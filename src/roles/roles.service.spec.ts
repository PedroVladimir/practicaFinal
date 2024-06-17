import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository';
import { Role } from './entities/roles.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('RolesService', () => {
  let service: RolesService;
  let repository : RolesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        RolesRepository,
        {
          provide: getRepositoryToken(Role),
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

    service = module.get<RolesService>(RolesService);
    repository = module.get<RolesRepository>(RolesRepository);
  });



  it('Definir Instancias del Servicio y Repository ', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  
  it('Roles Service Crear - Nombre del Rol no Existe', async () => {
    const createRol : CreateRoleDto = {'id' : 1, 'nombre' : "Administrador"}
    //se verifica si el nombre existe, en caso de prueba retorna null
    jest.spyOn(repository, 'buscarPorNombre').mockResolvedValue(null);
    //crea un registro del createRol
    jest.spyOn(repository, 'crear').mockResolvedValue(createRol);

    const result = await service.create(createRol);

    //expresiones de prueba
    expect(result).toEqual(createRol);
    expect(repository.crear).toHaveBeenCalledWith(createRol);
    //expect(result).toBeInstanceOf(Role);
  })

  it('Roles Service Crear - Lanzar exception cuando el Rol Existe', async() => {
    const createRol : CreateRoleDto = {
      'id' : 1,
      'nombre' : "Administrador"
    }
    //se verifica si el nombre existe, en caso de prueba retorna null
    jest.spyOn(repository, 'buscarPorNombre').mockResolvedValue(createRol);
    //simular metodo crear del repository
    const repositoryCrear = jest.spyOn(repository, 'crear').mockResolvedValue(createRol);
    //establecer conflicto al momento de crear rol
    await expect(service.create(createRol)).rejects.toThrow(ConflictException);
    //verificar spyOn de buscarnombre
    expect(repository.buscarPorNombre).toHaveBeenCalledWith(createRol.nombre);
    // verificar exception para no llamar al repository
    expect(repositoryCrear).not.toHaveBeenCalled();
  })

  it('Roles Service Listar getAll Roles', async () => {
    const roles : Role[] = [
      { id: 1, nombre: 'Administrador' },
      { id: 2, nombre: 'Estandar' },
      { id: 3, nombre: 'Encargado' }
    ];
    //llamar a listar del repository
    jest.spyOn(repository, 'listar').mockResolvedValue(roles);

    const result = await service.findAll();
    //verificamos que el resul sea igual al vector
    expect(result).toEqual(roles);
    //los roles del resultado debe ser mayor a 0
    expect(result.length).toBeGreaterThan(0);
    //los roles del resultado deben ser 3
    expect(result.length).toBe(3);
    //verifica que el resultado contenga las propiedades de Role
    result.forEach(role => {
      expect(role).toHaveProperty('id');
      expect(role).toHaveProperty('nombre');
    });
  })

  it('Roles Service Listar/ID', async () => {
    const roles = { id: 1, nombre: 'Administrador'};
  
    jest.spyOn(repository, 'buscarPorId').mockResolvedValue(roles);

    const result = await service.findOne(1);

    expect(repository.buscarPorId).toHaveBeenCalledWith(1);
  })

  it('Roles Service Eliminar ID - Registro Existe', async() => {
    const roleId = 1;
    const mockRole: Role = { id: roleId, nombre: 'Administrador' };

    // Configuración del mock de buscarPorId
    jest.spyOn(repository, 'buscarPorId').mockResolvedValue(mockRole);
    jest.spyOn(repository, 'eliminar').mockResolvedValue(null);
    await service.remove(roleId);

    expect(repository.buscarPorId).toHaveBeenCalledWith(roleId);
    expect(repository.eliminar).toHaveBeenCalledWith(roleId);
    // Verificar que eliminar se llamó con el roleId
    //expect(repository.eliminar).toHaveBeenCalledWith(roleId);
  })

  it('Roles Service Eliminar ID - Exception Rol no Existe ', async() => {
    const roleId : number = 1;

    jest.spyOn(repository, 'buscarPorId').mockResolvedValue(null);
    const repositoryEliminar = jest.spyOn(repository, 'eliminar').mockResolvedValue({ raw : []});

    await expect(service.remove(roleId)).rejects.toThrow(NotFoundException);
    //verificar spyOn de buscarporID
    expect(repository.buscarPorId).toHaveBeenCalledWith(roleId);
    // verificar exception para no llamar al repository
    expect(repositoryEliminar).not.toHaveBeenCalled();
  })



});
