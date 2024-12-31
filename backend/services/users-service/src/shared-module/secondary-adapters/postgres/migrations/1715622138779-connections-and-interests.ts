import { MigrationInterface, QueryRunner } from "typeorm";

export class ConnectionsAndInterests1715622138779 implements MigrationInterface {
    name = 'ConnectionsAndInterests1715622138779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "connection_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "url" character varying NOT NULL, "profileId" uuid, CONSTRAINT "PK_bef9bb3ecfcd74bcee33ed7eb24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "interest_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying NOT NULL, "profileId" uuid, CONSTRAINT "PK_c689fa75b2093510aa08352ec6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "connection_entity" ADD CONSTRAINT "FK_6c2cae0ebb2b34605693b5e9d35" FOREIGN KEY ("profileId") REFERENCES "profile_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "interest_entity" ADD CONSTRAINT "FK_0f445a4a950b74053e4f30abfba" FOREIGN KEY ("profileId") REFERENCES "profile_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "interest_entity" DROP CONSTRAINT "FK_0f445a4a950b74053e4f30abfba"`);
        await queryRunner.query(`ALTER TABLE "connection_entity" DROP CONSTRAINT "FK_6c2cae0ebb2b34605693b5e9d35"`);
        await queryRunner.query(`DROP TABLE "interest_entity"`);
        await queryRunner.query(`DROP TABLE "connection_entity"`);
    }

}
