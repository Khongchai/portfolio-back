import { MigrationInterface, QueryRunner } from "typeorm";

export class migrateStuff1626693168795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //Delete from project_entity;
    queryRunner.query(`

    delete from project_entity;

    alter sequence project_entity_id_seq restart with 1;
    insert into project_entity (title, description, "shortDescription", "githubLink", "websiteLink", "startDate", "endDate", "isHighlight", "imgLink", "tinyImgLink", "heroImgLink", "playStoreLink") 
         values ('ASTRUM', 'The artistic project ASTRUM is an interdisciplinary project combining different 
         aspects of music, music production, and technology to help tell the story about our relationship with the solar system. 
         The outcomes of this projects are a website that, with the help of the NASA''s Eyes, explore our relationship 
         with the solar system through 8 pieces of music and a set of stories, and an Android application 
         that allows for an interaction with binaural pieces that use elements from the aforementioned 8 pieces of music.', 
         'Pure HTML/CSS/Javascript', 
         'https://github.com/Khongchai/ASTRUM-2020', 
         'https://khongchai.github.io/ASTRUM-2020/', 
         '2019-06-15', '2020-07-25', 'true', 
         'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1618208180/Screen_Shot_2021-04-13_at_12.47.03-fullpage_farusu.png', 
         'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1618208325/webicontransparent_nruh6b.png',
         'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1626068805/astrum-hero_sfi3zn.png',
         'https://play.google.com/store/apps/details?id=com.khongthefork.astrum'
         );
         
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
         '2020-12-23', '2021-04-30', 'false',
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
         values ('WordMem', '(Study project) A vocab memorization application, allows for simple CRUD operation, auth (login, logout, register), and dictionary scraping with beautiful soup.', 
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

         

    insert into project_entity (title, description, "shortDescription", "githubLink", "startDate", "isHighlight", "websiteLink", "imgLink", "heroImgLink", "tinyImgLink") 
         values ('Portfolio', 'This portfolio website you''re on right now was made with Gatsby. It talks to the backend, written using Express through graphql, with Redis caching results like all projects or all technologies.', 
         'Khong'' portfolio', 
         'https://github.com/Khongchai/portfolio-front', 
         '2021-01-10', 'true', 'https://khong.xyz', 
         'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1626075879/image_4_ixpynu.png',
          'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1627205294/photo-1612543827278-d19245d6a00d_k8z1gx.webp',
            'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1627224304/portfolio_tinyimg_op17lu.png' 
          );
         
         insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
            ((select id from technology_entity where title='Gatsby'), (select id from project_entity where title = 'Portfolio')),
            ((select id from technology_entity where title='React'), (select id from project_entity where title = 'Portfolio')),
            ((select id from technology_entity where title='Chakra UI'), (select id from project_entity where title = 'Portfolio')),
            ((select id from technology_entity where title='Urql'), (select id from project_entity where title = 'Portfolio')),
            ((select id from technology_entity where title='GraphQL'), (select id from project_entity where title = 'Portfolio')),
            ((select id from technology_entity where title='React Testing Library'), (select id from project_entity where title = 'Portfolio')),
            ((select id from technology_entity where title='Cypress'), (select id from project_entity where title = 'Portfolio')),
            ((select id from technology_entity where title='Jest'), (select id from project_entity where title = 'Portfolio')),
            ((select id from technology_entity where title='Three.js'), (select id from project_entity where title = 'Portfolio'));
         insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
          ((select id from technology_entity where title='Express'), (select id from project_entity where title = 'Portfolio')),
          ((select id from technology_entity where title='Node'), (select id from project_entity where title = 'Portfolio')),
          ((select id from technology_entity where title='TypeGraphQL'), (select id from project_entity where title = 'Portfolio')),
          ((select id from technology_entity where title='TypeORM'), (select id from project_entity where title = 'Portfolio')),
          ((select id from technology_entity where title='Redis'), (select id from project_entity where title = 'Portfolio')),
          ((select id from technology_entity where title='Docker'), (select id from project_entity where title = 'Portfolio')),
          ((select id from technology_entity where title='Apollo'), (select id from project_entity where title = 'Portfolio')),
          ((select id from technology_entity where title='PostgreSQL'), (select id from project_entity where title = 'Portfolio'));
         insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Heroku')),(select id from project_entity where title = 'Portfolio'));
         insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Vercel')),(select id from project_entity where title = 'Portfolio'));
         insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values 
         ((select id from technology_entity where title in ('Javascript')), (select id from project_entity where title = 'Portfolio')), 
         ((select id from technology_entity where title in ('TypeScript')), (select id from project_entity where title = 'Portfolio')), 
         ((select id from technology_entity where title in ('SQL')), (select id from project_entity where title = 'Portfolio')),
         ((select id from technology_entity where title in ('GLSL')), (select id from project_entity where title = 'Portfolio')); 


   insert into project_entity (title, description, "shortDescription", "githubLink", "websiteLink", "startDate", "isHighlight", "imgLink", "heroImgLink", "tinyImgLink") 
      values ('TripleAGloves', 'A portfolio website for a glove company in Thailand. The site was built using mainly Gatsby and Threejs, hosted on Github Pages.', 
      'Company Portfolio', 
      'https://github.com/Khongchai/TripleAGloves',
      'https://khongchai.github.io/TripleAGloves/', 
      '2021-03-20', 'true',
      'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1626074400/image_3_s7fl9i.png', 
      'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1626068805/triplea-hero_ntuaxx.png', 
      'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1627224306/triplea_tiny_image_byrcio.png'
      );
      
      insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
        ((select id from technology_entity where title='Gatsby'), (select id from project_entity where title = 'TripleAGloves')),
        ((select id from technology_entity where title='React'), (select id from project_entity where title = 'TripleAGloves')),
        ((select id from technology_entity where title='Three.js'), (select id from project_entity where title = 'TripleAGloves')),
        ((select id from technology_entity where title='styled-components'), (select id from project_entity where title = 'TripleAGloves'));
     insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('GitHub Pages')),(select id from project_entity where title = 'TripleAGloves'));
     insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values  
     ((select id from technology_entity where title = 'Javascript'), (select id from project_entity where title = 'TripleAGloves')), 
     ((select id from technology_entity where title = 'TypeScript'), (select id from project_entity where title = 'TripleAGloves'));
     
      insert into project_entity (title, description, "shortDescription", "githubLink", "startDate", "isHighlight", "heroImgLink", "tinyImgLink") 
      values ('ECommerce', 'A Personal eCommerce website where I sell music and accompaniment tracks I made. The backend Django and Graphene-Python, and the front-end is Next.js', 
      'Music ECommerce website', 
      'https://github.com/Khongchai/music-ecommerce',
      '2021-07-01', 'false', 'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1626068812/ecommerce-hero_r1mhgb.png', 
      'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1627224304/eCommerce_tinyimg_nnytoy.png');
      
      insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
        ((select id from technology_entity where title='Next.js'), (select id from project_entity where title = 'ECommerce')),
        ((select id from technology_entity where title='React'), (select id from project_entity where title = 'ECommerce')),
        ((select id from technology_entity where title='Urql'), (select id from project_entity where title = 'ECommerce')),
        ((select id from technology_entity where title='GraphQL'), (select id from project_entity where title = 'ECommerce')),
        ((select id from technology_entity where title='Chakra UI'), (select id from project_entity where title = 'ECommerce'));
      insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
         ((select id from technology_entity where title='Django'), (select id from project_entity where title = 'ECommerce')),
         ((select id from technology_entity where title='Redis'), (select id from project_entity where title = 'ECommerce')),
         ((select id from technology_entity where title='Graphene-Python'), (select id from project_entity where title = 'ECommerce')),
         ((select id from technology_entity where title='GraphQL'), (select id from project_entity where title = 'ECommerce')),
         ((select id from technology_entity where title='Docker'), (select id from project_entity where title = 'ECommerce')),
         ((select id from technology_entity where title='PostgreSQL'), (select id from project_entity where title = 'ECommerce'));
     insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Vercel')),(select id from project_entity where title = 'ECommerce'));
     insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Heroku')),(select id from project_entity where title = 'ECommerce'));
     insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values  
     ((select id from technology_entity where title = 'Javascript'), (select id from project_entity where title = 'ECommerce')), 
     ((select id from technology_entity where title = 'Python'), (select id from project_entity where title = 'ECommerce')), 
     ((select id from technology_entity where title = 'TypeScript'), (select id from project_entity where title = 'ECommerce')); 
                 
      `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
