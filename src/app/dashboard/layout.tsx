'use client';
import Home from '@/components/main/home/home';
import { SessionProvider } from 'next-auth/react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <SessionProvider>
      <Home>{props.children}</Home>
    </SessionProvider>
  );
};
export default DashboardLayout;
