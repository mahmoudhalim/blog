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

1. **Clone the repository:**

    ```bash
    git clone https://github.com/mahmoudhalim/blog
    cd blog
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

## Running the Server

1. **Start the server:**

    ```bash
    npm start
    ```

2. The server will typically start on `http://localhost:3001`

## API Endpoints

The base URL is `http://localhost:3001`

| Method   | Endpoint     | Description             | Success Response          | Error Response                     |
| :------- | :----------- | :---------------------- | :------------------------ | :--------------------------------- |
| `GET`    | `/api/blogs`     | Get all blog posts      | `200 OK` - Array of posts | `500 Internal Server Error`        |
| `POST`   | `/api/blogs`     | Create a new blog post  | `201 Created` - New post  | `400 Bad Request` - `401 Unauthorized`                 |
| `PUT`    | `/api/blogs/:id` | Update an existing post | `200 OK` - Updated post   | `404 Not Found`, `400 Bad Request` - `401 Unauthorized` |
| `DELETE` | `/api/blogs/:id` | Delete a post by ID     | `204 No Content`          | `404 Not Found`      - `401 Unauthorized`              |
|`GET`| `/api/users` | Get all users | `200 OK`- Array of users | `500 Internal Server Error`|
|`POST` | `/api/users` | Create new user| `201 Created`- New user| `400 Bad Request`|
|`POST` |`/api/login` | Login to server | `200 OK`- JSON Web Token | `401 Unauthorized`|
