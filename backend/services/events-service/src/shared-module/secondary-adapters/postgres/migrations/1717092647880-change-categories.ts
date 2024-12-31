import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCategories1717092647880 implements MigrationInterface {
    name = 'ChangeCategories1717092647880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_entity" DROP COLUMN "categories"`);
        await queryRunner.query(`ALTER TABLE "event_entity" ADD "categories" text array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_entity" DROP COLUMN "categories"`);
        await queryRunner.query(`ALTER TABLE "event_entity" ADD "categories" text NOT NULL`);
    }

}
