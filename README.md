# TaskFlow

A complete full-stack task management application featuring a RESTful API built with Node.js/Express, a MongoDB database, and a responsive Vanilla JavaScript frontend client.

## Live Demo

[TaskFlow Live Demo](https://amazing-platypus-017c1a.netlify.app/)


---

# Features

- **Secure Authentication**
  - User registration and login using JWT authentication
  - Password hashing with `bcryptjs`

- **Protected Routing**
  - Frontend and backend route protection
  - Token-based authorization middleware

- **Task Management**
  - Create, Read, Update, and Delete tasks
  - Optimistic UI updates for better UX

- **Responsive Frontend**
  - Built with pure HTML5, CSS3, and Vanilla JavaScript
  - Lightweight and fast-loading interface

- **Robust Backend**
  - MVC architecture
  - Organized routes, controllers, and models
  - Centralized error handling

---

# Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | JWT + bcryptjs |
| Dev Tools | nodemon, dotenv |

---

# Getting Started

## Prerequisites

Before running the project, ensure you have:

- Node.js v16+
- MongoDB Atlas account
- npm
- VS Code Live Server extension (optional for frontend development)

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

## 2. Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

# Running the Application

## Start the Backend Server

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

## Start the Frontend Client

Since the frontend uses Vanilla JavaScript and the Fetch API, serve the `frontend/` folder using a local static server.

### Using VS Code Live Server

1. Open the project in VS Code
2. Navigate to `frontend/index.html`
3. Right-click and select:

```text
Open with Live Server
```

---

# API Endpoints

## Authentication Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Private | Get current user profile |

---

## Task Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/tasks` | Private | Get all tasks |
| POST | `/api/tasks` | Private | Create a task |
| PUT | `/api/tasks/:id` | Private | Update a task |
| DELETE | `/api/tasks/:id` | Private | Delete a task |

---

# Example API Request

## Create Task

```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write README and API docs"
}
```

---

# Project Structure

```bash
taskflow/
│
|── controllers/
├── middleware/
├── models/
├── routes/
└── server.js
│
├── frontend/
│   ├── css/
│   ├── js/
│   └── index.html
│
├── .env
├── package.json
└── README.md
```

---

# Deployment

| Service | Platform |
|---|---|
| Backend/API | Render.com |
| Database | MongoDB Atlas |
| Frontend | Netlify |

---

# Future Improvements

- Task categories and labels
- Due dates and reminders
- Drag-and-drop task board
- Dark mode support
- Pagination and search
- Unit and integration testing

---

# License

This project is licensed under the MIT License.

---
