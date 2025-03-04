# Next.js + TypeScript + PostgreSQL + Zustand

## Overview

This project is a full-stack web application built with **Next.js**, **TypeScript**, **Zustand**, and **PostgreSQL**. It includes authentication via **NextAuth.js** (supporting Google OAuth), dynamic blogs management (with data fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/), stored in Zustand), and a ToDo list that interacts with a PostgreSQL database. The application supports private routes for authenticated users and demonstrates modern web development best practices.

---

## Features

- **User Authentication**: Google OAuth and email/password-based authentication via **NextAuth.js**.
- **Zustand**: Manage application state for blogs and user authentication.
- **Dynamic Routing**: Automatically fetch and display blog data using dynamic routes.
- **PostgreSQL**: A powerful relational database to store user and ToDo data, with **Prisma ORM** for database interaction.
- **SASS Styling**: Styling using SASS for easier CSS management.
- **Private Pages**: Restricted access to the ToDoList and Profile pages for authenticated users only.
- **Testing with Jest**: Unit and integration tests using Jest.
- **Husky & Lint-Staged**: Pre-commit and pre-push hooks to enforce code quality.

---

## Technologies Used

- **Next.js**: React framework for building server-rendered apps.
- **TypeScript**: Static type checking for a more robust codebase.
- **Prisma**: ORM for interacting with PostgreSQL.
- **Zustand**: For state management of user authentication, blog data and ToDoList.
- **NextAuth.js**: Authentication with OAuth (Google).
- **PostgreSQL**: A powerful relational database to store user and ToDo data.
- **SASS**: For styling the application.
- **Docker**: For PostgreSQL database containerization.
- **Jest**: For writing and running tests.
- **JHusky & Lint-Staged**: For pre-commit and - \*\*pre-push hooks.

---

## Prerequisites

- **Node.js** (version 16.x or higher)
- **Yarn** or **npm** for dependency management
- **Docker** and **Docker Compose** for setting up the PostgreSQL database

---

## Setup & Installation

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone https://github.com/AShirenkov/next-auth-blog-todo-postgresql-zustand.git
cd your-project
```

### 2. Install Dependencies

Use either Yarn or npm to install project dependencies:

Using Yarn:

```bash
yarn install
```

Using npm:

```bash
npm install
```

### 3. Set Up Docker for PostgreSQL

Create a .env.local file in the root of your project with the following content:

env

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydatabase"
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_SECRET=your-client-secret
```

Note: Replace your-client-id and your-client-secret with your actual Google OAuth credentials.

Docker Setup
If you're using Docker to run PostgreSQL, you can use the following docker-compose.yml file:

yaml

```bash
version: '3.7'
services:
  db:
    image: postgres:13
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app_network

networks:
  app_network:
    driver: bridge

volumes:
  postgres_data:
    driver: local
```

Start the PostgreSQL container:

```bash
docker compose up --build
```

This will create and start a PostgreSQL container with the specified credentials and database name.

### 4. Run the Application

#### Development

To start the application in development mode, run one of the following commands:

Using Yarn:

```bash
yarn dev
```

Using npm:

```bash
npm run dev
```

This will start the development server at http://localhost:3000.

#### Production

To build and start the application in production mode, use the following commands:

Using Yarn:

```bash
yarn build
yarn start
```

Using npm:

```bash
npm run build
npm run start
```

### 5. Prisma Commands

If you need to run Prisma migrations or manage your database, use these commands:

Using Yarn:

```bash
yarn prisma migrate dev
```

Using npm:

```bash
npm run prisma migrate dev
```

This will set up the database schema.

To generate Prisma client:

Using Yarn:

```bash
yarn prisma generate
```

Using npm:

```bash
npm run prisma generate
```

### 6. Docker commands

If you're using Docker to run the PostgreSQL database, here are some useful commands:

To start the Docker containers:

```bash
docker compose up --build
```

This will build the Docker containers and start them, including the PostgreSQL container.

To stop the Docker containers:

```bash
docker compose down
```

To rebuild and restart the Docker containers:

```bash
docker compose up --build
```

### 8. Testing

To run tests for your application (e.g., Jest tests for Zustand stores):

Using Yarn:

```bash
yarn test
```

Using npm:

```bash
npm run test
```

This will run the tests defined in your project.

### 9. Custom test users

The application comes with three test users:

```bash
export const users = [
  {
    id: "1",
    email: "test_user1@gmail.com",
    name: "Test User1",
    password: "12345",
  },
  {
    id: "2",
    email: "test_user2@gmail.com",
    name: "Test User2",
    password: "12345",
  },
  {
    id: "3",
    email: "guest@gmail.com",
    name: "Test Guest",
    password: "12345",
  },
];
```

### Database Schema

This is the Prisma schema for the database:

```bash
model User {
id String @id @default(uuid())
name String?
email String @unique
image String?
todos ToDo[]
}

model ToDo {
id String @id @default(uuid())
text String
user User @relation(fields: [userId], references: [id])
userId String
}
```

### Authentication

Authentication is powered by NextAuth.js with Google OAuth. To sign in, users can use their Google account or a custom email/password combination (using Credentials Provider).

When the user signs in, a session is created and stored in the application.
For Google OAuth, the app integrates directly with Google's OAuth2 API.

### Routes

- **Home**: The main landing page.
- **ToDoList**: A page where users can create and manage tasks. Accessible only to authenticated users.
- **Profile**: A page displaying the user's profile information. Accessible only to authenticated users.
- **Blogs**: A page listing blog posts. Data is fetched from JSONPlaceholder and stored in Zustand.
- **SignIn/Out**: Pages for signing in and signing out, supporting Google and email/password authentication.
