import { CNavItem } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { CNavLinkProps } from '@coreui/react/dist/components/nav/CNavLink';
import {
  cilSpeedometer,
  cilAppsSettings,
  cilCalendar,
  cilCalendarCheck,
} from '@coreui/icons';

export interface NavItem {
  component: React.ForwardRefExoticComponent<
    CNavLinkProps & React.RefAttributes<HTMLLIElement>
  >;
  name: string;
  to: string;
  badge?: Badge;
  icon?: React.ReactNode | React.ReactElement | string | undefined;
  navs?: NavItem[];
}

export interface Badge {
  color: string;
  text: string;
}

const _navs: NavItem[] = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'Default Worktime Config',
    to: '/dashboard/worktime-config',
    icon: <CIcon icon={cilAppsSettings} customClassName='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'Book your time',
    to: '/dashboard/booking',
    icon: <CIcon icon={cilCalendar} customClassName='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'My Bookings',
    to: '/dashboard/my-bookings',
    icon: <CIcon icon={cilCalendarCheck} customClassName='nav-icon' />,
  },
];
export default _navs;
