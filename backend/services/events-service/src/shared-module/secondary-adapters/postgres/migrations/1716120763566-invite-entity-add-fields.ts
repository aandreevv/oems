import { MigrationInterface, QueryRunner } from "typeorm";

export class InviteEntityAddFields1716120763566 implements MigrationInterface {
    name = 'InviteEntityAddFields1716120763566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite_entity" ADD "responseText" character varying`);
        await queryRunner.query(`ALTER TABLE "invite_entity" ADD "status" character varying NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "invite_entity" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "invite_entity" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invite_entity" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "invite_entity" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "invite_entity" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "invite_entity" DROP COLUMN "responseText"`);
    }

}
