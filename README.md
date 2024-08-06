# Library Management System

This is a library management system in Node.js. It manages users, books, and borrowed books. The project has different modules and uses MongoDB database.

## API Documentation and Service URL

We use Swagger for API documentation and testing. You can access Swagger UI at this URL after starting the project:

    http://localhost:3000/docs

This URL shows all endpoints and parameters. The project runs on port `3000` by default. You can change the port with `PORT` environment variable.

## Setup

Follow these steps to set up and run the project locally:

### Requirements

- You need Node.js installed.
- You need MongoDB running locally or a MongoDB connection URI.

### Environment Variables

Before running the application, set up the following environment variables. You can define these in a `.env` file in your project root:

- `NODE_ENV`: The environment of your application (`dev`, `prod`, etc.).
- `LOG_LEVEL`: The level of logging (`debug`, `info`, `error`).
- `MONGODB_URI`: Your MongoDB connection URI.
- `PORT`: (Optional) The port on which to run the application (default is `3000`).

### Installing Dependencies

Run this command in the project directory to install necessary packages:

    npm install

### Running the Application

Start the application with this command:

    npm start

## File Structure

The project has these main folders and files:

- `src`: The main folder for source code.
    - `app`: Contains core components of the application.
    - `commons`: Contains shared modules and utilities.
    - `books`, `users`, `borrows`: Modules with specific functions.

## Modules and Their Functions

### Users Module
- **User Management**: Manages user registration, login, updating user information, and listing users.

### Books Module
- **Book Management**: Handles adding, updating, deleting, and listing books. Also provides viewing book details.

### Borrows Module
- **Borrowing Operations**: Tracks borrowing and returning books by users. Updates the status of borrowed books and keeps a history of borrowed items.

## Future Improvements

Here are some potential enhancements to improve the project:

- **Refactor Service Layer**: Add layers like a Logic Formatter to clean up the service layer.
- **Enhance Local Development Logs**: Make logs more readable for local development environments.
- **Write Tests**: Implement tests to ensure code reliability and functionality.
- **Separate Scores Module**: Extract the scoring system into a separate module for greater flexibility and easier management.
- **Docker Integration**: Containerize the application using Docker to simplify deployment and ensure consistency across different environments.
- **Continuous Integration/Continuous Deployment (CI/CD) Setup**: Establish a CI/CD pipeline to automate testing and deployment processes, which helps in maintaining code quality and speed up the release cycle.
- **Implement Caching System**: Add a caching system to store scores and calculations, which can enhance performance by reducing the load on the database and speeding up response times for frequently accessed data.
