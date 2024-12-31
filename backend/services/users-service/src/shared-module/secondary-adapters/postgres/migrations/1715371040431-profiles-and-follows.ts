import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfilesAndFollows1715371040431 implements MigrationInterface {
    name = 'ProfilesAndFollows1715371040431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follow_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "followerId" uuid, "followingId" uuid, CONSTRAINT "PK_18966373213f8c51750c227943b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" character varying NOT NULL, "username" character varying NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, "bio" character varying, "picture" character varying, "phoneNumber" character varying NOT NULL, "language" character varying NOT NULL DEFAULT 'UKRAINIAN', "accountId" uuid, CONSTRAINT "UQ_d23267f3f75c410927254f2b6f0" UNIQUE ("username"), CONSTRAINT "UQ_9bf6c43318bac7c3d0e153887ea" UNIQUE ("phoneNumber"), CONSTRAINT "REL_21f0debd1f04baf3260793a4a3" UNIQUE ("accountId"), CONSTRAINT "PK_330d3560db0dac16f06a04609bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "follow_entity" ADD CONSTRAINT "FK_97cb93945af35621ff3606cd4d6" FOREIGN KEY ("followerId") REFERENCES "profile_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow_entity" ADD CONSTRAINT "FK_1c98834a7ecb2a640124090edc8" FOREIGN KEY ("followingId") REFERENCES "profile_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profile_entity" ADD CONSTRAINT "FK_21f0debd1f04baf3260793a4a3f" FOREIGN KEY ("accountId") REFERENCES "account_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile_entity" DROP CONSTRAINT "FK_21f0debd1f04baf3260793a4a3f"`);
        await queryRunner.query(`ALTER TABLE "follow_entity" DROP CONSTRAINT "FK_1c98834a7ecb2a640124090edc8"`);
        await queryRunner.query(`ALTER TABLE "follow_entity" DROP CONSTRAINT "FK_97cb93945af35621ff3606cd4d6"`);
        await queryRunner.query(`DROP TABLE "profile_entity"`);
        await queryRunner.query(`DROP TABLE "follow_entity"`);
    }

}
