import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';
import Link from 'next/link';

function OrderConfirmed() {
  return (
    <>
    <Head>
        <title>Les Disques du Marais - Confirmation de commande</title>
        <meta name='description' content='message de confirmation de commande auprès des Disques du Marais'></meta>
    </Head>
      <div className="layout">
        <Header />
        <div className="content">
          <main className="main">
            <div className="container mx-auto text-center">
                <h1 className="title">
                  Confirmation de commande
                </h1>
                <p className="introduction">
                  Merci pour votre achat, un e-email de confirmation vous a été envoyé.
                </p>
                <div>
                  <Link href="/">
                    <button className="btnTertiary">Retour à l'accueil</button>
                  </Link>
                </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default OrderConfirmed;
