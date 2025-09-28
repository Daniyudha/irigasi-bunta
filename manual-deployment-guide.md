# Manual Deployment Guide for Bunta-Bella Irrigation

Complete step-by-step manual deployment without using ecosystem.config.js. This guide starts from a clean slate.

## Step 1: Complete Cleanup of Existing Deployment

### Stop and Remove PM2 Processes
```bash
# Stop all PM2 processes
pm2 stop all

# Delete all PM2 processes
pm2 delete all

# Clear PM2 logs
pm2 flush
```

### Remove Application Files
```bash
# Remove application from /var/www
sudo rm -rf /var/www/irigasi-bunta

# Remove any remnants from /root
sudo rm -rf /root/fauzi-ridwan/irigasi-bunta

# Clean up any temporary files
sudo rm -rf /tmp/irigasi-bunta-*
```

### Reset Nginx Configuration
```bash
# Backup current config
sudo cp /etc/nginx/sites-available/bunta-bella-irrigation /etc/nginx/sites-available/bunta-bella-irrigation.backup

# Create simple Nginx config
sudo nano /etc/nginx/sites-available/bunta-bella-irrigation
```

**Paste this basic configuration:**
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

## Step 2: Set Up Directory Structure with Correct Permissions

### Create Web Directory
```bash
# Create directory
sudo mkdir -p /var/www/irigasi-bunta

# Set ownership to your user and www-data group
sudo chown -R $USER:www-data /var/www/irigasi-bunta

# Set correct permissions
sudo chmod -R 755 /var/www/irigasi-bunta

# Navigate to directory
cd /var/www/irigasi-bunta
```

## Step 3: Deploy Application Files

### Upload Complete Project
Upload your entire project to `/var/www/irigasi-bunta/` including:
- All source files
- `package.json` and `package-lock.json`
- `.env` file with correct database credentials
- `prisma` directory
- `scripts` directory
- Everything else from your local project

### Verify File Structure
```bash
# Check if all files are present
ls -la /var/www/irigasi-bunta/

# Important files that must exist:
# - .env
# - package.json
# - prisma/schema.prisma
# - next.config.ts
# - src/ directory
```

## Step 4: Manual Deployment Process

### Clean Any Existing Build Files
```bash
# Navigate to project directory
cd /var/www/irigasi-bunta

# Remove node_modules and build files if they exist
rm -rf node_modules
rm -rf .next
rm -rf dist
rm -rf build
```

### Install Dependencies
```bash
npm install
```

### Set Up Database
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Verify database connection
npx prisma db push
```

### Create Upload Directories
```bash
# Run the upload directory script
node scripts/fix-upload-directories.js

# Verify directories were created
ls -la public/uploads/
```

### Build the Application
```bash
npm run build
```

### Seed the Database
```bash
npm run seed
```

## Step 5: Manual PM2 Setup

### Start Application with PM2 Manually
```bash
# Start the application on port 3001
pm2 start npm --name "bunta-bella-irrigation" -- start -- --port 3001

# Alternative method if above doesn't work:
# pm2 start "npm run start" --name "bunta-bella-irrigation" -- --port 3001

# Or specify the full path to npm:
# pm2 start /usr/bin/npm --name "bunta-bella-irrigation" -- start -- --port 3001
```

### Configure PM2 to Start on Boot
```bash
# Save PM2 process list
pm2 save

# Set up PM2 to start on system boot
pm2 startup

# Follow the instructions provided by pm2 startup
```

### Verify PM2 Status
```bash
# Check if application is running
pm2 status

# View application logs
pm2 logs bunta-bella-irrigation

# Monitor application in real-time
pm2 monit
```

## Step 6: Final Nginx Configuration with Static File Support

### Update Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/bunta-bella-irrigation
```

**Replace with this complete configuration:**
```nginx
server {
    listen 80;
    server_name irigasibunta.com www.irigasibunta.com;

    # Upload size limits
    client_max_body_size 50M;
    client_body_timeout 60s;

    # Static file handling for uploads - CRITICAL FOR IMAGES
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

    # Proxy all other requests to Next.js application
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
        
        # Timeout settings for large uploads
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

### Apply Nginx Changes
```bash
# Test configuration
sudo nginx -t

# If test passes, restart Nginx
sudo systemctl restart nginx

# Check Nginx status
sudo systemctl status nginx
```

## Step 7: Final Permissions and Verification

### Set Final Permissions
```bash
# Ensure correct ownership
sudo chown -R $USER:www-data /var/www/irigasi-bunta

# Set directory permissions
sudo find /var/www/irigasi-bunta -type d -exec chmod 755 {} \;

# Set file permissions
sudo find /var/www/irigasi-bunta -type f -exec chmod 644 {} \;

# Special permissions for uploads directory
sudo chmod -R 755 /var/www/irigasi-bunta/public/uploads/
```

### Test Application Access
```bash
# Test if application is responding
curl -I http://localhost:3001

# Test Nginx proxy
curl -I http://irigasibunta.com
```

### Test Image Upload Functionality
1. **Access your website**: https://irigasibunta.com
2. **Log in to admin panel**
3. **Create a news article**
4. **Upload an image via CKEditor**
5. **Verify the image appears in the editor**

### Test Static File Access
```bash
# First, upload an image through the application, then test:
curl -I https://irigasibunta.com/uploads/filename.jpg
```

## Step 8: Troubleshooting Common Issues

### If Application Won't Start
```bash
# Check PM2 logs
pm2 logs bunta-bella-irrigation

# Check if port 3001 is available
netstat -tulpn | grep 3001

# Test running the application directly
cd /var/www/irigasi-bunta
npm start
```

### If Images Still Don't Load
```bash
# Check Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Verify static file path accessibility
sudo -u www-data ls -la /var/www/irigasi-bunta/public/uploads/

# Test file permissions
sudo -u www-data cat /var/www/irigasi-bunta/public/uploads/test-file.txt
```

### If Database Connection Fails
```bash
# Test database connection
npx prisma db push

# Check MySQL service
sudo systemctl status mysql

# Verify .env file has correct credentials
cat .env | grep DATABASE_URL
```

### If PM2 Doesn't Work
```bash
# Alternative: Use nohup to run the application
cd /var/www/irigasi-bunta
nohup npm start > app.log 2>&1 &

# Or use screen/tmux for persistent session
screen -S irigasi-app
npm start
# Press Ctrl+A then D to detach
```

## Step 9: Final Verification Checklist

- [ ] Application responds on port 3001
- [ ] Nginx proxies correctly to the application
- [ ] Admin login works
- [ ] CKEditor image upload works
- [ ] Uploaded images display in articles
- [ ] Static files are served directly by Nginx
- [ ] PM2 process is running and persistent
- [ ] All permissions are correct

## Emergency Commands

### Restart Everything
```bash
# Restart application
pm2 restart bunta-bella-irrigation

# Restart Nginx
sudo systemctl restart nginx

# Restart database if needed
sudo systemctl restart mysql
```

### Complete Reset if Needed
```bash
# Stop everything
pm2 stop all
pm2 delete all
sudo systemctl stop nginx

# Restart from Step 5 (PM2 setup)
cd /var/www/irigasi-bunta
pm2 start npm --name "bunta-bella-irrigation" -- start -- --port 3001
pm2 save
sudo systemctl start nginx
```

This manual deployment should resolve all previous issues and get your application running correctly with proper static file handling.