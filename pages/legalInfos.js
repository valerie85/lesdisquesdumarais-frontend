import LegalInfos from '../components/LegalInfos'
import Header from '../components/Header';
import Footer from '../components/Footer';

function DisplayLegalInfos() {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <LegalInfos/>
      </div>
      <Footer />
    </div>
  );
}

export default DisplayLegalInfos;