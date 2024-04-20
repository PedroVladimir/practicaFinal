import { Injectable } from "@nestjs/common";
import { Usuario } from "./entities/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioRepository {

    constructor(@InjectRepository(Usuario) private readonly usuarioRepository : Repository<Usuario>,)
    {}

    crear( createUsuarioDto : CreateUsuarioDto) {
        return this.usuarioRepository.save(createUsuarioDto);
    }

    buscarPorNombre(nombreUsuario: string){
        return this.usuarioRepository.findOne({ where : {nombreUsuario}});
    }

    listar() {
        return this.usuarioRepository.find();
    }

    buscarPorId(id : number) {
        return this.usuarioRepository.findOneBy({id});
    }

    actualizar(id : number, updateUsuarioDto : UpdateUsuarioDto) {
        return this.usuarioRepository.update(id, updateUsuarioDto)
    }

    eliminar(id : number) {
        return this.usuarioRepository.delete(id);
    }

}