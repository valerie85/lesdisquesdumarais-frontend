import ArticleView from '../components/ArticleView';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Article() {
  return (
    <div className="layout">
      <Header />
      <div className="container">
        <ArticleView />
      </div>
      <Footer />
    </div>
  );
}

export default Article;
