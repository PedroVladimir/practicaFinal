import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
describe('RolesController', () => {
  let controller: RolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        {
          provide: RolesService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('Definir Instancia del Rol Controller', () => {
    expect(controller).toBeDefined();
  });


  // it('Roles Controller Crear - Nombre del Rol no Existe', async () => {
  //   const createRol : CreateRoleDto = { 'id': 1, 'nombre': 'Administrador' };
  //   const result = await controller.create(createRol);

  //   expect(result).toEqual(createRol);
  // });


});
