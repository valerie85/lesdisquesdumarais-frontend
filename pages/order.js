import Order from '../components/Order';
import Header from '../components/Header';
import Footer from '../components/Footer';

function OrderPage() {
    return (
        <div className="layout">
          <Header />
          <div className="content">
            <Order />
          </div>
          <Footer />
        </div>
      );
    }
    
    export default OrderPage;