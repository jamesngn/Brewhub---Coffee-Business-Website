# Menu Service

Welcome to the Menu Service documentation. This service provides APIs to manage menu items for your cafe or restaurant.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation and Deployment](#installation-and-deployment)
- [API Endpoints](#api-endpoints)
- [Interacting with the Service](#interacting-with-the-service)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with deploying the Menu Service using Docker and Docker Compose, and to interact with the service using the REST Client extension in VSCode, follow these steps:

### Prerequisites

- Docker: Install Docker on your machine by following the instructions in the official documentation: [Install Docker](https://docs.docker.com/get-docker/).

- Docker Compose: Install Docker Compose, which is used to define and manage multi-container Docker applications, by following the instructions here: [Install Docker Compose](https://docs.docker.com/compose/install/).

- Visual Studio Code: Install VSCode, a code editor by Microsoft, from [here](https://code.visualstudio.com/).

- REST Client Extension: Install the "REST Client" extension for VSCode to easily send HTTP requests directly from the editor. You can install it from the VSCode Extensions Marketplace.

### Installation and Deployment

1. Clone the repository:

   ```bash
   git clone https://github.com/jamesngn/menu-service.git
   cd menu-service
   ```

2. Build the Docker Image:

   Navigate to the `menu-service` directory:

   ```bash
   cd menu-service
   ```

   Build the Docker image using the provided Dockerfile:

   ```bash
   docker build -t menu-service .
   ```

3. Use Docker Compose to Deploy:

   Navigate to the `root` directory:

   ```bash
   cd ..
   ```

   Run the following command to start the services defined in the `docker-compose.yaml` file:

   ```bash
   docker-compose up -d
   ```

## Interacting with the Service

   In VSCode, open the `requests.http` file located in the root of the project. This file contains example GET and POST requests.

   - **GET Request:**
     ```
     ### GET Menu Items
     GET http://localhost:3000/menu
     ```

   - **POST Request:**
     ```
     ### Add Menu Item
     POST http://localhost:3000/menu
     Content-Type: application/json

     {
         "name": "Cappuccino",
         "price": 4.99
     }
     ```

   Place your cursor on the request you want to execute and click the "Send Request" button that appears. The response will be displayed in the integrated output window.

## API Endpoints

- **GET /menu:** Get a list of all menu items.
- **POST /menu:** Add a new menu item. Send JSON data in the request body with `name` and `price` fields.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Make your changes and commit them with descriptive messages.
4. Push your branch to your forked repository.
5. Open a pull request to the main repository.

### License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
```

This version of the README.md includes the instructions on how to use the REST Client extension in VSCode to perform GET and POST requests to the Menu Service. It also includes sample GET and POST requests in the `requests.http` file for users to interact with the service.
```
