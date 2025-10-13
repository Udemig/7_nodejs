# Quick Start Guide - Authentication Setup

This guide will help you get the authentication system up and running in 5 minutes.

## Step 1: Generate NextAuth Secret

Open PowerShell and run:

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Copy the output - you'll need it in Step 3.

## Step 2: Set Up MongoDB

### Option A: MongoDB Atlas (Recommended for beginners)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (select the free tier)
4. Wait for cluster to be created (2-3 minutes)
5. Click "Connect" → "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your database password
8. Add `/morent` before the `?` to name your database

Example:

```
mongodb+srv://user:password@cluster0.abcdef.mongodb.net/morent?retryWrites=true&w=majority
```

### Option B: Local MongoDB

If you have MongoDB installed locally:

```
mongodb://localhost:27017/morent
```

## Step 3: Create Environment File

Create a file named `.env.local` in the project root with this content:

```env
MONGODB_URI=your_mongodb_connection_string_from_step_2
NEXTAUTH_SECRET=your_generated_secret_from_step_1
NEXTAUTH_URL=http://localhost:3000
```

**Example:**

```env
MONGODB_URI=mongodb+srv://myuser:mypass123@cluster0.abcdef.mongodb.net/morent?retryWrites=true&w=majority
NEXTAUTH_SECRET=AbCdEf123456789+/aBcDeFgHiJkLmNoPqRsTuVwXyZ=
NEXTAUTH_URL=http://localhost:3000
```

## Step 4: Start the Development Server

```bash
npm run dev
```

Wait for the server to start, then open [http://localhost:3000](http://localhost:3000)

## Step 5: Test Authentication

### Register a New User

1. Click "Sign Up" in the header
2. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Phone: (optional)
   - Password: 123456
   - Confirm Password: 123456
3. Click "Create Account"
4. You should see a success message and be redirected to login

### Login

1. Enter your email: john@example.com
2. Enter your password: 123456
3. Click "Sign In"
4. You should be redirected to home page
5. Your profile picture should appear in the header

### Logout

1. Click your profile picture in the header
2. Click "Logout"
3. You should be logged out and see "Login" and "Sign Up" buttons again

## Troubleshooting

### ❌ "MONGODB_URI is not defined"

- Make sure your `.env.local` file exists in the project root
- Restart the development server after creating the file

### ❌ "MongoServerError: bad auth"

- Double-check your MongoDB password in the connection string
- Make sure you replaced `<password>` with your actual password

### ❌ "Unable to connect to database"

- If using MongoDB Atlas, whitelist your IP address:
  - Go to Network Access in Atlas
  - Click "Add IP Address"
  - Click "Allow Access from Anywhere" (for development)

### ❌ Authentication not working

- Clear your browser cookies
- Make sure `NEXTAUTH_SECRET` is set
- Restart the development server

### ❌ Toast notifications not showing

- Check browser console for errors
- Make sure you ran `npm install`

## Verify Setup

To verify everything is working:

1. ✅ Development server starts without errors
2. ✅ Home page loads at http://localhost:3000
3. ✅ "Login" and "Sign Up" buttons appear in header
4. ✅ Registration form loads at /auth/register
5. ✅ You can register a new user
6. ✅ You can login with registered credentials
7. ✅ Profile picture appears after login
8. ✅ Dropdown menu works
9. ✅ Logout works

## Next Steps

Once authentication is working:

1. Check your MongoDB database to see the registered user
2. Try registering multiple users
3. Test password validation (try passwords < 6 characters)
4. Test duplicate email prevention
5. Customize the profile picture by updating user.image in MongoDB

## Need Help?

- Read [ENV_SETUP.md](./ENV_SETUP.md) for detailed environment setup
- Check [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) for complete details
- Review [PRD.md](./PRD.md) for feature specifications

## MongoDB Atlas Tips

### View Your Data

1. In MongoDB Atlas, go to "Database"
2. Click "Browse Collections"
3. Find the "morent" database
4. Click on "users" collection
5. You'll see all registered users

### Connection Issues

- If you can't connect, go to "Network Access" and add your IP
- For development, you can allow access from anywhere (0.0.0.0/0)
- Remember to restrict this in production!

## Success! 🎉

If all tests pass, your authentication system is ready to use. You now have:

- User registration with MongoDB storage
- Secure password hashing
- Login/logout functionality
- Session management
- Responsive auth pages
- Protected routes support (for future use)

Happy coding! 🚀
