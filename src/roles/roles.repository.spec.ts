import { Test, TestingModule } from '@nestjs/testing';
import { Role } from './entities/roles.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesRepository } from './roles.repository';

describe('Roles Repository Test', () => {
  let repository: RolesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesRepository,
        {
          provide: getRepositoryToken(Role),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    repository = module.get<RolesRepository>(RolesRepository);
  });

  it('Roles Repository instanciado', () => {
    expect(repository).toBeDefined();
  });

  it('Roles Repository Crear', async () => {
    const createRoleDto: Role = { id: 1, nombre: 'Administrador' };

    jest.spyOn(repository, 'crear').mockResolvedValue(createRoleDto);
    const result = await repository.crear(createRoleDto);

    expect(result).toEqual(createRoleDto);
    expect(repository.crear).toHaveBeenCalledWith(createRoleDto);
  });

  it('Roles Repository Ver Rol', async () => {
    const id = 1;
    const createRoleDto: Role = { id: id, nombre: 'Administrador' };
    const mockRole: Role = { id: id, nombre: 'Administrador' };

    jest.spyOn(repository, 'buscarPorId').mockResolvedValue(mockRole);

    const result = await repository.buscarPorId(id);
    expect(result).toEqual(mockRole);
    expect(result.id).toEqual(id);
  });

  it('Roles Repository Buscar por Nombre', async () => {
    const nombreRol: string = 'Administrador';
    const createRoleDto: Role = { id: 1, nombre: nombreRol };
    const mockRole: Role = { id: 1, nombre: nombreRol };

    jest.spyOn(repository, 'buscarPorNombre').mockResolvedValue(mockRole);

    const result = await repository.buscarPorNombre(nombreRol);
    expect(result).toEqual(mockRole);
    expect(result.nombre).toEqual(nombreRol);
  });

  it('Roles Repository Listar Todos', async () => {
    const roles : Role[] = [
      { id: 1, nombre: 'Administrador' },
      { id: 2, nombre: 'Estandar' },
      { id: 3, nombre: 'Encargado' },
    ];

    // Insertar roles
    for (const role of roles) {
      await repository.crear(role);
    }

    jest.spyOn(repository, 'listar').mockResolvedValue(roles);
    const result = await repository.listar();
    expect(result).toEqual(roles);
  });

  it('Roles Repository Eliminar', async () => {
    const roleId : number = 1;
    const createRoleDto: Role = { id: 1, nombre: 'Administrador' };

    jest.spyOn(repository, 'crear').mockResolvedValue(createRoleDto);
    jest.spyOn(repository, 'eliminar').mockResolvedValue({ raw : []});
    const result = await repository.crear(createRoleDto);
    await repository.eliminar(roleId);

    expect(repository.eliminar).toHaveBeenCalledWith(roleId);
  });
});
