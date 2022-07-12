import { Entity, PrimaryColumn, Column, CreateDateColumn} from "typeorm";

@Entity({ name: 'payments' })
export class Payment {

  @PrimaryColumn()
  id: string;

  @Column()
  amount: number;

  @Column()
  admin_id: string;

  @Column()
  pupil_id: string;

  @CreateDateColumn()
  created_at: Date;
}