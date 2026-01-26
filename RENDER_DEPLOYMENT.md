# Render.com Deployment Guide

## Overview
Deploy your Gaborone Reserve API to Render.com for **free** with automatic GitHub integration.

## Prerequisites
- GitHub account with your repository pushed
- Render.com account (https://render.com)
- No credit card needed for free tier

## Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with GitHub (allows automatic repo access)
3. Create new account

## Step 2: Create Web Service

1. Dashboard → **"New +"** → **"Web Service"**
2. Select **"Connect a repository"**
3. Search for `gaborone-reserve-backend` repository
4. Click **"Connect"**

### Configure Service

| Setting | Value |
|---------|-------|
| **Name** | gaborone-reserve-api |
| **Environment** | Node |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `node dist/index.js` |
| **Plan** | Free |

5. Click **"Create Web Service"**

## Step 3: Create PostgreSQL Database

1. Dashboard → **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name**: gaborone-reserve-db
   - **Database**: gaborone_reserve
   - **User**: postgres
   - **Region**: Same as your service (e.g., us-east)
   - **Plan**: Free

3. Click **"Create Database"**

## Step 4: Connect Database to Web Service

1. Go to your **gaborone-reserve-api** service
2. **Environment** tab
3. Add environment variable:
   - **Key**: `DATABASE_URL`
   - **Value**: Copy from PostgreSQL service details page (connection string)

Alternative: Copy these variables individually:
```
DB_HOST=your-db-host.render.com
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your-password
DB_NAME=gaborone_reserve
```

## Step 5: Add Other Environment Variables

In your web service **Environment** tab, add:

### Security
```
NODE_ENV=production
JWT_SECRET=generate-a-strong-random-32-character-string
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
```

### API Configuration
```
PORT=3000
API_VERSION=v1
APP_NAME=Gaborone Reserve API
```

### CORS
```
ALLOWED_ORIGINS=https://your-frontend-url.com
```

### Email (Optional)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### SMS (Optional)
```
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_PHONE_NUMBER=+1234567890
```

## Step 6: Deploy

1. Click **"Deploy"** in your web service
2. Watch the build logs
3. Once deployed, your API will be available at:
   ```
   https://gaborone-reserve-api.onrender.com
   ```

## Step 7: Run Database Migrations

### Option A: Using Render Shell

1. Go to your service
2. Click **"Shell"** tab
3. Run:
```bash
npm run migration:run
npm run seed  # optional
```

### Option B: Using Render CLI (Advanced)
```bash
# Install Render CLI
npm install -g @render/cli

# Login
render login

# Connect to your service
render connect gaborone-reserve-api

# Run migrations
npm run migration:run
```

## Step 8: Verify Deployment

1. Test your API:
```bash
curl https://gaborone-reserve-api.onrender.com/health
```

2. Should return:
```json
{
  "status": "ok",
  "timestamp": "2024-01-26T10:30:00Z"
}
```

## Automatic Deployments

Every time you push to GitHub:
1. Render detects the change
2. Automatically triggers a build
3. Deploys new version within 2-3 minutes
4. You can monitor in **Deployments** tab

## Update Your Flutter App

In `lib/services/api_service.dart` or your config:

```dart
static const String baseUrl = 'https://gaborone-reserve-api.onrender.com/api';
```

## Free Tier Limitations

⚠️ **Important for Free Plan:**

- **Web Service**: Spins down after 15 minutes of inactivity
  - First request after idle will be slow (~30 seconds)
  - Subsequent requests are fast
  - Perfect for testing/development
  
- **PostgreSQL**: Free tier has limits
  - 90 GB storage (plenty for testing)
  - Good for 10-100 users
  
- **No support for**: Custom domains on free plan (use .onrender.com)

**For 10 test users**: This is perfect and completely free!

## Upgrading Later

When you need paid features:
- **Paid Web**: $7/month (always-on, no spinning down)
- **Paid Database**: $15/month (better performance)
- **Custom domain**: Requires upgrade

But for testing, free tier works great.

## Monitoring

### View Logs
1. Service → **Logs** tab
2. Real-time logs of all requests and errors

### View Metrics
1. Service → **Metrics** tab
2. CPU, memory, network usage
3. Request count

## Troubleshooting

### Build Fails
Check **Logs** tab for errors:
- Ensure `npm run build` works locally
- Check all dependencies installed

### Database Connection Fails
1. Verify `DATABASE_URL` is set correctly
2. Check PostgreSQL service status (green)
3. Ensure service is redeployed after adding DB

### Service Spins Down
This is normal on free plan. Just access it again to wake it up.

### Slow Initial Response
Free tier service auto-sleeps. First request wakes it (30 sec). Normal.

## Tips for Testing

1. **Keep services running**: Click "Keep awake" toggle to prevent spin-down during intense testing
2. **Monitor costs**: Even paid plans are cheap - upgrade when ready
3. **Backup data**: Export PostgreSQL before deleting
4. **Test migration**: Run migration commands before pushing to production

## Production Readiness

When you're ready for production:

1. **Upgrade to Paid**:
   - Web Service: $7/month (always-on)
   - PostgreSQL: $15/month (better performance)
   
2. **Add Custom Domain**:
   - Settings → Domains
   - Verify DNS records
   - Free SSL certificate included

3. **Enable Backups**:
   - PostgreSQL settings
   - Automatic daily backups

4. **Monitor Health**:
   - Set up alerts
   - Monitor error rates
   - Track response times

## Resources

- [Render Documentation](https://render.com/docs)
- [PostgreSQL on Render](https://render.com/docs/databases)
- [Deploying Node.js](https://render.com/docs/deploy-node-express-app)
- [Native Environments](https://render.com/docs/infrastructure)

---

**Total Cost for 10 Test Users: $0** ✅
