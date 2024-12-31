import { MigrationInterface, QueryRunner } from "typeorm";

export class EventInvitesAttendees1716035470917 implements MigrationInterface {
    name = 'EventInvitesAttendees1716035470917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attendee_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "profileId" character varying NOT NULL, "eventId" uuid, CONSTRAINT "PK_82f4fd9ad33986863967eabb562" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "invite_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "receiverId" character varying NOT NULL, "senderId" character varying NOT NULL, "inviteText" character varying, "eventId" uuid, CONSTRAINT "PK_7224761a65a77b2f1b2ecdc5aca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "date" TIMESTAMP NOT NULL, "access" character varying NOT NULL, "ownerId" character varying NOT NULL, "paid" boolean NOT NULL, "price" integer, "image" character varying, "roomId" character varying, "types" text array NOT NULL, CONSTRAINT "PK_c5675e66b601bd4d0882054a430" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "attendee_entity" ADD CONSTRAINT "FK_2a001f85a1c21e1f6b1afa3e3af" FOREIGN KEY ("eventId") REFERENCES "event_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invite_entity" ADD CONSTRAINT "FK_9ee5334adf44a9116c0b88db763" FOREIGN KEY ("eventId") REFERENCES "event_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`ALTER TABLE "invite_entity" DROP CONSTRAINT "FK_9ee5334adf44a9116c0b88db763"`);
        await queryRunner.query(`ALTER TABLE "attendee_entity" DROP CONSTRAINT "FK_2a001f85a1c21e1f6b1afa3e3af"`);
        await queryRunner.query(`DROP TABLE "event_entity"`);
        await queryRunner.query(`DROP TABLE "invite_entity"`);
        await queryRunner.query(`DROP TABLE "attendee_entity"`);
    }

}
