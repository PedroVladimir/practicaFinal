import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';

@ApiTags('Roles Controller')
@Controller('roles')
export class RolesController {
    
    constructor(private readonly roleService : RolesService){}

    @ApiResponse({ status: 201, description: 'Rol creado exitosamente' })
    @ApiResponse({ status: 401, description: 'No Autorizado' })
    @ApiResponse({ status: 403, description: 'Rol no creado' })
    @Post()
    @ApiBody({
        type : CreateRoleDto,
        description : 'Estructura JSON para el Objeto CreateRoleDto'
    })
    create(@Body() createRoleDto : CreateRoleDto){
        return this.roleService.create(createRoleDto);
    }
    
    @ApiResponse({ status: 201, description: 'Lista Roles' })
    @ApiResponse({ status: 401, description: 'No Autorizado' })
    @ApiResponse({ status: 403, description: 'Lista Roles no encontrado' })
    @Get()
    findAll() {
        const roles =  this.roleService.findAll();
        return roles;
    }

    @Get(':id')
    findOne(@Param('id') id : number) {
        return this.roleService.findOne(id);
    }

    @Patch()
    update(@Param('id') id : number, @Body() UpdateRoleDto : UpdateRoleDto) {
        return this.roleService.update(id, UpdateRoleDto);
    }

    @Delete(':id')
    remove(@Param('id') id : number) {
        return this.roleService.remove(id);
    }









}
 