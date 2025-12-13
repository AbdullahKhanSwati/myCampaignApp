# Vercel Deployment Guide

## Prerequisites
1. Vercel account (sign up at vercel.com)
2. MongoDB Atlas cluster running
3. All environment variables ready

## Deployment Steps

### 1. Install Vercel CLI (optional but recommended)
```bash
npm i -g vercel
```

### 2. Set Environment Variables in Vercel
Go to your Vercel project → Settings → Environment Variables and add:
- `MONGO_URL` - Your MongoDB connection string
- `JWT_SECRET` - Your JWT secret key
- `EMAIL_USER` - Email for sending OTPs (if using)
- `EMAIL_PASS` - Email password (if using)
- `NODE_ENV` - Set to `production`

### 3. Deploy from Backend Folder
```bash
cd Backend
vercel
```

Or connect your GitHub repository to Vercel and deploy automatically.

## Important Notes

### ⚠️ File Uploads
Vercel serverless functions are **stateless** and have a **10-second execution limit** for free tier. File uploads to `/uploads` folder will **NOT persist**.

**Solutions:**
1. Use cloud storage (AWS S3, Cloudinary, etc.)
2. Process files immediately and store metadata only
3. Use Vercel Blob Storage (paid feature)

### 📁 Project Structure
- `Api/index.js` - Main serverless function entry point
- `vercel.json` - Vercel configuration
- All routes are under `/api/v1/`

### 🔗 API Endpoints
After deployment, your API will be available at:
- `https://your-project.vercel.app/api/v1/user/...`
- `https://your-project.vercel.app/api/v1/campaign/...`
- etc.

### 🧪 Testing
1. Test root endpoint: `https://your-project.vercel.app/`
2. Test API: `https://your-project.vercel.app/api/v1/user/login`

## Troubleshooting

### Database Connection Issues
- Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0` (all IPs)
- Check MONGO_URL is correct in Vercel environment variables
- Verify cluster is not paused

### Function Timeout
- Large file uploads may timeout (>10s)
- Consider using background jobs or cloud storage

### CORS Issues
- CORS is already configured to allow all origins
- If issues persist, check frontend BaseUrl.js points to correct Vercel URL

