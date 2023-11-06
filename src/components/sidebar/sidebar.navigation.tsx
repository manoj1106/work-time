import { Fragment, useState } from 'react';
import { Badge, NavItem } from './_sidebar.nav';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { CBadge } from '@coreui/react';

interface SidebarProps {
  navs: NavItem[];
}
const SidebarNav = (props: SidebarProps) => {
  const { navs } = props;
  const [navIndex, setNavIndex] = useState(-1);
  if (!props.navs || props.navs?.length === 0) {
    return <Fragment></Fragment>;
  }

  const navIndexClick = (index: number) => {
    console.log('selected Index');
    setNavIndex(index);
  };

  const navLink = (
    name: string,
    icon: any,
    to: string,
    index: number,
    badge?: Badge | undefined
  ) => {
    const activeClass = navIndex === index ? 'active' : '';
    const classes = `nav-link ${activeClass}`;
    return (
      <Link href={to} className={classes} onClick={() => navIndexClick(index)}>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className='ms-auto'>
            {badge.text}
          </CBadge>
        )}
      </Link>
    );
  };

  const navItem = (nav: NavItem, index: number) => {
    const { component, name, badge, icon, to, ...rest } = nav;
    if (rest.navs) {
      return navGroup(nav, index);
    }
    const Component = component;
    return (
      <Component key={index} {...rest} active>
        {navLink(name, icon, to, index, badge)}
      </Component>
    );
  };

  const navGroup = (nav: NavItem, index: number) => {
    return <Fragment>Nav Group</Fragment>;
  };

  return (
    <section>
      {navs &&
        navs.length > 0 &&
        navs.map((nav: NavItem, index: number) =>
          nav.navs ? navGroup(nav, index) : navItem(nav, index)
        )}
    </section>
  );
};

SidebarNav.propTypes = {
  navs: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default SidebarNav;
