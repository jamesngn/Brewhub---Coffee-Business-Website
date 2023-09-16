FROM node:14-alpine

WORKDIR /app/shared

COPY shared/package*.json .

RUN npm install

COPY shared/ .

WORKDIR /app/auth-service

COPY auth-service/package*.json .

RUN npm install --only=prod

COPY auth-service/src ./src

EXPOSE 5054

CMD ["node", "src/server.js"]