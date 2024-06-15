import { Usuario } from "../../usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id : number;

    @Column({ type : 'varchar', length : '100'})
    nombre : string;


    // @OneToMany(() => Usuario, usuario => usuario.role)
    // usuario: Usuario[];

    // constructor(data? : Partial<Role>) {
    //     if (data) Object.assign(this, data)
    // }
}