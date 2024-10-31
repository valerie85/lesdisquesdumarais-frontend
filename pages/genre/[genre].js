import ArticlesList from '../../components/ArticlesList';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import Head from 'next/head';

function Genre() {
  const router = useRouter();
  const { genre } = router.query;

  return (
    <>
      <Head>
          <title>{genre}</title>
      </Head>
      <div className="layout">
        <Header />
        <div className="content">
          <ArticlesList />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Genre;
