import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1625389735967 implements MigrationInterface {
  name = "Initial1625389735967";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "admin_entity" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_2a4c8cb05264be7377c625c2715" UNIQUE ("email"), CONSTRAINT "PK_bc992df5ddb70aefb955b8a0c92" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "technology_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "UQ_335af9ef047bc75116f6f8ee572" UNIQUE ("title"), CONSTRAINT "PK_e943c6234b499b4bb4b2f7feec2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "project_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "shortDescription" character varying NOT NULL, "githubLink" character varying NOT NULL, "websiteLink" character varying, "imgLink" character varying, "tinyImgLink" character varying, "startDate" character varying NOT NULL, "endDate" character varying, "isHighlight" boolean, CONSTRAINT "UQ_d0bb39c7fc0bd40f20a55620474" UNIQUE ("title"), CONSTRAINT "PK_7a75a94e01d0b50bff123db1b87" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "technology_entity_front_end_in_project_entity" ("technologyEntityId" integer NOT NULL, "projectEntityId" integer NOT NULL, CONSTRAINT "PK_e141501f97c70b23434bd970ae5" PRIMARY KEY ("technologyEntityId", "projectEntityId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bdc5449f95e5a37cfad2139396" ON "technology_entity_front_end_in_project_entity" ("technologyEntityId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0ac6e288eb3e89c8a9e6a4ea6c" ON "technology_entity_front_end_in_project_entity" ("projectEntityId") `
    );
    await queryRunner.query(
      `CREATE TABLE "technology_entity_back_end_in_project_entity" ("technologyEntityId" integer NOT NULL, "projectEntityId" integer NOT NULL, CONSTRAINT "PK_1fbcb65fa2375ae2cf5a7d7849a" PRIMARY KEY ("technologyEntityId", "projectEntityId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3e44d037f11d5b695d8571b263" ON "technology_entity_back_end_in_project_entity" ("technologyEntityId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a1c499275a39d4bd9de130438b" ON "technology_entity_back_end_in_project_entity" ("projectEntityId") `
    );
    await queryRunner.query(
      `CREATE TABLE "technology_entity_language_of_project_entity" ("technologyEntityId" integer NOT NULL, "projectEntityId" integer NOT NULL, CONSTRAINT "PK_90c5666d8da7e50af32366d4c3a" PRIMARY KEY ("technologyEntityId", "projectEntityId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d5c3abc29890ef71134f470656" ON "technology_entity_language_of_project_entity" ("technologyEntityId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_55c9312a624608d7cdbf2fb416" ON "technology_entity_language_of_project_entity" ("projectEntityId") `
    );
    await queryRunner.query(
      `CREATE TABLE "technology_entity_hosting_project_entity" ("technologyEntityId" integer NOT NULL, "projectEntityId" integer NOT NULL, CONSTRAINT "PK_5ab3290c6f01036b999f74fabf1" PRIMARY KEY ("technologyEntityId", "projectEntityId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f6dc6fc1f7a7498097da520a6b" ON "technology_entity_hosting_project_entity" ("technologyEntityId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_74a6fb4488f6a86dd7328085f4" ON "technology_entity_hosting_project_entity" ("projectEntityId") `
    );
    await queryRunner.query(
      `ALTER TABLE "technology_entity_front_end_in_project_entity" ADD CONSTRAINT "FK_bdc5449f95e5a37cfad21393966" FOREIGN KEY ("technologyEntityId") REFERENCES "technology_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "technology_entity_front_end_in_project_entity" ADD CONSTRAINT "FK_0ac6e288eb3e89c8a9e6a4ea6c8" FOREIGN KEY ("projectEntityId") REFERENCES "project_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "technology_entity_back_end_in_project_entity" ADD CONSTRAINT "FK_3e44d037f11d5b695d8571b263b" FOREIGN KEY ("technologyEntityId") REFERENCES "technology_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "technology_entity_back_end_in_project_entity" ADD CONSTRAINT "FK_a1c499275a39d4bd9de130438ba" FOREIGN KEY ("projectEntityId") REFERENCES "project_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "technology_entity_language_of_project_entity" ADD CONSTRAINT "FK_d5c3abc29890ef71134f4706569" FOREIGN KEY ("technologyEntityId") REFERENCES "technology_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "technology_entity_language_of_project_entity" ADD CONSTRAINT "FK_55c9312a624608d7cdbf2fb4162" FOREIGN KEY ("projectEntityId") REFERENCES "project_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "technology_entity_hosting_project_entity" ADD CONSTRAINT "FK_f6dc6fc1f7a7498097da520a6bf" FOREIGN KEY ("technologyEntityId") REFERENCES "technology_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "technology_entity_hosting_project_entity" ADD CONSTRAINT "FK_74a6fb4488f6a86dd7328085f46" FOREIGN KEY ("projectEntityId") REFERENCES "project_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(`
        alter sequence technology_entity_id_seq restart with 1;
        insert into technology_entity (title) values ('TypeORM');
        insert into technology_entity (title) values ('MikroORM');
        insert into technology_entity (title) values ('Docker');
        insert into technology_entity (title) values ('Github');
        insert into technology_entity (title) values ('jQuery');
        insert into technology_entity (title) values ('Java');
        insert into technology_entity (title) values ('Sass');
        insert into technology_entity (title) values ('PostgreSQL');
        insert into technology_entity (title) values ('GitHub Pages');
        insert into technology_entity (title) values ('TypeScript');
        insert into technology_entity (title) values ('React');
        insert into technology_entity (title) values ('Redux');
        insert into technology_entity (title) values ('Android');
        insert into technology_entity (title) values ('Express');
        insert into technology_entity (title) values ('Django');
        insert into technology_entity (title) values ('Next.js');
        insert into technology_entity (title) values ('Heroku');
        insert into technology_entity (title) values ('Gatsby');
        insert into technology_entity (title) values ('styled-components');
        insert into technology_entity (title) values ('Chakra UI');
        insert into technology_entity (title) values ('Python');
        insert into technology_entity (title) values ('Javascript');
        insert into technology_entity (title) values ('Redis');
        insert into technology_entity (title) values ('Apollo');
        insert into technology_entity (title) values ('Urql');
        insert into technology_entity (title) values ('Node');
        insert into technology_entity (title) values ('TypeGraphQL');
        insert into technology_entity (title) values ('GraphQL'); 
        insert into technology_entity (title) values ('SQL');
        insert into technology_entity (title) values ('Google Play');
        insert into technology_entity (title) values ('Three.js');
        insert into technology_entity (title) values ('Go');
        insert into technology_entity (title) values ('Vercel');
    `);
    await queryRunner.query(`
       
        alter sequence project_entity_id_seq restart with 1;
        insert into project_entity (title, description, "shortDescription", "githubLink", "websiteLink", "startDate", "endDate", "isHighlight", "imgLink", "tinyImgLink")
             values ('ASTRUM', 'The artistic project ASTRUM is an interdisciplinary project combining different
             aspects of music, music production, and technology to help tell the story about our relationship with the solar system.
             The outcomes of this projects are a website that, with the help of the NASA''s Eyes, explore our relationship
             with the solar system through 8 pieces of music and a set of stories written by Lourna Mydes Quinto, and an Android application
             that allows for an interaction with binaural pieces that use elements from the aforementioned 8 pieces of music.',
             'Pure HTML/CSS/Javascript',
             'https://github.com/Khongchai/ASTRUM-2020',
             'https://khongchai.github.io/ASTRUM-2020/',
             '2019-06-15', '2020-07-25', 'true',
             'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1618208180/Screen_Shot_2021-04-13_at_12.47.03-fullpage_farusu.png',
             'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1618208325/webicontransparent_nruh6b.png');
             insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values
                ((select id from technology_entity where title='jQuery'), (select id from project_entity where title = 'ASTRUM')),
                ((select id from technology_entity where title='Android'), (select id from project_entity where title = 'ASTRUM')),
                ((select id from technology_entity where title='Sass'), (select id from project_entity where title = 'ASTRUM'));
             insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('GitHub Pages')),(select id from project_entity where title = 'ASTRUM'));
             insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values
                 ((select id from technology_entity where title in ('Javascript')), (select id from project_entity where title = 'ASTRUM')),
                 ((select id from technology_entity where title in ('Java')), (select id from project_entity where title = 'ASTRUM'));
        insert into project_entity (title, description, "shortDescription", "githubLink", "websiteLink", "startDate", "endDate", "isHighlight", "imgLink", "tinyImgLink")
             values ('Journeys', 'A simple blog with custom-made navigation bar and timeline based on provided mdx data. This project makes a heavy use of css grid.',
             'A simple blog with Gatsby',
             'https://github.com/Khongchai/journeys',
             'https://khongchai.github.io/journeys',
             '2020-12-23', '2021-04-30', 'true',
             'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1618208183/Screen_Shot_2021-04-13_at_12.48.04-fullpage_wndync.png',
             'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1618208450/Journeys_fancct.png');
             insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values
                ((select id from technology_entity where title='Gatsby'), (select id from project_entity where title = 'Journeys')),
                ((select id from technology_entity where title='React'), (select id from project_entity where title = 'Journeys')),
                ((select id from technology_entity where title='styled-components'), (select id from project_entity where title = 'Journeys'));
             insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('GitHub Pages')),(select id from project_entity where title = 'Journeys'));
             insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values
             ((select id from technology_entity where title = 'Javascript'), (select id from project_entity where title = 'Journeys')),
             ((select id from technology_entity where title = 'TypeScript'), (select id from project_entity where title = 'Journeys'));
        insert into project_entity (title, description, "shortDescription", "githubLink", "websiteLink", "startDate", "endDate", "isHighlight", "imgLink", "tinyImgLink")
             values ('WordMem', 'A vocab memorization application, allows for simple CRUD operation, auth (login, logout, register), and dictionary scraping with beautiful soup.',
             'CRUD + Webscraping',
             'https://github.com/Khongchai/WordMem',
             'https://vocab-mem-front.herokuapp.com/',
             '2020-10-11', '2021-02-16', 'false',
             'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1618208180/vocabmem_ghkfrx.png',
             'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1618208642/WordMem_nuur0x.png');
             insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values
                ((select id from technology_entity where title='React'), (select id from project_entity where title = 'WordMem')),
                ((select id from technology_entity where title='Redux'), (select id from project_entity where title = 'WordMem'));
             insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title='Django'), (select id from project_entity where title = 'WordMem'));
             insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Heroku')),(select id from project_entity where title = 'WordMem'));
             insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values
                ((select id from technology_entity where title in ('Javascript')), (select id from project_entity where title = 'WordMem')),
                ((select id from technology_entity where title in ('Python')), (select id from project_entity where title = 'WordMem'));
        insert into project_entity (title, description, "shortDescription", "githubLink", "startDate", "isHighlight")
             values ('VocabMem', 'A fully-fledged vocab memorization with features such as optional syntax-highlighting words that are already memorized and web-scraping for examples from movies scripts. This project is on hold.',
             'WordMem''s bigger cousin',
             'https://github.com/Khongchai/vocabmem',
             '2021-02-09', 'false');
             insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values
                ((select id from technology_entity where title='React'), (select id from project_entity where title = 'VocabMem')),
                ((select id from technology_entity where title='Chakra UI'), (select id from project_entity where title = 'VocabMem')),
               ((select id from technology_entity where title='Apollo'), (select id from project_entity where title = 'VocabMem')),
                ((select id from technology_entity where title='Next.js'), (select id from project_entity where title = 'VocabMem')),
                ((select id from technology_entity where title='GraphQL'), (select id from project_entity where title = 'VocabMem'));
             insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values
             ((select id from technology_entity where title='Node'), (select id from project_entity where title = 'VocabMem')),
              ((select id from technology_entity where title='Express'), (select id from project_entity where title = 'VocabMem')),
             ((select id from technology_entity where title='PostgreSQL'), (select id from project_entity where title = 'VocabMem')),
             ((select id from technology_entity where title='Apollo'), (select id from project_entity where title = 'VocabMem')),
              ((select id from technology_entity where title='TypeORM'), (select id from project_entity where title = 'VocabMem'));
             insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('TypeScript')), (select id from project_entity where title = 'VocabMem'));
        insert into project_entity (title, description, "shortDescription", "githubLink", "startDate", "isHighlight")
             values ('Portfolio', 'This portfolio website combines some of the hottest and newest technologies in 2021. Urql was chosen for front-end hydration thanks to its great customizability. Its out-of-the-box document caching is also great when you
             want to just get started right away. As for Chakra UI, in my opinion, this far exceeds styled-components and bootstrap in terms of customizability and speed. Chakra has got almost everything you need out of the box, its mobile-first philosophy also allows for a very concise syntax.
             Redis is preferred for storing admin session cookie because it''s super duper fast',
             'A not-so-simple portfolio',
             'https://github.com/Khongchai/portfolio',
             '2021-01-10', 'true');
             insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values
                ((select id from technology_entity where title='Next.js'), (select id from project_entity where title = 'Portfolio')),
                ((select id from technology_entity where title='React'), (select id from project_entity where title = 'Portfolio')),
                ((select id from technology_entity where title='Chakra UI'), (select id from project_entity where title = 'Portfolio')),
                ((select id from technology_entity where title='Urql'), (select id from project_entity where title = 'Portfolio')),
                ((select id from technology_entity where title='GraphQL'), (select id from project_entity where title = 'Portfolio'));
             insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values
              ((select id from technology_entity where title='Express'), (select id from project_entity where title = 'Portfolio')),
              ((select id from technology_entity where title='Node'), (select id from project_entity where title = 'Portfolio')),
              ((select id from technology_entity where title='TypeGraphQL'), (select id from project_entity where title = 'Portfolio')),
              ((select id from technology_entity where title='TypeORM'), (select id from project_entity where title = 'Portfolio')),
              ((select id from technology_entity where title='Redis'), (select id from project_entity where title = 'Portfolio')),
              ((select id from technology_entity where title='PostgreSQL'), (select id from project_entity where title = 'Portfolio'));
             insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Heroku')),(select id from project_entity where title = 'Portfolio'));
             insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values
             ((select id from technology_entity where title in ('Javascript')), (select id from project_entity where title = 'Portfolio')),
             ((select id from technology_entity where title in ('TypeScript')), (select id from project_entity where title = 'Portfolio')),
             ((select id from technology_entity where title in ('SQL')), (select id from project_entity where title = 'Portfolio'));
       insert into project_entity (title, description, "shortDescription", "githubLink", "websiteLink", "startDate", "isHighlight", "imgLink")
          values ('TripleAGloves', 'A portfolio website for a glove company in Thailand. The site was built using mainly Gatsby and Threejs, hosted on Github Pages.',
          'Company Portfolio',
          'https://github.com/Khongchai/TripleAGloves',
          'https://khongchai.github.io/TripleAGloves/',
          '2021-03-20', 'false',
          'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1622795443/Capture_km3tke.png');
          insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values
            ((select id from technology_entity where title='Gatsby'), (select id from project_entity where title = 'TripleAGloves')),
            ((select id from technology_entity where title='React'), (select id from project_entity where title = 'TripleAGloves')),
            ((select id from technology_entity where title='Three.js'), (select id from project_entity where title = 'TripleAGloves')),
            ((select id from technology_entity where title='styled-components'), (select id from project_entity where title = 'TripleAGloves'));
         insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('GitHub Pages')),(select id from project_entity where title = 'TripleAGloves'));
         insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values
         ((select id from technology_entity where title = 'Javascript'), (select id from project_entity where title = 'TripleAGloves')),
         ((select id from technology_entity where title = 'TypeScript'), (select id from project_entity where title = 'TripleAGloves'));
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "technology_entity_hosting_project_entity" DROP CONSTRAINT "FK_74a6fb4488f6a86dd7328085f46"`
    );
    await queryRunner.query(
      `ALTER TABLE "technology_entity_hosting_project_entity" DROP CONSTRAINT "FK_f6dc6fc1f7a7498097da520a6bf"`
    );
    await queryRunner.query(
      `ALTER TABLE "technology_entity_language_of_project_entity" DROP CONSTRAINT "FK_55c9312a624608d7cdbf2fb4162"`
    );
    await queryRunner.query(
      `ALTER TABLE "technology_entity_language_of_project_entity" DROP CONSTRAINT "FK_d5c3abc29890ef71134f4706569"`
    );
    await queryRunner.query(
      `ALTER TABLE "technology_entity_back_end_in_project_entity" DROP CONSTRAINT "FK_a1c499275a39d4bd9de130438ba"`
    );
    await queryRunner.query(
      `ALTER TABLE "technology_entity_back_end_in_project_entity" DROP CONSTRAINT "FK_3e44d037f11d5b695d8571b263b"`
    );
    await queryRunner.query(
      `ALTER TABLE "technology_entity_front_end_in_project_entity" DROP CONSTRAINT "FK_0ac6e288eb3e89c8a9e6a4ea6c8"`
    );
    await queryRunner.query(
      `ALTER TABLE "technology_entity_front_end_in_project_entity" DROP CONSTRAINT "FK_bdc5449f95e5a37cfad21393966"`
    );
    await queryRunner.query(`DROP INDEX "IDX_74a6fb4488f6a86dd7328085f4"`);
    await queryRunner.query(`DROP INDEX "IDX_f6dc6fc1f7a7498097da520a6b"`);
    await queryRunner.query(
      `DROP TABLE "technology_entity_hosting_project_entity"`
    );
    await queryRunner.query(`DROP INDEX "IDX_55c9312a624608d7cdbf2fb416"`);
    await queryRunner.query(`DROP INDEX "IDX_d5c3abc29890ef71134f470656"`);
    await queryRunner.query(
      `DROP TABLE "technology_entity_language_of_project_entity"`
    );
    await queryRunner.query(`DROP INDEX "IDX_a1c499275a39d4bd9de130438b"`);
    await queryRunner.query(`DROP INDEX "IDX_3e44d037f11d5b695d8571b263"`);
    await queryRunner.query(
      `DROP TABLE "technology_entity_back_end_in_project_entity"`
    );
    await queryRunner.query(`DROP INDEX "IDX_0ac6e288eb3e89c8a9e6a4ea6c"`);
    await queryRunner.query(`DROP INDEX "IDX_bdc5449f95e5a37cfad2139396"`);
    await queryRunner.query(
      `DROP TABLE "technology_entity_front_end_in_project_entity"`
    );
    await queryRunner.query(`DROP TABLE "project_entity"`);
    await queryRunner.query(`DROP TABLE "technology_entity"`);
    await queryRunner.query(`DROP TABLE "admin_entity"`);
  }
}
