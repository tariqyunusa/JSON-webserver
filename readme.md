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
| ------- | ---------- | -------------- | ------------------------ |
| **GET** | /api/users/:id | get a single user | -                 |
| ------- | -------------- | ----------------- | ----------------- |


