FROM node:14-alpine

WORKDIR /app/shared

RUN npm install dotenv

COPY shared/src/validation ./src/validation

COPY shared/src/config ./src/config

WORKDIR /app/user-service

COPY user-service/package*.json .

RUN npm install --only=prod

COPY user-service/src ./src

EXPOSE 5053

CMD ["node", "src/server.js"]
