# 🎨 AuthSetu Client

<div align="center">

**Modern React Frontend for AuthSetu Authentication System**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Components](#-components)
- [Pages](#-pages)
- [State Management](#-state-management)
- [API Integration](#-api-integration)
- [Styling](#-styling)
- [Build & Deploy](#-build--deploy)

---

## 🎯 Overview

The AuthSetu Client is a modern, type-safe React application built with TypeScript and Vite. It provides a beautiful, responsive user interface for the complete authentication flow including registration, email verification, login, password reset, and account management.

### Key Features

- ⚡ **Fast Development** - Vite for instant HMR
- 🎨 **Modern UI** - TailwindCSS with custom design system
- 🔒 **Type Safety** - Full TypeScript support
- 📱 **Responsive** - Mobile-first design
- 🎭 **Form Validation** - React Hook Form + Zod
- 🔔 **Notifications** - React Hot Toast
- 🛡️ **Protected Routes** - Route guards for authentication

---

## ✨ Features

### Authentication Pages

- **Login** - Secure user authentication
- **Register** - New user registration
- **Verify Email** - 6-digit code verification
- **Forgot Password** - Password reset request
- **Reset Password** - Create new password
- **Profile** - User profile and account management
- **Delete Account** - Secure account deletion

### UI Components

- **AuthLayout** - Consistent page layout wrapper
- **AuthInput** - Form input with validation
- **AuthButton** - Button with loading states
- **AuthAlert** - Alert messages (success/error/warning/info)
- **ProtectedRoute** - Route protection wrapper

### User Experience

- Real-time form validation
- Loading states and spinners
- Toast notifications
- Error handling
- Automatic redirects
- Responsive design

---

## 🛠️ Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| **react** | 18.3.1 | UI Framework |
| **react-dom** | 18.3.1 | React DOM renderer |
| **react-router-dom** | 6.30.1 | Client-side routing |
| **react-hook-form** | 7.61.1 | Form state management |
| **zod** | 3.25.76 | Schema validation |
| **axios** | 1.13.2 | HTTP client |
| **tailwindcss** | 3.4.17 | Utility-first CSS |
| **react-hot-toast** | 2.6.0 | Toast notifications |
| **lucide-react** | 0.462.0 | Icon library |
| **clsx** | 2.1.1 | Conditional classnames |
| **tailwind-merge** | 2.6.0 | Merge Tailwind classes |

---

## 📁 Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   └── auth/          # Authentication components
│   │       ├── AuthAlert.tsx
│   │       ├── AuthButton.tsx
│   │       ├── AuthInput.tsx
│   │       ├── AuthLayout.tsx
│   │       └── ProtectedRoute.tsx
│   │
│   ├── context/           # React Context
│   │   ├── AuthContext.tsx
│   │   └── AuthProvider.tsx
│   │
│   ├── pages/            # Route pages
│   │   ├── DeleteAccount.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   ├── Profile.tsx
│   │   ├── Register.tsx
│   │   ├── ResetPassword.tsx
│   │   └── VerifyEmail.tsx
│   │
│   ├── utils/            # Utility functions
│   │   └── api.ts        # API client
│   │
│   ├── lib/              # Library utilities
│   │   └── utils.ts      # Helper functions
│   │
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
│
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**, **yarn**, or **bun**

### Installation

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   - Navigate to http://localhost:5173

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

---

## ⚙️ Configuration

### API Base URL

The API base URL is automatically configured based on the environment:

**Development:**
```typescript
// client/src/utils/api.ts
const API_BASE_URL = "http://localhost:3000/api/auth";
```

**Production:**
```typescript
const API_BASE_URL = "https://auth-setu-server.vercel.app/api/auth";
```

To change the API URL, edit `client/src/utils/api.ts`.

### Vite Configuration

The Vite config includes:
- React SWC plugin for fast compilation
- Path alias `@/` pointing to `./src`
- Proxy configuration for development

### TypeScript Configuration

- Path aliases: `@/*` → `./src/*`
- Relaxed settings for faster development
- Full type checking enabled

---

## 🧩 Components

### AuthLayout

Wrapper component for authentication pages with consistent branding and layout.

```tsx
<AuthLayout title="Welcome back" subtitle="Sign in to your account">
  {/* Page content */}
</AuthLayout>
```

### AuthInput

Form input component with label and error handling.

```tsx
<AuthInput
  label="Email"
  type="email"
  placeholder="you@example.com"
  error={errors.email?.message}
  {...register('email')}
/>
```

### AuthButton

Button component with loading states and variants.

```tsx
<AuthButton
  type="submit"
  isLoading={isLoading}
  variant="primary" // primary | secondary | destructive | ghost
>
  Sign in
</AuthButton>
```

### AuthAlert

Alert component for displaying messages.

```tsx
<AuthAlert
  type="error" // success | error | warning | info
  message="Invalid credentials"
/>
```

### ProtectedRoute

Route wrapper that protects pages from unauthenticated access.

```tsx
<ProtectedRoute>
  <Profile />
</ProtectedRoute>
```

---

## 📄 Pages

### Login (`/login`)

- Email and password authentication
- Form validation with Zod
- Redirects if already authenticated
- Link to forgot password and register

### Register (`/register`)

- Name, email, and password registration
- Password validation (min 8 characters)
- Redirects to email verification on success

### Verify Email (`/verify-email`)

- 6-digit code input
- Resend code functionality
- Redirects if already verified

### Forgot Password (`/forgot-password`)

- Email input for password reset
- Optional client URL configuration
- Success/error message display

### Reset Password (`/reset-password`)

- Token from URL query parameters
- New password and confirmation
- Password match validation
- Redirects to login on success

### Profile (`/`)

- Protected route
- Displays user information
- Logout functionality
- Link to delete account

### Delete Account (`/delete-account`)

- Protected route
- Warning message
- Confirmation before deletion
- Redirects to login after deletion

### NotFound (`*`)

- 404 page for invalid routes
- Toast notification
- Link back to home

---

## 🔄 State Management

### AuthContext

The authentication state is managed using React Context API.

**Available State:**
- `user` - Current user object
- `isLoading` - Loading state
- `isAuthenticated` - Authentication status

**Available Methods:**
- `login(email, password)` - User login
- `register(name, email, password)` - User registration
- `logout()` - User logout
- `deleteAccount()` - Delete user account
- `verifyEmail(code)` - Verify email with code
- `forgotPassword(email, clientUrl)` - Request password reset
- `resetPassword(token, password)` - Reset password
- `refreshUser()` - Refresh user data

**Usage:**
```tsx
import { useAuth } from '@/context/AuthContext';

const { user, isAuthenticated, login } = useAuth();
```

---

## 🌐 API Integration

### API Client

The API client is configured in `src/utils/api.ts` using Axios.

**Features:**
- Automatic cookie handling (`withCredentials: true`)
- Environment-based base URL
- Type-safe API methods

**Available Methods:**
```typescript
authApi.register(name, email, password)
authApi.login(email, password)
authApi.logout()
authApi.getMe()
authApi.deleteAccount()
authApi.verifyEmail(code)
authApi.forgotPassword(email, clientUrl)
authApi.resetPassword(token, password)
```

---

## 🎨 Styling

### TailwindCSS

The project uses TailwindCSS with a custom design system.

### Design System

**Colors:**
- `primary` - Main brand color
- `secondary` - Secondary background
- `destructive` - Error/danger actions
- `success` - Success messages
- `warning` - Warning messages
- `muted` - Muted text/backgrounds

### Dark Mode

The design system includes dark mode support via CSS variables. Dark mode can be enabled by adding the `dark` class to the root element.

### Custom Utilities

- `cn()` - Utility for merging Tailwind classes (from `lib/utils.ts`)

---

## 📦 Build & Deploy

### Build Commands

```bash
# Development build
npm run build:dev

# Production build
npm run build
```

### Deployment (Vercel)

1. **Connect Repository**
   - Import your GitHub repository to Vercel

2. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Environment Variables**
   - No environment variables needed for frontend

4. **Deploy**
   - Click "Deploy" and wait for build to complete

### Other Platforms

The built `dist` folder can be deployed to:
- **Netlify** - Drag and drop or Git integration
- **Cloudflare Pages** - Git integration
- **AWS S3** - Static website hosting
- **GitHub Pages** - Static site hosting

---

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Style

- Follow ESLint configuration
- Use TypeScript for all new files
- Follow existing component patterns
- Write meaningful component names

---

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**Module not found:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
# Restart TypeScript server in IDE
# Or run type check
npx tsc --noEmit
```

---

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Vite**

[Back to Main README](../README.md)

</div>
