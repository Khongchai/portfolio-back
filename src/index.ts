import { buildSchema } from "type-graphql";
import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { ProjectsResolver } from "./resolvers/ProjectResolver";
import { TechnologyResolver } from "./resolvers/TechnologyResolver";
import { createConnection } from "typeorm";
import { ProjectEntity } from "./entities/ProjectEntity";
import { TechnologyEntity } from "./entities/TechnologyEntity";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import path from "path";
import { COOKIE_NAME, IN_PRODUCTION } from "./constants";

dotenv.config();
const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    migrations: [path.join(__dirname, "/migrations/*")],
    logging: true,
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? true : false,
    extra:
      process.env.NODE_ENV === "production"
        ? {
            ssl: { rejectUnauthorized: false },
          }
        : null,
    host: "postgresql",
    // synchronize: false,
    // migrationsRun: false,
    entities: [ProjectEntity, TechnologyEntity],
  });

  if (process.env.NODE_ENV === "production") {
    //Run when there's an update to the database
    //Or use typeorm migration:run
    await conn.runMigrations();
  }

  const app = express();
  // app.set("proxy", 1);
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({ url: process.env.REDIS_URL });

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTTL: true,
      }),
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
    context: ({ req, res }) => ({ req, res, redis: redisClient }),
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
