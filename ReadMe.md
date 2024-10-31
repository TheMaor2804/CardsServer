# Business Card Manager API

This is a Node.js server using Express to manage a database of users and business cards. It includes features like user registration, business card management, and user roles with different permissions.

## Features
- All users can view all cards
- User registration and login
- Users can view and like cards
- Users can update their own information
- Users can toggle their own business status
- Users can delete their own account
- Users can retrieve their created cards
- Business user role with enhanced permissions
- Business users can delete and update their own cards
- Admins can toggle business status for all users
- Admins can view all users
- Admins can delete all accounts
- Admins can delete and update all cards
- Admins can change card's bizNumber
- Admins can update all user information

## Technologies Used
- Express
- Bcrypt
- Chalk
- Config
- Cors
- Cross-env
- Dotenv
- Joi
- Jsonwebtoken
- Lodash
- Mongoose
- Morgan

## Installation

1. Clone the repository

    ```sh
    git clone https://github.com/TheMaor2804/CardsServer.git

2. Install dependencies

    ```sh
    cd CardsServer
    npm install

3. Set up environment variables:

    Create a .env file in the root directory.

    Ensure you set the following variables:

    ```sh
    JWT_SECRET=your_jwt_secret
    ATLAS_CONNECTION_STRING=your_atlas_mongodb_connection_string
    PORT=your_server_port

4. Start the server:

    Development:
    ```sh
    npm run dev
    ```

    Production:
    ```sh
    npm start
    ```    

## API Documentation
For detailed API documentation and examples, refer to the Postman collections:

- Cards API Documentation: https://documenter.getpostman.com/view/37786987/2sAY4vgNWe

- Users API Documentation: https://documenter.getpostman.com/view/37786987/2sAY4vgNbA
