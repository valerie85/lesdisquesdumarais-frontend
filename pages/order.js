import Order from '../components/Order';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

function OrderPage() {
    return (
      <>
        <Head>
          <title>Les Disques du Marais - Commande</title>
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