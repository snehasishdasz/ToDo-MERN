
# ToDo-MERN 📝

A simple and efficient Todo application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Description 
This project provides a basic yet functional Todo application, allowing users to create, read, update, and delete tasks. It leverages the power of the MERN stack for a seamless and responsive user experience.

## Installation 💻

### Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/): JavaScript runtime environment.
*   [npm](https://www.npmjs.com/): Node package manager (installed with Node.js).
*   [Docker](https://www.docker.com/): For containerization (optional, but recommended).

### Steps

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/snehasishdasz/ToDo-MERN.git
    cd ToDo-MERN
    ```

2.  **Using Docker Compose (Recommended):**

    This method simplifies the setup process by using Docker containers for the MongoDB database, backend server, and frontend application.

    *   Ensure Docker is installed and running.
    *   Navigate to the project root directory.
    *   Run the following command:

        ```bash
        docker-compose up --build
        ```

        This command builds the Docker images and starts the containers. The application will be accessible at `http://localhost:5173`.

3.  **Manual Setup (Alternative):**

    If you prefer not to use Docker, you can set up the application manually.

    *   **Backend Setup:**

        ```bash
        cd server
        npm install
        # Create a .env file in the server directory based on the .env.example (if available)
        # Configure the .env file with your MongoDB connection string and other environment variables.
        npm run dev
        ```

        The backend server will run on port 8000 (or as specified in your `.env` file).

    *   **Frontend Setup:**

        ```bash
        cd client
        npm install
        npm run dev
        ```

        The frontend application will run on port 5173.

## Key Features ✨

*   **Create Tasks:** Easily add new tasks to your todo list.
*   **Read Tasks:** View all your tasks in a clear and organized manner.
*   **Update Tasks:** Modify existing tasks to reflect their current status or details.
*   **Delete Tasks:** Remove tasks that are no longer needed.
*   **MERN Stack:** Utilizes the robust and scalable MERN stack for development.
*   **Docker Support:** Simplified setup and deployment with Docker Compose.

## Contribution Guidelines 🤝

Contributions are welcome! If you'd like to contribute to this project, please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, concise messages.
4.  Submit a pull request to the main branch.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## Contributors 🧑‍💻

*   [snehasishdasz](https://github.com/snehasishdasz)

## Last Updated 🗓️

2025-05-10
