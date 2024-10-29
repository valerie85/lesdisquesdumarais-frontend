import styles from '../styles/Home.module.css';
import Article from '../components/Article';
import { useEffect, useState } from 'react';

function Home() {

  const [articlesData, setArticlesData] = useState([]);

useEffect(() => {
    fetch('http://localhost:3000/articles')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setArticlesData(data.allArticles.filter((data, i) => i > 0));
      });
  }, []);

  //test tri des articles par date de creation
  //const sortedArticles = Object.entries(articlesData).sort(([,a],[,b])=> a.createdAt-b.createdAt);
  //console.log(sortedArticles);

  //création de la liste à afficher
  const articles = articlesData.map((data, i) => {
      return <Article key={i} {...data} />;
  });

  return (
    <div>
      <main className={styles.main}>

        <div className="row">
          <h1 className="title">
            Nouveaux arrivages       
          </h1>     
        </div>

        <div className="row">
          <h2 className="title">
            Liste des articles
          </h2>
          <div className='articlesList'>
            {articles}
          </div>          
        </div>
        
      </main>
    </div>
  );
}

export default Home;
