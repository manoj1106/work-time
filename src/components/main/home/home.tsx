import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import Sidebar from '@/components/sidebar/sidebar';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

interface HomeProps {
  children: React.ReactNode;
}

const Home = (props: HomeProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  if (typeof window === 'undefined') {
    router.replace('/');
  }

  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    const session = await getSession();
    if (session) {
      setLoading(false);
    }
    if (!session) {
      router.replace('/');
    }
  };

  if (loading) {
    return <Fragment>Please wait while we are loaing your page</Fragment>;
  }

  return (
    <div id='page'>
      <Sidebar />
      <div className='wrapper d-flex flex-column min-vh-100 bg-light'>
        <Header avatar='' />
        <main className='body flex-grow-1 px-3'>{props.children}</main>
        <Footer />
      </div>
    </div>
  );
};
export default Home;
