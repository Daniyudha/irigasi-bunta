# Nginx Configuration Template for Image Upload Fix

Since you're using Nginx Proxy Manager for HTTPS, here's the exact configuration you need for your backend Nginx at `/etc/nginx/sites-available/irigasibunta.com`:

## Backend Nginx Configuration (HTTP Only)

```nginx
server {
    listen 80;
    server_name localhost;

    # Upload size limits - CRITICAL FOR FIXING 413 ERRORS
    client_max_body_size 50M;
    client_body_timeout 60s;
    client_header_timeout 60s;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

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
        
        # Additional proxy settings for large uploads
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }
}
```

## Nginx Proxy Manager Custom Configuration

In Nginx Proxy Manager web interface (usually `http://your-server-ip:81`), edit your proxy host for `irigasibunta.com` and add this to the "Advanced" tab:

```nginx
# Custom Nginx configuration for large file uploads
client_max_body_size 50M;
client_body_timeout 60s;
proxy_connect_timeout 60s;
proxy_send_timeout 60s;
proxy_read_timeout 60s;

# Buffer settings for large requests
proxy_buffer_size 128k;
proxy_buffers 4 256k;
proxy_busy_buffers_size 256k;

# Ensure proper headers are passed
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

## Step-by-Step Application Commands

### 1. Update Backend Nginx Configuration
```bash
# Backup current configuration
sudo cp /etc/nginx/sites-available/irigasibunta.com /etc/nginx/sites-available/irigasibunta.com.backup

# Edit the configuration file
sudo nano /etc/nginx/sites-available/irigasibunta.com

# Replace the entire content with the configuration above
# Save and exit (Ctrl+X, Y, Enter)

# Test the configuration
sudo nginx -t

# If test passes, restart Nginx
sudo systemctl restart nginx
```

### 2. Update Nginx Proxy Manager Configuration
1. Log in to Nginx Proxy Manager at `http://your-server-ip:81`
2. Edit your proxy host for `irigasibunta.com`
3. Go to "Advanced" tab
4. Paste the custom configuration above
5. Save and apply changes

### 3. Restart Both Services
```bash
# Restart backend Nginx
sudo systemctl restart nginx

# Restart Nginx Proxy Manager
docker restart nginx-proxy-manager-app-1
```

### 4. Verify the Configuration
```bash
# Check if client_max_body_size is set correctly
sudo grep -r "client_max_body_size" /etc/nginx/

# Check Nginx status
sudo systemctl status nginx

# Check Nginx Proxy Manager logs
docker logs nginx-proxy-manager-app-1 | tail -10
```

### 5. Test the Fix
```bash
# Test with a small file (bypassing proxy)
curl -X POST -F "file=@small-test-image.jpg" http://localhost:3000/api/storage

# Check application logs for errors
pm2 logs bunta-bella-irrigation
```

## Expected Results
After applying these configurations:
- Image uploads up to 50MB should work
- No more "413 Content Too Large" errors
- Both Nginx Proxy Manager and backend Nginx will handle large file uploads properly

## Troubleshooting
If you still get errors, check:
1. Both configurations have `client_max_body_size 50M;`
2. Both services are restarted
3. File permissions in upload directories are correct
4. Browser cache is cleared

Run this command to check current upload directory permissions:
```bash
sudo chmod -R 755 /path/to/your/project/public/uploads/
```

The key is that **both** Nginx Proxy Manager and your backend Nginx must have the same `client_max_body_size` setting.