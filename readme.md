# Node.js Web Server with API & WebSockets

A lightweight custom built server built with Node.js that supports:
- Basic REST API for user management (CRUD Operations)
- Static file serving (HTML, CSS, JS)
- Real-time communication using webSockets

##  📌 Features
- **User API (CRUD)**: create, Read, Update and Delete users. 
- **File Serving**: Serves static files from the `public` directory.
- **WebSockets**: Allows real-time bidirectional communication.

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies
Ensure you have **Node.js** installed. Then, install the required packages:

```sh
npm install

```

### 2️⃣ Run the Server
```sh
node server.js
```


## 🔗 API Endpoints
📌 User API Endpoints

| Method  | Endpoints | Description | Request Body (if applicable) |
|-------  | --------- | ----------- | ---------------------------- |
| **GET** | /api/users/ | get all users | -                        |
| **GET** | /api/users/:id | get a single user | -                 |
| **POST** | /api/users | Create a new user | {name: "John Doe", email: "John@xyz.com"} |
| **PUT** | /api/users/:id | Update an existing user | {name: "Updated Name"} |
| **DELETE** | /api/users/:id | Delete a user | -                  | 


1. Get All Users
- Endpoint: GET /api/users
- Response:
```json
[
  { "id": 1, "name": "Alice Doe", "email": "alice@example.com" },
  { "id": 2, "name": "John Doe", "email": "john@example.com" }
]
```

📍 2. Get a Single User
- Endpoint: GET /api/users/:id
- Example Request: /api/users/1
- Response (User Found):
```json
{ "id": 1, "name": "Alice Doe", "email": "alice@example.com" }
```
- Response (User Not Found):
```json
{ "error": "User not found" }
```

📍 3. Create a New User
- Endpoint: POST /api/users
- Headers: 
```json
{ "Content-Type": "application/json" }
```
- Request Body:
```json
{ "name": "New User", "email": "newuser@example.com" }
```
- Response:
```json
{ "message": "User created", "user": { "id": 3, "name": "New User", "email": "newuser@example.com" } }
```

📍 4. Update a User
- Endpoint: PUT /api/users/:id
- Headers: 
```json
{ "Content-Type": "application/json" }
```
- Requset Body:
```json
{ "name": "Updated Name" }
```
- Response:
```json
{ "message": "User updated", "user": { "id": 1, "name": "Updated Name", "email": "alice@example.com" } }
```

📍 5. Delete a User
- Endpoint: DELETE /api/users/:id
- Response (User Deleted):
```json
{ "message": "User deleted", "user": { "id": 1, "name": "Alice Doe", "email": "alice@example.com" } }
```
- Response (User Not Found):
```json
{ "error": "User not found" }
```




