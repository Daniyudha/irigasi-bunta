# Nginx Proxy Manager Configuration for Bunta-Bella Irrigation

Since you're using Nginx Proxy Manager to handle HTTPS, you need to configure it properly to allow large file uploads. The "413 Content Too Large" error is likely happening at the proxy manager level.

## Step 1: Configure Nginx Proxy Manager for Large File Uploads

### Option A: Using the Web Interface (Recommended)

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

### Option B: Manual Configuration File

If you need to edit the configuration file directly:

1. **Find the configuration file** (usually in `/data/nginx/proxy_host` or similar)
2. **Edit the specific file for your domain**
3. **Add the same configuration as above**

## Step 2: Verify Backend Nginx Configuration

Even though Nginx Proxy Manager handles HTTPS, your backend Nginx should still be configured properly. Use this simple HTTP configuration:

```nginx
server {
    listen 80;
    server_name localhost;

    # Upload size limits
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

## Step 3: Application Configuration Check

Ensure your Next.js application has the correct configuration in `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    },
    responseLimit: '10mb'
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs']
  }
};

export default nextConfig;
```

## Step 4: Test the Configuration

### Test Nginx Proxy Manager Configuration

```bash
# Check if Nginx Proxy Manager is running
docker ps | grep nginx-proxy-manager

# Restart Nginx Proxy Manager if needed
docker restart nginx-proxy-manager-app-1
```

### Test File Upload with curl

```bash
# Test with a small file first
curl -X POST -F "file=@small-image.jpg" http://localhost:3000/api/storage

# Test with a larger file
curl -X POST -F "file=@large-image.jpg" http://localhost:3000/api/storage
```

## Step 5: Monitor Logs for Errors

Check the logs to identify where the error is occurring:

```bash
# Nginx Proxy Manager logs
docker logs nginx-proxy-manager-app-1

# Backend Nginx logs
tail -f /var/log/nginx/error.log

# Application logs (if using PM2)
pm2 logs bunta-bella-irrigation
```

## Common Issues and Solutions

### Issue 1: "413 Request Entity Too Large" persists
- **Solution**: Ensure `client_max_body_size 50M;` is set in BOTH Nginx Proxy Manager AND your backend Nginx configuration.

### Issue 2: Timeout errors during upload
- **Solution**: Increase timeout settings in both configurations:
  ```nginx
  client_body_timeout 60s;
  proxy_connect_timeout 60s;
  proxy_send_timeout 60s;
  proxy_read_timeout 60s;
  ```

### Issue 3: SSL-related errors
- **Solution**: Since Nginx Proxy Manager handles SSL, make sure your backend Nginx is only listening on HTTP (port 80) and not trying to handle SSL.

## Final Configuration Summary

1. **Nginx Proxy Manager**: Set custom configuration with `client_max_body_size 50M;`
2. **Backend Nginx**: Simple HTTP configuration with the same size limit
3. **Next.js Application**: Proper `next.config.ts` with increased limits
4. **File System**: Ensure upload directories exist with correct permissions

After making these changes, restart both Nginx Proxy Manager and your backend Nginx service, then test the file upload functionality.