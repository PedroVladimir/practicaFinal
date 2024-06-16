import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository';
import { Repository } from 'typeorm';
import { Role } from './entities/roles.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { NotFoundException } from '@nestjs/common';

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

  it('Roles Service Crear', async () => {
    const createRol : CreateRoleDto = {
      'id' : 1,
      'nombre' : "Administrador"
    }

    jest.spyOn(repository, 'crear').mockImplementation( () =>  Promise. resolve(createRol) )

    const result = await service.create(createRol);
    expect(result).toEqual(createRol);
    expect(repository.crear).toHaveBeenCalledWith(createRol);
    //expect(result).toBeInstanceOf(Role);

  })

  it('Roles Service Listar', async () => {
    const roles = [
      { id: 1, nombre: 'Administrador' },
      { id: 2, nombre: 'Estandar' },
      { id: 3, nombre: 'Encargado' }
    ];

    jest.spyOn(repository, 'listar').mockResolvedValue(roles);

    const result = await service.findAll();

    expect(result).toEqual(roles);
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBe(3);
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

  it('Roles Service Eliminar/ID', async() => {
    const roleId = 1;
    const mockRole: Role = { id: roleId, nombre: 'Admin' };

    // Configuración del mock de buscarPorId
    jest.spyOn(repository, 'buscarPorId').mockResolvedValue(mockRole);

    await service.remove(roleId);

    // Verificar que buscarPorId se llamó con el roleId
    expect(repository.buscarPorId).toHaveBeenCalledWith(roleId);
    // Verificar que eliminar se llamó con el roleId
    //expect(repository.eliminar).toHaveBeenCalledWith(roleId);
  })

});
