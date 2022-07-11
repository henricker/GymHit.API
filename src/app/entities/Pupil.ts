import {Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm'
import { Admin } from './Admin'
import {v4 as uuid} from 'uuid'

@Entity('pupils')
export class Pupil{
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    cpf: string

    @Column()
    admin_id: string

    @Column()
    email: string;

    @Column()
    weight: number;

    @Column()
    height: number;

    @Column()
    telephone: string;

    @ManyToOne(() => Admin)
    @JoinColumn({name: 'admin_id'})
    admin: Admin

    @CreateDateColumn()
    created_at: Date

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}