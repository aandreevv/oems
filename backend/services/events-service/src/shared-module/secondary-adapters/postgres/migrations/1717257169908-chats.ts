import { MigrationInterface, QueryRunner } from "typeorm";

export class Chats1717257169908 implements MigrationInterface {
    name = 'Chats1717257169908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_entity" ADD "chatId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_entity" DROP COLUMN "chatId"`);
    }

}
