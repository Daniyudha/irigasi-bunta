# Complete Redeployment Guide for Bunta-Bella Irrigation

Since the application is not running after moving to `/var/www`, let's perform a clean redeployment from scratch. This will ensure all permissions, configurations, and dependencies are set up correctly.

## Step 1: Stop and Clean Up Current Deployment

### Stop PM2 Processes
```bash
# Stop all PM2 processes
pm2 stop all
pm2 delete all
```

### Remove Old Application Files
```bash
# Remove the application from /var/www if it exists
sudo rm -rf /var/www/irigasi-bunta

# Also clean up any remnants from /root if needed
sudo rm -rf /root/fauzi-ridwan/irigasi-bunta
```

### Reset Nginx Configuration
```bash
# Backup current Nginx config
sudo cp /etc/nginx/sites-available/bunta-bella-irrigation /etc/nginx/sites-available/bunta-bella-irrigation.backup

# Restore simple Nginx configuration
sudo nano /etc/nginx/sites-available/bunta-bella-irrigation
```

**Use this basic configuration:**
```nginx
server {
    listen 80;
    server_name irigasibunta.com www.irigasibunta.com;

    # Upload size limits
    client_max_body_size 50M;
    client_body_timeout 60s;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```

## Step 2: Set Up Proper Directory Structure

### Create Web Directory with Correct Permissions
```bash
# Create the web directory
sudo mkdir -p /var/www/irigasi-bunta

# Set ownership to your user and www-data group
sudo chown -R $USER:www-data /var/www/irigasi-bunta
sudo chmod -R 755 /var/www/irigasi-bunta

# Navigate to the directory
cd /var/www/irigasi-bunta
```

## Step 3: Deploy the Application

### Option A: If you have the code locally (recommended)
1. **Upload the entire project** from your local machine to `/var/www/irigasi-bunta/`
2. **Use SCP or SFTP** to transfer all files
3. **Ensure all hidden files** (like `.env`) are included

### Option B: If you need to clone from repository
```bash
# Clone the repository (if using Git)
git clone <your-repository-url> /var/www/irigasi-bunta
cd /var/www/irigasi-bunta

# Set proper permissions again after cloning
sudo chown -R $USER:www-data /var/www/irigasi-bunta
sudo chmod -R 755 /var/www/irigasi-bunta
```

## Step 4: Environment Configuration

### Set Up Environment Variables
```bash
# Ensure .env file exists with correct database configuration
nano .env
```

**Sample .env content:**
```env
DATABASE_URL="mysql://username:password@localhost:3306/irigasi_bunta"
NEXTAUTH_URL="https://irigasibunta.com"
NEXTAUTH_SECRET="your-secret-key"
```

### Install Dependencies
```bash
cd /var/www/irigasi-bunta
npm install
```

## Step 5: Database Setup

### Generate Prisma Client
```bash
npx prisma generate
```

### Run Database Migrations
```bash
npx prisma migrate deploy
```

## Step 6: Build the Application

### Create Upload Directories
```bash
# Run the upload directory fix script
node scripts/fix-upload-directories.js
```

### Build the Next.js Application
```bash
npm run build
```

## Step 7: Seed the Database

### Run Comprehensive Seed Script
```bash
npm run seed
```

## Step 8: Configure PM2

### Create or Update PM2 Ecosystem File
Ensure `ecosystem.config.js` exists with correct configuration:

```javascript
module.exports = {
  apps: [{
    name: 'bunta-bella-irrigation',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/irigasi-bunta',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
};
```

### Start PM2 Process
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Step 9: Final Nginx Configuration

### Update Nginx with Static File Handling
```bash
sudo nano /etc/nginx/sites-available/bunta-bella-irrigation
```

**Final Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name irigasibunta.com www.irigasibunta.com;

    # Upload size limits
    client_max_body_size 50M;
    client_body_timeout 60s;

    # Static file handling for uploads
    location /uploads/ {
        alias /var/www/irigasi-bunta/public/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri $uri/ =404;
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
    }

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```

## Step 10: Verification and Testing

### Check Application Status
```bash
pm2 status
pm2 logs bunta-bella-irrigation
```

### Test Image Uploads
1. **Log in to admin panel**
2. **Create a news article**
3. **Upload an image via CKEditor**
4. **Verify the image appears in the editor**

### Test Static File Serving
```bash
# Upload a test image first, then test access
curl -I https://irigasibunta.com/uploads/test-image.jpg
```

## Step 11: Final Permissions Check

### Verify Directory Permissions
```bash
ls -la /var/www/irigasi-bunta/public/uploads/
ls -la /var/www/irigasi-bunta/ -R
```

### Fix Any Permission Issues
```bash
sudo chown -R $USER:www-data /var/www/irigasi-bunta
sudo chmod -R 755 /var/www/irigasi-bunta
sudo find /var/www/irigasi-bunta/public/uploads/ -type f -exec chmod 644 {} \;
```

## Troubleshooting Common Issues

### If Application Still Won't Start
```bash
# Check PM2 logs
pm2 logs bunta-bella-irrigation

# Check if port 3001 is in use
netstat -tulpn | grep 3001

# Test the application directly
cd /var/www/irigasi-bunta
npm start
```

### If Images Still Don't Load
```bash
# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Verify static file path
ls -la /var/www/irigasi-bunta/public/uploads/

# Test file access as www-data
sudo -u www-data ls -la /var/www/irigasi-bunta/public/uploads/
```

### If Database Connection Fails
```bash
# Test database connection
npx prisma db push

# Check database service
sudo systemctl status mysql
```

## Complete Redeployment Script

You can create a script to automate this process:

```bash
#!/bin/bash
# save as redeploy.sh

echo "Starting complete redeployment..."

# Step 1: Clean up
pm2 stop all
pm2 delete all
sudo rm -rf /var/www/irigasi-bunta

# Step 2: Set up directory
sudo mkdir -p /var/www/irigasi-bunta
sudo chown -R $USER:www-data /var/www/irigasi-bunta
sudo chmod -R 755 /var/www/irigasi-bunta

# Step 3: Copy your application files here manually
echo "Please copy your application files to /var/www/irigasi-bunta"
echo "Then run the following commands:"
echo "cd /var/www/irigasi-bunta"
echo "npm install"
echo "npx prisma generate"
echo "npx prisma migrate deploy"
echo "node scripts/fix-upload-directories.js"
echo "npm run build"
echo "npm run seed"
echo "pm2 start ecosystem.config.js"
echo "sudo systemctl restart nginx"
```

This comprehensive guide should resolve all issues and get your application running properly with correct permissions and configuration.