import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "./entities/roles.entity";
import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RolesRepository {

    constructor(
        @InjectRepository(Role) private readonly roleRepository : Repository<Role>,
    ){}

    crear(createRoleDto :  CreateRoleDto) : Promise<Role>   {
        return this.roleRepository.save(createRoleDto);
    }

    listar() : Promise<Role[]> {
        return this.roleRepository.find();
    }

    buscarPorId(id :number) : Promise<Role>  {
        return this.roleRepository.findOne({where: {id}});
    }

    buscarPorNombre(nombre : string) : Promise<Role>   {
        return this.roleRepository.findOne({ where : {nombre}});
    }

    actualizar(id : number, updateRoleDto : UpdateRoleDto) {
        return this.roleRepository.update(id, updateRoleDto);
    }

    eliminar(id: number) {
        return this.roleRepository.delete(id);
    }

} 