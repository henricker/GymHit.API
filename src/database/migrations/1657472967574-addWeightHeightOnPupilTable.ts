import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addWeightHeightOnPupilTable1657472967574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('pupils', new TableColumn({
            name: 'weight',
            type: 'float',
            isNullable: true
        }));

        await queryRunner.addColumn('pupils', new TableColumn({
            name: 'height',
            type: 'float',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('pupils', 'weight');
        await queryRunner.dropColumn('pupils', 'height');
    }

}
