import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addAmountOnAdminTable1657622594044 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('admin', new TableColumn({
            name: 'amount',
            type: 'number',
            precision: 10,
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('admin', 'amount');
    }

}
