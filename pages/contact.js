import Contact from '../components/Contact';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DisplayContact() {
  return (
    <>
      <Head>
        <title>Les Disques du Marais - Contact</title>
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