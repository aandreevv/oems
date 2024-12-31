import { MigrationInterface, QueryRunner } from "typeorm";

export class CommunicationIdentity1715014536539 implements MigrationInterface {
    name = 'CommunicationIdentity1715014536539'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "communication_identity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountId" character varying NOT NULL, "identityId" character varying NOT NULL, CONSTRAINT "PK_c3d07666cd3a141a4cecf519e9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`DROP TABLE "communication_identity"`);
    }

}
