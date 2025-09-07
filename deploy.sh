#!/bin/bash

# Deployment script for Bunta-Bella Irrigation System
# This script should be run after pulling updates from GitHub

set -e  # Exit on any error

echo "🚀 Starting deployment process for Bunta-Bella Irrigation System"
echo "=============================================================="

# Step 1: Install dependencies
echo "📦 Step 1: Installing dependencies..."
npm install

# Step 2: Generate Prisma client
echo "🔧 Step 2: Generating Prisma client..."
npx prisma generate

# Step 3: Run database migrations
echo "🗄️ Step 3: Running database migrations..."
npx prisma migrate deploy

# Step 4: Seed the database
echo "🌱 Step 4: Seeding database..."
npm run seed

# Step 5: Run additional seed scripts if they exist
if [ -f "scripts/seed-categories.js" ]; then
    echo "📝 Step 5a: Running categories seed..."
    node scripts/seed-categories.js
fi

if [ -f "scripts/update-news-categories.js" ]; then
    echo "📝 Step 5b: Running news categories update..."
    node scripts/update-news-categories.js
fi

if [ -f "scripts/check-data.js" ]; then
    echo "📝 Step 5c: Running data check..."
    node scripts/check-data.js
fi

# Step 6: Build the application
echo "🏗️ Step 6: Building application..."
npm run build

# Step 7: Restart the application (this part depends on your deployment setup)
echo "🔄 Step 7: Deployment completed successfully!"
echo ""
echo "📋 Next steps:"
echo "   - If using PM2: pm2 restart bunta-bella-irrigation"
echo "   - If using systemd: sudo systemctl restart bunta-bella-irrigation"
echo "   - If using Docker: docker-compose up -d --build"
echo ""
echo "✅ Deployment script finished at $(date)"