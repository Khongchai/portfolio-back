import { MigrationInterface, QueryRunner } from "typeorm";

export class migrateStuff1626693168812 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      queryRunner.query(`

    delete from project_entity;
    delete from technology_entity;

    alter sequence technology_entity_id_seq restart with 1;
    insert into technology_entity (title) values ('Flutter');
    insert into technology_entity (title) values ('TypeORM');
    insert into technology_entity (title) values ('WebGL');
    insert into technology_entity (title) values ('2d Canvas');
    insert into technology_entity (title) values ('Tailwind');
    insert into technology_entity (title) values ('Spring Webflux');
    insert into technology_entity (title) values ('Kafka');
    insert into technology_entity (title) values ('MongoDB');
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
    insert into technology_entity (title) values ('Cloud Run');
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
    insert into technology_entity (title) values ('React Three Fiber');
    insert into technology_entity (title) values ('Go');
    insert into technology_entity (title) values ('Vercel');
    insert into technology_entity (title) values ('Netlify');
    insert into technology_entity (title) values ('GLSL');
    insert into technology_entity (title) values ('Graphene-Python');
    insert into technology_entity (title) values ('Cypress');
    insert into technology_entity (title) values ('React Testing Library');
    insert into technology_entity (title) values ('Jest');
    insert into technology_entity (title) values ('Kotlin');
    insert into technology_entity (title) values ('Web Assembly');
    insert into technology_entity (title) values ('Rust');
    insert into technology_entity (title) values ('Dart');
    
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
         '2019-06-15', '2020-07-25', 'false', 
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

         

    insert into project_entity (title, description, "shortDescription", "githubLink", "startDate", "endDate", "isHighlight", "websiteLink", "imgLink", "heroImgLink", "tinyImgLink") 
         values ('Portfolio', 'This portfolio website you''re on right now was made with Gatsby. It talks to the backend, written using Express through graphql, with Redis caching results like all projects or all technologies.', 
         'Khong'' portfolio', 
         'https://github.com/Khongchai/portfolio-front', 
         '2021-01-10', '2022-09-01', 'false', 'https://khong.xyz', 
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


   insert into project_entity (title, description, "shortDescription", "githubLink", "websiteLink", "startDate", "endDate", "isHighlight", "imgLink", "heroImgLink", "tinyImgLink") 
      values ('TripleAGloves', 'A portfolio website for a glove company in Thailand. The site was built using mainly Gatsby and Threejs, hosted on Github Pages. The actual site is not live anymore, the linked website is a fake version just to show roughly what I didd.', 
      'Company Portfolio', 
      'https://github.com/Khongchai/TripleAGloves',
      'https://khongchai.github.io/TripleAGloves/', 
      '2021-03-20', '2021-05-20', 'false',
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
     
      insert into project_entity (title, description, "shortDescription", "githubLink", "startDate", "endDate", "isHighlight", "heroImgLink", "tinyImgLink", "websiteLink") 
      values ('Musical Companion', 'A platform that aims to provide music students and teachers access to high-quality accompaniment tracks. Alas, this took too much of my time and I did not see the project being a viable option to invest my time in. Also, Herkou free tier is down, so the data is all gone.', 
      'Music Accompaniment Platform', 
      'https://github.com/Khongchai/music-ecommerce',
      '2021-07-01', '2022-09-01', 'false', 'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1675705659/Screenshot_2023-02-07_004716_buf3f8.png', 
      'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1627224304/eCommerce_tinyimg_nnytoy.png',
      'https://musical-companion.vercel.app/');
      
      insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
        ((select id from technology_entity where title='Next.js'), (select id from project_entity where title = 'Musical Companion')),
        ((select id from technology_entity where title='React'), (select id from project_entity where title = 'Musical Companion')),
        ((select id from technology_entity where title='Urql'), (select id from project_entity where title = 'Musical Companion')),
        ((select id from technology_entity where title='GraphQL'), (select id from project_entity where title = 'Musical Companion')),
        ((select id from technology_entity where title='Chakra UI'), (select id from project_entity where title = 'Musical Companion'));
      insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
         ((select id from technology_entity where title='Django'), (select id from project_entity where title = 'Musical Companion')),
         ((select id from technology_entity where title='Redis'), (select id from project_entity where title = 'Musical Companion')),
         ((select id from technology_entity where title='Graphene-Python'), (select id from project_entity where title = 'Musical Companion')),
         ((select id from technology_entity where title='GraphQL'), (select id from project_entity where title = 'Musical Companion')),
         ((select id from technology_entity where title='Docker'), (select id from project_entity where title = 'Musical Companion')),
         ((select id from technology_entity where title='PostgreSQL'), (select id from project_entity where title = 'Musical Companion'));
     insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Vercel')),(select id from project_entity where title = 'Musical Companion'));
     insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Heroku')),(select id from project_entity where title = 'Musical Companion'));
     insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values  
     ((select id from technology_entity where title = 'Javascript'), (select id from project_entity where title = 'Musical Companion')), 
     ((select id from technology_entity where title = 'Python'), (select id from project_entity where title = 'Musical Companion')), 
     ((select id from technology_entity where title = 'TypeScript'), (select id from project_entity where title = 'Musical Companion')); 
     

   -- TODO
   --   New stuff: Serenade on a Dream, Web Spirograph, Accenture (CardX), Dotted Line Array, Modular customizable Dropdown, Dynamic Routes, Petite Transform
   --  Change highlighted projects
     
      insert into project_entity (title, description, "shortDescription", "githubLink", "startDate", "endDate", "isHighlight", "websiteLink", "imgLink", "heroImgLink", "tinyImgLink") 
      values ('Serenade on a Dream', 'A website for my EP "Serenade on a Dream". Built with r3f.', 
      'EP Website', 
      'https://github.com/Khongchai/serenade-on-a-dream',
      '2021-10-01', '2022-02-01', 'true', 
      'https://serenade-on-a-dream.netlify.app', 
      'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1675580322/serenade-on-a-dream-full_ajetzh.png', 
      'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1675580322/serenade-on-a-dream-full_ajetzh.png', 
      'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1675580322/serenade-on-a-dream-full_ajetzh.png');
      
      insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
        ((select id from technology_entity where title='React'), (select id from project_entity where title = 'Serenade on a Dream')),
        ((select id from technology_entity where title='React Three Fiber'), (select id from project_entity where title = 'Serenade on a Dream'));
     insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Netlify')),(select id from project_entity where title = 'Serenade on a Dream'));
     insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values  
     ((select id from technology_entity where title = 'TypeScript'), (select id from project_entity where title = 'Serenade on a Dream'));

          
      insert into project_entity (title, description, "shortDescription", "githubLink", "startDate", "endDate", "isHighlight", "websiteLink", "imgLink", "heroImgLink", "tinyImgLink") 
      values ('Spiro', 'A very fast, webgl-powered, interactive spirograph generator. I have built so many custom technologies for this and it took almost 2 YEARS of my life! The full project description can be found directly in the GitHub repo.', 
      'Spirograph Generator', 
      'https://github.com/Khongchai/web-spirograph',
      '2021-11-01', '2023-02-01', 'true', 
      'https://web-spirograph.netlify.app', 
      'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1675592475/ex2_fz7gre.png', 
      'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1675592475/ex2_fz7gre.png', 
      'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1675592544/ex3_cnjsv1.png');
      
      insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
        ((select id from technology_entity where title='React'), (select id from project_entity where title = 'Spiro')),
        ((select id from technology_entity where title='2d Canvas'), (select id from project_entity where title = 'Spiro')),
        ((select id from technology_entity where title='WebGL'), (select id from project_entity where title = 'Spiro')),
        ((select id from technology_entity where title='Web Assembly'), (select id from project_entity where title = 'Spiro')),
        ((select id from technology_entity where title='Tailwind'), (select id from project_entity where title = 'Spiro'));
     insert into technology_entity_hosting_project_entity ("technologyEntityId", "projectEntityId") values ((select id from technology_entity where title in ('Netlify')),(select id from project_entity where title = 'Spiro'));
     insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values  
     ((select id from technology_entity where title = 'TypeScript'), (select id from project_entity where title = 'Spiro')),
     ((select id from technology_entity where title = 'GLSL'), (select id from project_entity where title = 'Spiro')),
     ((select id from technology_entity where title = 'Rust'), (select id from project_entity where title = 'Spiro'));

     insert into project_entity (title, description, "shortDescription", "startDate", "isHighlight", "tinyImgLink", "imgLink") 
     values ('Credit Card & Loan', 'A project I do for one of Accenture''s clients. In this project, I alternate between working on the backend and frontend as a full-stack developer, usually spending a couple of days to a week on each aspect of the project, or if the task demands, both at the same time.', 
     'Credit Card & Loan', 
     '2022-09-01', 'true', 
     'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1675594249/accenture_logo_e0p9yb.png',
     'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1675594249/accenture_logo_e0p9yb.png');
     
     insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
       ((select id from technology_entity where title='React'), (select id from project_entity where title = 'Credit Card & Loan')),
       ((select id from technology_entity where title='Flutter'), (select id from project_entity where title = 'Credit Card & Loan'));
   insert into technology_entity_back_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
      ((select id from technology_entity where title='Spring Webflux'), (select id from project_entity where title = 'Credit Card & Loan')),
      ((select id from technology_entity where title='Redis'), (select id from project_entity where title = 'Credit Card & Loan')),
      ((select id from technology_entity where title='Kafka'), (select id from project_entity where title = 'Credit Card & Loan')),
      ((select id from technology_entity where title='MongoDB'), (select id from project_entity where title = 'Credit Card & Loan'));
    insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values  
    ((select id from technology_entity where title = 'Dart'), (select id from project_entity where title = 'Credit Card & Loan')),
    ((select id from technology_entity where title = 'TypeScript'), (select id from project_entity where title = 'Credit Card & Loan')),
    ((select id from technology_entity where title = 'Java'), (select id from project_entity where title = 'Credit Card & Loan')),
    ((select id from technology_entity where title = 'Python'), (select id from project_entity where title = 'Credit Card & Loan')),
    ((select id from technology_entity where title = 'Kotlin'), (select id from project_entity where title = 'Credit Card & Loan'));
   
    insert into project_entity (title, description, "shortDescription", "startDate", "endDate", "isHighlight", "tinyImgLink", "githubLink") 
    values ('Dotted Line Array', 'The first library I wrote for Flutter that allows you to write dotted lines (surprisingly tricky to do in Flutter as of writing) with HTML5 Canvas''s syntax.', 
    'Dotted Line Library', 
    '2021-12-01', '2022-01-01', 'false', 
    'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1675601316/626accd8eefaec54f23310ba_flutter_developer_logo_jhxkbf.png',
    'https://github.com/Khongchai/flutter_dotted_line_array');
    insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
      ((select id from technology_entity where title='Flutter'), (select id from project_entity where title = 'Dotted Line Array'));
   insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values  
   ((select id from technology_entity where title = 'Dart'), (select id from project_entity where title = 'Dotted Line Array'));

   
   insert into project_entity (title, description, "shortDescription", "startDate", "endDate", "isHighlight", "tinyImgLink", "githubLink") 
   values ('Modular Customizable Dropdown', 'A dropdown library that aims to be usable with any Flutter widgets and allows the user a lot of controls over its lower-level behaviors.', 
   'A Dropdown Library', 
   '2022-01-01', '2022-02-01', 'false', 
   'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1675601316/626accd8eefaec54f23310ba_flutter_developer_logo_jhxkbf.png',
   'https://github.com/Khongchai/modular_customizable_dropdown');
   insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
     ((select id from technology_entity where title='Flutter'), (select id from project_entity where title = 'Modular Customizable Dropdown'));
  insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values  
  ((select id from technology_entity where title = 'Dart'), (select id from project_entity where title = 'Modular Customizable Dropdown'));

  
  insert into project_entity (title, description, "shortDescription", "startDate", "endDate", "isHighlight", "tinyImgLink", "githubLink") 
  values ('Dynamic Routes', 'Yet another routing libray for Flutter. This navigation library utilizes heavily Flutter''s amazing mixin support and allow for a one-place data driven navigation.', 
  'A Navigation Library', 
  '2022-04-01', '2022-05-01', 'false',
  'https://res.cloudinary.com/dmmhsq8ti/image/upload/v1675601316/626accd8eefaec54f23310ba_flutter_developer_logo_jhxkbf.png',
   'https://github.com/Khongchai/dynamic_routes');
  insert into technology_entity_front_end_in_project_entity ("technologyEntityId", "projectEntityId") values 
    ((select id from technology_entity where title='Flutter'), (select id from project_entity where title = 'Dynamic Routes'));
 insert into technology_entity_language_of_project_entity ("technologyEntityId", "projectEntityId") values  
 ((select id from technology_entity where title = 'Dart'), (select id from project_entity where title = 'Dynamic Routes'));

      `);

   }

   public async down(_: QueryRunner): Promise<void> { }
}
