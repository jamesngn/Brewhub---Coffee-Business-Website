FROM node:14-alpine

WORKDIR /app/shared

RUN npm install dotenv

COPY shared/src/validation ./src/validation

COPY shared/src/config ./src/config

WORKDIR /app/admin-service

COPY admin-service/package*.json .

RUN npm install --only=prod

COPY admin-service/src ./src

EXPOSE 5056

CMD ["node", "src/server.js"]
