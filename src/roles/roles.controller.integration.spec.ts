import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import * as request from 'supertest';
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

describe('RolesController (Integration)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        if (app) {
            await app.close();
        }
    });

    it('roles (POST) crear rol', async () => {
        const createRol: CreateRoleDto = { 'id': 1, 'nombre': "Administrador" };
        //llamar ruta post para crear un rol
        const respuesta = await request(app.getHttpServer())
            .post('/roles')
            .send(createRol)
            .expect(201);

        expect(respuesta.body.id).toBe(createRol.id);
        expect(respuesta.body.nombre).toBe(createRol.nombre);
    });

    it('roles/:id (GET) obtener un rol por su id', async() => {
        const createRol: CreateRoleDto = { 'id': 1, 'nombre': "Administrador" };
        //registar rol
        await request(app.getHttpServer()).post('/roles').send(createRol);
        //llamar ruta post para crear un rol
        const respuesta = await request(app.getHttpServer())
            .get('/roles/1')
            .expect(200);   

        expect(respuesta.body).toHaveProperty('id');
        expect(respuesta.body).toHaveProperty('nombre');
    })

    it('roles/:id (PUT) actualizar un rol por ID', async () => {
        const createRol: CreateRoleDto = { 'id': 1, 'nombre': "Administrador" };
        //registar rol
        await request(app.getHttpServer()).post('/roles').send(createRol);
        //nuevo nombre del rol
        const updateRol : UpdateRoleDto = { 'nombre' : "Super Administrador"};
        const respuesta = await request(app.getHttpServer())
            .put('/roles/1')
            .send(updateRol)
            .expect(200);

        expect(respuesta.body.id).toBe(createRol.id);
        expect(respuesta.body.nombre).toBe(updateRol.nombre);
    })

    it('roles/:id (DELETE) eliminar un rol por ID', async() => {
        const createRol: CreateRoleDto = { 'id': 1, 'nombre': "Administrador" };
        //registar rol
        await request(app.getHttpServer()).post('/roles').send(createRol);
        //nuevo nombre del rol

        await request(app.getHttpServer())
            .delete('/roles/1')
            .expect(200);
    })
});
