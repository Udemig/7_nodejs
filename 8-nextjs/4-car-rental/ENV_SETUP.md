# Environment Variables Setup

This document explains how to set up the required environment variables for the MORENT car rental application.

## Required Environment Variables

Create a `.env.local` file in the root directory of the project with the following variables:

```env
# MongoDB Connection String
# Get this from your MongoDB Atlas dashboard or local MongoDB instance
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority

# NextAuth Configuration
# Generate a secret by running: openssl rand -base64 32
NEXTAUTH_SECRET=your-super-secret-key-here

# Application URL
# For development use http://localhost:3000
# For production use your actual domain
NEXTAUTH_URL=http://localhost:3000
```

## How to Get These Values

### 1. MongoDB URI

**Option A: MongoDB Atlas (Cloud)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster or use an existing one
4. Click "Connect" on your cluster
5. Choose "Connect your application"
6. Copy the connection string
7. Replace `<password>` with your database user password
8. Replace `<database>` with your desired database name (e.g., `morent`)

**Option B: Local MongoDB**

```
MONGODB_URI=mongodb://localhost:27017/morent
```

### 2. NextAuth Secret

Generate a secure random secret by running one of these commands:

**On macOS/Linux:**

```bash
openssl rand -base64 32
```

**On Windows (PowerShell):**

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Or use an online generator:**
Visit [generate-secret.vercel.app](https://generate-secret.vercel.app/32)

### 3. NextAuth URL

- **Development:** `http://localhost:3000`
- **Production:** Your actual domain (e.g., `https://morent.com`)

## Example Configuration

Here's a complete example:

```env
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.abcdef.mongodb.net/morent?retryWrites=true&w=majority
NEXTAUTH_SECRET=super-secret-random-string-generated-by-openssl-or-other-tool
NEXTAUTH_URL=http://localhost:3000
```

## Testing Your Setup

After creating your `.env.local` file:

1. Restart your development server
2. Try registering a new user at `/auth/register`
3. Check MongoDB to verify the user was created
4. Try logging in with your credentials
5. Verify you can see your profile picture and logout

## Troubleshooting

### MongoDB Connection Issues

- Ensure your IP address is whitelisted in MongoDB Atlas
- Verify your database user credentials are correct
- Check that the database name in the URI matches

### Authentication Not Working

- Verify `NEXTAUTH_SECRET` is set
- Ensure `NEXTAUTH_URL` matches your development URL
- Clear browser cookies and try again

### Environment Variables Not Loading

- Restart your Next.js development server after changing `.env.local`
- Ensure the file is named exactly `.env.local` (not `.env` or `env.local`)
- Check that `.env.local` is in the project root directory
