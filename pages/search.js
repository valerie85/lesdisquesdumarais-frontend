import SearchResult from '../components/SearchResult';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Head from 'next/head';

function Search() {
  return (
    <>
      <Head>
        <title>Les Disques du Marais - Recherche</title>
        <meta name='description' content="page d'affichage des résultats d'une recherche par artiste ou par genre sur Les Disques du Marais"></meta>
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
