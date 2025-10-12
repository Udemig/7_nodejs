# Product Requirements Document (PRD)

## Authentication System for MORENT Car Rental

### 1. Overview

Implement a complete authentication workflow using NextAuth.js to allow users to register, login, and logout from the MORENT car rental application.

### 2. Objectives

- Enable user registration with email and password
- Enable user login with credentials
- Store user data securely in MongoDB
- Display appropriate UI based on authentication state
- Maintain consistent design language with existing application

### 3. Technical Stack

- **Authentication**: NextAuth.js v5 (next-auth)
- **Database**: MongoDB with Mongoose ODM
- **Password Hashing**: bcryptjs
- **Session Management**: JWT tokens via NextAuth

### 4. User Data Model

Users collection in MongoDB will store:

- `email` (string, required, unique)
- `password` (string, required, hashed)
- `firstName` (string, required)
- `lastName` (string, required)
- `phone` (string, optional)
- `image` (string, optional) - for profile picture URL
- `createdAt` (date, auto-generated)
- `updatedAt` (date, auto-generated)

### 5. Features & Requirements

#### Phase 1: Database & Models Setup

- [ ] Install required dependencies (next-auth, mongoose, bcryptjs, @types/bcryptjs)
- [ ] Create MongoDB connection utility
- [ ] Create User Mongoose model with schema validation
- [ ] Set up environment variables for MongoDB connection

#### Phase 2: NextAuth Configuration

- [ ] Configure NextAuth with CredentialsProvider
- [ ] Set up JWT session strategy
- [ ] Create authentication API routes
- [ ] Configure session callbacks for user data

#### Phase 3: Registration System

- [ ] Create `/api/auth/register` endpoint
- [ ] Hash passwords before storing in database
- [ ] Validate email uniqueness
- [ ] Create registration page at `/auth/register`
- [ ] Implement responsive registration form with fields:
  - Email (required)
  - Password (required)
  - First Name (required)
  - Last Name (required)
  - Phone (optional)
- [ ] Add form validation and error handling
- [ ] Show success message and redirect to login

#### Phase 4: Login System

- [ ] Create login page at `/auth/login`
- [ ] Implement responsive login form with fields:
  - Email
  - Password
- [ ] Handle authentication via NextAuth signIn
- [ ] Display error messages for invalid credentials
- [ ] Redirect to home page after successful login

#### Phase 5: Header Integration

- [ ] Wrap application with SessionProvider
- [ ] Update header.tsx to use useSession hook
- [ ] Show "Login" and "Sign Up" links when user is not authenticated
- [ ] Show user profile picture when authenticated
- [ ] Add dropdown menu on profile picture with user info and logout option

#### Phase 6: Logout Functionality

- [ ] Implement logout using NextAuth signOut
- [ ] Clear session data
- [ ] Redirect to home page after logout

### 6. UI/UX Requirements

- Design should match existing MORENT brand colors:
  - Primary blue: #3563E9
  - Background: white
  - Text: gray-900, gray-600
- Forms should be:
  - Responsive (mobile-first approach)
  - Clean and modern
  - Include proper validation feedback
  - Show loading states during submission
- Error messages should be user-friendly
- Success states should be clearly indicated

### 7. Security Requirements

- Passwords must be hashed using bcryptjs (salt rounds: 10)
- Implement CSRF protection via NextAuth
- Use secure session cookies
- Validate all inputs on both client and server side
- Implement rate limiting for authentication endpoints (future enhancement)

### 8. File Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/
│   │       │   └── route.ts
│   │       └── register/
│   │           └── route.ts
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
├── components/
│   └── auth/
│       ├── login-form.tsx
│       ├── register-form.tsx
│       └── user-dropdown.tsx
├── lib/
│   ├── mongodb.ts
│   └── auth.ts
└── models/
    └── user.ts
```

### 9. Environment Variables

Required environment variables:

```
MONGODB_URI=mongodb://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generated-secret>
```

### 10. Success Criteria

- Users can successfully register with all required fields
- Users can login with email and password
- Users can logout
- Header displays correct UI based on auth state
- All pages are responsive and match design
- Passwords are securely hashed in database
- Sessions persist across page refreshes
- Form validation works correctly

### 11. Future Enhancements (Out of Scope)

- OAuth providers (Google, GitHub)
- Email verification
- Password reset functionality
- Two-factor authentication
- Profile editing
- Role-based access control
