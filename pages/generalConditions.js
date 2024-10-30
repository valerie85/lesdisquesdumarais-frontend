import GeneralConditions from '../components/GeneralConditions';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DisplayCGV() {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <GeneralConditions />
      </div>
      <Footer />
    </div>
  );
}

export default DisplayCGV;