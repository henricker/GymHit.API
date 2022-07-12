import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

import { v4 as uuid } from 'uuid';

@Entity({ name: 'medias' })
export class Medias {

  @PrimaryColumn()
  id: string;

  @Column()
  url: string;

  @Column()
  pupil_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(){
    if(!this.id){
        this.id = uuid()
    }
}

}