# Full Stack Expense Tracker

A full-stack expense tracker built with React, Node.js, Express, MongoDB, and JWT authentication.

## Features

- User Sign Up and Login
- JWT authentication
- Add expense
- View expenses in a table
- Edit expense
- Delete expense
- Latest expenses displayed first
- Category-wise expense pie chart
- Local MongoDB database
- Protected expense APIs

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Axios
- Recharts

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS

## Prerequisites

Install:
- Node.js
- npm
- MongoDB Community Server

Make sure MongoDB is running locally.

## Run Backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

On macOS/Linux:

```bash
cp .env.example .env
npm run dev
```

Backend runs on:
http://localhost:5000

## Run Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
http://localhost:5173

## Default MongoDB

```text
mongodb://127.0.0.1:27017/expense_tracker
```

## API Endpoints

### Authentication
- POST /api/auth/signup
- POST /api/auth/login

### Expenses
- GET /api/expenses
- POST /api/expenses
- PUT /api/expenses/:id
- DELETE /api/expenses/:id

Expense routes require:

```text
Authorization: Bearer <JWT_TOKEN>
```

## GitHub Upload

1. Create a new GitHub repository.
2. Extract this ZIP.
3. Open the project folder in VS Code.
4. Initialize Git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
5. Connect your GitHub repository:
   ```bash
   git remote add origin YOUR_GITHUB_REPOSITORY_URL
   git branch -M main
   git push -u origin main
   ```

Do not upload your `.env` file. The included `.gitignore` protects it.
