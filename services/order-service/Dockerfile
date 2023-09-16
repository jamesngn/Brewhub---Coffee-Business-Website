FROM node:14-alpine

WORKDIR /app/shared

COPY shared/package*.json .

RUN npm install

COPY shared/ .

WORKDIR /app/order-service

COPY order-service/package*.json .

RUN npm install --only=prod

COPY order-service/src ./src

EXPOSE 5052

CMD ["node", "src/server.js"]