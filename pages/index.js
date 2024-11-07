import Home from '../components/Home';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';


function Index() {
  return (
    <>
      <Head>
        <title>Les Disques du Marais</title>
        <meta name="description" content="Les Disques du Marais est 
        un site de vente en ligne de vinyles, CD et K7 d'occasion. 
        Chaque article est unique, son état est soigneusement décrit
        et des photos réelles sont affichées."></meta>
      </Head>
      <div className="layout">
        <Header />
        <div className="content">
          <Home />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Index;
