# Business Card Manager API

This is a Node.js server using Express to manage a database of users and business cards. It includes features like user registration, business card management, and user roles with different permissions.

## Features
- Card Management
    - All users can view all cards
- User Management
    - User registration and login
    - Users can view and like cards
    - Users can update their own information
    - Users can toggle their own business status
    - Users can delete their own account
    - Users can retrieve their created cards
- User Roles and Permissions:
    - Business Users:
        - Business user role with enhanced permissions
        - Business users can delete and update their own cards
    - Admins
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

## Database Requirements
- MongoDB server running on port 27017 is required during development and production.
- The application will create a database named maorCardsServer upon startup if it doesn't exist. This database will store all business card and user data.
- If the cards and users collections within this database are empty, the application will generate initial data, only if the server is running in development.

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

## Initial User Accounts for Testing (Local Development Only)

Warning: The following initial user accounts are intended for local development purposes only.


| Email | Password |
|----------------|----------------|
|regular@gmail.com|Aa123456!|
|business@gmail.com|Aa123456!|
|admin@gmail.com|Abc!123Abc|

## API Documentation
For detailed API documentation and examples, refer to the Postman collections:

- Cards API Documentation: https://documenter.getpostman.com/view/37786987/2sAY4vgNWe

- Users API Documentation: https://documenter.getpostman.com/view/37786987/2sAY4vgNbA
