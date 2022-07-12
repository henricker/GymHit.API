import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

@Entity({ name: 'body_meansurements' })
export class BodyMeansurements {

  @PrimaryColumn()
  id: string;

  @Column({ name: 'height' })
  height: number;

  @Column({ name: 'weight' })
  weight: number;

  @Column({ name: 'pupil_id' })
  pupil_id: string;

  @Column({ name: 'shoulders_size' })
  shouldersSize: number;

  @Column({ name: 'chest_size' })
  chestSize: number;

  @Column({ name: 'waist_size' })
  waistSize: number;

  @Column({ name: 'bicepts_left_size' })
  bicepsLeftSize: number;
  
  @Column({ name: 'bicepts_right_size' })
  bicepsRightSize: number;

  @Column({ name: 'thighs_left_size' })
  thighsLeftSize: number;

  @Column({ name: 'thighs_right_size' })
  thighsRightSize: number;

  @Column({ name: 'calf_left_size' })
  calfLeftSize: number;

  @Column({ name: 'calf_right_size' })
  calfRightSize: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor(bodyMeansurements: Partial<BodyMeansurements>) {
    Object.assign(this, bodyMeansurements);
    if(!this.id){
      this.id = uuid()
    }
  }
}