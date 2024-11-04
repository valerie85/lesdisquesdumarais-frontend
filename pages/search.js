import SearchResult from '../components/SearchResult';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

function Search() {
  return (
    <>
      <Head>
        <title>Les Disques du Marais - Recherche</title>
      </Head>
      <div className="layout">
        <Header />
        <div className="content">
          <SearchResult />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Search;
