import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ type : 'varchar', length : '100'})
    nombre : string;

    @OneToMany(() => Role, role => role.usuario)
    roles: Role[];

    @ManyToOne(() => Usuario, usuario => usuario.roles)
    usuario: Usuario;

    constructor(data? : Partial<Role>) {
        if (data) Object.assign(this, data)
    }
}