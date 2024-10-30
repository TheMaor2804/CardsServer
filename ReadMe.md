# Business Card Manager API

This is a Node.js server using Express to manage a database of users and business cards. It includes features like user registration, business card management, and user roles with different permissions.

## Features
- User registration and login
- Business user role with enhanced permissions
- Create, read, update, and delete (CRUD) operations for business cards
- Users can view and like cards
- Business users can delete and update their own cards
- Admins can delete and update all cards
- Users can update their own information
- Admins can update all user information
- Users can toggle their own business status
- Admins can toggle business status for all users
- Users can delete their own account
- Admins can delete all accounts
- Users can retrieve their created cards
- All users can view all cards
- Retrieve card by ID
- Retrieve user details by ID
- Admins can view all users

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
   git clone https://github.com/TheMaor2804/CardsServer.git```

2.Install dependencies
    ```cd CardsServer
    npm install```

3.Set up environment variables
    Create a .env file in the root directory
    Ensure you set the following variables:
    ```JWT_SECRET=your_jwt_secret
    ATLAS_CONNECTION_STRING=your_atlas_mongodb_connection_string
    PORT=your_server_port```