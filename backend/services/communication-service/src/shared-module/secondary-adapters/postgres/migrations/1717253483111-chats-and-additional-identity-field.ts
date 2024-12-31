import { MigrationInterface, QueryRunner } from "typeorm";

export class ChatsAndAdditionalIdentityField1717253483111 implements MigrationInterface {
    name = 'ChatsAndAdditionalIdentityField1717253483111'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat_participant_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "identityId" uuid, "chatId" uuid, CONSTRAINT "PK_d5fb1b55b111878c729f43d880a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "threadId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "image" character varying, CONSTRAINT "PK_07e65670b36d025a69930ae6f2e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "communication_identity" ADD "displayName" character varying`);
        await queryRunner.query(`ALTER TABLE "chat_participant_entity" ADD CONSTRAINT "FK_60f53b43ba40cc03299b299c184" FOREIGN KEY ("identityId") REFERENCES "communication_identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_participant_entity" ADD CONSTRAINT "FK_fc8d7b4426e3424e7b5f83adfa1" FOREIGN KEY ("chatId") REFERENCES "chat_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_participant_entity" DROP CONSTRAINT "FK_fc8d7b4426e3424e7b5f83adfa1"`);
        await queryRunner.query(`ALTER TABLE "chat_participant_entity" DROP CONSTRAINT "FK_60f53b43ba40cc03299b299c184"`);
        await queryRunner.query(`ALTER TABLE "communication_identity" DROP COLUMN "displayName"`);
        await queryRunner.query(`DROP TABLE "chat_entity"`);
        await queryRunner.query(`DROP TABLE "chat_participant_entity"`);
    }

}
