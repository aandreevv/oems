import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveOwnerIdField1716051151984 implements MigrationInterface {
    name = 'RemoveOwnerIdField1716051151984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_entity" DROP COLUMN "ownerId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "room_entity" ADD "ownerId" character varying NOT NULL`);
    }

}
