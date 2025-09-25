# Fix Image Upload Issue - Immediate Steps

Since you're using Nginx Proxy Manager for HTTPS, the upload size limit needs to be configured there. Here are the immediate steps to fix the 413 error:

## Step 1: Configure Nginx Proxy Manager (Most Important)

1. **Log in to Nginx Proxy Manager** (usually at `http://your-server-ip:81`)
2. **Edit your proxy host** for `irigasibunta.com`
3. **Go to the "Advanced" tab**
4. **Add this custom Nginx configuration**:

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

5. **Save the configuration**

## Step 2: Update Backend Nginx Configuration

Since you're using HTTP only, update your backend Nginx configuration at `/etc/nginx/sites-available/irigasibunta.com`:

```bash
sudo nano /etc/nginx/sites-available/irigasibunta.com
```

Use this configuration:

```nginx
server {
    listen 80;
    server_name localhost;

    # Upload size limits - MUST match Nginx Proxy Manager
    client_max_body_size 50M;
    client_body_timeout 60s;

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

Test and restart Nginx:
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## Step 3: Verify Your Current Configuration

Run these commands to check your current setup:

```bash
# Check current Nginx configuration
sudo cat /etc/nginx/sites-available/irigasibunta.com

# Check if client_max_body_size is set
sudo grep -r "client_max_body_size" /etc/nginx/

# Check Nginx Proxy Manager logs
docker logs nginx-proxy-manager-app-1 | tail -20
```

## Step 4: Test the Fix

1. **Restart Nginx Proxy Manager**:
```bash
docker restart nginx-proxy-manager-app-1
```

2. **Test with a small file first** (under 1MB) to verify basic functionality

3. **Test with larger files** (2-5MB) to confirm the fix

## Step 5: Application-Level Verification

Your Next.js application is already configured correctly in [`next.config.ts`](next.config.ts:6):

```typescript
api: {
  bodyParser: {
    sizeLimit: '10mb'
  },
  responseLimit: '10mb'
}
```

And your storage API route at [`src/app/api/storage/route.ts`](src/app/api/storage/route.ts:78) handles file uploads properly.

## Quick Diagnostic Commands

Run these to identify where the error is occurring:

```bash
# Check real-time Nginx errors
sudo tail -f /var/log/nginx/error.log

# Check Nginx Proxy Manager logs
docker logs -f nginx-proxy-manager-app-1

# Test direct upload to backend (bypassing proxy)
curl -X POST -F "file=@test.jpg" http://localhost:3000/api/storage
```

## Common Issues and Solutions

### If the error persists:
1. **Check both configurations**: Ensure `client_max_body_size 50M;` is set in BOTH Nginx Proxy Manager AND backend Nginx
2. **Restart both services**: Nginx Proxy Manager and backend Nginx
3. **Clear browser cache**: Sometimes browser cache can cause issues
4. **Check file permissions**: Ensure upload directories exist and have correct permissions

### If you see timeout errors:
Increase the timeout settings in both configurations:
```nginx
client_body_timeout 60s;
proxy_connect_timeout 60s;
proxy_send_timeout 60s;
proxy_read_timeout 60s;
```

## Expected Result

After applying these fixes, you should be able to:
- Upload images up to 50MB through the web interface
- No more "413 Content Too Large" errors
- Files should save correctly to both the filesystem and database

Please run these steps and let me know the exact error message if the issue persists.