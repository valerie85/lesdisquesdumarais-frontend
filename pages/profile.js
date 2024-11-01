import Profile from '../components/Profile';
import Header from '../components/Header';
import Footer from '../components/Footer';

function profile() {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        <Profile />
      </div>
      <Footer />
    </div>
  );
}

export default profile;
