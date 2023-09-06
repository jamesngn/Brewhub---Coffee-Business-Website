# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app/api

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy all application files into the working directory
COPY . .

# Expose the port on which your React app will run
EXPOSE 5000

# Specify the command to start your React app
CMD ["npm", "start"]
