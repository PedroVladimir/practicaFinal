import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    constructor(data?: Partial<Usuario>) {
        if (data) Object.assign(this, data)
    }
}
