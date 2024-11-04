import Profile from '../components/Profile';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

function profile() {
  return (
    <>
      <Head>
        <title>Les Disques du Marais - Mon profil</title>
      </Head>
      <div className="layout">
        <Header />
        <div className="content">
          <Profile />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default profile;
