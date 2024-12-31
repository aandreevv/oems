import { MigrationInterface, QueryRunner } from "typeorm";

export class AccountAndTokens1714493726714 implements MigrationInterface {
    name = 'AccountAndTokens1714493726714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_b482dad15becff9a89ad707dcbe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "accountId" uuid, CONSTRAINT "PK_687443f2a51af49b5472e2c5ddc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "token_entity" ADD CONSTRAINT "FK_0f319e1607bbfd794a20b53d446" FOREIGN KEY ("accountId") REFERENCES "account_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`ALTER TABLE "token_entity" DROP CONSTRAINT "FK_0f319e1607bbfd794a20b53d446"`);
        await queryRunner.query(`DROP TABLE "token_entity"`);
        await queryRunner.query(`DROP TABLE "account_entity"`);
    }

}
