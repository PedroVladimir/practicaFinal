import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import * as request from 'supertest';
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from "./dto/update-usuario.dto";

describe('UsuarioController (Integration)', () => {
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

    it('Usuario (POST) crear usuario', async () => {
        const createUsuario : CreateUsuarioDto = {'id' : 1, 'nombre' : "Administrador", 'nombreUsuario' : 'pflores', 'email' : 'pvfloresrios@gmail.com', 'password' : 'pass123'}
        //llamar ruta post para crear un Usuario
        const respuesta = await request(app.getHttpServer())
            .post('/usuario')
            .send(createUsuario)
            .expect(201);

        expect(respuesta.body.id).toBe(createUsuario.id);
        expect(respuesta.body.nombre).toBe(createUsuario.nombreUsuario);
    });

    it('usuario/:id (GET) obtener un usuario por su id', async() => {
        const createUsuario : CreateUsuarioDto = {'id' : 1, 'nombre' : "Administrador", 'nombreUsuario' : 'pflores', 'email' : 'pvfloresrios@gmail.com', 'password' : 'pass123'}
        //registar usuario
        await request(app.getHttpServer()).post('/usuario').send(createUsuario);
        //llamar ruta post para crear un usuario
        const respuesta = await request(app.getHttpServer())
            .get('/usuario/1')
            .expect(200);   

        expect(respuesta.body).toHaveProperty('id');
        expect(respuesta.body).toHaveProperty('nombreUsuario');
    })

    it('usuario/:id (PUT) actualizar un Usuario por ID', async () => {
        const createUsuario : CreateUsuarioDto = {'id' : 1, 'nombre' : "Administrador", 'nombreUsuario' : 'pflores', 'email' : 'pvfloresrios@gmail.com', 'password' : 'pass123'}
        //registar usuario
        await request(app.getHttpServer()).post('/usuario').send(createUsuario);
        //nuevo nombre del usuario
        const updateUsuario : UpdateUsuarioDto = { 'nombre' : "pvflores"};
        const respuesta = await request(app.getHttpServer())
            .put('/usuario/1')
            .send(updateUsuario)
            .expect(200);

        expect(respuesta.body.id).toBe(createUsuario.id);
        expect(respuesta.body.nombre).toBe(createUsuario.nombreUsuario);
    })

    it('usuario/:id (DELETE) eliminar un Usuario por ID', async() => {
        const createUsuario : CreateUsuarioDto = {'id' : 1, 'nombre' : "Administrador", 'nombreUsuario' : 'pflores', 'email' : 'pvfloresrios@gmail.com', 'password' : 'pass123'}
        //registar usuario
        await request(app.getHttpServer()).post('/usuario').send(createUsuario);

        await request(app.getHttpServer())
            .delete('/usuario/1')
            .expect(200);
    })
});
