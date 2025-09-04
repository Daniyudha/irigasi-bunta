# Deployment Guide for Bunta Bella Irrigation System

This guide provides step-by-step instructions to deploy the application to a Proxmox CT server using PM2 and Nginx on port 3001.

## Prerequisites
- Proxmox CT server with Ubuntu/Debian Linux
- Node.js and npm installed
- PM2 installed globally
- Nginx installed
- Domain name (optional) for production

## 1. Prepare Application for Production

```bash
# Build the production version
npm run build

# Test locally on port 3001
npm start -- -p 3001
```

## 2. Server Setup Commands

SSH into your Proxmox CT server and run:

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Nginx (if not installed)
sudo apt install nginx -y
```

## 3. Deploy Application to Server

Transfer your application code to the server using SCP or Git:

```bash
# Using SCP (from local machine)
scp -r ./bunta-bella-irrigation/ user@your-server-ip:/opt/bunta-bella-irrigation/

# Or clone from Git
git clone your-repo-url /opt/bunta-bella-irrigation
```

On the server:

```bash
# Navigate to app directory
cd /opt/bunta-bella-irrigation

# Install dependencies
npm install

# Create production build
npm run build
```

## 4. Configure Environment Variables

Create a production environment file:

```bash
nano .env.production
```

Add your production variables:
```
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
DATABASE_URL=your-production-database-url
PORT=3001
```

## 5. Create PM2 Ecosystem Configuration

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'bunta-bella-irrigation',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001,
    }
  }]
};
```

## 6. Start Application with PM2

```bash
# Start application with PM2
pm2 start ecosystem.config.js --env production

# Save PM2 process list
pm2 save

# Setup startup script
pm2 startup
```

## 7. Configure Nginx Reverse Proxy

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/bunta-bella-irrigation
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

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

Enable the site:
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/bunta-bella-irrigation /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## 8. SSL Certificate (Optional)

Install Certbot for HTTPS:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 9. Firewall Configuration

```bash
# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'

# Allow port 3001 if needed
sudo ufw allow 3001

# Enable firewall
sudo ufw enable
```

## 10. Application Update Procedure

When updating your application:

```bash
# Pull latest changes (if using Git)
git pull origin main

# Install new dependencies
npm install

# Create new production build
npm run build

# Restart application with PM2
pm2 restart bunta-bella-irrigation

# Check status
pm2 status
```

## 11. Monitoring and Logs

```bash
# View PM2 status
pm2 status

# View application logs
pm2 logs bunta-bella-irrigation

# Monitor in real-time
pm2 monit
```

## Important Notes

1. **Port Configuration**: Application runs on port 3001 via PM2 and environment variables.
2. **Database**: Ensure production database is set up with correct DATABASE_URL.
3. **Permissions**: Ensure PM2 user has appropriate file permissions.
4. **Environment Variables**: Keep sensitive data in .env.production, not in version control.
5. **Backups**: Regularly backup your database and important files.

Your application should now be accessible at your domain name or server IP, with Nginx proxying to port 3001.