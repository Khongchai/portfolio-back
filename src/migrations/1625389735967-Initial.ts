import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1625389735978 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
               ((select id from technology_entity where title='Docker'), (select id from project_entity where title = 'ECommerce'));
      
               insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
               ((select id from technology_entity where title='Docker'), (select id from project_entity where title = 'Portfolio'));
    `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
