import GeneralConditions from '../components/GeneralConditions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

function DisplayCGV() {
  return (
    <>
      <Head>
        <title>Les Disques du Marais - Conditions Générales de Vente</title>
        <meta name='description' content='Détail des conditions générales de vente du site Les Disques du Marais'></meta>
      </Head>
      <div className="layout">
        <Header />
        <div className="content">
          <GeneralConditions />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DisplayCGV;