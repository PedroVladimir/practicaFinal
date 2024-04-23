import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';


@ApiTags('Usuario Controller')
// @UseGuards(JwtAuthGuard)
@Controller('usuario')
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 401, description: 'No Autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permiso para lo solicitado' })
  @Post()
  @ApiBody({
    type: CreateUsuarioDto,
    description: 'Estructura JSON para el objeto CreateUsuarioDto',
  })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @ApiResponse({ status: 201, description: 'Listado de Usuarios' })
  @ApiResponse({ status: 401, description: 'No Autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permiso para lo solicitado' })
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @ApiResponse({ status: 201, description: 'Usuario Listado' })
  @ApiResponse({ status: 401, description: 'No Autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permiso para lo solicitado' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

  @ApiResponse({ status: 201, description: 'Usuario actualizado' })
  @ApiResponse({ status: 401, description: 'No Autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permiso para lo solicitado' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @ApiResponse({ status: 201, description: 'Usuario Eliminado' })
  @ApiResponse({ status: 401, description: 'No Autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permiso para lo solicitado' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }


}
