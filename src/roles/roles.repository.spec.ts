import { Test, TestingModule } from '@nestjs/testing';
import { RolesRepository } from './roles.repository';
import { Role } from './entities/roles.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('Roles Repository Test', () => {

        let rolesRepository: RolesRepository;
        let mockRepository: jest.Mocked<Repository<Role>>;
      
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
                  delete: jest.fn(),
                },
              },
            ],
          }).compile();
      
          rolesRepository = module.get<RolesRepository>(RolesRepository);
          mockRepository = module.get(getRepositoryToken(Role));
        });
  

    it('Roles Repository instanciado', () => {
        expect(rolesRepository).toBeDefined();
    })

    it('Roles Repository Crear', async () => {
        const createRoleDto : Role = {
            id : 1,
            nombre : 'Administrador'
        }

        mockRepository.save.mockResolvedValue(createRoleDto);
        const result = await rolesRepository.crear(createRoleDto);

        expect(result).toEqual(createRoleDto); 
        expect(result).toBeInstanceOf(createRoleDto);
        expect(mockRepository.save).toHaveBeenCalledWith(createRoleDto);    

    })

    it('Roles Repository Ver Rol', async () => {
        const id = 1;
        const createRoleDto: Role = { id: id, nombre: 'Administrador' };
        const mockRole: Role = { id: id, nombre: 'Administrador' };
    
        mockRepository.findOne.mockResolvedValue(mockRole);
    
        const result = await rolesRepository.crear(createRoleDto); 
        const role = await rolesRepository.buscarPorId(id); 
    
        expect(role).toEqual(mockRole); 
        expect(role.id).toEqual(id); 
    })


    it('Roles Repository Buscar por Nombre', async() => {
        const nombreRol : string = "Administrador" 
        const createRoleDto : Role = {
            id : 1,
            nombre : nombreRol
        }

        const mockRole: Role = { id: 1, nombre: nombreRol };

        const result = await rolesRepository.crear(createRoleDto);
        const role : Role = await rolesRepository.buscarPorNombre(nombreRol);


        expect(role).toEqual(mockRole); 
        expect(role.nombre).toEqual(nombreRol); 

    })

    it('Roles Repository Listar Todos', async() => {
      const listaRoles = [
        {
          "id": 1,
          "nombre": "admin"
        },
        {
          "id": 2,
          "nombre": "estandar"
        },
        {
          "id": 3,
          "nombre": "otro"
        }
      ];




    })

    it('Roles Repository Eliminar', async() => {
        const createRoleDto : Role = {
            id : 1,
            nombre : 'Administrador'
        }
        mockRepository.save.mockResolvedValue(createRoleDto as Role);
        const result = await rolesRepository.crear(createRoleDto);

        await rolesRepository.eliminar(1); 

        expect(mockRepository.delete).toHaveBeenCalledWith(1); 

    })

})
