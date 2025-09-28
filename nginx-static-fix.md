# Fix for Article Images Not Appearing - Nginx Static File Serving

The issue is clear from your server diagnostics: **Nginx is not serving static files directly** from the `/uploads/` directory. Instead, requests for images are being proxied to the Next.js application, which returns a 404 because it doesn't have routes for static files.

## Problem Analysis

From your server output:
- **Files exist**: Images are properly uploaded to `public/uploads/` (e.g., `news-1758788717912.jpg`)
- **Permissions are correct**: Directories have proper `755` permissions
- **Nginx configuration issue**: No static file handling for `/uploads/` path
- **Next.js is handling the request**: The 404 response shows `x-nextjs-cache: HIT` and `x-powered-by: Next.js`

## Immediate Fix

Update your Nginx configuration at `/etc/nginx/sites-available/bunta-bella-irrigation`:

```bash
sudo nano /etc/nginx/sites-available/bunta-bella-irrigation
```

**Replace the entire file with this configuration:**

```nginx
server {
    listen 80;
    server_name irigasibunta.com www.irigasibunta.com;

    # Upload size limits - MUST match Nginx Proxy Manager
    client_max_body_size 50M;
    client_body_timeout 60s;

    # CRITICAL: Serve static files directly from uploads directory
    location /uploads/ {
        alias /root/fauzi-ridwan/irigasi-bunta/public/uploads/;
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

## Apply the Fix

1. **Edit the Nginx configuration:**
   ```bash
   sudo nano /etc/nginx/sites-available/bunta-bella-irrigation
   ```

2. **Paste the new configuration** and save (Ctrl+X, Y, Enter)

3. **Test the configuration:**
   ```bash
   sudo nginx -t
   ```

4. **If test passes, restart Nginx:**
   ```bash
   sudo systemctl restart nginx
   ```

5. **Test the fix:**
   ```bash
   # Test with an actual image that exists
   curl -I https://irigasibunta.com/uploads/news-1758788717912.jpg
   ```

## Verification Steps

After applying the fix:

1. **Check the response headers** - should show Nginx serving the file, not Next.js
2. **Visit the image URL directly** in your browser
3. **Check if article images load** properly
4. **Verify CKEditor uploads work** and images appear

## Expected Results

- **Image URLs like `https://irigasibunta.com/uploads/news-1758788717912.jpg` should return 200 OK**
- **Articles should display images correctly**
- **No more 404 errors for uploaded images**
- **Nginx should serve static files directly** (faster performance)

## Additional Notes

- The application is running on **port 3001** (not 3000 as I initially assumed)
- The project path is `/root/fauzi-ridwan/irigasi-bunta/`
- File permissions are correct (`755` for directories, `644` would be better for files)
- The static file handling will significantly improve image loading performance

## If the Issue Persists

If images still don't load after this fix:

1. **Check Nginx error logs:**
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

2. **Verify the alias path is correct:**
   ```bash
   ls -la /root/fauzi-ridwan/irigasi-bunta/public/uploads/
   ```

3. **Check if Cloudflare is caching the 404** (you might need to purge cache):
   - Log in to Cloudflare dashboard
   - Go to Caching > Configuration > Purge Everything

This fix should resolve the image display issue immediately.