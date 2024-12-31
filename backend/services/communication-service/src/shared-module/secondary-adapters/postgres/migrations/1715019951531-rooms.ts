import { MigrationInterface, QueryRunner } from "typeorm";

export class Rooms1715019951531 implements MigrationInterface {
    name = 'Rooms1715019951531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "room_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roomId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "validFrom" TIMESTAMP NOT NULL, "validUntil" TIMESTAMP NOT NULL, "ownerId" character varying NOT NULL, CONSTRAINT "PK_fc9fe8e7b09bbbeea55ba770e1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "call_participant_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roomId" uuid, "identityId" uuid, CONSTRAINT "PK_8483b8bde8e205878304bc4b4ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "call_participant_entity" ADD CONSTRAINT "FK_57ee6638cdcbf1d6c18e0fd21f2" FOREIGN KEY ("roomId") REFERENCES "room_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "call_participant_entity" ADD CONSTRAINT "FK_74326c1849fdc7bb488171abd36" FOREIGN KEY ("identityId") REFERENCES "communication_identity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_participant_entity" DROP CONSTRAINT "FK_74326c1849fdc7bb488171abd36"`);
        await queryRunner.query(`ALTER TABLE "call_participant_entity" DROP CONSTRAINT "FK_57ee6638cdcbf1d6c18e0fd21f2"`);
        await queryRunner.query(`DROP TABLE "call_participant_entity"`);
        await queryRunner.query(`DROP TABLE "room_entity"`);
    }

}
