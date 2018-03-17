import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1521294120599 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" text NOT NULL, PRIMARY KEY("id"))`);
    await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "enabled" boolean NOT NULL DEFAULT true, "created" TIMESTAMP NOT NULL DEFAULT '"2018-03-17T13:42:00.980Z"', PRIMARY KEY("id"))`);
    await queryRunner.query(`CREATE TABLE "user_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, PRIMARY KEY("userId", "roleId"))`);
    await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "fk_946ab470000574a2948f572f78d" FOREIGN KEY ("userId") REFERENCES "user"("id")`);
    await queryRunner.query(`ALTER TABLE "user_role" ADD CONSTRAINT "fk_46b97ea5eb578508ce2d0c33654" FOREIGN KEY ("roleId") REFERENCES "role"("id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "fk_46b97ea5eb578508ce2d0c33654"`);
    await queryRunner.query(`ALTER TABLE "user_role" DROP CONSTRAINT "fk_946ab470000574a2948f572f78d"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }

}
