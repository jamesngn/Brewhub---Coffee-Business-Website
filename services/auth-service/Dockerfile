# Use an official Node.js runtime as a base image
FROM node:14

# Shared directory
WORKDIR /app/shared
COPY ../shared/package*.json .
RUN npm install
COPY ../shared/ .
# auth-service
WORKDIR /app/auth-service
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 5054

CMD ["node", "server.js"]
