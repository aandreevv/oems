import { MigrationInterface, QueryRunner } from "typeorm";

export class FixEventsEntity1716051562043 implements MigrationInterface {
    name = 'FixEventsEntity1716051562043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_entity" DROP COLUMN "types"`);
        await queryRunner.query(`ALTER TABLE "event_entity" ADD "types" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_entity" DROP COLUMN "types"`);
        await queryRunner.query(`ALTER TABLE "event_entity" ADD "types" text array NOT NULL`);
    }

}
