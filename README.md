# Brewhub - Coffee Business Web Application

![Website Screenshot](./images/website_screenshot.png)

Welcome to Brewhub, a web application designed to streamline and enhance your coffee business operations. This README.md will guide you through the setup process and provide an overview of the application's features.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [MongoDB Server Setup](#mongodb-server-setup)
  - [Microservices Installation](#microservices-installation)
  - [React App and API Server Installation](#react-app-and-api-server-installation)
- [Features](#features)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you start, make sure you have the following software installed:

- [Node.js](https://nodejs.org/) (version >= 14.0.0)
- [npm](https://www.npmjs.com/) (version >= 6.0.0)
- [MongoDB](https://www.mongodb.com/) (Make sure it's running)


### MongoDB Server Setup:

1. **Start MongoDB**:

   - Open a new terminal window.
   - Execute the following command to start the MongoDB server:

     ```bash
     mongod
     ```

   - MongoDB should now be running, and you should see output indicating that the server has started.

   > Note: If you have a specific MongoDB configuration or data directory, you may need to specify it using the `--dbpath` flag.

### Microservices Installation:

1. **Authentication Service**:
   - Navigate to the authentication service directory:

     ```bash
     cd services/auth-service
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the authentication service:

     ```bash
     npm start
     ```

2. **Menu Service**:
   - Navigate to the menu service directory:

     ```bash
     cd services/menu-service
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the menu service:

     ```bash
     npm start
     ```

3. **User Service**:
   - Navigate to the user service directory:

     ```bash
     cd services/user-service
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the user service:

     ```bash
     npm start
     ```

4. **Order Service**:
   - Navigate to the order service directory:

     ```bash
     cd services/order-service
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the order service:

     ```bash
     npm start
     ```

5. **Admin Service**:
   - Navigate to the admin service directory:

     ```bash
     cd services/admin-service
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the admin service:

     ```bash
     npm start
     ```

### React App and API Server Installation:

1. **Client (React App)**:
   - Navigate to the client directory:

     ```bash
     cd client
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the React app:

     ```bash
     npm start
     ```

2. **API Server**:
   - Navigate to the API directory:

     ```bash
     cd api
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the API server:

     ```bash
     npm start
     ```

3. **Socket.IO (Socket Service)**:
   - Navigate to the socket directory:

     ```bash
     cd socket
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Start the Socket.IO service:

     ```bash
     npm start
     ```



## Features

Brewhub offers the following features:

1. **User Authentication**:
   - Users can create accounts, log in, and log out.

2. **Product Management**:
   - Add, edit, and delete coffee products.
   - Categorize products for better organization.

3. **Order Management**:
   - Users can place orders and view their order history.
   - Admins can view all orders and mark them as processed.

4. **User Roles**:
   - Differentiate between regular users and admin users.
   - Admins have additional privileges like managing products and viewing all orders.

5. **Responsive Design**:
   - The application is optimized for both desktop and mobile devices.

## Usage

1. **User Registration and Login**:
   - Navigate to the application and create a new account or log in with existing credentials.

2. **Browse Products**:
   - View the available coffee products and their details.

3. **Place an Order**:
   - Add products to your cart and proceed to checkout.

4. **Admin Functions**:
   - Log in as an admin to access additional features like product management and order processing.

## Contributing

If you'd like to contribute to Brewhub, please follow these steps:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and test thoroughly.
3. Create a pull request with a clear description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to reach out with any questions or feedback. Happy brewing!

**Brewhub** - *Brewing Excellence in Every Cup*
