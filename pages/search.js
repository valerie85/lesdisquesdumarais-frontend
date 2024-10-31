import SearchResult from '../components/SearchResult';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Search() {
  return (
    <div className="layout">
      <Header />
      <div className="content">
        <SearchResult />
      </div>
      <Footer />
    </div>
  );
}

export default Search;
