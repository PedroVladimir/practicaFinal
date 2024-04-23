import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/roles.entity';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {

    constructor(private readonly rolesRepository : RolesRepository){}

    async create(createRoleDto : CreateRoleDto) : Promise<Role> {
        const rolExistente = await this.rolesRepository.buscarPorNombre(createRoleDto.nombre);
        if(rolExistente) {
            throw new ConflictException('El Rol ya se encuentra Registrado')
        }
        return this.rolesRepository.crear(createRoleDto);
    }

    async findAll(): Promise<Role[]> {
        const roles = await this.rolesRepository.listar();
        return roles;
    }


    async findOne(id : number) : Promise<Role> {
        const role = await this.rolesRepository.buscarPorId(id);
        return role;
    }

    async update(id : number, updateRoleDto : UpdateRoleDto) {
        const role = await this.rolesRepository.buscarPorId(id);
        if (!role) {
            throw new Error(`El rol con el ${id} no encontrado`)
        }
        return this.rolesRepository.actualizar(id, updateRoleDto);
    }

    async remove(id :number) : Promise<void> {
        const role = await this.rolesRepository.buscarPorId(id);
        if (!role) {
            throw new NotFoundException (`El rol con el ${id} no existe`);
        }
        await this.rolesRepository.eliminar(id);
    }    
}
