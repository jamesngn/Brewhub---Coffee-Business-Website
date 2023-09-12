# Use an official Node.js runtime as a base image
FROM node:14

# Shared directory
WORKDIR /app/shared

# Copy package.json and package-lock.json from services/shared
COPY shared/package*.json .

# Install application dependencies
RUN npm install

# Copy all application files from services/shared
COPY shared/ .

# Switch to auth-service directory
WORKDIR /app/auth-service

# Copy package.json and package-lock.json from services/auth-service
COPY auth-service/package*.json .

# Install application dependencies for auth-service
RUN npm install

# Copy all application files from services/auth-service
COPY auth-service .

EXPOSE 5054

CMD ["sh", "-c", "npm test && node server.js"]
