const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Define all system permissions with categories
const permissions = [
  // News Management Permissions
  { name: 'news:read', description: 'View news articles', category: 'News' },
  { name: 'news:create', description: 'Create new news articles', category: 'News' },
  { name: 'news:edit', description: 'Edit existing news articles', category: 'News' },
  { name: 'news:delete', description: 'Delete news articles', category: 'News' },
  { name: 'news:publish', description: 'Publish/unpublish news articles', category: 'News' },

  // User Management Permissions
  { name: 'users:read', description: 'View user accounts', category: 'Users' },
  { name: 'users:create', description: 'Create new user accounts', category: 'Users' },
  { name: 'users:edit', description: 'Edit user accounts', category: 'Users' },
  { name: 'users:delete', description: 'Delete user accounts', category: 'Users' },
  { name: 'users:roles', description: 'Manage user roles and permissions', category: 'Users' },

  // Role Management Permissions
  { name: 'roles:read', description: 'View roles', category: 'Roles' },
  { name: 'roles:create', description: 'Create new roles', category: 'Roles' },
  { name: 'roles:edit', description: 'Edit roles', category: 'Roles' },
  { name: 'roles:delete', description: 'Delete roles', category: 'Roles' },
  { name: 'roles:permissions', description: 'Manage role permissions', category: 'Roles' },

  // Category Management Permissions
  { name: 'categories:read', description: 'View categories', category: 'Categories' },
  { name: 'categories:create', description: 'Create new categories', category: 'Categories' },
  { name: 'categories:edit', description: 'Edit categories', category: 'Categories' },
  { name: 'categories:delete', description: 'Delete categories', category: 'Categories' },

  // Media Management Permissions
  { name: 'media:read', description: 'View media files', category: 'Media' },
  { name: 'media:upload', description: 'Upload new media files', category: 'Media' },
  { name: 'media:edit', description: 'Edit media files', category: 'Media' },
  { name: 'media:delete', description: 'Delete media files', category: 'Media' },

  // Gallery Management Permissions
  { name: 'gallery:read', description: 'View gallery items', category: 'Gallery' },
  { name: 'gallery:create', description: 'Create new gallery items', category: 'Gallery' },
  { name: 'gallery:edit', description: 'Edit gallery items', category: 'Gallery' },
  { name: 'gallery:delete', description: 'Delete gallery items', category: 'Gallery' },

  // Data Management Permissions
  { name: 'data:read', description: 'View data records', category: 'Data' },
  { name: 'data:create', description: 'Create new data records', category: 'Data' },
  { name: 'data:edit', description: 'Edit data records', category: 'Data' },
  { name: 'data:delete', description: 'Delete data records', category: 'Data' },
  { name: 'data:export', description: 'Export data', category: 'Data' },

  // Settings Permissions
  { name: 'settings:read', description: 'View system settings', category: 'Settings' },
  { name: 'settings:edit', description: 'Edit system settings', category: 'Settings' },

  // Dashboard Permissions
  { name: 'dashboard:view', description: 'View admin dashboard', category: 'Dashboard' },

  // Reports Permissions
  { name: 'reports:view', description: 'View reports', category: 'Reports' },
  { name: 'reports:generate', description: 'Generate reports', category: 'Reports' },
];

async function main() {
  console.log('Seeding system permissions...');

  // Create permissions if they don't exist
  for (const permissionData of permissions) {
    // Check if permission already exists by name
    const existingPermission = await prisma.permission.findFirst({
      where: { name: permissionData.name }
    });

    if (existingPermission) {
      // Update existing permission
      const permission = await prisma.permission.update({
        where: { id: existingPermission.id },
        data: {
          description: permissionData.description,
          category: permissionData.category,
        },
      });
      console.log(`Updated permission: ${permission.name}`);
    } else {
      // Create new permission
      const permission = await prisma.permission.create({
        data: permissionData,
      });
      console.log(`Created permission: ${permission.name}`);
    }
  }

  console.log('Permissions seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });