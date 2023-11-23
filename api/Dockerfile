# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY api/package*.json ./

# Install application dependencies
RUN npm install

# Copy all application files into the working directory
COPY ./api/routes ./api/routes
COPY ./api/app.js ./api/app.js

# Copy proto files and client.js from the parent directory
COPY services/shared/ ./services/shared/

COPY services/admin-service/src/admin.proto ./services/admin-service/src/admin.proto
COPY services/admin-service/src/client.js ./services/admin-service/src/client.js

COPY services/auth-service/src/auth.proto ./services/auth-service/src/auth.proto
COPY services/auth-service/src/client.js ./services/auth-service/src/client.js

COPY services/menu-service/src/menu.proto ./services/menu-service/src/menu.proto
COPY services/menu-service/src/client.js ./services/menu-service/src/client.js

COPY services/order-service/src/order.proto ./services/order-service/src/order.proto
COPY services/order-service/src/client.js ./services/order-service/src/client.js

COPY services/user-service/src/user.proto ./services/user-service/src/user.proto
COPY services/user-service/src/client.js ./services/user-service/src/client.js

COPY services/promo-service/src/promo.proto ./services/promo-service/src/promo.proto
COPY services/promo-service/src/client.js ./services/promo-service/src/client.js

# Expose the port on which your React app will run
EXPOSE 5000

# Specify the command to start your React app
CMD ["node", "api/app.js"]
