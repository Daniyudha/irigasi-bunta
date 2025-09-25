# Emergency Nginx Fix for Bunta-Bella Irrigation

Your Nginx configuration has broken SSL certificate paths. Here's how to fix it immediately:

## Step 1: Check your current SSL certificate paths

```bash
# Check where your SSL certificates are located
ls -la /etc/ssl/certs/
ls -la /etc/letsencrypt/live/irigasibunta.com/  # If using Let's Encrypt
```

## Step 2: Fix the Nginx configuration

Edit your Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/irigasibunta.com
```

**Use this minimal working configuration first (HTTP only - no SSL):**
```nginx
server {
    listen 80;
    server_name irigasibunta.com;

    # Upload size limits - IMPORTANT FOR FILE UPLOADS
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
    }
}
```

## Step 3: Test and restart Nginx

```bash
sudo nginx -t
sudo systemctl restart nginx
```

## Step 4: If you need SSL certificates, get them properly

```bash
# Install certbot if not installed
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Get SSL certificates
sudo certbot --nginx -d irigasibunta.com

# This will automatically configure SSL for you
```

## Complete Working Nginx Configuration (After SSL)

Once you have valid SSL certificates, use this configuration:

```nginx
server {
    listen 80;
    server_name irigasibunta.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name irigasibunta.com;

    # SSL Configuration (Certbot will set these paths)
    ssl_certificate /etc/letsencrypt/live/irigasibunta.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/irigasibunta.com/privkey.pem;

    # Upload size limits
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
    }
}
```

## Emergency Recovery Commands

If Nginx fails to start:

```bash
# Check Nginx status
sudo systemctl status nginx

# View error logs
sudo journalctl -u nginx -f

# If completely broken, restore default configuration
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/irigasibunta.com
sudo nginx -t
sudo systemctl restart nginx
```

## Quick Fix Summary

1. **Edit Nginx config**: `sudo nano /etc/nginx/sites-available/irigasibunta.com`
2. **Use the HTTP-only config above** (remove SSL section)
3. **Test**: `sudo nginx -t`
4. **Restart**: `sudo systemctl restart nginx`
5. **Get SSL later**: `sudo certbot --nginx -d irigasibunta.com`

This will get your site running immediately, then you can add SSL properly.