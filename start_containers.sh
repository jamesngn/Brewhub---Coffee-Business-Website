#!/bin/bash

# Define the Docker Compose project name
COMPOSE_PROJECT_NAME="brewhub_app"

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose is not installed. Please install it."
    exit 1
fi

# Stop the Docker Compose services
docker-compose -p $COMPOSE_PROJECT_NAME down

docker stop $(docker ps -a -q)

docker rm -f $(docker ps -a -q)

docker rmi $(docker images -a -q)

# Build the Docker Compose services
docker-compose -p $COMPOSE_PROJECT_NAME build

# Start the Docker Compose services in the background
docker-compose -p $COMPOSE_PROJECT_NAME up -d

# Display the running services
docker-compose -p $COMPOSE_PROJECT_NAME ps
