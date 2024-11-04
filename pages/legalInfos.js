import LegalInfos from '../components/LegalInfos'
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

function DisplayLegalInfos() {
  return (
    <>
      <Head>
        <title>Les Disques du Marais - Informations légales</title>
      </Head>
      <div className="layout">
        <Header />
        <div className="content">
          <LegalInfos/>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DisplayLegalInfos;