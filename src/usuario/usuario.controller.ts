import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { CredencialesDto } from './dto/credenciales-usuario.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario Controller')
@Controller('usuario')
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) {}

  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  @ApiResponse({ status: 401, description: 'No Autorizado' })
  @ApiResponse({ status: 403, description: 'Usuario no creado' })
  @Post()
  @ApiBody({
    type: CreateUsuarioDto,
    description: 'Estructura JSON para el objeto CreateUsuarioDto',
  })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }

  // @Post('login')
  // login(@Body() credencialesDto : CredencialesDto) {
  //   return this.usuarioService.acceder(credencialesDto)    
  // }
}
