import Favoris from '../components/Favoris';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

function favoris() {
  return (
    <>
      <Head>
        <title>Les Disques du Marais - Favoris</title>
      </Head>
      <div className="layout">
        <Header />
        <div className="container">
          <Favoris />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default favoris;
