// @ts-nocheck

'use client';
import useSidebarStore from '@/store/useSidebar';
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from '@coreui/react';
import Image from 'next/image';
import SidebarNav from './sidebar.navigation';
import SimpleBar from 'simplebar-react';
import navigations from './_sidebar.nav';
const LOGO_PATH = '/images/brand/logo.png';
const Sidebar = () => {
  const { unfoldable, sidebarShow, sidebarUnfoldable, toggleSidebarShow } =
    useSidebarStore();
  return (
    <CSidebar
      position='fixed'
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => toggleSidebarShow(visible)}
    >
      <CSidebarBrand className='d-none d-md-flex' to='/'>
        <Image src={LOGO_PATH} height={50} width={50} alt='Worktime' />
        {/* <CIcon className='sidebar-brand-full' icon='cil-clock' height={35} />
        <CIcon className='sidebar-brand-narrow' icon='cil-clock' height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <SidebarNav navs={navigations} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className='d-none d-lg-flex'
        onClick={sidebarUnfoldable}
      />
    </CSidebar>
  );
};

export default Sidebar;
