import { MigrationInterface, QueryRunner } from "typeorm";

export class EditRelation1626290719357 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
        ((select id from technology_entity where title='Apollo'), (select id from project_entity where title = 'Portfolio'));`);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
