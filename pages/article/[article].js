import ArticleView from '../../components/ArticleView';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRouter } from 'next/router';
import Head from 'next/head';

function Article() {
  const router = useRouter();
  const { article } = router.query;

  return (
    <>
      <Head>
          <title>Les Disques du Marais - Release #{article}</title>
      </Head>
      <div className="layout">
        <Header />
        <div className="content">
          <ArticleView />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Article;
