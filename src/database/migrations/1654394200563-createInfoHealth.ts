import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createInfoHealth1657039616911 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'info_health',
            columns: [
                {
                    name: 'id',
                    isPrimary: true,
                    type: 'uuid'
                },
                {
                    name: 'has_smoke',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'chronic_disease',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'respiratory_disease',
                    type: 'boolean',
                    default: false
                },
                {
                    name: 'has_diabetes',
                    type: 'boolean',
                    default: false
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('info_health', true);
    }

}
