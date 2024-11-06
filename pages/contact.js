import Contact from '../components/Contact';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

function DisplayContact() {
  return (
    <>
      <Head>
        <title>Les Disques du Marais - Contact</title>
        <meta name='description' content='Informations de contact pour joindre Les Disques du Marais par mail ou télephone'></meta>
      </Head>
      <div className="layout">
        <Header />
        <div className="content">
          <Contact />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DisplayContact;