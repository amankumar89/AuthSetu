# 🔐 AuthSetu

<div align="center">

![AuthSetu Logo](https://img.shields.io/badge/AuthSetu-Authentication%20System-blue?style=for-the-badge&logo=shield&logoColor=white)

**A modern, full-stack authentication system built with React, Node.js, and MongoDB**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9.1-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [API Reference](#-api-reference)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Configuration](#-configuration)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Security](#-security)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**AuthSetu** is a production-ready authentication system that provides a complete solution for user registration, email verification, password management, and account security. Built with modern web technologies, it offers a seamless user experience with robust security features.

### Key Highlights

- ✅ **Complete Authentication Flow** - Register, verify, login, and manage accounts
- ✅ **Email Verification** - Secure 6-digit code verification system
- ✅ **Password Reset** - Token-based password recovery with email notifications
- ✅ **JWT Authentication** - Secure token-based authentication with HTTP-only cookies
- ✅ **Modern UI/UX** - Beautiful, responsive interface built with TailwindCSS
- ✅ **Type-Safe** - Full TypeScript support on the frontend
- ✅ **Production Ready** - Deployed on Vercel with MongoDB Atlas

---

## ✨ Features

### 🔑 Authentication Features

- **User Registration** - Secure signup with email validation
- **Email Verification** - 6-digit code verification (1-hour expiry)
- **Secure Login** - JWT-based authentication with HTTP-only cookies
- **Password Reset** - Secure token-based password recovery
- **Account Management** - View profile and manage account settings
- **Account Deletion** - Secure account removal with confirmation emails

### 🛡️ Security Features

- **Password Hashing** - Bcrypt with salt rounds (12)
- **JWT Tokens** - Secure token generation and validation
- **HTTP-Only Cookies** - Prevents XSS attacks
- **CORS Protection** - Configured CORS with allowed origins
- **Input Validation** - Zod schema validation on frontend
- **Token Expiration** - Time-limited tokens for security
- **Generic Error Messages** - Prevents user enumeration attacks

### 📧 Email Notifications

- **Verification Emails** - Welcome emails with verification codes
- **Welcome Emails** - Post-verification welcome messages
- **Password Reset Emails** - Secure reset links with expiration
- **Security Notifications** - Device and location tracking for password changes
- **Account Deletion Confirmations** - Detailed deletion notifications

### 🎨 User Experience

- **Modern UI** - Clean, responsive design with TailwindCSS
- **Loading States** - Smooth loading indicators
- **Error Handling** - User-friendly error messages with toast notifications
- **Form Validation** - Real-time validation with helpful messages
- **Protected Routes** - Automatic redirects for unauthenticated users
- **Dark Mode Ready** - CSS variables for theme customization

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | UI Framework |
| **TypeScript** | 5.9.3 | Type Safety |
| **Vite** | 5.4.19 | Build Tool |
| **React Router** | 6.30.1 | Routing |
| **React Hook Form** | 7.61.1 | Form Management |
| **Zod** | 3.25.76 | Schema Validation |
| **Axios** | 1.13.2 | HTTP Client |
| **TailwindCSS** | 3.4.17 | Styling |
| **React Hot Toast** | 2.6.0 | Notifications |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | Runtime |
| **Express** | 4.22.1 | Web Framework |
| **MongoDB** | 9.1.1 | Database (Mongoose) |
| **JWT** | 9.0.3 | Authentication |
| **Bcryptjs** | 3.0.3 | Password Hashing |
| **Nodemailer** | 7.0.12 | Email Service |
| **Cookie Parser** | 1.4.7 | Cookie Management |
| **CORS** | 2.8.5 | Cross-Origin Resource Sharing |

---

## 📁 Project Structure

```
AuthSetu/
├── client/                 # React Frontend Application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   └── auth/      # Authentication components
│   │   ├── context/        # React Context (Auth)
│   │   ├── pages/         # Route pages
│   │   ├── utils/         # Utility functions (API)
│   │   └── lib/           # Library utilities
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
│
├── server/                # Node.js Backend Application
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── middlewares/   # Express middlewares
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic (Email)
│   │   └── utils/         # Helper functions
│   └── package.json       # Backend dependencies
│
└── README.md             # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (MongoDB Atlas or local instance)
- **Gmail Account** (for email service)
- **npm** or **yarn** or **bun**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AuthSetu
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Configure Environment Variables**

   Create `.env` file in the `server` directory:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=1d
   NODEMAILER_GOOGLE_EMAIL=your_email@gmail.com
   GOOGLE_APP_PASSWORD=your_16_char_app_password
   ```

5. **Start Development Servers**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

---

## ⚙️ Configuration

### Backend Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port (default: 3000) | No |
| `MONGO_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_EXPIRES_IN` | Token expiration time (default: 1d) | No |
| `NODEMAILER_GOOGLE_EMAIL` | Gmail address for sending emails | Yes |
| `GOOGLE_APP_PASSWORD` | Gmail App Password (16 characters) | Yes |

### Frontend Configuration

The frontend automatically detects the environment:
- **Development**: Uses `http://localhost:3000/api/auth`
- **Production**: Uses `https://auth-setu-server.vercel.app/api/auth`

Update `client/src/utils/api.ts` to change the API base URL.

### Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password
   - Use it as `GOOGLE_APP_PASSWORD`

---

## 📡 API Reference

### Base URL

- **Development**: `http://localhost:3000/api/auth`
- **Production**: `https://auth-setu-server.vercel.app/api/auth`

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully! Please verify your email.",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "isVerified": false
  }
}
```

#### Verify Email
```http
POST /api/auth/verify-email
Content-Type: application/json

{
  "code": "123456"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Get Current User
```http
GET /api/auth/me
Cookie: token=jwt_token_here
```

#### Logout
```http
POST /api/auth/logout
Cookie: token=jwt_token_here
```

#### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com",
  "clientUrl": "http://localhost:5173/reset-password"
}
```

#### Reset Password
```http
POST /api/auth/reset-password/:token
Content-Type: application/json

{
  "password": "newpassword123"
}
```

#### Delete Account
```http
DELETE /api/auth/delete
Cookie: token=jwt_token_here
```

### Health Check
```http
GET /health
```

---

## 🚢 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set build command: `cd client && npm run build`
4. Set output directory: `client/dist`
5. Deploy!

### Backend (Vercel)

1. Set root directory to `server`
2. Add environment variables in Vercel dashboard
3. Deploy!

### MongoDB Atlas

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get connection string
4. Add to `MONGO_URI` environment variable

---

## 🔒 Security

### Implemented Security Measures

- ✅ **Password Hashing** - Bcrypt with 12 salt rounds
- ✅ **JWT Tokens** - Secure token generation
- ✅ **HTTP-Only Cookies** - Prevents XSS attacks
- ✅ **CORS Protection** - Configured allowed origins
- ✅ **Input Validation** - Zod schema validation
- ✅ **Token Expiration** - Time-limited tokens
- ✅ **Generic Error Messages** - Prevents user enumeration
- ✅ **Secure Cookie Settings** - `secure`, `httpOnly`, `sameSite`

### Security Best Practices

- Never commit `.env` files
- Use strong JWT secrets
- Regularly update dependencies
- Enable HTTPS in production
- Monitor for suspicious activities
- Implement rate limiting (recommended)

---

## 📝 Available Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend

```bash
npm start            # Start production server
npm run dev          # Start development server (nodemon)
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow ESLint configuration
- Use TypeScript for frontend
- Write meaningful commit messages
- Add comments for complex logic

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**AuthSetu Team**

- Built with ❤️ for secure authentication

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI Framework
- [Express](https://expressjs.com/) - Web Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Deployment Platform

---

<div align="center">

**⭐ Star this repo if you find it helpful! ⭐**

Made with ❤️ by the AuthSetu Team

</div>
