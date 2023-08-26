
# Menu Service

Welcome to the Menu Service documentation. This service provides APIs to manage menu items for your cafe or restaurant.

## Getting Started

To get started with the Menu Service, follow these steps:

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote instance)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jamesngn/menu-service.git
   cd menu-service
   ```


2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the database connection:

   - Open `app.js` and configure the MongoDB connection URI in the `mongoose.connect()` call.

### Usage

1. Start the Menu Service:

   ```bash
   npm start
   ```

2. Access the service at: `http://localhost:3000`

### API Endpoints

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

This project is licensed under the MIT License.


MIT License

```
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

```
