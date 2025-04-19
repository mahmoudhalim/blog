# Simple Blog JSON Server

A JSON API server built with Node.js and Express.js to manage blog post data.

## Features

- Serves blog post data via a RESTful JSON API.
- Basic CRUD operations for posts:
  - Get all posts
  <!-- * Get a single post by ID -->
  - Create a new post
  - Update an existing post
  - Delete a post
- Uses MongoDB for storage

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/mahmoudhalim/blog
    cd blog
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Server

1.  **Start the server:**

    ```bash
    npm start
    ```

2.  The server will typically start on `http://localhost:3001`

## API Endpoints

The base URL is `http://localhost:3001`

| Method   | Endpoint     | Description             | Success Response          | Error Response                     |
| :------- | :----------- | :---------------------- | :------------------------ | :--------------------------------- |
| `GET`    | `/posts`     | Get all blog posts      | `200 OK` - Array of posts | `500 Internal Server Error`        |
| `POST`   | `/posts`     | Create a new blog post  | `201 Created` - New post  | `400 Bad Request`                  |
| `PUT`    | `/posts/:id` | Update an existing post | `200 OK` - Updated post   | `404 Not Found`, `400 Bad Request` |
| `DELETE` | `/posts/:id` | Delete a post by ID     | `204 No Content`          | `404 Not Found`                    |
