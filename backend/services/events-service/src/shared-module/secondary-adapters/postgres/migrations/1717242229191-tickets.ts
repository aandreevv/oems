import { MigrationInterface, QueryRunner } from "typeorm";

export class Tickets1717242229191 implements MigrationInterface {
    name = 'Tickets1717242229191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "eventId" uuid, CONSTRAINT "PK_4c23bb38e4d566808a73a5af6ec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ticket_entity" ADD CONSTRAINT "FK_97dcdbd6a1c293da8aa198a6140" FOREIGN KEY ("eventId") REFERENCES "event_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_entity" DROP CONSTRAINT "FK_97dcdbd6a1c293da8aa198a6140"`);
        await queryRunner.query(`DROP TABLE "ticket_entity"`);
    }

}
