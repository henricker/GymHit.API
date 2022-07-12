import {Entity, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn, PrimaryGeneratedColumn} from 'typeorm'
import {v4 as uuid} from 'uuid'

@Entity('admin')
export class Admin{
    @PrimaryColumn()
    id: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    cnpj: string;
    
    @Column()
    fantasy_name: string

    @Column()
    coorporate_name: string

    @Column()
    telephone: string;

    @Column()
    city: string;

    @Column()
    street: string;

    @Column()
    district: string;

    @Column()
    number: number;

    @Column()
    amount: number;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}