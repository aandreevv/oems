import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameFieldAttendees1716058476195 implements MigrationInterface {
    name = 'RenameFieldAttendees1716058476195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendee_entity" RENAME COLUMN "profileId" TO "accountId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attendee_entity" RENAME COLUMN "accountId" TO "profileId"`);
    }

}
