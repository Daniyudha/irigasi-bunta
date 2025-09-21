# Role-Based Access Control (RBAC) System Design

## Overview
This document outlines the design for a comprehensive RBAC system that allows granular control over user permissions for different admin menu accesses. The system will enable creating roles with specific permissions and assigning these roles to users.

## Database Schema Changes

### New Models to Add to Prisma Schema

```prisma
model Permission {
  id          String   @id @default(cuid())
  name        String   // e.g., "manage_users", "view_dashboard"
  description String?
  category    String   // e.g., "Content", "Data", "Settings"
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("permissions")
}

model Role {
  id          String   @id @default(cuid())
  name        String   @unique // e.g., "Content Manager", "Data Analyst"
  description String?
  isDefault   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  permissions RolePermission[]
  users       User[]

  @@map("roles")
}

model RolePermission {
  id           String     @id @default(cuid())
  roleId       String
  permissionId String
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  role       Role       @relation(fields: [roleId], references: [id], onDelete: Cascade)
  permission Permission @relation(fields: [permissionId], references: [id], onDelete: Cascade)

  @@unique([roleId, permissionId])
  @@map("role_permissions")
}

// Update User model to include roleId instead of direct role enum
model User {
  id            String    @id @default(cuid())
  // ... existing fields ...
  roleId        String?   // Remove the existing role field
  role          Role?     @relation(fields: [roleId], references: [id])
  // ... rest of existing fields ...
}
```

### Permission Categories and Examples

| Category | Permissions | Description |
|----------|-------------|-------------|
| Dashboard | view_dashboard | Access to admin dashboard |
| Users | manage_users | Create, edit, delete users |
| Users | assign_roles | Assign roles to users |
| Content | manage_news | CRUD operations for news |
| Content | manage_sliders | CRUD operations for sliders |
| Content | manage_gallery | CRUD operations for gallery |
| Content | manage_categories | CRUD operations for categories |
| Data | view_data | View data pages |
| Data | manage_data | Create, edit, delete data |
| Data | validate_data | Validate data entries |
| Settings | manage_settings | Update system settings |
| Media | manage_media | Upload and manage media files |

## API Endpoints

### Permissions Management
- `GET /api/admin/permissions` - List all permissions
- `POST /api/admin/permissions` - Create new permission (admin only)
- `PUT /api/admin/permissions/:id` - Update permission
- `DELETE /api/admin/permissions/:id` - Delete permission

### Roles Management
- `GET /api/admin/roles` - List all roles with their permissions
- `POST /api/admin/roles` - Create new role
- `PUT /api/admin/roles/:id` - Update role and its permissions
- `DELETE /api/admin/roles/:id` - Delete role
- `GET /api/admin/roles/:id/permissions` - Get permissions for a specific role

### User Role Assignment
- `GET /api/admin/users/:id/role` - Get user's role
- `PUT /api/admin/users/:id/role` - Assign role to user
- `DELETE /api/admin/users/:id/role` - Remove role from user

## UI Components Needed

### 1. Permissions Management Page
- Table view of all permissions
- Filter by category
- Create/edit permission forms

### 2. Roles Management Page
- List of roles with associated permissions
- Create role form with permission selection (checkboxes)
- Edit role to modify permissions
- Delete role functionality

### 3. Enhanced User Management
- Add role assignment dropdown in user create/edit forms
- Display user's current role in user list
- Role-based access to user management features

### 4. Role Assignment Interface
- Modal or separate page for assigning roles to users
- Search and select users
- Dropdown for available roles

## Middleware and Authentication Updates

### Enhanced Auth Middleware
Update `/middleware.ts` to check permissions based on user's role:

```typescript
// Example middleware check for specific permission
const hasPermission = (user: User, permission: string) => {
  return user.role?.permissions.some(p => p.name === permission);
};
```

### Component-Level Permission Checks
In React components, use a custom hook to check permissions:

```typescript
const usePermissions = () => {
  const { data: session } = useSession();
  
  const hasPermission = (permission: string) => {
    return session?.user?.role?.permissions?.includes(permission);
  };
  
  return { hasPermission };
};
```

## Migration Strategy

1. **Phase 1**: Database migration to add new tables and update User model
2. **Phase 2**: Implement backend API endpoints for permissions and roles
3. **Phase 3**: Create frontend UI for managing permissions and roles
4. **Phase 4**: Update user management to support role assignment
5. **Phase 5**: Implement permission checks in middleware and components
6. **Phase 6**: Testing and deployment

## Default Roles and Permissions

- **Super Admin**: All permissions (existing SUPER_ADMIN users)
- **Admin**: Most permissions except user role assignment
- **Content Manager**: manage_news, manage_sliders, manage_gallery, manage_categories
- **Data Analyst**: view_data, manage_data
- **Viewer**: view_dashboard (read-only access)

## Security Considerations

- Super Admin should be the only role that can assign roles and manage permissions
- Role changes should be logged for audit purposes
- API endpoints should validate permissions before allowing operations
- UI should hide unauthorized menu items and actions

## Next Steps

1. Update Prisma schema with the new models
2. Create database migration script
3. Implement API endpoints for permissions and roles
4. Build UI components for management interfaces
5. Update authentication and middleware
6. Test thoroughly before deployment

This design provides a flexible RBAC system that can be extended with additional permissions as needed.