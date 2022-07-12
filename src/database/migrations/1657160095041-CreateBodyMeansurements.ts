import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateBodyMeansurements1657160095041 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'body_meansurements',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'pupil_id',
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'height',
                    type: 'float',
                    isNullable: false
                },
                {
                    name: 'weight',
                    type: 'float',
                    isNullable: false
                },
                {
                    name: 'shoulders_size',
                    type: 'float',
                    isNullable: false
                },
                {
                    name: 'chest_size',
                    type: 'float',
                    isNullable: false
                },
                {
                    name: 'waist_size',
                    type: 'float',
                    isNullable: false
                },
                {
                    name: 'bicepts_left_size',
                    type: 'float',
                    isNullable: false  
                },
                {
                    name: 'bicepts_right_size',
                    type: 'float',
                    isNullable: false
                },
                {
                    name: 'thighs_left_size',
                    type: 'float',
                    isNullable: false
                },
                {
                    name: 'thighs_right_size',
                    type: 'float',
                    isNullable: false
                },
                {
                    name: 'calf_left_size',
                    type: 'float',
                    isNullable: false
                },
                {
                    name: 'calf_right_size',
                    type: 'float',
                    isNullable: false
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    name: 'fk_body_meansurements_pupil',
                    columnNames: ['pupil_id'],
                    referencedTableName: 'pupils',
                    referencedColumnNames: ['id']
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('body_meansurements');
    }

}
