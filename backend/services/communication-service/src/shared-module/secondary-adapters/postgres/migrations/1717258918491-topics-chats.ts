import { MigrationInterface, QueryRunner } from "typeorm";

export class TopicsChats1717258918491 implements MigrationInterface {
    name = 'TopicsChats1717258918491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_entity" ADD "topic" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_entity" DROP COLUMN "topic"`);
    }

}
