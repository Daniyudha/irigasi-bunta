# MySQL Database Setup and Fix for Login Issues

Your application is redirecting to the login page and login fails because the database is not properly configured and seeded. Currently, it uses SQLite, but you have MySQL on your server. Follow these steps to fix this.

## Step 1: Update Prisma Schema for MySQL

Edit your Prisma schema file to use MySQL instead of SQLite:

```bash
nano prisma/schema.prisma
```

Change the datasource block to:
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

## Step 2: Set Up MySQL Database

1. **Login to MySQL** on your server:
```bash
mysql -u root -p
```

2. **Create a database** for your application:
```sql
CREATE DATABASE bunta_bella;
EXIT;
```

## Step 3: Configure DATABASE_URL

Update your `.env.production` file with the MySQL connection string:

```bash
nano .env.production
```

Add or update the DATABASE_URL:
```
DATABASE_URL="mysql://root:your_mysql_password@localhost:3306/bunta_bella"
```

Replace `your_mysql_password` with your actual MySQL root password. If you have a different username or password, adjust accordingly.

## Step 4: Install MySQL Client for Prisma

You need to install the MySQL Prisma client:

```bash
npm install @prisma/client
```

## Step 5: Generate Prisma Client and Migrate

Generate the Prisma client and run migrations for MySQL:

```bash
# Generate Prisma client for MySQL
npx prisma generate

# Create initial migration
npx prisma migrate dev --name init_mysql

# Apply migrations to MySQL
npx prisma migrate deploy
```

## Step 6: Seed the Database

Run the seed script to create the admin user and initial data:

```bash
npm run seed
```

If the seed script doesn't work, run it directly:

```bash
node scripts/seed.js
```

## Step 7: Update Environment Variables

Ensure your `.env.production` has all required variables:

```
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-strong-secret-key-here
DATABASE_URL="mysql://root:your_password@localhost:3306/bunta_bella"
```

Generate a strong secret for NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## Step 8: Restart Your Application

Restart PM2 to apply the changes:

```bash
pm2 restart bunta-bella-irrigation
```

## Step 9: Verify the Setup

Check if the database was seeded properly:

```bash
# Check if users table has data
mysql -u root -p -D bunta_bella -e "SELECT * FROM User;"
```

You should see at least one admin user with email `admin@example.com`.

## Default Login Credentials

After seeding, you can login with:
- **Email:** admin@example.com
- **Password:** admin123

## Troubleshooting

1. **If you get MySQL connection errors:**
   - Verify your MySQL server is running: `sudo systemctl status mysql`
   - Check the DATABASE_URL format is correct
   - Ensure MySQL user has privileges to access the database

2. **If seeding fails:**
   - Run the seed script manually: `node scripts/seed.js`
   - Check the database connection

3. **If you still have login issues:**
   - Check the application logs: `pm2 logs bunta-bella-irrigation`
   - Verify NEXTAUTH_SECRET is set and consistent

## Important Notes

- Replace `your_password` with your actual MySQL root password
- Use a strong, random secret for NEXTAUTH_SECRET
- Ensure your MySQL server allows connections from localhost
- The application should now work without redirecting to login unnecessarily

Your application should now be fully functional with MySQL database and seeded admin user.