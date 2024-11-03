import CookiesPolicy from '../components/CookiesPolicy';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

function DisplayCookiesPolicy() {
  return (
    <>
      <Head>
        <title>Les Disques du Marais - Politiques des Cookies</title>
      </Head>
      <div className="layout">
        <Header />
        <div className="content">
          <CookiesPolicy />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DisplayCookiesPolicy;