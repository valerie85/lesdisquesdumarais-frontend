import Order from '../components/Order';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

function OrderPage() {
    return (
      <>
        <Head>
          <title>Les Disques du Marais - Commande</title>
          <meta name='description' content="Récapitulatif de votre commande en cours sur le site
           Les Disques du Marais permettant le choix de l'adresse et du mode de livraison, ainsi que du mode paiement"></meta>
        </Head>
        <div className="layout">
          <Header />
          <div className="content">
            <Order />
          </div>
          <Footer />
        </div>
      </>
    );
  }
  
  export default OrderPage;