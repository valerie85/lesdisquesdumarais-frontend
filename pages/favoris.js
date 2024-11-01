import Favoris from '../components/Favoris';
import Header from '../components/Header';
import Footer from '../components/Footer';

function profile() {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <Profile />
      </div>
      <Footer />
    </div>
  );
}

export default profile;
