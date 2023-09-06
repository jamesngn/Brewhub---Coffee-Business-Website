# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app/menu-service

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy all application files to the working directory
COPY . .

# Expose the gRPC server port
EXPOSE 5051

# Start the gRPC server
CMD ["node", "server.js"]
