interface HomePageProps {
  children: React.ReactNode;
}

const HomePage = (props: HomePageProps) => {
  return <div id='page'>{props.children}</div>;
};

export default HomePage;
