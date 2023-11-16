'use client';
import { Fragment, useEffect } from 'react';
import useWorktimeConfigStore from '@/store/useWorktimeConfigStore';
import { CContainer } from '@coreui/react';
import WidgetsBrand from './widgets-brand/widgets-brand';

const DashboardHome = () => {
  const store = useWorktimeConfigStore();
  useEffect(() => {
    findWorktimeConfig();
  }, [store.loading]);

  const findWorktimeConfig = async () => {
    await store.findWorktimeConfig();
  };

  if (store.loading) {
    return (
      <Fragment>Please wait while we are preparing your dashboard !!!</Fragment>
    );
  }
  return (
    <CContainer>
      <WidgetsBrand />
    </CContainer>
  );
};
export default DashboardHome;
