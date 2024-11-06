import Favoris from '../components/Favoris';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

function favoris() {
  return (
    <>
      <Head>
        <title>Les Disques du Marais - Favoris</title>
        <meta name='description' content="Page permettant d'accéder aux favoris enregistrés en cours de navigation "></meta>
      </Head>
      <div className="layout">
        <Header />
        <div className="content">
          <Favoris />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default favoris;