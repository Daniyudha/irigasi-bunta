# Critical Permission Fix for Image Access

The error logs show "Permission denied" because Nginx (running as `www-data` user) cannot access files in the `/root` directory. The `/root` directory has strict permissions (typically `700`) that only allow the root user to access it. This is a security feature, but it prevents web servers from serving files from within `/root`.

## Root Cause
- Your application is located in `/root/fauzi-ridwan/irigasi-bunta/`
- Nginx runs as user `www-data` and group `www-data`
- The `/root` directory is only accessible by the root user (`drwx------` permissions)
- Even though your uploads directory has `755` permissions, `www-data` cannot traverse the `/root` path to reach the files

## Solution 1: Move the Application (Recommended)

### Step 1: Stop the Application
```bash
pm2 stop bunta-bella-irrigation
```

### Step 2: Move the Application to a Proper Directory
```bash
# Create a proper web directory
sudo mkdir -p /var/www/irigasi-bunta

# Move the entire application
sudo mv /root/fauzi-ridwan/irigasi-bunta/* /var/www/irigasi-bunta/
sudo mv /root/fauzi-ridwan/irigasi-bunta/.* /var/www/irigasi-bunta/ 2>/dev/null || true

# Set proper ownership
sudo chown -R root:www-data /var/www/irigasi-bunta
sudo chmod -R 755 /var/www/irigasi-bunta
```

### Step 3: Update Nginx Configuration
Edit `/etc/nginx/sites-available/bunta-bella-irrigation`:
```nginx
server {
    listen 80;
    server_name irigasibunta.com www.irigasibunta.com;

    client_max_body_size 50M;
    client_body_timeout 60s;

    location /uploads/ {
        alias /var/www/irigasi-bunta/public/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri $uri/ =404;
        
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

### Step 4: Update PM2 Configuration
```bash
# Navigate to the new directory
cd /var/www/irigasi-bunta

# Delete the old PM2 process
pm2 delete bunta-bella-irrigation

# Start a new PM2 process from the new location
pm2 start ecosystem.config.js
pm2 save
```

### Step 5: Restart Nginx
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## Solution 2: Quick Fix with Symbolic Link (Temporary)

If you cannot move the application immediately, try this temporary fix:

### Step 1: Create a Symbolic Link in a Accessible Directory
```bash
# Create a directory that www-data can access
sudo mkdir -p /var/www/uploads

# Create symbolic links for all uploads
sudo ln -s /root/fauzi-ridwan/irigasi-bunta/public/uploads/* /var/www/uploads/ 2>/dev/null || true

# Set proper permissions
sudo chown -R www-data:www-data /var/www/uploads
sudo chmod -R 755 /var/www/uploads
```

### Step 2: Update Nginx Configuration
Edit `/etc/nginx/sites-available/bunta-bella-irrigation`:
```nginx
server {
    listen 80;
    server_name irigasibunta.com www.irigasibunta.com;

    client_max_body_size 50M;
    client_body_timeout 60s;

    location /uploads/ {
        alias /var/www/uploads/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri $uri/ =404;
        
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

### Step 3: Restart Nginx
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## Solution 3: Change Upload Directory Path (Application-Level Fix)

Modify your application to save uploads to a directory outside `/root`:

### Step 1: Create a New Upload Directory
```bash
sudo mkdir -p /var/www/irigasi-bunta-uploads
sudo chown -R $USER:www-data /var/www/irigasi-bunta-uploads
sudo chmod -R 755 /var/www/irigasi-bunta-uploads
```

### Step 2: Update Your Application Code
Modify the upload path in your API routes (e.g., `src/app/api/admin/media/route.ts` and `src/app/api/storage/route.ts`) to use the new path:

```typescript
// Change from:
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

// To:
const uploadDir = '/var/www/irigasi-bunta-uploads';
```

### Step 3: Update Nginx Configuration
Use the same Nginx configuration as Solution 2, but point to the new directory.

## Verification Steps

After applying any solution:

1. **Test image access:**
   ```bash
   curl -I https://irigasibunta.com/uploads/news-1758788717912.jpg
   ```

2. **Check browser console** for errors

3. **Verify articles load** with images

4. **Test new image uploads** through CKEditor

## Security Notes

- **Solution 1 (moving the application) is the most secure and recommended**
- Never run web applications from `/root` in production
- Always use proper web directories like `/var/www/`
- Ensure file permissions are correct (755 for directories, 644 for files)

## Emergency Rollback

If anything goes wrong, you can restore the original state:

```bash
# Stop PM2
pm2 stop bunta-bella-irrigation

# Revert Nginx configuration
sudo cp /etc/nginx/sites-available/bunta-bella-irrigation.backup /etc/nginx/sites-available/bunta-bella-irrigation

# Restart Nginx
sudo nginx -t
sudo systemctl restart nginx

# Start PM2 from original location
cd /root/fauzi-ridwan/irigasi-bunta
pm2 start ecosystem.config.js
```

I strongly recommend **Solution 1** as it follows security best practices and will prevent future issues.