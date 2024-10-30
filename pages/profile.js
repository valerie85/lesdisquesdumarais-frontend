import Profile from '../components/Profile';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Index() {
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

export default Index;
