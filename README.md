# 🔐 AuthSetu

A full-stack authentication system built with Express.js and React, featuring secure user registration, email verification, password reset, and account management.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Frontend Routes](#frontend-routes)
- [Security Features](#security-features)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Registration** - Secure user registration with email validation
- **Email Verification** - 6-digit OTP verification via email
- **User Login** - Secure authentication with JWT tokens
- **Password Reset** - Forgot password functionality with secure token-based reset
- **Account Management** - View and manage user profile
- **Account Deletion** - Secure account deletion with email notification
- **Protected Routes** - Route protection based on authentication status
- **Cookie-based Authentication** - Secure HTTP-only cookies for token storage
- **CORS Configuration** - Properly configured CORS for cross-origin requests
- **Error Handling** - Comprehensive error handling and validation
- **Email Notifications** - Automated email notifications for various events

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service
- **cookie-parser** - Cookie parsing middleware
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

## 📁 Project Structure

```
AuthSetu/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── auth/       # Authentication-specific components
│   │   │   └── ui/         # shadcn/ui components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page components
│   │   └── utils/          # Helper utilities
│   ├── public/             # Static assets
│   └── package.json
│
├── server/                 # Express backend application
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   │   ├── db.js       # Database connection
│   │   │   ├── env.js      # Environment variables
│   │   │   └── jwt.js      # JWT utilities
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Express middlewares
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic services
│   │   └── utils/          # Helper utilities
│   ├── index.js            # Server entry point
│   └── package.json
│
└── README.md
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **bun**
- **MongoDB** (local or MongoDB Atlas)
- **Git**

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amankumar89/AuthSetu.git
   cd AuthSetu
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

## 🔧 Environment Variables

### Backend (.env in `server/` directory)

Create a `.env` file in the `server/` directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Database
MONGO_URI=mongodb://localhost:27017/authsetu
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/authsetu

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1d

# Email Configuration (Nodemailer with Gmail)
NODEMAILER_GOOGLE_EMAIL=your-email@gmail.com
GOOGLE_APP_PASSWORD=your-google-app-password
```

**Note:** To get a Google App Password:
1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Generate an App Password for "Mail"
4. Use that password in `GOOGLE_APP_PASSWORD`

### Frontend

The frontend uses environment variables for API configuration. Update `client/src/utils/api.ts` to point to your backend URL:

```typescript
// For development
const API_BASE_URL = "http://localhost:3000/api/auth";

// For production
const API_BASE_URL = "https://your-backend-url.com/api/auth";
```

## 🏃 Running the Project

### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:3000`

2. **Start the frontend development server** (in a new terminal)
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

### Production Mode

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Start the backend server**
   ```bash
   cd server
   npm start
   ```

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Register a new user | No |
| POST | `/verify-email` | Verify email with OTP code | No |
| POST | `/login` | Login user | No |
| POST | `/logout` | Logout user | No |
| GET | `/me` | Get current user profile | Yes |
| DELETE | `/delete` | Delete user account | Yes |
| POST | `/forgot-password` | Request password reset | No |
| POST | `/reset-password/:token` | Reset password with token | No |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |
| GET | `/` | Welcome message |

### Request/Response Examples

#### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

#### Verify Email
```bash
POST /api/auth/verify-email
Content-Type: application/json

{
  "code": "123456"
}
```

#### Forgot Password
```bash
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com",
  "clientUrl": "http://localhost:5173"
}
```

## 🔄 Authentication Flow

1. **Registration**
   - User provides name, email, and password
   - Password is hashed using bcrypt
   - User is created with `isVerified: false`
   - 6-digit OTP is generated and sent via email
   - JWT token is set in HTTP-only cookie

2. **Email Verification**
   - User enters the 6-digit OTP received via email
   - OTP is validated (expires after 1 hour)
   - User's `isVerified` status is set to `true`
   - Welcome email is sent

3. **Login**
   - User provides email and password
   - Credentials are validated
   - JWT token is generated and set in HTTP-only cookie
   - `lastLogin` timestamp is updated

4. **Password Reset**
   - User requests password reset with email
   - Secure token is generated and stored in database
   - Reset link is sent via email (expires after 1 hour)
   - User clicks link and provides new password
   - Password is updated and token is invalidated

5. **Protected Routes**
   - JWT token is validated from HTTP-only cookie
   - User ID is extracted and attached to request
   - Protected routes check for valid authentication

## 🎨 Frontend Routes

| Route | Component | Description | Protected |
|-------|-----------|-------------|-----------|
| `/` | Profile | User profile page | Yes |
| `/login` | Login | Login page | No |
| `/register` | Register | Registration page | No |
| `/verify-email` | VerifyEmail | Email verification page | No |
| `/forgot-password` | ForgotPassword | Password reset request | No |
| `/reset-password` | ResetPassword | Password reset form | No |
| `/delete-account` | DeleteAccount | Account deletion page | Yes |
| `*` | NotFound | 404 page | No |

## 🔒 Security Features

- **Password Hashing** - Passwords are hashed using bcryptjs
- **JWT Tokens** - Secure token-based authentication
- **HTTP-Only Cookies** - Tokens stored in HTTP-only cookies to prevent XSS attacks
- **CORS Protection** - Configured CORS with allowed origins
- **Input Validation** - Server-side validation for all inputs
- **Token Expiration** - JWT tokens expire after configured time
- **Email Verification** - OTP-based email verification
- **Password Reset Tokens** - Time-limited secure tokens for password reset
- **Error Handling** - Generic error messages to prevent user enumeration
- **Rate Limiting Ready** - Structure supports rate limiting implementation

## 🚢 Deployment

### Backend Deployment (Vercel)

The backend is configured for Vercel deployment. Ensure you:

1. Set all environment variables in Vercel dashboard
2. Configure MongoDB Atlas connection string
3. Update CORS allowed origins in `server/src/index.js`

### Frontend Deployment

1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

3. Update the API base URL in `client/src/utils/api.ts` to point to your deployed backend

### Current Deployments

- **Backend**: `https://auth-setu-server.vercel.app`
- **Frontend**: `https://auth-setu-client.vercel.app`

## 🧪 Testing

Currently, the project doesn't include automated tests. Consider adding:

- Unit tests for controllers and utilities
- Integration tests for API endpoints
- E2E tests for critical user flows
- Frontend component tests

## 📝 Code Style

- **Backend**: ES6+ JavaScript with Express.js conventions
- **Frontend**: TypeScript with React best practices
- **Linting**: ESLint configured for both projects

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write clear commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Aman Kumar**

- GitHub: [@amankumar89](https://github.com/amankumar89)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Express.js](https://expressjs.com/) community for excellent documentation
- [React](https://react.dev/) team for the amazing framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/amankumar89/AuthSetu/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

## 🔮 Future Enhancements

- [ ] Add rate limiting
- [ ] Implement refresh tokens
- [ ] Add social authentication (Google, GitHub)
- [ ] Add two-factor authentication (2FA)
- [ ] Implement session management
- [ ] Add comprehensive test coverage
- [ ] Add API documentation with Swagger/OpenAPI
- [ ] Implement password strength meter
- [ ] Add account activity logs
- [ ] Support for multiple email providers

---

Made with ❤️ by Aman Kumar
