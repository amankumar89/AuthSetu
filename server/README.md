# 🚀 AuthSetu Server

<div align="center">

**RESTful API Server for AuthSetu Authentication System**

[![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.22-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9.1-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-9.0-000000?style=flat-square&logo=json-web-tokens)](https://jwt.io/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Authentication](#-authentication)
- [Email Service](#-email-service)
- [Error Handling](#-error-handling)
- [Security](#-security)
- [Deployment](#-deployment)

---

## 🎯 Overview

The AuthSetu Server is a robust Node.js/Express REST API that handles all authentication and user management operations. It provides secure endpoints for user registration, email verification, login, password management, and account operations.

### Key Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 🍪 **HTTP-Only Cookies** - XSS protection
- 🔒 **Password Hashing** - Bcrypt with salt rounds
- 📧 **Email Service** - Nodemailer with Gmail
- 🛡️ **CORS Protection** - Configured allowed origins
- 📝 **Input Validation** - Request validation
- ⚡ **Async Handlers** - Error handling wrapper
- 🗄️ **MongoDB** - Mongoose ODM

---

## ✨ Features

### Authentication

- User registration with email validation
- Email verification with 6-digit codes
- Secure login with JWT tokens
- Password reset with secure tokens
- Account deletion with confirmation

### Security

- Password hashing (Bcrypt, 12 salt rounds)
- JWT token generation and verification
- HTTP-only secure cookies
- CORS protection
- Token expiration
- Generic error messages

### Email Notifications

- Verification emails
- Welcome emails
- Password reset emails
- Security notifications
- Account deletion confirmations

---

## 🛠️ Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| **express** | 4.22.1 | Web framework |
| **mongoose** | 9.1.1 | MongoDB ODM |
| **jsonwebtoken** | 9.0.3 | JWT authentication |
| **bcryptjs** | 3.0.3 | Password hashing |
| **nodemailer** | 7.0.12 | Email service |
| **cookie-parser** | 1.4.7 | Cookie parsing |
| **cors** | 2.8.5 | CORS middleware |
| **dotenv** | 17.2.3 | Environment variables |

---

## 📁 Project Structure

```
server/
├── src/
│   ├── config/            # Configuration files
│   │   ├── db.js         # MongoDB connection
│   │   ├── env.js        # Environment variables
│   │   └── jwt.js        # JWT utilities
│   │
│   ├── controllers/      # Route controllers
│   │   └── auth.controller.js
│   │
│   ├── middlewares/      # Express middlewares
│   │   ├── authenticate.js
│   │   ├── errorHandler.js
│   │   └── appError.js
│   │
│   ├── models/           # MongoDB models
│   │   └── user.model.js
│   │
│   ├── routes/           # API routes
│   │   └── auth.route.js
│   │
│   ├── services/         # Business logic
│   │   ├── sendEmails.js
│   │   └── emailTemplate.js
│   │
│   ├── utils/            # Helper functions
│   │   ├── async-handler.js
│   │   └── helper.js
│   │
│   └── index.js          # Entry point
│
├── package.json          # Dependencies
└── .env                  # Environment variables (not in repo)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (MongoDB Atlas or local instance)
- **Gmail Account** (for email service)

### Installation

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   NODE_ENV=development
   PORT=3000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/authsetu
   JWT_SECRET=your_super_secret_jwt_key_min_32_chars
   JWT_EXPIRES_IN=1d
   NODEMAILER_GOOGLE_EMAIL=your_email@gmail.com
   GOOGLE_APP_PASSWORD=your_16_char_app_password
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Server running**
   - API: http://localhost:3000
   - Health check: http://localhost:3000/health

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | Yes | - |
| `PORT` | Server port | No | 3000 |
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `JWT_SECRET` | Secret for JWT tokens | Yes | - |
| `JWT_EXPIRES_IN` | Token expiration time | No | 1d |
| `NODEMAILER_GOOGLE_EMAIL` | Gmail address | Yes | - |
| `GOOGLE_APP_PASSWORD` | Gmail App Password | Yes | - |

### MongoDB Connection

The server uses Mongoose with connection caching for optimal performance.

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/database_name
```

### Gmail App Password

1. Enable 2-Step Verification on your Google Account
2. Go to Security → 2-Step Verification → App passwords
3. Generate password for "Mail"
4. Use the 16-character password as `GOOGLE_APP_PASSWORD`

---

## 📡 API Endpoints

### Base URL

- **Development**: `http://localhost:3000/api/auth`
- **Production**: `https://auth-setu-server.vercel.app/api/auth`

### Authentication Routes

#### 1. Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully! Please verify your email.",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isVerified": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**
- `400` - Missing required fields
- `409` - User already exists

---

#### 2. Verify Email

```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "code": "123456"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Verified Successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isVerified": true
  }
}
```

**Errors:**
- `400` - Invalid or expired verification code

---

#### 3. Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login Successfull",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isVerified": true,
    "lastLogin": "2024-01-01T00:00:00.000Z"
  }
}
```

**Cookie:** `token` (HTTP-only, secure, sameSite: none)

**Errors:**
- `400` - Missing fields or invalid credentials
- `401` - Invalid credentials

---

#### 4. Get Current User

```http
GET /api/auth/me
Cookie: token=jwt_token_here
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isVerified": true,
    "lastLogin": "2024-01-01T00:00:00.000Z",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Errors:**
- `401` - No token provided
- `400` - Invalid token
- `404` - User not found

---

#### 5. Logout

```http
POST /api/auth/logout
Cookie: token=jwt_token_here
```

**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### 6. Forgot Password

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com",
  "clientUrl": "http://localhost:5173/reset-password"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "If the email exists, a reset link has been sent"
}
```

**Note:** Generic message to prevent user enumeration.

---

#### 7. Reset Password

```http
POST /api/auth/reset-password/:token
Content-Type: application/json

{
  "password": "newpassword123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password reset successful."
}
```

**Errors:**
- `400` - Missing password or invalid/expired token

---

#### 8. Delete Account

```http
DELETE /api/auth/delete
Cookie: token=jwt_token_here
```

**Response (200):**
```json
{
  "success": true,
  "message": "User deleted."
}
```

**Errors:**
- `401` - Not authenticated
- `404` - User not found

---

### Health Check

```http
GET /health
```

**Response (200):**
```json
{
  "success": true,
  "service": "AuthSetu",
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## 🗄️ Database Schema

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  isVerified: Boolean (default: false),
  lastLogin: Date (default: Date.now),
  verificationToken: String,
  verificationTokenExpireAt: Date,
  resetPasswordToken: String,
  resetPasswordTokenExpireAt: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### Indexes

- `email` - Unique index for fast lookups

---

## 🔐 Authentication

### JWT Token

- **Algorithm**: HS256
- **Expiration**: Configurable (default: 1 day)
- **Storage**: HTTP-only cookie
- **Cookie Settings**:
  - `httpOnly: true` - Prevents XSS
  - `secure: true` - HTTPS only
  - `sameSite: "none"` - Cross-site requests
  - `maxAge: 2 days`

### Authentication Middleware

The `authenticate` middleware:
1. Extracts token from cookie or Authorization header
2. Verifies JWT token
3. Sets `req.userId` for protected routes

**Usage:**
```javascript
router.get("/me", authenticate, me);
```

---

## 📧 Email Service

### Email Templates

The server includes HTML email templates for:

1. **Email Verification** - 6-digit code
2. **Welcome Email** - Post-verification
3. **Password Reset** - Reset link
4. **Password Reset Success** - Confirmation
5. **Account Deletion** - Deletion confirmation

### Email Configuration

Uses Nodemailer with Gmail SMTP:

```javascript
transporter: {
  service: "gmail",
  auth: {
    user: NODEMAILER_GOOGLE_EMAIL,
    pass: GOOGLE_APP_PASSWORD
  }
}
```

### Email Functions

- `sendVerificationEmail()` - Sends 6-digit code
- `sendWelcomeEmail()` - Welcome message
- `passwordResetEmail()` - Reset link
- `passwordResetSuccessEmail()` - Confirmation with device info
- `deleteUserSuccessEmail()` - Deletion confirmation

---

## ⚠️ Error Handling

### Error Middleware

Global error handler in `middlewares/errorHandler.js`:

```javascript
{
  success: false,
  message: "Error message",
  stack: "..." // Only in development
}
```

### Custom Error Class

`AppError` class for custom error handling:

```javascript
throw new AppError("Error message", statusCode);
```

### Async Handler

Wraps async route handlers to catch errors:

```javascript
export const handler = asyncHandler(async (req, res) => {
  // Route logic
});
```

---

## 🔒 Security

### Implemented Security

- ✅ **Password Hashing** - Bcrypt with 12 salt rounds
- ✅ **JWT Tokens** - Secure token generation
- ✅ **HTTP-Only Cookies** - XSS protection
- ✅ **CORS Protection** - Allowed origins only
- ✅ **Token Expiration** - Time-limited tokens
- ✅ **Generic Errors** - Prevents user enumeration
- ✅ **Input Validation** - Request validation

### Security Best Practices

1. **Environment Variables** - Never commit `.env` files
2. **Strong JWT Secret** - Use at least 32 characters
3. **HTTPS** - Always use HTTPS in production
4. **Rate Limiting** - Consider adding rate limiting
5. **Input Sanitization** - Validate and sanitize all inputs
6. **Dependency Updates** - Keep dependencies updated

---

## 🚢 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Configure Project**
   ```bash
   cd server
   vercel
   ```

3. **Set Environment Variables**
   - Go to Vercel Dashboard
   - Project Settings → Environment Variables
   - Add all required variables

4. **Deploy**
   ```bash
   vercel --prod
   ```

### Other Platforms

The server can be deployed to:
- **Heroku** - Git-based deployment
- **Railway** - Git integration
- **Render** - Git-based deployment
- **AWS EC2** - Manual deployment
- **DigitalOcean** - App Platform

### Environment Variables

Make sure to set all environment variables in your deployment platform.

---

## 📝 Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server (nodemon)
```

---

## 🧪 Testing

### Manual Testing

Use tools like:
- **Postman** - API testing
- **Thunder Client** - VS Code extension
- **curl** - Command line testing

### Example curl Commands

**Register:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}' \
  -c cookies.txt
```

**Get Me:**
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -b cookies.txt
```

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Check `MONGO_URI` is correct
- Ensure MongoDB Atlas IP whitelist includes your IP
- Verify network connectivity

**JWT Errors:**
- Ensure `JWT_SECRET` is set
- Check token expiration
- Verify cookie settings

**Email Not Sending:**
- Verify Gmail App Password is correct
- Check 2-Step Verification is enabled
- Ensure email service is not blocked

**CORS Errors:**
- Add frontend URL to `allowedOrigins` in `index.js`
- Check `credentials: true` in frontend requests

---

## 📚 Resources

- [Express Documentation](https://expressjs.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/)
- [JWT.io](https://jwt.io/)
- [Nodemailer Docs](https://nodemailer.com/)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)

---

<div align="center">

**Built with ❤️ using Node.js, Express, and MongoDB**

[Back to Main README](../README.md)

</div>
