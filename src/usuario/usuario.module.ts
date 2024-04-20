import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

@Module({
  imports : [TypeOrmModule.forFeature([Usuario])],
  controllers : [UsuarioController],
  providers : [
    UsuarioService, 
    UsuarioRepository
  ],
  exports : [UsuarioService]
})
export class UsuarioModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('usuario');
  }
}
