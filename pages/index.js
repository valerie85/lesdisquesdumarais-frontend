import Home from '../components/Home';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Index() {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default Index;
