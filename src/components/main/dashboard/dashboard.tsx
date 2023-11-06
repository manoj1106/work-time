'use client';
import { Fragment, useEffect } from 'react';
import useWorktimeConfigStore from '@/store/useWorktimeConfigStore';

const DashboardHome = () => {
  const store = useWorktimeConfigStore();
  useEffect(() => {
    console.log('use effect work time config triggered');
    findWorktimeConfig();
  }, [store.loading]);

  const findWorktimeConfig = async () => {
    console.log('finding worktime config');
    await store.findWorktimeConfig();
  };

  if (store.loading) {
    return (
      <Fragment>Please wait while we are preparing your dashboard !!!</Fragment>
    );
  }
  return <Fragment>Dashboard Home !!!</Fragment>;
};
export default DashboardHome;
