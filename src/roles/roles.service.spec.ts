import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository';
import { Repository } from 'typeorm';
import { Role } from './entities/roles.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';

describe('RolesService', () => {
  let service: RolesService;
  let repository : RolesRepository;
  let mockRepository: jest.Mocked<Repository<Role>>;

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
    mockRepository = module.get(getRepositoryToken(Role));
  });



  it('Definir Instancias del Servicio y Repository ', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('Roles Service Crear', async () => {
    const rol : CreateRoleDto = {
      'id' : 1,
      'nombre' : "Administrador"
    }

    jest.spyOn(repository, 'crear').mockResolvedValue( rol as Role)

    const result = await service.create(rol);
    expect(result).toEqual(rol)
    expect(repository.crear).toHaveBeenCalledWith(rol);

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

});
