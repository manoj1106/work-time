'use client';
import Home from '@/components/main/home/home';
import { NotificationContextProvider } from '@/context/notification/notification';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <SessionProvider>
      <NotificationContextProvider>
        <Home>{props.children}</Home>
        <ToastContainer
          position='bottom-left'
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          closeOnClick={true}
          pauseOnHover={true}
          className='mt-8'
        />
      </NotificationContextProvider>
    </SessionProvider>
  );
};
export default DashboardLayout;
