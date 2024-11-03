import Favoris from '../components/Favoris';
import Header from '../components/Header';
import Footer from '../components/Footer';

function favoris() {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <Favoris />
      </div>
      <Footer />
    </div>
  );
}

export default favoris;
