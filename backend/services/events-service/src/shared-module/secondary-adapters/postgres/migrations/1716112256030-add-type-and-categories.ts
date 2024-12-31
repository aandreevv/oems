import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTypeAndCategories1716112256030 implements MigrationInterface {
    name = 'AddTypeAndCategories1716112256030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_entity" DROP COLUMN "types"`);
        await queryRunner.query(`ALTER TABLE "event_entity" ADD "categories" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_entity" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_entity" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "event_entity" DROP COLUMN "categories"`);
        await queryRunner.query(`ALTER TABLE "event_entity" ADD "types" text NOT NULL`);
    }

}
