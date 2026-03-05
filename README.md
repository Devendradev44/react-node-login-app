# React + Node Login Application

A simple full-stack login system built with **React (frontend)** and **Node.js + Express (backend)**.

## Tech Stack

* React (Functional Components + Hooks)
* Node.js
* Express
* Axios
* bcrypt
* dotenv
* express-rate-limit

## Features

* Login form with username and password
* Backend API for credential validation
* Redirect to Welcome page after successful login
* Error message for invalid credentials
* Username remembered using localStorage
* Password hashing with bcrypt
* API rate limiting to prevent brute-force attacks

## Project Structure

login-app
├ backend
│ ├ server.js
│ ├ users.json
│ └ package.json
│
└ frontend
├ public
├ src
│ ├ components
│ │ ├ Login.js
│ │ └ Welcome.js
│ ├ App.js
│ └ index.js
└ package.json

## Installation

### Backend

cd backend
npm install
node server.js

### Frontend

cd frontend
npm install
npm start

## Test Credentials

Username: admin
Password: admin

## API Endpoint

POST /login

Example request:

{
"username": "admin",
"password": "admin"
}

Response:

{
"message": "Login successful"
}

## Security Enhancements

* Password hashing using bcrypt
* Environment variables using dotenv
* Rate limiting with express-rate-limit

## Author

Devendra
