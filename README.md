# Node-React-Docker-Redis Project

## Overview

This project is a full-stack application consisting of a backend API built with Node.js and Express, a frontend client using React, and a Redis cache. The backend interacts with an example API to show how Redis works. Docker is used to containerize the application, and Docker Compose is used to manage the multi-container setup.

## Features

- **Backend API:** Handles requests, interacts with Redis for caching.
- **Frontend Client:** Built with React, provides a user interface to interact with the API.
- **Redis Cache:** Used for session management and data caching.
- **Docker:** Containerizes the backend, frontend, Redis, and MSSQL for easy deployment and scaling.

## Project Structure

- `backend/:` Contains the Node.js and Express backend application.
	- `index.js:` Main entry point of the backend application.
	- `Dockerfile:` Dockerfile for building the backend image.
	- `config/redisClient.js:` Redis client configuration.
	- `routes/:` Express routes for API endpoints.
	- `controllers/:` Controllers for handling API logic.

- `client/:` Contains the React frontend application.
	- `App.jsx:` Main React component for the frontend.
	- `Dockerfile:` Dockerfile for building the frontend image.
	- `vite.config.js:` Vite configuration file for development and build.
	- `nginx.conf:` Nginx configuration for serving the React frontend.

- docker-compose.yaml: Docker Compose configuration for orchestrating the services.

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the Repository

	```
	git clone https://github.com/Frnn4268/full-stack-cache.git

	cd full-stack-cache
	```

2. Build and Run with Docker Compose

	```
	docker-compose up --build
	```

	This command builds and starts all the services defined in docker-compose.yaml.

### Usage
- Frontend: Access the React application at http://localhost.
- Backend: The backend API is accessible at http://localhost:3000/api.
- Session Management: Sessions are managed using Redis and can be accessed at http://localhost/session.

Feel free to modify the sections as needed based on the specifics of your project and your personal or organizational preferences.
