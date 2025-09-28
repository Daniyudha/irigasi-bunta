# Fix Article Images Not Appearing on Server

The issue is that uploaded images in articles aren't accessible on the server, even though they work locally. This is likely due to file permission issues or Nginx configuration problems with serving static files.

## Immediate Diagnosis Steps

Run these commands on your server to check the current state:

### 1. Check Upload Directory Existence and Permissions
```bash
# Navigate to your project directory
cd /path/to/bunta-bella-irrigation

# Check if upload directories exist
ls -la public/uploads/

# Check permissions of upload directories
ls -la public/uploads/ -R

# Check if images exist in the uploads directory
find public/uploads/ -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" | head -10
```

### 2. Check Nginx Static File Serving
```bash
# Check your Nginx configuration
sudo cat /etc/nginx/sites-available/irigasibunta.com

# Test if static files are accessible via curl
curl -I https://irigasibunta.com/uploads/test-image.jpg
# Or if using HTTP:
curl -I http://irigasibunta.com/uploads/test-image.jpg
```

### 3. Check Application Logs
```bash
# Check PM2 logs for any errors
pm2 logs bunta-bella-irrigation

# Check if the application can access the uploads directory
pm2 restart bunta-bella-irrigation
```

## Quick Fix Solutions

### Solution 1: Fix Directory Permissions (Most Likely)
```bash
# Fix permissions recursively
sudo chmod -R 755 /path/to/bunta-bella-irrigation/public/uploads/
sudo chown -R $USER:www-data /path/to/bunta-bella-irrigation/public/uploads/  # Adjust user and group as needed

# Ensure the uploads directory exists with correct structure
mkdir -p public/uploads/{storage,news,gallery,sliders,media}
```

### Solution 2: Update Nginx Configuration
Edit your Nginx configuration at `/etc/nginx/sites-available/irigasibunta.com` and add explicit static file handling:

```nginx
server {
    listen 80;
    server_name localhost;

    # Upload size limits
    client_max_body_size 50M;
    client_body_timeout 60s;

    # Serve static files directly for better performance
    location /uploads/ {
        alias /path/to/bunta-bella-irrigation/public/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri $uri/ =404;
    }

    location / {
        proxy_pass http://localhost:3000;
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

Then test and restart Nginx:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

### Solution 3: Run the Upload Directory Fix Script
```bash
# Run the fix script manually
node scripts/fix-upload-directories.js

# Then restart the application
pm2 restart bunta-bella-irrigation
```

## Step-by-Step Fix Procedure

### Step 1: Verify the Problem
1. **Check browser console** for 404 errors on image requests
2. **Test direct image access** by visiting `https://irigasibunta.com/uploads/filename.jpg`
3. **Check server file system** to confirm images exist

### Step 2: Apply Permissions Fix
```bash
# Fix permissions (run from project root)
sudo chmod -R 755 public/uploads/
sudo chown -R $(whoami):www-data public/uploads/  # Adjust for your user and web server group

# Verify permissions
ls -la public/uploads/
```

### Step 3: Update Nginx Configuration
If the permissions fix doesn't work, add the static file handling to Nginx as shown above.

### Step 4: Test the Fix
1. **Restart services**:
   ```bash
   sudo systemctl restart nginx
   pm2 restart bunta-bella-irrigation
   ```

2. **Test image access** directly in browser
3. **Check if articles load** with images

## Common Issues and Solutions

### Issue 1: "404 Not Found" for images
- **Cause**: Nginx not serving static files or wrong file paths
- **Fix**: Add the static file location block to Nginx config

### Issue 2: "403 Forbidden" for images
- **Cause**: Incorrect file permissions
- **Fix**: Run `chmod -R 755 public/uploads/`

### Issue 3: Images exist but won't load
- **Cause**: Application path configuration issue
- **Fix**: Check if image URLs are correctly generated in the database

### Issue 4: Deployment didn't create upload directories
- **Cause**: The fix-upload-directories script didn't run
- **Fix**: Run it manually: `node scripts/fix-upload-directories.js`

## Verification Steps

After applying fixes, verify everything works:

1. **Upload a new image** through CKEditor in an article
2. **Check if it appears** in the editor and article view
3. **Verify the image file** exists on the server:
   ```bash
   ls -la public/uploads/news/  # Check news images
   ls -la public/uploads/media/ # Check media library images
   ```

4. **Test direct access** to an uploaded image URL

## Emergency Rollback

If the changes break something, revert the Nginx configuration:

```bash
# Restore original Nginx config
sudo cp /etc/nginx/sites-available/irigasibunta.com.backup /etc/nginx/sites-available/irigasibunta.com
sudo nginx -t
sudo systemctl restart nginx
```

The most likely solution is **Solution 1** (fixing permissions), as the deployment script should have created the directories, but permissions might be incorrect on the server.