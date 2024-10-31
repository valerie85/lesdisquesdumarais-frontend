import Contact from '../components/Contact';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DisplayContact() {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

export default DisplayContact;