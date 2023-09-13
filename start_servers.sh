#!/bin/bash

# Start MongoDB
mongod &

sleep 5

# Define an array of port numbers
ports=(3000 5000 8080 5051 5052 5053 5054 5056 5057 27017 )

directories=(
  "/home/minhquang/brewhub-app/services/admin-service/"
  "/home/minhquang/brewhub-app/services/auth-service/"
  "/home/minhquang/brewhub-app/services/menu-service/"
  "/home/minhquang/brewhub-app/services/order-service/"
  "/home/minhquang/brewhub-app/services/promo-service/"
  "/home/minhquang/brewhub-app/services/user-service/"
  "/home/minhquang/brewhub-app/socket/"
  "/home/minhquang/brewhub-app/api"
)

# Function to start a microservice
start_server() {
  local dir=$1
  cd "$dir"
  if [ -f "package.json" ]; then
    echo "Starting server in $dir..."
    npm start &
  else
    echo "No package.json found in $dir, skipping..."
  fi
}

# Start microservices
for dir in "${directories[@]}"
do
  start_server "$dir"
done

# Wait for user input to end servers
read -p "Press [Enter] to stop servers..."

# Function to find and kill processes by port
kill_process_by_port() {
  local port=$1
  local pid=$(lsof -t -i:$port)
  
  if [ -n "$pid" ]; then
    echo "Killing process with PID $pid on port $port..."
    kill -9 $pid
  else
    echo "No process found on port $port..."
  fi
}

# Kill processes for each port
for port in "${ports[@]}"
do
  kill_process_by_port $port
done
