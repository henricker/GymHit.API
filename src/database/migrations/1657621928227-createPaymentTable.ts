import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createPaymentTable1657621928227 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "payments",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "amount",
                    type: "number",
                    precision: 10,
                },
                {
                    name: 'admin_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: 'pupil_id',
                    type: 'uuid',
                    isNullable: false,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payments");
    }

}
