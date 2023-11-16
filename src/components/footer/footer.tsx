import { CFooter } from '@coreui/react';

const Footer = () => {
  const date = new Date();
  return (
    <CFooter>
      <span className='ms-1'>&copy; {date.getFullYear()}</span>
    </CFooter>
  );
};

export default Footer;
