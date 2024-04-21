import { Role } from "src/roles/entities/roles.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({ type : 'varchar', length : '50' })
    nombre : string;

    @Column({ type : 'varchar', length : '50', unique : true })
    nombreUsuario : string;
    
    @Column({ type : 'varchar', length : '50', unique : true })
    email : string;

    @Column({ type : 'varchar' })
    password : string;

    @OneToMany(() => Role, role => role.usuario)
    roles: Role[];

    constructor(data?: Partial<Usuario>) {
        if (data) Object.assign(this, data)
    }
}
