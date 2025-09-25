# Server Configuration for Bunta-Bella Irrigation System

This document provides server configuration instructions to fix upload errors (413 Content Too Large) and other deployment issues.

## Nginx Configuration (if using Nginx reverse proxy)

Add or update your Nginx configuration file (usually in `/etc/nginx/sites-available/irigasibunta.com`):

```nginx
server {
    listen 80;
    server_name irigasibunta.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name irigasibunta.com;

    # SSL Configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    # Upload size limits - IMPORTANT FOR FILE UPLOADS
    client_max_body_size 50M;
    client_body_timeout 60s;
    client_header_timeout 60s;

    # Proxy settings
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
    send_timeout 60s;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    location / {
        proxy_pass http://localhost:3000;  # Your Next.js app port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Increase buffer sizes for large requests
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }

    # Static file caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        proxy_pass http://localhost:3000;
    }
}
```

## Apache Configuration (if using Apache)

Add to your `.htaccess` file or virtual host configuration:

```apache
# Increase file upload size limit
LimitRequestBody 52428800  # 50MB

# Increase timeout for large uploads
Timeout 300

# Enable gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static files
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType text/javascript "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## PM2 Configuration (if using PM2)

Update your `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'bunta-bella-irrigation',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      // Increase Node.js memory limit for large file processing
      NODE_OPTIONS: '--max-old-space-size=4096'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    // Restart on file changes (useful for development)
    watch: false,
    // Increase restart delay to prevent rapid restarts
    restart_delay: 4000,
    // Max memory restart threshold
    max_memory_restart: '1G'
  }]
}
```

## Environment Variables for Production

Ensure your `.env.local` includes:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/bunta_bella"

# NextAuth.js
NEXTAUTH_SECRET="your-very-long-secret-key-here"
NEXTAUTH_URL="https://irigasibunta.com"

# File upload limits (if using custom server)
NEXT_PUBLIC_MAX_FILE_SIZE=52428800  # 50MB in bytes

# Google Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-api-key"

# Node.js performance
NODE_OPTIONS="--max-old-space-size=4096"
```

## System-Level Configuration

### Increase system file upload limits (Linux):

```bash
# Edit system limits
sudo nano /etc/security/limits.conf

# Add these lines:
* soft nofile 65536
* hard nofile 65536
* soft nproc 65536
* hard nproc 65536

# For Nginx, edit systemd service limits:
sudo systemctl edit nginx

# Add:
[Service]
LimitNOFILE=65536
```

### Apply Configuration Changes

After making changes:

```bash
# For Nginx:
sudo nginx -t  # Test configuration
sudo systemctl reload nginx

# For Apache:
sudo apache2ctl configtest  # Test configuration
sudo systemctl reload apache2

# For PM2:
pm2 restart bunta-bella-irrigation
```

## Troubleshooting Upload Issues

If you still get 413 errors:

1. **Check current Nginx configuration**:
   ```bash
   nginx -T | grep client_max_body_size
   ```

2. **Test upload with curl**:
   ```bash
   curl -X POST -F "file=@large-file.jpg" https://irigasibunta.com/api/storage
   ```

3. **Check server logs**:
   ```bash
   # Nginx error logs
   tail -f /var/log/nginx/error.log
   
   # Application logs
   pm2 logs bunta-bella-irrigation
   ```

4. **Verify file permissions**:
   ```bash
   # Ensure upload directories have proper permissions
   chmod 755 /path/to/bunta-bella-irrigation/public/uploads
   chown -R www-data:www-data /path/to/bunta-bella-irrigation/public/uploads  # For Apache
   ```

## Security Considerations

- Regularly update SSL certificates
- Monitor server logs for suspicious activity
- Set up fail2ban for brute force protection
- Regular backups of database and uploads directory
- Use strong passwords for database and admin accounts

This configuration should resolve the 413 "Content Too Large" errors and ensure smooth file uploads on your production server.