FROM node:14

WORKDIR /usr/src/app/.vc

COPY package*.json ./

RUN npm install\
    && npm install typescript -g\
    && npm install typeorm -g

COPY . .

RUN tsc

ENV NODE_ENV production

EXPOSE ${PORT}
CMD [ "node", "dist/index.js" ]

USER node