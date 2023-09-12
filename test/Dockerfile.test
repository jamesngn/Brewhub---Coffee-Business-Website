FROM node:14

WORKDIR /app/test

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "test"]
