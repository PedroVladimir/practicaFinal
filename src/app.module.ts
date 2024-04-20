import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type : 'postgres',
      host : databaseConfig().host,
      port : databaseConfig().port,
      username : databaseConfig().username,
      password : databaseConfig().password,
      database : databaseConfig().database,
      entities : [Usuario],
      synchronize : true,
      logging : true,
    }),
    UsuarioModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
