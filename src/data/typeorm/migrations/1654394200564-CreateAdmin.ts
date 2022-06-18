import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAdmin1654394200564 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'manager',
                columns:[
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true
                    },
                    {
                        name: 'fantasy_name',
                        type: 'varchar',
                        isNullable: false 
                    },
                    {
                        name: 'coorporate_name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'cnpj',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'user_id',
                        type: 'integer',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: 'fk_user',
                        referencedTableName: 'users',
                        columnNames: ['user_id'],
                        referencedColumnNames: ['id']
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('managers')
    }

}
