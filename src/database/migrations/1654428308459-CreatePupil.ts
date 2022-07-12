import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePupil1654428308459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            await queryRunner.createTable(
                new Table({
                    name: 'pupils',
                    columns: [
                        {
                            name: 'id',
                            type: 'uuid',
                            isPrimary: true
                        },
                        {
                            name: 'name',
                            type: 'varchar'
                        },
                        {
                            name: 'cpf',
                            type: 'varchar',
                            isUnique: true
                        },
                        {
                            name: 'telephone',
                            type: 'varchar'
                        },
                        {
                            name: 'email',
                            type: 'varchar'
                        },
                        {
                            name: 'admin_id',
                            type: 'uuid'
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
                            name: 'fk_pupils_admin',
                            columnNames: ['admin_id'],
                            referencedTableName: 'admin',
                            referencedColumnNames: ['id']
                        }
                    ]
                })
            )
        } catch(err) {
            console.log(err);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pupils')
    }

}
