import CookiesPolicy from '../components/CookiesPolicy';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DisplayCookiesPolicy() {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <CookiesPolicy />
      </div>
      <Footer />
    </div>
  );
}

export default DisplayCookiesPolicy;