import { buildSchema } from "type-graphql";
import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { ProjectsResolver } from "./resolvers/ProjectResolver";
import { TechnologyResolver } from "./resolvers/TechnologyResolver";
import { createConnection } from "typeorm";
import { ProjectEntity } from "./entities/ProjectEntity";
import { TechnologyEntity } from "./entities/TechnologyEntity";
import session from "express-session";
import cors from "cors";
import path from "path";
import { COOKIE_NAME, IN_PRODUCTION } from "./constants";

dotenv.config();
const main = async () => {
  await createConnection({
    type: "postgres",
    migrations: [path.join(__dirname, "/migrations/*")],
    logging: true,
    ssl: process.env.NODE_ENV === "production" ? true : false,
    extra:
      process.env.NODE_ENV === "production"
        ? {
          ssl: { rejectUnauthorized: false },
        }
        : null,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    username: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    migrationsRun: true,
    entities: [ProjectEntity, TechnologyEntity],
  });

  const app = express();

  app.use(
    session({
      name: COOKIE_NAME,
      cookie: {
        httpOnly: true,
        secure: IN_PRODUCTION,
        sameSite: "lax",
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );
  app.use(
    cors({
      origin:
        process.env.NODE_ENV === "production"
          ? [
            "https://khongchai-portfolio-frontend-khongchai.vercel.app",
            "https://www.khong.xyz",
          ]
          : "*",
      credentials: true,
    })
  );
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProjectsResolver, TechnologyResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  // const port = process.env.PORT;
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
};

main().catch((err) => console.log(err));
