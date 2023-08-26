# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container for this microservice
# Change the path for each microservice
WORKDIR /app/menu-service  

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the microservice will run on
EXPOSE 3000

# Define the command to start the microservice
CMD ["npm", "start"]
