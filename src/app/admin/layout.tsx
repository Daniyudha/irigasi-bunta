import { ReactNode } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';

interface AdminRootLayoutProps {
  children: ReactNode;
}

export default function AdminRootLayout({ children }: AdminRootLayoutProps) {
  return <AdminLayout>{children}</AdminLayout>;
}

export const metadata = {
  title: 'Admin Panel - Bunta Bella Irrigation',
  description: 'Administration dashboard for Bunta Bella Irrigation System',
};