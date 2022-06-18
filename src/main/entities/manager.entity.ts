import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { IManager } from '../../domain/entities/manager.interface'

@Entity('managers')
export class Manager implements IManager {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cnpj: string;

    @Column()
    coorporateName: string;
    
    @Column()
    fantasyName: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}