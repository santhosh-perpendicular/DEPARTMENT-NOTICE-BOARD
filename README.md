# Department Notice Board

A full-stack web application to digitally add, store, retrieve and display department notices.

**Flow:** React Frontend → Express Server → MongoDB Database → Express Server → React Frontend

## Technologies
Node.js, Express.js, MongoDB, Mongoose, React, TypeScript, Vite, CSS3

## Project Structure
```
Department-Notice-Board/
├── client/                      React + TypeScript frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   └── NoticeCard.tsx   Reusable notice component
│   │   ├── App.tsx              Form, notice list, API calls
│   │   ├── App.css
│   │   ├── main.tsx
│   │   └── types.ts
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/                      Express + MongoDB backend
│   ├── config/
│   │   └── db.js                MongoDB connection
│   ├── models/
│   │   └── Notice.js            Mongoose schema (title, message)
│   ├── routes/
│   │   └── notices.js           GET and POST /api/notices
│   ├── .env.example
│   ├── package.json
│   └── server.js                Express server, / and /faculty pages
├── .gitignore
└── README.md
```

## Prerequisites
- Node.js 18 or later
- MongoDB running locally on `mongodb://127.0.0.1:27017` (or a MongoDB Atlas connection string)

## How to Run

### 1. Start the server
```bash
cd server
npm install
cp .env.example .env      # optional, defaults are the same
npm start
```
The server runs on `http://localhost:5000`.

| Route | Description |
|---|---|
| `GET /` | Welcome to Department Notice Board |
| `GET /faculty` | Faculty list (Dr. Kumar, Dr. Priya, Prof. Ravi, Prof. Meena) |
| `GET /api/notices` | Returns all notices (`[]` when empty) |
| `POST /api/notices` | Saves a notice (`title`, `message`) |

Database: `department_notice_board`, collection: `notices`.

Validation: if the title or message is empty, the notice is not saved and the API returns
`400` with `Title and message are required`.

### 2. Start the client
```bash
cd client
npm install
npm run dev
```
Open `http://localhost:5173`. The Vite dev server forwards `/api` requests to the Express server.

## Example Notice
```json
{
  "title": "Internal Exam",
  "message": "Internal examination starts from Monday."
}
```
