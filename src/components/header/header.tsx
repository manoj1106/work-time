'use client';
import {
  CAvatar,
  CContainer,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
} from '@coreui/react';
import useSidebarStore from '@/store/useSidebar';
import CIcon from '@coreui/icons-react';
import { cilAccountLogout, cilMenu, cilUser } from '@coreui/icons';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AVATAR_DEFAULT = '/images/avatar/default.jpg';

interface HeaderProps {
  avatar: string;
}

const Header = (props: HeaderProps) => {
  const router = useRouter();
  const { sidebarShow, toggleSidebarShow } = useSidebarStore();

  const avatar = props.avatar ? props.avatar : AVATAR_DEFAULT;

  const doSignOut = async (
    e: React.MouseEvent<HTMLAnchorElement> | undefined
  ) => {
    e?.preventDefault();
    const signout = await signOut({ redirect: false });
    router.push('/');
  };

  const MyProfile = () => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
    };

    return (
      <Link
        className='dropdown-item'
        href='/dashboard/profile'
        onClick={handleClick}
      >
        <CIcon icon={cilUser} className='me-2' />
        Profile
      </Link>
    );
  };

  return (
    <CHeader position='sticky' className='mb-4 bg-header-secondary'>
      <CContainer fluid>
        <CHeaderToggler
          className='ps-1'
          onClick={() => toggleSidebarShow(!sidebarShow)}
        >
          <CIcon icon={cilMenu} size='lg' />
        </CHeaderToggler>
        <CHeaderNav className='ms-3'>
          <CDropdown variant='nav-item'>
            <CDropdownToggle className='py-0' caret={false}>
              <CAvatar src={avatar} size='md' />
            </CDropdownToggle>
            <CDropdownMenu className='pt-0'>
              <CDropdownHeader className='bg-light fw-semibold py-2'>
                My Account
              </CDropdownHeader>
              <MyProfile />
              <CDropdownItem
                href='#'
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  doSignOut(e)
                }
              >
                <CIcon icon={cilAccountLogout} className='me-2' />
                Sign Out
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default Header;
